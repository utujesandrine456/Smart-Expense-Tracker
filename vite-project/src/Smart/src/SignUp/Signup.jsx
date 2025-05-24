import React, { useState } from 'react';
import styles from './signup.module.css'
import './signup.module.css';
import Logo from '../assets/7a6898f73cd7a6aace48d3358810b49b-removebg-preview.png';
import { TiTickOutline } from "react-icons/ti";
import { IoHome } from "react-icons/io5";
import { Link } from 'react-router-dom';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import { useNavigate } from 'react-router-dom';



const Signup = () => {

    const [form, setForm] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value });
    };

    const [agree, setAgree]  =  useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
   
        if(form.password !== form.confirmPassword){
            toast.error("Password do not match!!")
            return;
        }

        if(!agree){
            toast.error("You must agree to the terms and conditions.");
            return;
        }
   
        try{
            const res = await axios.post('http://localhost:4000/api/auth/signup', {
                fullName: form.fullName,
                email: form.email,
                password: form.password,
                confirmPassword: form.confirmPassword
            });

            if(res.data && res.data.token){
                toast.success(res.data.message);
                navigate('/email')
            }
        } catch (err) {
            if (err.response) {

                if(err.response.data.message === "Email is already registered!"){
                    toast.error("Email is already registered!");
                }
                else{
                    toast.error(err.response.data.message || "Sign up failed");
                }
            } else {
                toast.error("Network or server error");
            }
        }
    }
    
    
    return (
        <>
            <ToastContainer />
            <div className={styles.main_container}>
                <div className={styles.aside_bar}>
                    <aside className={styles.signup_aside}>
                        <img src={Logo} className='logo' alt="Logo" />
                        <h1>Smart Expense Tracker</h1>
                        <h2>Take Control of Your Finances Today!</h2>
                        <p><i>Sign up and let Smart Expense Tracker <br />simplify your spending — so you can <br />focus on what matters.</i></p>
                        <div className={styles.small_form}>
                            <span><TiTickOutline /></span>
                            <h4>Secure and Reliable banking platform</h4>
                            <span><TiTickOutline /></span>
                            <h4>Real-time transaction monitoring</h4>
                            <span><TiTickOutline /></span>
                            <h4>24/7 customer support</h4>
                        </div>
                    </aside>
                </div>
                <div className={styles.main_content}>
                    <span><IoHome /></span>
                    <h4><Link to='/' >Go back</Link></h4>
                    <h2>Join Smart Expense Tracker</h2>
                    <p>Simplify the way you manage your money. Create your free account and track every expense effortlessly.</p>
                    <h5 className={styles.login_redirect}>Already have an account? <Link to="/login">Login</Link></h5>
                    <div className={styles.account}>
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder='Full Name' name="fullName" onChange={handleChange} required/>
                            <input type="email" placeholder='Email Address' name="email" onChange={handleChange} required/>
                            <input type='password' placeholder='Password' name="password" onChange={handleChange} required/>
                            <input type='password' placeholder='Confirm Password' name="confirmPassword" onChange={handleChange} required/>
                            <div className={styles.checkbox_wrapper}>
                                <input type='checkbox' id="agree" checked={agree} onChange={(e) => setAgree(e.target.checked)}/>
                            </div>
                            <label htmlFor="agree">
                                Do you agree to Smart Expense Tracker’s <span className={styles.check}>Terms & Conditions, Customer consent</span>
                                <pre> and </pre><span className={styles.check_2}>Privacy Policy.</span>
                            </label>
                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;
