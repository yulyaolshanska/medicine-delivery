import React, { useState, useEffect } from "react";
import axios from "axios";
import { DrugStore } from "../../types/DrugStore";
import MedicineCard from "../../components/medicineCard/MedicineCard";
import { Medicine } from "../../types/Medicine";
import styles from "./DrugStoresPage.module.scss";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/CartSlice";

const DrugStoresPage: React.FC = () => {
  const dispatch = useDispatch();
  const [drugStores, setDrugStores] = useState<DrugStore[]>([]);
  const [selectedMedicines, setSelectedMedicines] = useState<Medicine[] | []>(
    []
  );

  const handleAddToCart = (medicine: Medicine) => {
    dispatch(addToCart(medicine));
  };

  useEffect(() => {
    const fetchDrugStores = async () => {
      try {
        const response = await axios.get(
          "https://medicine-delivery-backend.vercel.app/api/drugStores"
          // "http://localhost:5001/api/drugStores"
        );
        setDrugStores(response.data);
      } catch (error) {
        console.error("Error fetching drug stores:", error);
      }
    };

    fetchDrugStores();
  }, []);

  const handleStoreClick = async (storeId: string) => {
    try {
      const response = await axios.get(
        `https://medicine-delivery-backend.vercel.app/api/drugStores/${storeId}/medicines`
        // `http://localhost:5001/api/drugStores/${storeId}/medicines`
      );
      setSelectedMedicines(response.data.data.result);
    } catch (error) {
      console.error("Error fetching medicines for drug store:", error);
    }
  };

  return (
    <div>
      <h1>Drug Stores</h1>
      {drugStores.map((store) => (
        <div key={store._id} onClick={() => handleStoreClick(store._id)}>
          <h2>{store.name}</h2>
        </div>
      ))}

      <ul className={styles.medicineList}>
        {selectedMedicines.map((medicine) => (
          <MedicineCard
            medicine={medicine}
            onAddToCart={() => handleAddToCart(medicine)}
          />
        ))}
      </ul>
    </div>
  );
};

export default DrugStoresPage;
