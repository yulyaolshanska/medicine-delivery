import { useForm } from "react-hook-form";
import { BASE_URL } from "../../constants/other";
import { emailRegexp, nameRegexp } from "../../constants/validation";
import { resetOrder } from "../../redux/CartSlice";
import { useAppDispatch } from "../../redux/store";
import { CartItem } from "../../types/cartItem";
import { FormData } from "../../types/formData";
import styles from "./ShoppingForm.module.scss";

interface ShoppingFormProps {
  cartProducts: CartItem[];
}

const ShoppingForm: React.FC<ShoppingFormProps> = ({ cartProducts }) => {
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, touchedFields },
  } = useForm<FormData>({
    mode: "onChange",
    shouldUnregister: true,
  });

  const handleSendOrder = async (formData: any) => {
    try {
      const res = await fetch(`${BASE_URL}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          products: cartProducts,
        }),
      });

      if (!res.ok) {
        throw new Error(`Failed to send order: ${res.statusText}`);
      }

      const response = await res.json();

      reset();
      dispatch(resetOrder());

      return response;
    } catch (error) {
      console.error("Error sending order:", error);
      throw error;
    }
  };

  return (
    <>
      <div className={styles.formContainer}>
        <h2 className={styles.formTitle}>Customer Information</h2>
        <form className={styles.form} onSubmit={handleSubmit(handleSendOrder)}>
          <ul>
            <li className={styles.inputContainer}>
              <label className={styles.label} htmlFor="name">
                Name:
              </label>
              <input
                className={`${styles.input} ${
                  errors.name && touchedFields.name ? styles.errorInput : ""
                }`}
                {...register("name", {
                  required: {
                    value: true,
                    message: "Field is required",
                  },

                  pattern: {
                    value: nameRegexp,
                    message: "Enter a valid name",
                  },
                  minLength: {
                    value: 2,
                    message: "Name too short",
                  },
                  maxLength: {
                    value: 30,
                    message: "Name too long",
                  },
                })}
                type="text"
                id="name"
                name="name"
                placeholder="Enter name"
                aria-invalid={errors.name ? "true" : "false"}
              />
              {errors.name && touchedFields.name && (
                <p className={styles.errorMessage}>{errors.name?.message}</p>
              )}
            </li>
            <li className={styles.inputContainer}>
              <label className={styles.label} htmlFor="email">
                Email:
              </label>
              <input
                className={`${styles.input} ${
                  errors.email && touchedFields.email ? styles.errorInput : ""
                }`}
                {...register("email", {
                  required: {
                    value: true,
                    message: "Field is required",
                  },
                  pattern: {
                    value: emailRegexp,
                    message: "Enter valid email address",
                  },
                  minLength: {
                    value: 5,
                    message: "Email too short",
                  },
                  maxLength: {
                    value: 254,
                    message: "Email too long",
                  },
                })}
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && touchedFields.email && (
                <p className={styles.errorMessage}>{errors.email?.message}</p>
              )}
            </li>
            <li className={styles.inputContainer}>
              <label className={styles.label} htmlFor="phone">
                Phone:
              </label>
              <input
                className={`${styles.input} ${
                  errors.email && touchedFields.phone ? styles.errorInput : ""
                }`}
                {...register("phone", {
                  required: {
                    value: true,
                    message: "Field is required",
                  },
                  minLength: {
                    value: 5,
                    message: "Phone number too short",
                  },
                  maxLength: {
                    value: 15,
                    message: "Phone number too long",
                  },
                })}
                type="text"
                id="phone"
                name="phone"
                placeholder="Enter your phone number"
                aria-invalid={errors.phone ? "true" : "false"}
              />
              {errors.phone && touchedFields.phone && (
                <p className={styles.errorMessage}>{errors.phone?.message}</p>
              )}
            </li>
            <li className={styles.inputContainer}>
              <label className={styles.label} htmlFor="email">
                Address:
              </label>
              <input
                className={`${styles.input} ${
                  errors.address && touchedFields.address
                    ? styles.errorInput
                    : ""
                }`}
                {...register("address", {
                  required: {
                    value: true,
                    message: "Field is required",
                  },
                  minLength: {
                    value: 5,
                    message: "Address too short",
                  },
                  maxLength: {
                    value: 254,
                    message: "Address too long",
                  },
                })}
                type="text"
                id="address"
                name="address"
                placeholder="Enter your address"
                aria-invalid={errors.address ? "true" : "false"}
              />
              {errors.address && touchedFields.address && (
                <p className={styles.errorMessage}>{errors.address?.message}</p>
              )}
            </li>
          </ul>

          <button className={styles.submitBtn} type={"submit"}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default ShoppingForm;
