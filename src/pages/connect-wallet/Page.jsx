import { useState } from "react";
// COMPONENTS
import MyButton1 from "../../components/MyButton1";

//APIS 
import { authenticateUserAPI } from "../../api/user";

// CONTEXT APIS
import { useAuth } from "../../ContextAPI/Components/auth";
import { useToast } from "../../ContextAPI/Components/notify";

// axios
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SignMessage, adminDomains } from "../../config";


import { ethers } from "ethers";



const ConnectWallet = () => {

    // REACT HOOKS
    const navigate = useNavigate()

    // CONTEXT API STATES
    const { user, setuser } = useAuth();
    const { toastAlert } = useToast();

    // STATES
    const [data, setData] = useState({ walletAddress: "" });


    const handleInput = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const connectWallet = async (e) => {

        e.preventDefault();

        const res = await authenticateUserAPI(data);

        if (res.success) {
            setuser(res.user)
            sessionStorage.setItem('pk2', res.token);
            axios.defaults.headers.common['pk2'] = res.token;
            if (adminDomains.includes(window.location.origin)) {
                navigate('/admin-payout')
            } else {
                navigate('/affiliate')
            }

        }

        if (adminDomains.includes(window.location.origin) && res.user.role == 'user') {
            toastAlert('Only admin can access', false)
            setuser({})
            sessionStorage.removeItem('pk2');
        } else {
            toastAlert(res.message, res.success)
        }

    }

    const connectMetamask = async () => {
        if (window.ethereum) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const address = await provider.send("eth_requestAccounts", []);

                const signer = await provider.getSigner();
                // const address = await signer.getAddress();
                // setWalletAddress(address);
                return { signer, address };

            } catch (error) {
                console.error("Error connecting to MetaMask:", error);

            }

        } else {
            alert("MetaMask is not installed. Please install it to use this app.");
        }
    };

    const signMessage = async () => {
        const signerfunc = await connectMetamask();
        console.log("signerfunc", signerfunc);
        const signer = signerfunc.signer

        if (signer) {
            const message = SignMessage;

            try {
                const signature = await signer.signMessage(message);
                console.log("Signature:", signature);

                // Send the signature to the backend for verification
                const response = await authenticateUserAPI({ walletAddress: signerfunc.address[0], sign: signature })

                if (response.success) {
                    setuser(response.user)
                    sessionStorage.setItem('pk2', response.token);
                    axios.defaults.headers.common['pk2'] = response.token;
                    if (adminDomains.includes(window.location.origin)) {
                        navigate('/admin-payout')

                    } else {
                        navigate('/affiliate')
                    }
                }

                if (adminDomains.includes(window.location.origin) && response.user.role == 'user') {
                    toastAlert('Only admin can access', false)
                    setuser({})
                    sessionStorage.removeItem('pk2');

                } else {
                    toastAlert(response.message, response.success)
                }


            } catch (error) {
                console.log(error);
                console.error("Error signing message:", error);
            }
        }
    };




    return <>

        <section className="py-8 px-4 sm:px-0 h-screen flex justify-center items-center">

            <MyButton1 onclick={signMessage} classes={'package_blue_btn text-2xl !py-1 w-full'} text={'Connect Wallet'} />

        </section >

    </>
}

export default ConnectWallet
