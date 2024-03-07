import { Link } from "react-router-dom";
import cross from "../../images/icons/x.svg";
import styles from "./FormModal.module.scss";

interface FormModalProps {
  onClick: () => void;
  isError: boolean;
}

const FormModal: React.FC<FormModalProps> = ({ onClick, isError }) => {
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClick();
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <div className={styles.closeIcon}>
          <button onClick={onClick}>
            <img src={cross} alt="Close" />
          </button>
        </div>
        <h3 className={styles.modalTitle}>
          {isError
            ? "Something went wrong, please try again"
            : "Your order was sent successfully"}
        </h3>
        {!isError && <Link className={styles.backBtn} to="/">Back to Shop</Link>}
      </div>
    </div>
  );
};

export default FormModal;
