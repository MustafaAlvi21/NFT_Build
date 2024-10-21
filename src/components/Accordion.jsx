'use client';
import { useState } from 'react'
import { FaMinus, FaPlus } from "react-icons/fa"

const Accordion = () => {
    const [active, setactive] = useState('')

    const faqData = [
        {
            id: 1,
            title: 'What types of customized gifts do you offer?',
            text: `The particular relationship that exists between pets and their owners is captured in the personalized posters, pillows, and canvas prints that we create.`,
        },
        {
            id: 2,
            title: 'How may giving personalized presents to customers help?',
            text: `A personalized gift is a kind way for clinics to show their clients how much they care, providing consolation at hard times and reaffirming the clinic's dedication to providing sensitive care.`,
        },
        {
            id: 3,
            title: 'Is it possible to customize the gifts for each pet?',
            text: `Definitely! Every item can be customized to match the uniqueness of the pet, making every gift as distinctive as the animal it honors.`,
        },
    ]

    return (
        <div>
            {
                faqData.map((e, i) => {
                    return <div key={e.id} className='w-full border-color-base/50 border mb-2 bg-color-inverted rounded-xl overflow-hidden'>
                        <div className='py-1 w-full px-4 flex justify-between items-center cursor-pointer' onClick={active == `active${e.id}` ? () => setactive(false) : () => setactive(`active${e.id}`)}>
                            <p className="cursor-pointer font-bold text-color-inverted">{e.title}</p>
                            <button className='w-8 h-8 text-xl my-border-1 rounded-md bg-color-inverted text-color-inverted flex justify-center items-center relative overflow-hidden' onClick={active == `active${e.id}` ? () => setactive(false) : () => setactive(`active${e.id}`)}>
                                <FaPlus className={`absolute duration-500 transition-all transform ${active == `active${e.id}` ? 'translate-x-7 rotate-45' : 'translate-x-0 rotate-0'}`} /> 
                                <FaMinus className={`absolute duration-500 transform ${active == `active${e.id}` ? 'translate-x-0' : '-translate-x-20'}`} />
                                </button>
                        </div>
                        <div className={`h-max overflow-hidden text-color-inverted px-4 duration-500 active${e.id}  ${active !== `active${e.id}` ? 'max-h-0 py-0' : 'max-h-80 py-4'} `}>
                            <p>
                                {e.text}
                            </p>
                        </div>

                    </div>
                })}
        </div>
    )
}

export default Accordion
