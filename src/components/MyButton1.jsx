
const MyButton1 = ({text, classes, onclick, disabled, type="submit"}) => {
    return <>

        <button type={type} onClick={onclick} disabled={disabled} className={`flex justify-center self-center items-center relative z-1 bg-center bg-contain bg-no-repeat w-[244px] h-[63px] mx-auto uppercase text-black text-base font-semibold disabled:bg-gray-500 disabled:cursor-not-allowed ${classes}`}>{text}</button>

    </>

}

export default MyButton1
