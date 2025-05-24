import React from 'react'
import './Footer.css';
import Logo from '../assets/7a6898f73cd7a6aace48d3358810b49b-removebg-preview.png'

const Footer = () => {
  return (
    <>
        <div className='footer'>
            <img src={Logo} className='logo'></img>
            <h1>Smart Expense Tracker</h1>
            <footer>
                <div class="footer-container">
                    <div class="footer-section">
                        <h4>About Us</h4>
                        <p className='footer-p'>We help you manage your money<br></br> smarter with easy-to-use tools<br></br></p>
                    </div>
                    <div class="footer-section">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Features</a></li>
                            <li><a href="#">How It Works</a></li>
                            <li><a href="#">Testimonials</a></li>
                        </ul>
                    </div>
                    <div class="footer-section1">
                        <h4>Contact</h4>
                        <p>Email: support@yourapp.com</p>
                        <p>Phone: +123 456 7890</p>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2025 Smart Expense Tracker. All rights reserved.</p>
                </div>
            </footer>
        </div>
    </>
  );
}

export default Footer;
