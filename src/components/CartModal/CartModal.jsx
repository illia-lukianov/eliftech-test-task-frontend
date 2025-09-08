import BaseModal from '../BaseModal/BaseModal';
import styles from './CartModal.module.css';
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cart/slice';
import toast from 'react-hot-toast';

export default function CartModal({cardInfo, isOpen, onClose}) {
  const dispatch = useDispatch();
  const CartSchema = Yup.object().shape({
  quantity: Yup.number()
    .min(1, "Мінімальна кількість — 1")
    .max(100, "Максимальна кількість — 100")
    .required("Вкажіть кількість"),
});

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} type="cart">
      {cardInfo !== null && (
        <div className={styles.container}>
          <div className={styles.imageWrapper}>
            <img src={"thumb"} alt={cardInfo.name} className={styles.image} />
          </div>
          <div className={styles.info}>
            <h2 className={styles.title}>{cardInfo.name}</h2>
            <p className={styles.description}>{cardInfo.description}</p>
            <p>
              <strong>Price:</strong> {cardInfo.price} grn
            </p>
            <p>
              <strong>Category:</strong> {cardInfo.category}
            </p>
            <p>
              <strong>Area:</strong> {cardInfo.area}
            </p>
            <p>
              <strong>Bloom Season:</strong> {cardInfo.bloomSeason}
            </p>
            <p>
              <strong>Care:</strong> {cardInfo.careInstructions}
            </p>

            <Formik
              initialValues={{ quantity: 1 }}
              validationSchema={CartSchema}
              onSubmit={(values) => {
                toast.success("The flower successfully add to cart!", {
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
                const totalPrice = cardInfo.price * values.quantity;
                dispatch(addToCart({
                  ...cardInfo,
                  quantity: values.quantity,
                  totalPrice,
                }))
              }}
            >
              {({ values }) => (
                <Form>
                  <div className={styles.quantity}>
                    <label name="quantity">Quantity: </label>
                    <div className={styles.quantityField}>
                      <Field
                        type="number"
                        name="quantity"
                        min="1"
                        className={styles.input}
                      />
                      <ErrorMessage
                        name="quantity"
                        component="div"
                        className={styles.error}
                      />
                    </div>
                    <p className={styles.totalPrice}>
                      <strong>Total Price:</strong>{" "}
                      {(cardInfo.price * values.quantity).toFixed(2)} grn
                    </p>
                  </div>

                  <button type="submit" className={styles.addBtn}>
                    Add to Cart
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </BaseModal>
  );
}
