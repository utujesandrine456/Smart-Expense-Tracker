import React from 'react'
import './Home.css';
import Logo from '../assets/7a6898f73cd7a6aace48d3358810b49b-removebg-preview.png'
import {cards, work_cards, user_card} from '../assets/assets.jsx';
import {Link} from 'react-router-dom';
import Footer from '../Footer/Footer.jsx';

const Home = () => {
  return (
    <>
      <div className="main-container">
            <div className="main-navbar">
                <img src={Logo} className='logo'></img>
                <h1>Smart Expense Tracker</h1>
                <nav>
                    <div className='nav-links'>
                      <a href="#">Home</a>
                      <a href="#">About</a> 
                      <a href="#">Features</a>
                      <a href="#">Contact</a>  
                    </div>
                    <button className='login-button'><Link to="/login">Login</Link></button>
                    <button className='signup-button'><Link to="/signup">Sign Up</Link></button>
                </nav>
                <h2>Plan Smarter, Live Better</h2>
                <p>Smart Expense Tracker empowers you to take charge of your financial life with clarity <br></br> and confidence. With intuitive tools and insightful reports, you can make informed <br></br>decisions every step of the way.</p>
                <button className='free-button'><Link to="/signup">Start Free Trial</Link></button>
            </div>
            <div className='core-features'>
              <h2>Core Features</h2>
              <p className='main-p'>What makes Smart Expense Tracker powerful and easy to use.</p>
              <div className='forms'>
                {cards.map((card, index) => (
                  <div key={index} className='feature-card'>
                    <span>{card.icon}</span>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="working-step">
                <h2>How It Works</h2>
                <p className='simple-p'>A simple 3-step process to take control of your finances with ease.</p>
                <div className='work-forms'>
                  {work_cards.map((card, index) =>(
                    <div key={index} className='work-card'>
                        <h3>{card.title}</h3>
                        <p>{card.description}</p>
                    </div>
                  ))}
                </div>
            </div>
            <div className='users'>
              <h2>What Users Say</h2>
              <p className='simple-p'>Discover how our users are transforming their finances with ease and confidence.</p>
              <div className='users-card'>
                {user_card.map((card, index) =>(
                  <div key={index} className='user-card'>
                      <img src={card.image} />
                      <h3>{card.name}</h3>
                      <p>{card.description}</p>
                  </div>
                ))}
              </div>
            </div>
        </div>
        <Footer />
    </>
  );
};

export default Home;