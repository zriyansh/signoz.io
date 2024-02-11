import React, { useState } from "react";
import styles from "./styles.module.css";

interface ErrorsProps {
  fullName?: string;
  workEmail?: string;
  companyName?: string;
}

export default function SignozCloudSignUpForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    companyName: "",
    dataRegion: "in",
    source: "",
  });

  const [errors, setErrors] = useState<ErrorsProps>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let errors = {};

    if (!formData.fullName.trim()) {
      errors["fullName"] = "Full Name is required";
    }

    if (!formData.workEmail.trim()) {
      errors["workEmail"] = "Work Email is required";
    } else if (!isValidEmail(formData.workEmail)) {
      errors["workEmail"] = "Invalid email format";
    }

    if (!formData.companyName.trim()) {
      errors["companyName"] = "Company Name is required";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const isValidEmail = (email) => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const isFormValid = validateForm();

    if (isFormValid) {
      handleSignUp();
    }
  };

  const handleSignUp = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.example.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({
          fullName: "",
          workEmail: "",
          companyName: "",
          dataRegion: "in",
          source: "",
        });
      } else {
        console.error("Signup failed:", response.statusText);
        // Handle other error cases, like server errors or network issues
      }
    } catch (error) {
      console.error("Signup failed:", error.message);
      // Handle other error cases, like network errors
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.sigNozCloudSignUpForm}>
      <div className={styles.header}>
        <h2> Get started with SigNoz </h2>
        <h4>
          {" "}
          Try SigNoz free for 30 days with full access to all features{" "}
        </h4>{" "}
        <h5> No credit card required</h5>{" "}
      </div>
      <div className="mb-5">
        <label
          htmlFor="fullName"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Full Name*
        </label>
        <input
          type="text"
          disabled={isSubmitting}
          id="fullName"
          name="fullName"
          className={`bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-sm block w-full p-2.5 ${
            errors?.fullName ? styles.hasError : ""
          }`}
          placeholder="name@flowbite.com"
          onChange={handleInputChange}
          required
        />

        {errors?.fullName && (
          <span className="text-sm text-red-400">{errors.fullName}</span>
        )}
      </div>
      <div className="mb-5">
        <label
          htmlFor="workEmail"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Work Email*
        </label>
        <input
          type="email"
          disabled={isSubmitting}
          id="workEmail"
          name="workEmail"
          className={`bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-sm block w-full p-2.5 ${
            errors?.fullName ? styles.hasError : ""
          }`}
          onChange={handleInputChange}
          required
        />

        {errors?.workEmail && (
          <span className="text-sm text-red-400">{errors.workEmail}</span>
        )}
      </div>

      <div className="mb-5">
        <label
          //   htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Company Name*
        </label>
        <input
          type="text"
          id="companyName"
          disabled={isSubmitting}
          name="companyName"
          className={`bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-sm block w-full p-2.5 ${
            errors?.fullName ? styles.hasError : ""
          }`}
          onChange={handleInputChange}
          required
        />

        {errors?.companyName && (
          <span className="text-sm text-red-400">{errors.companyName}</span>
        )}
      </div>

      <div className="mb-5">
        <label
          htmlFor="dataRegion"
          className="block mb-2 text-sm font-medium text-gray-900 "
        >
          Data Region*
        </label>
        <select
          id="dataRegion"
          name="dataRegion"
          disabled={isSubmitting}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm block w-full p-2.5"
          onChange={handleInputChange}
        >
          <option value="in" className={styles.dataRegionOption}>
            India
          </option>
          <option value="us" className={styles.dataRegionOption}>
            United States
          </option>
          <option value="eu" className={styles.dataRegionOption}>
            Europe
          </option>
        </select>
      </div>

      <div className="mb-5">
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Where did you hear about us?
        </label>
        <textarea
          id="source"
          name="source"
          disabled={isSubmitting}
          rows={4}
          className={`block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-sm border border-gray-300 ${styles.source}`}
          onChange={handleInputChange}
        ></textarea>
      </div>

      <button
        className={`h-10 border-none outline-none text-sm rounded-none bg-primary-400 hover:bg-primary-500 cursor-pointer w-4/12 ${styles.getStartedBtn}`}
        disabled={isSubmitting}
        onClick={handleSubmit}
      >
        Get Started
      </button>
    </form>
  );
}
