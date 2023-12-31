import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Lottie from 'lottie-react';
import Lottie_hotel from '../asssets/Hotel.json'
import Typewriter from 'typewriter-effect'
import { getCart, getOrdersRoute } from '../APIutils/Apiroutes';
import axios from 'axios';

const Home = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState();

  const getOrderItems = async () => {
    axios.post(getOrdersRoute, {
      email: user.email
    })
    .then((data) => {
      localStorage.setItem("zoggy-orders", JSON.stringify(data.data.orders));
      console.log("Request for order success \n", data.data)
    })
    .catch((error) => {
      console.log("error in sending req for order\n", error);
    })
  }
  useLayoutEffect(() => {
    if (!localStorage.getItem('user-details')) {
      console.log("redirecting")
      navigate('/auth');
    }
    else {
      setUser(JSON.parse(localStorage.getItem("user-details")));
    }
  }, [])

  const getCartItems = () => {
    axios.post(getCart, {
      email: user.email
    })
    .then((data) => {
      console.log("success in cart times");
      console.log(data.data.cart[0].items);
      localStorage.setItem('zoggy-cart', JSON.stringify(data.data.cart[0].items));
    })
    .catch((error) => {
      console.log("Error in getting cart items");
    })
  }

  useEffect(() => {
    if(user)
    {
      getOrderItems();
      getCartItems();
    }
  }, [user])
  return (
    <div className='h-screen text-white/80 flex flex-col'>
      <NavBar />
      <div className=' bg-[#1a1a2e] m-5 rounded-md h-full flex justify-center items-center flex-col-reverse lg:flex-row'>
        <div className='h-6/12 w-full font-comforta flex flex-col justify-end items-start pl-11 text-lg md:text-5xl lg:w-6/12 gap-2 md:gap-4 lg:gap-6 xl:gap-11 text-white font-bold'>
          <div>
            We Zoggy
          </div>
          <div className='flex'>
            <div>India's &nbsp;</div>
            <div className='font-Tektur text-2xl font-light md:text-6xl'>
              <Typewriter
                options={{
                  strings: [` Fastest`, ` Largest`, ` Quickest`],
                  autoStart: true,
                  loop: true
                }}
              />
            </div>
          </div>
          <div>
            Food Delivering Brand.
          </div>
        </div>
        <div className='h-6/12 rounded lg:backdrop-blur-sm w-10/12 lg:w-6/12 z-0 flex justify-center items-center'>
          <div className='h-full w-full md:w-8/12 z-0'>
            <Lottie animationData={Lottie_hotel} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home