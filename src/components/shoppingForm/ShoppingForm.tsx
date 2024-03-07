import { useForm } from "react-hook-form";
import { emailRegexp, nameRegexp } from "../../constants/validation";
import styles from "./ShoppingForm.module.scss";

interface ShoppingFormProps {
  handleSubmitOrder: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

const ShoppingForm: React.FC<ShoppingFormProps> = ({ handleSubmitOrder }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { isValid, errors, touchedFields },
  } = useForm<FormData>({
    mode: "onChange",
    shouldUnregister: true,
  });

  const handleSendOrder = async (formData: FormData) => {
    // try {
    //     const resp = await FetchService.fetchAddMember(formData);
    //     if (!resp?.ok) {
    //         setIsServerError(true);
    //         setShowModal(true);
    //         const errorMessage = await resp?.text();
    //         throw new Error(errorMessage);
    //     }
    //     setIsServerError(false);
    //     setShowModal(true);
    //     reset();
    // } catch (error) {
    //     console.log('Something went wrong, please try again');
    // }
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

//     <form>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Phone Number"
//         value={phoneNumber}
//         onChange={(e) => setPhoneNumber(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Address"
//         value={address}
//         onChange={(e) => setAddress(e.target.value)}
//       />
//       <button type="submit" onClick={handleSubmitOrder}>
//         Submit Order
//       </button>
//     </form>
//   );
// };

export default ShoppingForm;
