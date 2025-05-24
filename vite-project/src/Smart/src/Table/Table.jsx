import React, { useState, useEffect } from 'react';
import styles from '../Table/table.module.css'
import logo from './7a6898f73cd7a6aace48d3358810b49b-removebg-preview.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import  {jwtDecode}  from 'jwt-decode';
import Cookies from 'js-cookie';
axios.defaults.withCredentials = true;


function Table() {
  
  const [rows, setRows] = useState([{}]); 
  const addRow = () => {
    setRows([...rows, {}]); 
  };

  const token = Cookies.get('token');
  useEffect(() => {
    if(!token){
      navigate('/notfound');
    };
  })
  


  const calculateExpense = (row) => {
      const { startup, food, trCom, clothes, shoes } = row;
      return (
        parseFloat(food || 0)    +
        parseFloat(trCom || 0)  +
        parseFloat(clothes || 0) +
        parseFloat(shoes || 0) 
      ).toFixed(2);
    };

  
  const calculateSavings = (row) => {
      const totalExpense = calculateExpense(row);
      const startup = parseFloat(row.startup || 0);
      return (startup - parseFloat(totalExpense)).toFixed(2);
    };

  
const calculateRate = (row) => {
    const totalExpense = calculateExpense(row);
    const savings = calculateSavings(row);
    return totalExpense === '0.00' ? '0%' : ((savings / totalExpense) * 100).toFixed(2) + '%';
  };


  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRows = [...rows];
    updatedRows[index][name] = value;
  
    
    const tExpense = calculateExpense(updatedRows[index]);
    const savings = calculateSavings(updatedRows[index]);
    const rate = calculateRate(updatedRows[index]);
  
    
    updatedRows[index].tExpense = tExpense;
    updatedRows[index].Savings = savings;
    updatedRows[index].rate = rate;
  
    setRows(updatedRows);
  };


const deleteRow  = (index) => {
  const updatedRows  = [...rows];
  updatedRows.splice(index, 1);
  setRows(updatedRows);
}


const navigate = useNavigate();

const submitRow = async(index) => {
  const row = rows[index];
  
  try {
    
    if(!token){
      toast.error('Token not found, please log in');
      return;
    }

    const decodedToken = jwtDecode(token); 
    const userId = decodedToken?.userId;

    if (!userId) {
      toast.error("User not authenticated.");
      return;
    }

    const rowWithUserId = {
      ...row,
      userId: userId,
    };

    const res = await axios.post('http://localhost:4000/api/auth/expense', rowWithUserId,
    { 
      withCredentials: true,
    });

    toast.success(res.data.message || 'Expense submitted');
    navigate('/user');
    
  } catch (err) {
    console.error(err);
    toast.error(err.response?.data?.message || 'Failed to submit');
  }
};


return (
  <>
    <ToastContainer />
      <div className={styles.main_container}>
        <img src={logo} alt="logo" className={styles.logo} />
        <h2>Smart Expense Tracker</h2>
        <button className={styles.addnew} onClick={addRow}>Add Record</button>
        <div className={styles.make_dropdown}>
          <h1>Make Budget, <br />Plan for future!!</h1>
          <div className={styles.drop_down}>
            <h4>Save now, Live better!!</h4>
            <ul>
              <li>Onboard multiple institutions</li>
              <li>1000+ concurrent users, load time</li>
              <li>95%+ functional test pass rate</li>
              <li>Positive user feedback from pilot institutions</li>
            </ul>
          </div>
        </div>
      <table border="1" cellSpacing="0" cellPadding="0">
        <thead>
          <tr>
            <th>Date</th>
            <th>Start Up</th>
            <th>Food</th>
            <th>Tr & Com</th>
            <th>Clothes</th>
            <th>Shoes</th>
            <th>T.Expense</th>
            <th>Savings</th>
            <th>Rate(P/L)</th>
            <th>Delete</th>
            <th>Calc</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {['date', 'startup', 'food', 'trCom', 'clothes', 'shoes'].map((field) => (
                <td key={field}>
                  <input
                    type={field === 'date' ? 'date' : 'text'}
                    name={field}
                    value={row[field] || ''}
                    onChange={(e) => handleInputChange(index, e)}
                    placeholder={field !== 'date' ? 'eg: 10,000Frw' : ''}
                    min={field === 'date' ? new Date().toISOString().split("T")[0] : undefined}
                    required
                  />
                </td>
              ))}

              <td>{row.tExpense || '0.00'}</td>  
              <td>{row.Savings || '0.00'}</td>   
              <td>{row.rate || '0.00%'}</td>       

              <td><button className={`${styles.btn} ${styles.btn_delete}`} onClick={() => deleteRow(index)}>Delete</button></td>
              <td><button className={`${styles.btn} ${styles.btn_submit}`} onClick={() => submitRow(index)}>Submit</button></td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
    </>
  );
}

export default Table;
