import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Medicine } from "../../types/Medicine";
import styles from "./MedicineCard.module.scss";

interface MedicineCardProps {
  medicine: Medicine;
  onAddToCart: (medicine: Medicine) => void;
}

const MedicineCard: React.FC<MedicineCardProps> = ({
  medicine,
  onAddToCart,
}) => {
  const cartMedicines = useSelector((state: RootState) => state.cart.medicines);
  const isAddedToCart = cartMedicines.some((item) => item._id === medicine._id);

  const handleAddToCart = () => {
    onAddToCart(medicine);
  };

  return (
    <li className={styles.cardItem}>
      <div className={styles.pictureBox}>
        <img
          className={styles.picture}
          src={medicine.picture}
          alt={medicine.name}
        />
      </div>
      <p className={styles.info}>{medicine.name}</p>
      <p className={styles.info}>${medicine.price.toFixed(2)}</p>
      <button className={styles.addBtn} onClick={handleAddToCart}>
        {isAddedToCart ? "Added" : "Add to Cart"}
      </button>
    </li>
  );
};

export default MedicineCard;
