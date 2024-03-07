import React, { useState, useEffect } from "react";
import axios from "axios";
import { DrugStore } from "../../types/DrugStore";
import MedicineCard from "../../components/medicineCard/MedicineCard";
import { Medicine } from "../../types/Medicine";
import styles from "./DrugStoresPage.module.scss";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/CartSlice";
import ShopList from "../../components/shopList/ShopList";

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
        const firstStoreId = response.data[0]._id;
        const medicineResp = await axios.get(
          `https://medicine-delivery-backend.vercel.app/api/drugStores/${firstStoreId}/medicines`
          // `http://localhost:5001/api/drugStores/${storeId}/medicines`
        );
        setSelectedMedicines(medicineResp.data.data.result);
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
    <div className={styles.pageContainer}>
      <ShopList drugStores={drugStores} handleStoreClick={handleStoreClick} />
      <ul className={styles.medicineList}>
        {selectedMedicines.map((medicine) => (
          <MedicineCard
            key={medicine._id}
            medicine={medicine}
            onAddToCart={() => handleAddToCart(medicine)}
          />
        ))}
      </ul>
    </div>
  );
};

export default DrugStoresPage;
