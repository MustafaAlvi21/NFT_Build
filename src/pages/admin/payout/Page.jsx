import React, { useEffect, useRef, useState } from 'react'
import MyButton1 from '../../../components/MyButton1'
import { acceptWithdrawalAPI, cancelWithdrawalAPI, getAllAdminWithdrawalAPI, requestWithdrawAPI } from '../../../api/withdraw'
import { fees } from '../../../config'

const Payout = ({ user }) => {


    // STATES
    const [withdrawalRequests, setwithdrawalRequests] = useState([])



    // GET ALL WITHDRAWAL REQUEST FOR ADMIN
    const getAllWithdrawalRequest = async (e) => {

        const res = await getAllAdminWithdrawalAPI()

        if (res.success) {
            setwithdrawalRequests(res.message);
        }
    }

    // CANCEL WITHDRAWAL REQUEST
    const cancelRequest = async (_id) => {
        const res = await cancelWithdrawalAPI({ _id })

        console.log(res);

        getAllWithdrawalRequest()
    }

    // ACCEPT WITHDRAWAL REQUEST
    const acceptRequest = async (_id) => {
        const res = await acceptWithdrawalAPI({ _id })

        console.log(res);

        getAllWithdrawalRequest()
    }


    useEffect(() => {
        getAllWithdrawalRequest()
    }, [user])


    return <>

        <section className="py-12 px-4">
            <div className='container mx-auto'>
                <div className="card">
                    <h2 className='h2'>Payout Requests</h2>
                    {
                        withdrawalRequests.length == 0 &&
                        <div className='flex flex-col justify-center items-center mb-6'>
                            <h2 className='h2'>No Payout Requests</h2>
                        </div>
                    }

                    {
                        withdrawalRequests.length > 0 &&
                        <div className="relative overflow-x-auto shadow-md">
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
                                            return <tr key={e._id} className="odd:bg-color-inverted/20  even:bg-transparent ">
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
                                                    <span className={`capitalize badge ${e.details.status}`}>
                                                        {e.details.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <MyButton1 text="Accept" disabled={e.details.status != "pending"} classes={"!py-2 bg-green-500 hover:bg-green-600 px-4 mr-2"} onclick={() => acceptRequest(e._id)} />
                                                    <MyButton1 text="Reject" disabled={e.details.status != "pending"} classes={"!py-2 bg-red-500 hover:bg-red-600 px-4"} onclick={() => cancelRequest(e._id)} />
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

export default Payout
