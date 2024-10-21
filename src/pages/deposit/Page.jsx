import React, { useRef, useState } from 'react'
import Accordion from '../../components/Accordion'

const Deposit = () => {

    // STATES
    const [depositAmount, setdepositAmount] = useState(0)

    // FUNCTION FOR DEPOSIT INPUT
    const depositAmountHandler = (e) => {

        console.log(e.target.value)

        if (e.target.value < 0) return
        if (depositAmount == 0) {
            console.log('inisde condition');
            // depositAmountRef.current.value = e.target.value.split('0')[1]
            setdepositAmount(e.target.value.split('0')[1])
        }
        else setdepositAmount(e.target.value)


    }

    return <>
        <section className="py-8 px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="card">
                    <h2 className='h2'>Deposit</h2>
                    <div className='info-warning'>
                        <p>Please enter the USD amount you want to deposit. After clicking the green button, you will be redirected to Plisio, where you can pay the deposit amount via several cryptocurrencies.</p>
                    </div>
                    <form action="" className='flex flex-col gap-2'>
                        <label htmlFor="deposit" className='label'>Deposit Amount</label>
                        <input type="number" value={depositAmount} onChange={depositAmountHandler} name="" id="" className='input' />
                    </form>
                    <button className='py-3 font-bold text-color-inverted rounded-md transition-all duration-300 bg-lime-600 hover:bg-lime-700'>Deposit Now</button>

                    <div className='border border-dashed border-color-base my-4'></div>

                    <div className='flex justify-between items-center'>
                        <p className='font-medium text-color-inverted'>No crypto? No problem.</p>
                        <button className='py-2 px-4 font-bold text-color-inverted rounded-md transition-all duration-300 bg-lime-600 hover:bg-lime-700'>Buy Crypto</button>
                    </div>

                </div>

                <div className="card">
                    <h2 className='h2'>Help</h2>

                    <div className='iframe-parent'>
                        <iframe className='iframe' src="https://www.youtube.com/embed/NpEaa2P7qZI" title="video" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                    </div>

                    <Accordion />

                </div>
            </div>
        </section>


        <section className="pb-8 px-4">
            <div className="card">
                <h2 className='h2'>Deposit History</h2>
                <div className='flex flex-col justify-center items-center mb-6'>
                    <h2 className='h2'>No Deposit Found</h2>
                </div>

                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left text-color-inverted">
                        <thead class="text-sm font-bold">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Date and Time
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Amount(USDT)
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Type
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Wallet
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="odd:bg-color-inverted/20  even:bg-transparent ">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    Sat Apr 27 2024 18:57:14
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    30.00
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    Withdraw to Wallet
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    0x2222222222222222222222222222222
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <a href="#" class="badge declined">Rejected</a>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <button class="p-2 px-4 rounded-md bg-sky-600">Cancel</button>
                                </td>
                            </tr>

                            <tr class="odd:bg-color-inverted/20  even:bg-transparent ">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    Sat Apr 27 2024 18:57:14
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    30.00
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    Withdraw to Wallet
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    0x2222222222222222222222222222222
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <a href="#" class="badge withdrawed">Withdrawed</a>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <button class="p-2 px-4 rounded-md bg-sky-600">Cancel</button>
                                </td>
                            </tr>


                        </tbody>
                    </table>
                </div>

            </div>
        </section>



    </>
}

export default Deposit
