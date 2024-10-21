import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import MyRoutes from "./routing/myRoutes"

// CONTEXTAPI
import { useAuth } from "./ContextAPI/Components/auth"
import { useToast } from "./ContextAPI/Components/notify"

// TOASTIFY
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// COMPONENTS
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

// UTILS
import { isValidObject } from "./utils/isValidObject"
import { useLoading } from "./ContextAPI/Components/loading"

// Axios
import axios from "axios"
import TriangleLoader from "./components/TriangleLoader"



const App = () => {
  const location = useLocation()
  const { user, setuser, getLoginUser } = useAuth();
  const { showNotify, toastAlert } = useToast();
  const { isLoading, setisLoading } = useLoading();

  const token = sessionStorage.getItem('pk2');
  axios.defaults.headers.common['pk2'] = token;



  // FOR TOAST MESSAGES
  const notify = (response, types) =>
    types(response, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });


  useEffect(() => {
    if (showNotify.msg != null) {
      notify(showNotify?.msg, showNotify?.type === true ? toast.success : showNotify?.type === "info" ? toast.info : toast.error)
    }

  }, [showNotify])


  // AXIOS INTERCEPTER FOR LOADER
  useEffect(() => {
    let a = 0

    const requestInterceptor = axios.interceptors.request.use(config => {
      setisLoading(true);
      a++

      return config;
    });

    const responseInterceptor = axios.interceptors.response.use(
      response => {
        a--
  
        if (a === 0) {
          setisLoading(false);
        }
        return response;
      },
      error => {
        a--
  

        if (a === 0) {
          setisLoading(false);
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };

  }, [])

  if (user) {
    return (
      <>

        {
          isLoading && <TriangleLoader />
        }

        <ToastContainer />
        <div className="flex flex-col justify-between min-h-screen bg-black">

          <Navbar user={user} setuser={setuser} isValidObject={isValidObject} />

          <MyRoutes />

          <Footer />
        </div>
      </>
    )
  }


}

export default App
