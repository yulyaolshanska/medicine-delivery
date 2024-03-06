import React from "react";
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
  const handleAddToCart = () => {
    onAddToCart(medicine);
  };

  return (
    <li className={styles.cardItem}>
      <div className={styles.pictureBox}>
        <img
          className={styles.picture}
          src={medicine.picture}
          alt={`Picture of ${medicine.name}`}
        />
      </div>
      <p>Name: {medicine.name}</p>
      <p>Price: ${medicine.price.toFixed(2)}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </li>
  );
};

export default MedicineCard;
