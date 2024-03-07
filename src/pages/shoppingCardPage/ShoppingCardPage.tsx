import React from "react";
import ShoppingForm from "../../components/shoppingForm/ShoppingForm";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ShoppingCard from "../../components/shoppingCard/ShoppingCard";
import styles from "./ShoppingCardPage.module.scss";

const ShoppingCartPage: React.FC = () => {
  const cartMedicines = useSelector((state: RootState) => state.cart.medicines);

  const getTotalPrice = () => {
    return cartMedicines.reduce(
      (total, { price, quantity }) => total + price * quantity,
      0
    );
  };

  return (
    <div className={styles.pageContainer}>
      <ShoppingForm cartProducts={cartMedicines} />
      <div>
        <ul className={styles.medicineList}>
          {cartMedicines.map((medicine) => (
            <ShoppingCard key={medicine._id} medicine={medicine} />
          ))}
        </ul>
        <p className={styles.totalPrice}> Total price: {getTotalPrice()} </p>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
