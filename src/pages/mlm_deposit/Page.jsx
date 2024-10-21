import React, { useState } from 'react'
import { useEffect } from 'react';
import { getMyPaymentLogsAPI } from '../../api/commissionLogs';
import { useAuth } from "../../ContextAPI/Components/auth"

export const MyDepositLogs = () => {

    const { user } = useAuth()
    const [data, setData] = useState([])

    const GetMyPaymentLogsAPI = async (e) => {
        const res = await getMyPaymentLogsAPI()
        console.log("getMyPaymentLogsAPI", res);
        if (res.success) setData(res.message)
    }

    useEffect(() => {
        GetMyPaymentLogsAPI()

    }, [])


    return (


        <section className="py-4 px-4 sm:px-12 bg-black">

            <div className="container mx-auto pt-[146px]  mb-14">

                <h1 className="text-blue-400 uppercase text-5xl text-center font-atami mb-28">Payments</h1>

                <div className="border-cut-1 text-white min-h-[157px] items-center justify-start w-full px-8 py-8">
                    <div className="text-left">
                        <h3 className="text-white text-base font-semibold mb-5"> Wallet Address: {user?.walletAddress} </h3>


                        <table className="w-full text-sm text-left text-card-text">
                            <thead className="text-sm font-bold">
                                <tr>
                                    <th scope="col" className="px-6 py-3"> Invoice</th>
                                    <th scope="col" className="px-6 py-3"> Currency</th>
                                    <th scope="col" className="px-6 py-3"> Amount</th>
                                    <th scope="col" className="px-6 py-3"> Quantity</th>
                                    <th scope="col" className="px-6 py-3"> Status</th>
                                    <th scope="col" className="px-6 py-3"> Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.map((e) => {
                                    return (
                                        <tr key={e._id} className="odd:bg-color-inverted/20  even:bg-transparent " >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {e?.details?.invoice || "---"}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {e?.details?.currency || "---"}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {e?.details?.amount?.toFixed(2) || "---"}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {e?.details?.qty || "---"}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {e?.details?.status || "---"}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {new Date(e.dateTime).toDateString()}{" "}
                                                {new Date(e.dateTime).toLocaleTimeString()}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>



                    </div>

                </div>
            </div>
        </section>

    )
}
