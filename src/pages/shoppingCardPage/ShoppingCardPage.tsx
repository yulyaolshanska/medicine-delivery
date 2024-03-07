import React from "react";
import ShoppingForm from "../../components/shoppingForm/ShoppingForm";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ShoppingCard from "../../components/shoppingCard/ShoppingCard";
import styles from "./ShoppingCardPage.module.scss";

const ShoppingCartPage: React.FC = () => {
  const cartMedicines = useSelector((state: RootState) => state.cart.medicines);

  const handleSubmitOrder = async () => {
    try {
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  const getTotalPrice = () => {
    return cartMedicines.reduce(
      (total, { price, quantity }) => total + price * quantity,
      0
    );
  };

  return (
    <div className={styles.pageContainer}>
      <ShoppingForm handleSubmitOrder={handleSubmitOrder} />
      <div>
        <ul className={styles.medicineList}>
          {cartMedicines.map((medicine) => (
            <ShoppingCard medicine={medicine} />
          ))}
        </ul>
        <p className={styles.totalPrice}> Total price: {getTotalPrice()} </p>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
