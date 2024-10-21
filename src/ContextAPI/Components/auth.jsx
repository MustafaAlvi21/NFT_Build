import { createContext, useContext, useEffect, useState } from "react"
import { getLoginUserAPI } from "../../api/user";

// AXIOS
import axios from "axios"


// Step 1
const AuthContext = createContext()

// Step 2
export const useAuth = () => {
    return useContext(AuthContext);
}

// Step 3
export const AuthProvider = ({ children }) => {

    const [user, setuser] = useState({});

    const getLoginUser = async () => {

        const token = sessionStorage.getItem('pk2');
        if (token) {
            axios.defaults.headers.common['pk2'] = token;

            const res = await getLoginUserAPI()

            if (res.success) {
                setuser(res.message)
                return res.message
            }
            console.log(res);
        }

    }
    return (
        <AuthContext.Provider value={{ user, setuser, getLoginUser }}>
            {children}
        </AuthContext.Provider>
    )
}