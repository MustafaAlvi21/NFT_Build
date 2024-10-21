import React from 'react'
import { Oval } from 'react-loader-spinner'

const TriangleLoader = () => {
    return (
        <div className='w-full h-full bg-black/30 fixed top-0 left-0 z-10 flex flex-col justify-center items-center'>
            <Oval
                visible={true}
                height="80"
                width="80"
                color="#20c8d5"
                backgound="white"
                ariaLabel="triangle-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    )
}

export default TriangleLoader
