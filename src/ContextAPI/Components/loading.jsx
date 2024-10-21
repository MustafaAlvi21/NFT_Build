import { createContext, useContext, useState } from "react"


// Step 1
const LoadingContext = createContext()

// Step 2
export const useLoading = () => {
    return useContext(LoadingContext);
}

// Step 3
export const LoadingProvider = ({ children }) => {

    const [isLoading, setisLoading] = useState(false);



    return (
        <LoadingContext.Provider value={{ isLoading, setisLoading}}>
            {children}
        </LoadingContext.Provider>
    )
}