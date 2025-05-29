import React, {useEffect, useState} from 'react';
import { FaMoneyBillWave, FaArrowUp, FaArrowDown, FaPiggyBank, FaPercent } from 'react-icons/fa';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import './user.css'; 
import logo_dashboard from '../assets/7a6898f73cd7a6aace48d3358810b49b-removebg-preview.png'
import { IoMdArrowRoundBack } from "react-icons/io";
import { FiLogOut } from "react-icons/fi";
import { useNavigate, Link } from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import Cookies from 'js-cookie';



const Dashboard = () => {
    const [showHistory, setShowHistory] = useState(false);
    const [dashboardData, setDashboardData] = useState('');
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    
    useEffect(() => {
      const token = Cookies.get('token');

      if(!token){
        toast.error("Not authenticated");
        navigate('/signup');
        return;
      }

      const fetchUsername = async () => {
        try{
          const res = await fetch('http://localhost:4000/api/auth/username', {
            method: 'GET',
            credentials: 'include',
          });

          const data = await res.json();
          console.log(data);
          
          if(res.ok){
            setUsername(data.fullName);
          }else{
            toast.error( data.message || "Failed to fetch username");
          }
        }catch(err){
          toast.error("Error fetching username");
        }
      };

      fetchUsername();
  },[]);


    
    useEffect(() => {
      const token = Cookies.get('token');

      if (!token) {
        toast.error("Not authenticated");
        setLoading(false);
        return;
      }

      fetch('http://localhost:4000/api/auth/appExpense', { 
        method: 'GET', 
        credentials: 'include',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => {
        if (!res.ok) throw new Error(`Status ${res.status}`);
        return res.json();
      })
      .then(data => {
        setDashboardData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching dashboard data', err);
        toast.error('Failed to fetch data');
        setLoading(false);
      });
    }, []);

    if (loading) {
      return <div className='dashboard-container'>Loading data...</div>;
    }

    if (!dashboardData) {
      return <div className='dashboard-container'>No user data to display</div>;
    }

    
    const handlelogout = async() => {
      try{
        Cookies.remove('token');
        
        const response = await fetch('http://localhost:4000/api/auth/logout', {
          method: 'POST',
          credentials: 'include',
        });

        const data = await response.json();
        if(response.ok){
          console.log(data.message);
          navigate('/');
         
        }else{
          console.error('Failed to logout');
        } 
      }catch(error){
        console.error("Logout error:", error);
      }
    };


  if(dashboardData === null){
    return <div className='dashboard-container'>No user data to display</div>;
  }

 
  const {income = 0, expenses = 0, savings = 0, rate = 0, food   = 0, trCom  = 0, clothes= 0, shoes = 0 } = dashboardData;
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  const pieData = [
    { name: 'Food',      value: food   || 0 },
    { name: 'Transport', value: trCom  || 0 },
    { name: 'Clothes',   value: clothes|| 0 },
    { name: 'Shoes',     value: shoes  || 0 },
  ];


  if(dashboardData === null){
    return <div>Loading data...</div>;
  }


  const trendData = [
    { name: 'Mon', expense: 30 },
    { name: 'Tue', expense: 40 },
    { name: 'Wed', expense: 38 },
    { name: 'Thu', expense: 50 },
    { name: 'Fri', expense: 60 },
    { name: 'Sat', expense: 65 },
    { name: 'Sun', expense: 70 },
  ];


  const latestExpenses = [
    { date: '2025-04-25', category: 'Food', total: 45, savings: 15, rate: '25%' },
    { date: '2025-04-24', category: 'Transport', total: 32.5, savings: 7.5, rate: '18%' },
    { date: '2025-04-23', category: 'Clothes', total: 120, savings: -20, rate: '-15%' },
  ];


return (
    <>
      <ToastContainer />
      <div className="dashboard-container">
        <div className='aside_navbar'>
            <img src={logo_dashboard} alt='food' />
            <h1>Smart Expense</h1>
            <div className='links'>
                <a href='#' onClick={() => setShowHistory(false)} className={!showHistory ? 'active' : ''}>Dashboard</a>
                <a href='#' onClick={() => setShowHistory(true)} className={showHistory ? 'active' : ''}>History</a>
                <a href='#'>Trends</a>
                <a href='#'>Settings</a>
            </div>
        </div>

        <div className={`main-content ${showHistory ? 'blurred' : ''}`}>
          
          <div className="top-nav">
            <h1 className="welcome-text">Welcome back, {username || 'User'}!</h1>
            <div className="nav-buttons">
              <button className="btn btn-back"><IoMdArrowRoundBack style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '7px',
                    position: 'relative',
                    top: '2px' }} /> <Link to='/table' style={{textDecoration: 'none', color:'white'}}>Back</Link> </button>
              <button className="btn btn-logout" onClick={handlelogout}>Logout <FiLogOut  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: '5px',
                    position: 'relative',
                    top: '2px'}}/></button>
            </div>
          </div>
    
         
          <div className="cards-container">
            <Card icon={<FaMoneyBillWave size={25} color={'#578808'} />} title="Total Income" amount={`$${income.toLocaleString()}`} change="+12%" className='card' />
            <Card icon={<FaArrowDown size={25} color={'#578808'} />} title="Total Expenses" amount={`$${expenses.toLocaleString()}`} change="-8%"  className='card'/>
            <Card icon={<FaPiggyBank size={25} color={'#578808'} />} title="Savings" amount={`$${savings.toLocaleString()}`} change="+23%" className='card'/>
            <Card icon={<FaPercent size={25} color={'#578808'} />} title="Profit Rate" amount={`${rate}%`} change="+5%" className='card'/>
          </div>
    
          
          <div className="charts-container">
            
            <div className="chart-container">
              <h2 className="chart-title">Expenses Breakdown</h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    dataKey="value"
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
    
            
            <div className="chart-container">
              <h2 className="chart-title">Expense Trends</h2>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="expense" stroke="#3498db" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
  
        
        {showHistory && (
          <div className="table-container">
            <div className="table-header">
              <button onClick={() => setShowHistory(false)} className='btn-close'>Close</button>
              <h2 className="table-title">Latest Expenses</h2>
              <div className="filter-options">
                <select className="filter-select">
                  <option>All Categories</option>
                </select>
                <input type="date" className="filter-input" />
              </div>
            </div>
            <table className="expense-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Category</th>
                  <th>Total Expense</th>
                  <th>Savings</th>
                  <th>Rate</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {latestExpenses.map((exp, index) => (
                  <tr key={index}>
                    <td>{exp.date}</td>
                    <td>{exp.category}</td>
                    <td>${exp.total}</td>
                    <td className={exp.savings >= 0 ? 'positive' : 'negative'}>${exp.savings}</td>
                    <td>{exp.rate}</td>
                    <td className="view-details">View Details</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
      </div>
    
    </>
  );
};

const Card = ({ icon, title, amount, change, down }) => (
  <div className="card">
    <div className="card-icon">{icon}</div>
    <div className="card-content">
      <h3 className="card-title">{title}</h3>
      <p className="card-amount">{amount}</p>
      <p className={`card-change ${down ? 'negative' : 'positive'}`}>{change} vs last month</p>
    </div>
  </div>
);

export default Dashboard;



