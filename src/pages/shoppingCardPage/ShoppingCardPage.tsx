import React, { useState } from "react";
import axios from "axios";
import { Medicine } from "../../types/Medicine";
import ShoppingForm from "../../components/shoppingForm/ShoppingForm";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity } from "../../redux/CartSlice";
import { RootState } from "../../redux/store";
import styles from "./ShoppingCardPage.module.scss";

const ShoppingCartPage: React.FC = () => {
  const dispatch = useDispatch();
  const cartMedicines = useSelector((state: RootState) => state.cart.medicines);
  console.log("cartMedicines", cartMedicines);
  const handleRemoveFromCart = (medicineId: string) => {
    dispatch(removeFromCart(medicineId));
  };
  const [cart, setCart] = useState<Medicine[]>([]);

  const handleSubmitOrder = async () => {
    try {
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  const handleIncrement = (medicineId: string) => {
    dispatch(updateQuantity({ id: medicineId, quantity: +1 }));
  };

  const handleDecrement = (medicineId: string) => {
    dispatch(updateQuantity({ id: medicineId, quantity: -1 }));
  };

  const getTotalPrice = () => {
    return cartMedicines.reduce(
      (total, { price, quantity }) => total + price * quantity,
      0
    );
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <h2>Customer Information</h2>

      <ShoppingForm handleSubmitOrder={handleSubmitOrder} />
      <ul>
        {cartMedicines.map(({ _id, name, price, picture, quantity }) => {
          return (
            <>
              <li key={_id} className={styles.card}>
                <div className={styles.pictureBox}>
                  <img
                    className={styles.picture}
                    src={picture}
                    alt={`Picture of ${name}`}
                  />
                </div>
                <p>{name}</p>
                <p>price:{price * quantity}</p>
                <div>
                  <button onClick={() => handleDecrement(_id)}>-</button>
                  <span>{quantity}</span>
                  <button onClick={() => handleIncrement(_id)}>+</button>
                </div>
                <button onClick={() => handleRemoveFromCart(_id)}>
                  Remove
                </button>
              </li>
            </>
          );
        })}
        <p> Total price: {getTotalPrice()} </p>
      </ul>
    </div>
  );
};

export default ShoppingCartPage;
