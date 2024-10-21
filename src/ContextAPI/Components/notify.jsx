import { createContext, useContext, useState } from "react"


// Step 1
const ToastContext = createContext()

// Step 2
export const useToast = () => {
    return useContext(ToastContext);
}

// Step 3
export const ToastProvider = ({ children }) => {

    const [showNotify, setNotify] = useState({
        msg: null,
        type: null
    });

    const toastAlert = (msg, type) => {
        setNotify({ msg, type })
    }

    const cleartoastAlert = () => {
        setNotify({ msg: null, type: null })
    }


    return (
        <ToastContext.Provider value={{ showNotify, toastAlert, cleartoastAlert }}>
            {children}
        </ToastContext.Provider>
    )
}