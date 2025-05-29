import React from 'react';
import { FaMoneyBillWave } from "react-icons/fa6";
import { FaChartSimple } from "react-icons/fa6";
import { MdOutlineSecurity } from "react-icons/md";
import image1 from './9238b663532349d8287c9a798aa7b828.jpg';
import image2 from './sandrine.jpg';
import image3 from './63ff363f77d251fcedb79348671563ae.jpg'


export const cards = [
    {
        icon: <FaMoneyBillWave />,
        title: "Track Expenses Easily" ,
        description: "Stay on top of where your money goes with real-time tracking." ,
    },
    {
        icon: <FaChartSimple />,
        title: "Visual Budget Insights" ,
        description: "Understand your spending habits through clear, interactive charts." ,
    },
    {
        icon: <MdOutlineSecurity />,
        title: "Secure & User-Friendly" ,
        description: "Your data is safe, and the app is designed for a smooth, intuitive." ,
    }
];

export const work_cards =[
    {
        title: "Sign Up & Set Your Budget",
        description: "Create an account and enter your monthly income and spending goals to get started.",
    },
    {
        title: "Track Every Expense",
        description: "Log daily expenses easily and categorize them for better insights and budgeting.",
    },
    {
        title: "Get Smart Insights",
        description: "Visual reports help you understand spending patterns and suggest smarter financial moves.",
    }
];

export const user_card = [
    {
        image: image1,
        name:"— Daniel, 27",
        description:"Using this app has completely changed how I manage my money—everything is so simple and clear!",
    },
    {
        image: image2,
        name:"— Amara, 34",
        description:"I love the visual breakdowns of my spending. It helps me stay in control without stress.",
    },
    {
        image: image3,
        name:"— Kwame, 30",
        description:"The security and ease of use make this app stand out. I finally feel confident about my finances.",
    }
];
