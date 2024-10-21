import { CombineComponents } from "./CombineContext.jsx";
import { AuthProvider } from "./Components/auth";
import { LoadingProvider } from "./Components/loading.jsx";
import { ToastProvider } from "./Components/notify";


const providers = [
    ToastProvider,
    AuthProvider,
    LoadingProvider
]

export const AppContextProvider = CombineComponents(...providers)