import React, { useState, useEffect } from "react";
import styles from "./form.module.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import logo from '../assets/7a6898f73cd7a6aace48d3358810b49b-removebg-preview.png';


axios.defaults.withCredentials = true;

const StyledForm = () => {
  const [formData, setFormData] = useState({
    date: "",
    startup: "",
    food: "",
    trCom: "",
    clothes: "",
    shoes: "",
    tExpense: "0.00",
    Savings: "0.00",
    rate: "0.00%",
  });

  const navigate = useNavigate();
  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) {
      navigate("/notfound");
    }
  }, [token, navigate]);

  const calculateExpense = (data) => {
    const { food, trCom, clothes, shoes } = data;
    return (
      parseFloat(food || 0) +
      parseFloat(trCom || 0) +
      parseFloat(clothes || 0) +
      parseFloat(shoes || 0)
    ).toFixed(2);
  };

  const calculateSavings = (data) => {
    const totalExpense = calculateExpense(data);
    const startup = parseFloat(data.startup || 0);
    return (startup - parseFloat(totalExpense)).toFixed(2);
  };

  const calculateRate = (data) => {
    const totalExpense = calculateExpense(data);
    const savings = calculateSavings(data);
    return totalExpense === "0.00"
      ? "0%"
      : ((savings / totalExpense) * 100).toFixed(2) + "%";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    updatedData.tExpense = calculateExpense(updatedData);
    updatedData.Savings = calculateSavings(updatedData);
    updatedData.rate = calculateRate(updatedData);
    setFormData(updatedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!token) {
        toast.error("Token not found, please log in");
        return;
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken?.userId;

      if (!userId) {
        toast.error("User not authenticated.");
        return;
      }

      const formWithUserId = {
        ...formData,
        userId,
      };

      const res = await axios.post(
        "http://localhost:4000/api/auth/expense",
        formWithUserId
      );

      toast.success(res.data.message || "Expense submitted");
      navigate("/user");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to submit");
    }
  };

  return (
    <div className={styles.main_container}>
      <ToastContainer />
      <div className={styles.svg_container}>
        <svg viewBox="0 0 500 150" preserveAspectRatio="none">
          <path
            d="M0.00,49.98 C150.00,150.00 349.38,-49.98 500.00,49.98 L500.00,0.00 L0.00,0.00 Z"
            style={{ stroke: "none", fill: "#577F26" }}
          />
        </svg>
      </div>
      <img src={logo} alt="logo" className={styles.logo} />

      <h2>Smart Expense Tracker</h2>
      <h1 className={styles.form_heading}><u>Budget Planning Form</u></h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.form_grid}>
          <div>
            <label className={styles.right}>Date:</label>
            <input type="date" name="date" value={formData.date} min={ 'date' ? new Date().toISOString().split("T")[0] : undefined} onChange={handleChange} required />
          </div>
          <div>
            <label className={styles.left}>Startup:</label>
            <input type="text" name="startup" value={formData.startup} onChange={handleChange} />
          </div>
          <div>
            <label className={styles.right}>Food:</label>
            <input type="text" name="food" value={formData.food} onChange={handleChange} />
          </div>
          <div>
            <label className={styles.left}>Transport:</label>
            <input type="text" name="trCom" value={formData.trCom} onChange={handleChange} />
          </div>
          <div>
            <label className={styles.right}>Clothes:</label>
            <input type="text" name="clothes" value={formData.clothes} onChange={handleChange} />
          </div>
          <div>
            <label className={styles.left}>Shoes:</label>
            <input type="text" name="shoes" value={formData.shoes} onChange={handleChange} />
          </div>
          <div>
            <label className={styles.right}>Total Expense:</label>
            <input type="text" value={formData.tExpense} readOnly />
          </div>
          <div>
            <label className={styles.left}>Savings:</label>
            <input type="text" value={formData.Savings} readOnly />
          </div>
          <div>
            <label className={styles.main}>Rate (P/L):</label>
            <input type="text" value={formData.rate} readOnly />
          </div>
        </div>

        <div className={styles.submit_container}>
          <button type="submit" className={`${styles.btn} ${styles.btn_submit}`}>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default StyledForm;
