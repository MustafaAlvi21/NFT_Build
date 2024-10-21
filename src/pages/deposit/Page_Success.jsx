import React from 'react'
import MyButton1 from '../../components/MyButton1'
import { Link, useNavigate } from 'react-router-dom'


const DepositSuccess = () => {

    const navigate = useNavigate()

    const navigateToBuy = () => {
        navigate('/')
    }

    return (
        <div className="container mx-auto">
            <div className='card max-w-md mx-auto flex flex-col gap-8 justify-center items-center'>
                <h2 className='h2'>Deposit Successful</h2>
                <p className=' text-center border border-color-unique p-2 rounded-md bg-color-unique/10'>Please note that it may take a few minutes for the amount to be credited to your balance.</p>

            <MyButton1
                type="button"
                classes={"text-2xl !py-2 w-full mt-4"}
                text={"Buy More"}
                onclick={navigateToBuy}
            />
                {/* <Link to={"/"}>Buy more</Link> */}
            </div>
        </div>
    )
}


export default DepositSuccess