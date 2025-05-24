import React, {useState, useEffect, useRef} from 'react';
import { MdEmail } from "react-icons/md";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import { IoTimer } from "react-icons/io5";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import sandrine from '../assets/sandrine.jpg';





const VerifyEmail = () => {
    const [timeLeft, setTimeleft] = useState(15);
    
    const navigate = useNavigate();

    const inputsRef = useRef([]);

    useEffect(() => {
        if (timeLeft === 0) {
            toast.error('Verification code expired. Please request a new code.');
            return;
        }

        const timerId = setInterval(() => {
            setTimeleft(prev => {
                if(prev <= 1){
                    clearInterval(timerId);
                return 0;
                }
                return prev -1;
            });
        }, 1000);

        return () => clearInterval(timerId);

    }, []);


    const handleChange = (e, index) => {
            const value = e.target.value;

            if (value.length === 1 && index < inputsRef.current.length - 1) {
                inputsRef.current[index + 1].focus();
            }
    }

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
          inputsRef.current[index - 1].focus();
        }
    };


    const handleResendCode = () => {
        setTimeleft(15);
        toast.info('A new verification code has been sent.')
    }
    

    const handleSubmit = async() => {
        try{
            const res = await axios.post('http://localhost:4000/api/auth/register');

            if(res){
                toast.success("Your are now eliglible to Dashboard!!");
                navigate('/table');
            }
        }catch(error){
            if(error.response){
                toast.error( error.response.data.message);
            }
        }
    }



    return(

        <>
            <ToastContainer />
            <div className='flex flex-col w-full h-full text-center px-[80px] bg-[#f3e7d9] ' >
                <div className='flex flex-col '>
                    <img src={sandrine} alt="logo" className='w-[90px] h-[70px] m-[40px] mt-[20px] mx-auto relative left-[-160px] ' />
                    <h1 className='text-center text-5xl font-bold text-[#be741e] mt-[-100px] mb-[50px] '>TradeWise</h1>
                    <p className='text-grey-600 text-center text-normal'></p>
                </div>

                <div className='bg-[#1C1206] text-white p-8 '>
                    <MdEmail className='text-white text-5xl mx-auto justify-center align-center'   />
                    <h2 className='font-bold text-2xl text-[#BE741E] pt-2'>Verify Your Email Address</h2>
                    <p className='mt-4'>   Hi ,<br></br>
                        Please check your inbox and enter the verification<br></br>
                        code below to verify your email address. The code <br></br>
                        will expire in 15 seconds.
                    </p>
                    
                </div>

                <div className='bg-[#1c1206] p-3 text-[#BE741E] '>
                    <div className='flex flex-row justify-center gap-2 items-center mb-4 text-[#fff]'>
                        <IoTimer className='text-3xl'/>
                        <p className='text-center  mb-0 font-bold text-[20px] '>Timer: {timeLeft} </p>
                    </div>
                    
                    <form className='my-2 mt-2'>
                        <div>
                            {[...Array(6)].map((_,i) => (
                                <input key={i} type="text" maxLength={1} ref={el => inputsRef.current[i] = el} onChange = {(e) => handleChange(e, i)} onKeyDown={(e) => handleKeyDown(e, i)} className="w-[50px] h-[50px] mx-4 px-4 font-bold text-2xl rounded-[5px] border border-gray-600 text-black text-center" />
                            ))}
                        </div>
                    </form>
 
                    <button className='bg-[#BE741E] text-[#fff]  p-2 mb-2 rounded mt-3 mb-[20px] ' onClick={handleSubmit} >Verify Email </button>
                    <div className='flex  justify-center align-center mb-3'>
                        <a href="#" className=' font-bold text-[18px] underline hover:text-white transition-all duration-400 ease-in-out' onClick={handleResendCode}>Resend Code</a>
                    </div>
                    
                </div>

                <div className='bg-[#BE741E] p-[15px]  '>
                    <p>&copy; 2025 <span className='font-bold text-white'>TradeWise</span>. All rights reserved.</p>
                </div>
            </div>
        </>
    )
}

export default VerifyEmail;