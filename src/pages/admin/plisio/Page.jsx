import React, { useEffect, useState } from 'react'

// COMPONENTS
import MyButton1 from '../../../components/MyButton1';
import { getplatformAPI, updateplatformAPI } from '../../../api/platform';

import { useNavigate } from 'react-router-dom';

const PlisioPage = ({ toastAlert }) => {
    const navigate = useNavigate()

    const [data, setdata] = useState({
        plisioKey: '',
    });

    const handleInput = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value });
    }

    const updatePlatform = async (e) => {
        e.preventDefault()

        const res = await updateplatformAPI(data)
        toastAlert(res.message, res.success)
    }


    const getPlatformToEdit = async () => {
        const res = await getplatformAPI()

        if (res.success && res.message) setdata(res.message)
        console.log(res);
    }

    useEffect(() => {
        getPlatformToEdit()
    
    }, [])



    return (
        <section className="py-8 px-4 sm:px-122">
            <div className="max-w-[430px] mx-auto">
                <form onSubmit={(e) => updatePlatform(e)} action="">
                    <div className="card">
                        <h2 className='h2 text-center'>Platform</h2>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="plisio" className='font-semibold'>Plisio Key</label>
                            <input type="text" id='plisio' name='plisioKey' value={data.plisioKey} onChange={handleInput} required className='rounded-md py-1 px-2 text-color-inverted outline-none ring-0 focus:ring-0 focus:outline-none' />
                        </div>
                        <MyButton1 type='submit' classes={'text-2xl !py-1 w-full'} text={'Update'} />
                    </div>
                </form>
            </div>
        </section >
    )
}

export default PlisioPage