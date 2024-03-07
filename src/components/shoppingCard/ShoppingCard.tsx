import { removeFromCart, updateQuantity } from "../../redux/CartSlice";
import { useAppDispatch } from "../../redux/store";
import { CartItem } from "../../types/cartItem";
import styles from "./ShoppingCard.module.scss";

interface ShoppingCardProps {
  medicine: CartItem;
}

const ShoppingCard: React.FC<ShoppingCardProps> = ({ medicine }) => {
  const dispatch = useAppDispatch();

  const { _id, name, price, picture, quantity } = medicine;

  const handleRemoveFromCart = (medicineId: string) => {
    dispatch(removeFromCart(medicineId));
  };

  const handleIncrement = (medicineId: string) => {
    dispatch(updateQuantity({ id: medicineId, quantity: +1 }));
  };

  const handleDecrement = (medicineId: string) => {
    dispatch(updateQuantity({ id: medicineId, quantity: -1 }));
  };
  return (
    <>
      <li key={_id} className={styles.card}>
        <div className={styles.pictureBox}>
          <img className={styles.picture} src={picture} alt={medicine.name} />
        </div>
        <div className={styles.infoContainer}>
          <div>
            <p className={styles.info}>{name}</p>
            <p className={styles.info}>Price:{price * quantity}</p>
          </div>
          <div className={styles.quantityCounter}>
            <button
              disabled={quantity === 1}
              className={`${styles.quantityBtn} ${
                quantity === 1 ? styles.disabled : ""
              }`}
              onClick={() => handleDecrement(_id)}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              className={styles.quantityBtn}
              onClick={() => handleIncrement(_id)}
            >
              +
            </button>
          </div>
          <button
            className={styles.removeBtn}
            onClick={() => handleRemoveFromCart(_id)}
          >
            X
          </button>
        </div>
      </li>
    </>
  );
};

export default ShoppingCard;
