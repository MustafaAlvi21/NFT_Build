import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

// COMPONENTS
import MyButton1 from "../../components/MyButton1"

// APIS
import { authenticateUserAPI } from "../../api/user"
import { useAuth } from "../../ContextAPI/Components/auth"

const LoginRegisterPage = ({ toastAlert, getLoginUser, isValidObject }) => {

    const navigate = useNavigate();
    const { user, setuser } = useAuth()


    const [data, setdata] = useState({ walletAddress: '' })


    const handleInput = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value });
    }

    const registerOrLoginUser = async (e) => {
        e.preventDefault();

        const res = await authenticateUserAPI(data);

        if (res.success) {
            sessionStorage.setItem('pk2', res.token);
            setuser(res.user)

            // window.location.href = `${window.location.origin}/buy`
            navigate('/buy')
        }

        // toastAlert(res.message, res.success)

    }


    return (
        <section className="px-4 sm:px-12">
            <div className="container mx-auto flex flex-col justify-center items-center">
                <form onSubmit={registerOrLoginUser} className="card max-w-md">
                    <h2 className="h2 text-center">Login Or Register</h2>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="walletAddress" className='label'>Wallet Address:</label>
                        <input type="text" id="walletAddress" name="walletAddress" value={data.walletAddress} onChange={handleInput} className='rounded-md w-full py-1 px-2 text-color-inverted' required />
                    </div>
                    <MyButton1 text={'Login / Register'} classes={''} onclick={() => { }} />

                </form>
            </div>

        </section>
    )
}

export default LoginRegisterPage
