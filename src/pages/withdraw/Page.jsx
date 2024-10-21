import React, { useEffect, useRef, useState } from 'react'
import Accordion from '../../components/Accordion'
import MyButton1 from '../../components/MyButton1'
import { cancelWithdrawalAPI, getAllWithdrawalAPI, requestWithdrawAPI } from '../../api/withdraw'
import { fees } from '../../config'

const Withdraw = ({ user, toastAlert }) => {


    // STATES
    const [withdrawalRequests, setwithdrawalRequests] = useState([])
    const [withdrawCommission, setwithdrawCommission] = useState({
        amount: 0,
        crypto: "poly",
        walletAddress: "",
    })


    // FUNCTION FOR WITHDRAW FROM BALANCE INPUTS
    const withdrawComissionHandler = (e) => {

        if (e.target.name == "amount") {
            setwithdrawCommission(prev => ({
                ...prev,
                [e.target.name]: e.target.value
            }));


            // if (e.target.value < 0) return
            // if (withdrawCommission.amount == 0) {
            //     // withdrawAmountRef.current.value = e.target.value.split('0')[1]
            //     setwithdrawCommission(prev => ({
            //         ...prev,
            //         [e.target.name]: e.target.value.split('0')[1]
            //     }));
            // }
            // else {
            //     setwithdrawCommission(prev => ({
            //         ...prev,
            //         [e.target.name]: e.target.value
            //     }));
            // }
            
        } else {
            setwithdrawCommission(prev => ({
                ...prev,
                [e.target.name]: e.target.value
            }));
        }


    }


    const requestWithdraw = async (e) => {
        e.preventDefault()

        if (withdrawCommission.amount > user.comission) {
            return toastAlert('Not Enough Available Commission', 'error')
        }
        else if (withdrawCommission.amount < 25) {
            return toastAlert('Minimum withdrawal amount is $25', 'error')
        }
        else {
            const res = await requestWithdrawAPI(withdrawCommission)
            if (res.success) {
                getAllWithdrawalRequest()
                setwithdrawCommission({
                    amount: 0,
                    crypto: "poly",
                    walletAddress: "",
                })
            }
            toastAlert(res.message, res.success)
        }



    }


    const getAllWithdrawalRequest = async (e) => {

        if (user.walletAddress == undefined) return

        const res = await getAllWithdrawalAPI(user.walletAddress)

        if (res.success) {
            setwithdrawalRequests(res.message);
        }
    }

    const cancelRequest = async (_id, userID) => {
        const res = await cancelWithdrawalAPI({ _id, userID })

        console.log(res);

        getAllWithdrawalRequest()
    }

    useEffect(() => {
        getAllWithdrawalRequest()
    }, [user])


    return <>
        <section className="py-8 px-4 sm:px-12 mt-5 bg-black" >
            <div className=" container mt-14">
                <h1 className="text-blue-400 uppercase text-5xl text-center font-atami mb-14">Withdraw</h1>
                <div className="border-cut-1 card bg-black">
                    <h2 className='h2'>Withdraw Commission</h2>

                    <ul className='text-card-text flex flex-col gap-2 font-semibold'>
                        <li>Available Commission: ${user?.comission}</li>
                    </ul>

                    <form onSubmit={requestWithdraw} className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="amount" className='label'>Amount to Withdraw:</label>
                            <input type="number" value={withdrawCommission.amount} onChange={withdrawComissionHandler} name="amount" id="amount" className='input w-full' required />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <div className='flex justify-between items-center'>
                                <label htmlFor="walletAddress" className='label'>Your USDT Address:</label>
                                <div className='hidden gap-2 items-center text-card-text font-semibold'>
                                    <div className='flex items-center gap-1'>
                                        <input type="radio" checked={withdrawCommission.crypto == "bsc"} onChange={withdrawComissionHandler} name="crypto" value="bsc" id="" />
                                        <label htmlFor="crypto">BSC</label>
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        <input type="radio" checked={withdrawCommission.crypto == "poly"} onChange={withdrawComissionHandler} name="crypto" value="poly" id="" />
                                        <label htmlFor="crypto">POLY</label>
                                    </div>
                                </div>
                            </div>
                            <input type="text" value={withdrawCommission.walletAddress} onChange={withdrawComissionHandler} name="walletAddress" id="walletAddress" className='input w-full' required />
                        </div>
                        <MyButton1
                            // classes={'bg-white'} 
                            classes={"package_blue_btn !py-2 mt-4"}
                            text={"Initiate Payout"} onclick={() => { }} />
                    </form>


                </div>
            </div>
        </section>


        <section className="pb-8 px-4 sm:px-12 bg-black">
            <div className='container mx-auto'>
                <div className="border-cut-1 card bg-black">
                    <h2 className='h2'>Withdraw History</h2>
                    {
                        withdrawalRequests.length == 0 &&
                        <div className='flex flex-col justify-center items-center mb-6'>
                            <h2 className='h2'>No Withdrawals Found</h2>
                        </div>
                    }

                    {
                        withdrawalRequests.length > 0 &&
                        < div className="relative overflow-x-auto shadow-md">
                            <table className="w-full text-sm text-left text-card-text">
                                <thead className="text-sm font-bold">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Time
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Wallet Address
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Amount Ask
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Amount Receive
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        withdrawalRequests.map((e, i) => {
                                            return <tr key={e._id} className="odd:bg-color-inverted/20  even:bg-transparent">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {new Date(e.dateTime).toDateString()} {new Date(e.dateTime).toLocaleTimeString()}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {e.details.walletAddress}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    ${e.details.amount}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    ${e.details.amount - (e.details.amount * (fees / 100))}
                                                </td>
                                                <td className={`px-6 py-4 whitespace-nowrap`}>
                                                    <span className={`capitalize badge ${e.details.status == 'cancelled' ? 'rejected' : e.details.status}`}>
                                                        {e.details.status}
                                                    </span>
                                                </td>
                                                <td className="whitespace-nowrap">
                                                    <MyButton1 text="Cancel" disabled={e.details.status != "pending"}
                                                        // classes={"!py-2 px-4"} 
                                                        classes={"!py-2 bg-green-500 hover:bg-green-600"}
                                                        onclick={() => cancelRequest(e._id, user._id)} />
                                                </td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>

                    }


                </div>
            </div>
        </section >



    </>
}

export default Withdraw
