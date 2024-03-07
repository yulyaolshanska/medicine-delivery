import { useEffect, useState } from "react";
import { DrugStore } from "../../types/DrugStore";
import styles from "./ShopList.module.scss";

interface ShopListProps {
  drugStores: DrugStore[];
  handleStoreClick: (id: string) => void;
}

const ShopList: React.FC<ShopListProps> = ({
  drugStores,
  handleStoreClick,
}) => {
  const [activeShopId, setActiveShopId] = useState<string | null>(null);

  useEffect(() => {
    if (drugStores.length > 0) {
      setActiveShopId(drugStores[0]._id);
    }
  }, [drugStores]);

  const handleClick = (id: string) => {
    handleStoreClick(id);
    setActiveShopId(id);
  };

  return (
    <div className={styles.shopContainer}>
      <h1 className={styles.title}>Drug Stores:</h1>
      <ul className={styles.shopList}>
        {drugStores.map((store) => (
          <li
            className={`${styles.shopItem} ${
              activeShopId === store._id ? styles.activeShop : ""
            }`}
            key={store._id}
            onClick={() => handleClick(store._id)}
          >
            <p className={styles.shopName}>{store.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShopList;
