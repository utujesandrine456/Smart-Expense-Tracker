import React, { useState } from 'react';
import './Login.module.css';
import Logo from '../assets/7a6898f73cd7a6aace48d3358810b49b-removebg-preview.png';
import {Link } from 'react-router-dom';
import { IoHome } from "react-icons/io5";
import styles from './Login.module.css';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';



const Login = () => {

    const [form, setForm] = useState({
        email: '',
        password: '',
        
    });

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value });
    };

    const [agree, setAgree]  =  useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
   
        if(!agree){
            toast.error("You must agree to the terms and conditions.");
            return;
        }

        try{
            const res = await axios.post('http://localhost:4000/api/auth/login',
            {
                email: form.email,
                password: form.password
            },{
                withCredentials: true
            });
            Cookies.set('token', res.data.token, {path: '/'});
            
            toast.success(res.data.message);    
            navigate('/table');  

        } catch (err) {
            if (err.response) {
               toast.error(err.response.data.message || "Login failed");
            } else {
                toast.error("Network or server error");
            }
        }
    }
    
   
    return (
        <>
            <ToastContainer />
            <div className={styles.main_container1}>
                <div className={styles.aside_bar1}>
                    <aside className={styles.login_aside}>
                        <img src={Logo} className='logo' alt="Logo" />
                        <h1>Smart Expense Tracker</h1>
                        <h2>Plan Now, <br></br>Live Better!!</h2>
                    </aside>
                </div>
                <div className={styles.main_content1}>
                    <span><IoHome /></span>
                    <h4><Link to='/' >Go back</Link></h4>
                    <h2>Join Smart Expense Tracker</h2>
                    <p>Simplify the way you manage your money. Login and track every expense effortlessly.</p>
                    <h5 className={styles.login_redirect1}>Don't have an account? <Link to="/signup">signup</Link></h5>
                <div className={styles.account1}>
                    <form onSubmit={handleSubmit}>
                        <input type="email" placeholder='Email Address' name="email" onChange={handleChange} required/>
                        <input type='password' placeholder='Password' name="password" onChange={handleChange} required/>
                        <div className={styles.checkbox_wrapper1}>
                            <input type='checkbox' id="agree" checked={agree} onChange={(e) => setAgree(e.target.checked)}/>
                        </div>
                        <label htmlFor="agree">
                            Do you agree to Smart Expense Tracker’s <span className={styles.check1}>Terms & Conditions, Customer consent</span>
                            <pre> and </pre><span className={styles.check_21}>Privacy Policy.</span>
                        </label>
                        <button type="submit">Submit</button>
                    </form>
                </div>
                </div>
                
            </div>
        </>
    );
};

export default Login;
