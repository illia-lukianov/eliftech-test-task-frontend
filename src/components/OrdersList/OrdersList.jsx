import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ERROR_MESSAGES } from "../../constants/index.js";
import { getOrders } from "../../redux/orders/operations.js";
import {
  selectAllOrders,
  selectAllOrdersTotalPages,
  selectOrdersIsError,
  selectOrdersIsLoading,
} from "../../redux/orders/selectors.js";
import AuthenticateModal from "../AuthenticateModal/AuthenticateModal.jsx";
import ErrorToastMessage from "../ErrorToastMessage/ErrorToastMessage.jsx";
import Loader from "../Loader/Loader.jsx";
import NotFoundFlowers from "../NotFoundFlowers/NotFoundFlowers.jsx";
import OrderCard from "../OrderCard/OrderCard";
import Pagination from "../Pagination/Pagination.jsx";
import styles from "./OrdersList.module.css";

export default function OrdersList() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const [authModalIsOpen, setAuthModalOpen] = useState(false);
  const openAuthModal = () => setAuthModalOpen(true);
  const closeAuthModal = () => setAuthModalOpen(false);

  const errorMessages = {
    ...ERROR_MESSAGES,
    404: "Flowers are not found. Please try again later.",
  };

  const flowersListRef = useRef();

  const items = useSelector(selectAllOrders);

  const isLoading = useSelector(selectOrdersIsLoading);

  const error = useSelector(selectOrdersIsError);

  const totalPages = useSelector(selectAllOrdersTotalPages);

  useEffect(() => {
    dispatch(getOrders({ page }));

    if (flowersListRef.current) {
      const newTop = flowersListRef.current.offsetTop - 140;
      if (newTop < window.scrollY) {
        window.scrollTo({
          top: newTop,
          behavior: "smooth",
        });
      }
    }
  }, [dispatch, page]);

  const isEmpty = !isLoading && (!items || items.length === 0);

  const goToPage = (p) => {
    if (p < 1 || p > totalPages || p === page) return;
    setPage(p);
  };

  return (
    <>
      {isLoading && !error && <Loader />}
      <ul className={styles.list} ref={flowersListRef}>
        {items?.map((order, idx) => (
          <li className={styles.item} key={`${order._id}-${idx}`}>
            <OrderCard
            order={order}
            openModal={openAuthModal}
            />
          </li>
        ))}
      </ul>

      {isEmpty && <NotFoundFlowers />}

      <Pagination page={page} totalPages={totalPages} onPageChange={goToPage} />
      <AuthenticateModal
        isOpen={authModalIsOpen}
        onClose={() => closeAuthModal()}
        title="Error while saving"
        content="To save this flower, you need to authorize first"
      />
      {error && (
        <ErrorToastMessage>{errorMessages[error.status]}</ErrorToastMessage>
      )}
    </>
  );
}
