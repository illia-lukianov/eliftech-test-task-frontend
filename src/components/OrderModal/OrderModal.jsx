import BaseModal from '../BaseModal/BaseModal';
import styles from './OrderModal.module.css';

export default function OrderModal({ isOpen, onClose, order, info}) {
  const {totalAmount, createdAt} = info;
  const createdAtKiev = new Date(createdAt).toLocaleString("uk-UA");
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} type="cart">
      <h2 className={styles.title}>Order Details</h2>

      <div className={styles.summary}>
        <p className={styles.total}>
          <strong>Total Price:</strong> {totalAmount} grn
        </p>
        <p className={styles.date}>
          <strong>Created At:</strong> {new Date(createdAtKiev).toLocaleString()}
        </p>
      </div>

      <ul className={styles.list}>
        {order?.map((item) => {
          const { productId, quantity } = item;
          return (
            <li key={productId?._id} className={styles.item}>
              <img
                src={productId.thumb || "/assets/img/default.png"}
                alt={productId.name}
                className={styles.image}
              />
              <div className={styles.info}>
                <h3 className={styles.name}>{productId.name}</h3>
                <p className={styles.desc}>{productId.description}</p>
                <p className={styles.price}>
                  Price: {productId.price} grn × {quantity} = {productId.price * quantity} grn
                </p>
                <p className={styles.season}>Bloom Season: {productId.bloomSeason}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </BaseModal>
  );
}