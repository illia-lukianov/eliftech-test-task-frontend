import { useState } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import Image from "../../assets/img/defaultImgOrders/defaultImgOrders.png";
import Image2 from "../../assets/img/defaultImgOrders/defaultImgOrders@2x.png";
import { ERROR_MESSAGES } from "../../constants";
import { selectFlowersOperationError } from "../../redux/flowers/selectors";
import ErrorToastMessage from "../ErrorToastMessage/ErrorToastMessage";
import OrderModal from "../OrderModal/OrderModal";
import styles from "./OrderCard.module.css";

export default function OrderCard({ order }) {
  const error = useSelector(selectFlowersOperationError);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1439 });
  const [activeOrder, setActiveOrder] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const { items, totalAmount, createdAt } = order || {};
  const createdAtKiev = new Date(createdAt).toLocaleString("uk-UA");

  const errorMessages = {
    ...ERROR_MESSAGES,
    404: "Sorry, this recipe was not found",
  };

  const handleOrderModalOpen = async () => {
    if (isOrderModalOpen) return;
      setActiveOrder(items);
      setIsOrderModalOpen(true);
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.defaultImg}>
          <img
            srcSet={`${Image} 1x, ${Image2} 2x`}
            alt="Order image"
            className={styles.image}
            width={isMobile ? 337 : isTablet ? 315 : 264}
            height={isMobile ? 230 : isTablet ? 230 : 178}
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className={styles.descriptionContainer}>
          <p className={styles.descriptionText}>Date: {createdAtKiev}</p>
          <p>{`Total price: ${totalAmount} grn`}</p>
        </div>

        <div className={styles.btnContainer}>
          <button
            className={`${styles.learnMoreBtn} dark-outline-btn`}
            onClick={(e) => handleOrderModalOpen(e)}
          >
            Learn more
          </button>
        </div>
      </div>
      <OrderModal
        order={activeOrder}
        info={{totalAmount, createdAt}}
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      />
      {error && (
        <ErrorToastMessage>
          {errorMessages[error.status] ??
            "Failed to perform operation. Please retry in a moment"}
        </ErrorToastMessage>
      )}
    </>
  );
}
