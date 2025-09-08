import { useDispatch, useSelector } from "react-redux";
import { Field, Formik } from "formik";
import {
  selectCartItems,
  selectCartTotalQuantity,
  selectCartTotalAmount,
  selectIsCartEmpty,
} from "../../redux/cart/selectors";
import { removeFromCart, updateQuantity, clearCart } from "../../redux/cart/slice";
import styles from "./CartPage.module.css";
import { postOrders } from "../../redux/orders/operations";
import { useState } from "react";
import OrderModal from "../../components/OrderModal/OrderModal";
import toast from "react-hot-toast";

export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectCartTotalQuantity);
  const totalAmount = useSelector(selectCartTotalAmount);
  const isEmpty = useSelector(selectIsCartEmpty);
  const [activeOrder, setActiveOrder] = useState(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  const handleRemove = (_id) => {
    dispatch(removeFromCart(_id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleSubmitOrder = async () => {
  const payload = {
    items: items.map((item) => ({
      productId: item._id,
      quantity: item.quantity,
    })),
    totalAmount,
  };

  try {
    const newOrder = await dispatch(postOrders(payload)).unwrap();
    setActiveOrder(newOrder);
    setIsOrderModalOpen(true);
    dispatch(clearCart());
    toast.success("The order successfully submited!", {
      style: {
        background: "#1e1e2f",
        color: "#fff",
        border: "1px solid #22c55e",
        padding: "12px 16px",
        borderRadius: "12px",
        fontSize: "14px",
        fontWeight: "500",
        boxShadow: "0 4px 14px rgba(0,0,0,0.4)",
      },
      iconTheme: {
        primary: "#22c55e",
        secondary: "#fff",
      },
    });
  } catch (error) {
    console.error("Failed to submit order:", error);
  }
};
  
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>My Cart</h3>
      {isEmpty ? (
        <p className={styles.emptyText}>Your cart is empty.</p>
      ) : (
        <Formik
          initialValues={{
            quantities: items.reduce((acc, item) => {
              acc[item._id] = item.quantity;
              return acc;
            }, {}),
          }}
          onSubmit={() => {
            dispatch(clearCart());
          }}
        >
          {({ values, setFieldValue }) => (
            <>
              <ul className={styles.list}>
                {items.map((item) => (
                  <li key={item._id} className={styles.item}>
                    <img
                      src={item.thumb || "/assets/img/default.png"}
                      alt={item.name}
                      className={styles.image}
                    />
                    <div className={styles.info}>
                      <h3 className={styles.name}>{item.name}</h3>
                      <p className={styles.price}>
                        {item.price.toFixed(2)} ×{" "}
                        <Field
                          type="number"
                          name={`quantities.${item._id}`}
                          min={1}
                          className={styles.qtyInput}
                          value={values.quantities[item._id]}
                          onChange={(e) => {
                            const newQty = Math.max(1, Number(e.target.value));
                            setFieldValue(`quantities.${item._id}`, newQty);
                            dispatch(
                              updateQuantity({
                                _id: item._id,
                                quantity: newQty,
                              })
                            );
                          }}
                        />{" "}
                        ={" "}
                        {(item.price * values.quantities[item._id]).toFixed(2)}{" "}
                        grn
                      </p>
                      <div className={styles.btnWrapper}>
                        <button
                          type="button"
                          className={styles.removeBtn}
                          onClick={() => handleRemove(item._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className={styles.summary}>
                <p>Total Items: {totalQuantity}</p>
                <p>Total Amount: {totalAmount.toFixed(2)} grn</p>
                <button
                  type="button"
                  className={styles.clearBtn}
                  onClick={handleClearCart}
                >
                  Clear Cart
                </button>
                <button
                  type="button"
                  className={styles.submitBtn}
                  onClick={handleSubmitOrder}
                >
                  Submit Order
                </button>
              </div>
            </>
          )}
        </Formik>
      )}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        order={activeOrder?.items}
        info={{
          totalAmount: activeOrder?.totalAmount,
          createdAt: activeOrder?.createdAt,
        }}
      />
    </div>
  );
}