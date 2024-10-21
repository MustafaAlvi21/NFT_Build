import React, { useState } from 'react'
import QRCode from 'react-qr-code'
import Modal from 'react-modal';
import MyButton1 from './MyButton1';

// ICONS
import { BiQrScan } from "react-icons/bi"
import { MdCancel } from 'react-icons/md';
import CopyToClipboardButton from './CopyToClipboardButton';

const QRcodeModal = ({ text }) => {

    const [modalState, setModalState] = useState(false)

    return (
        <>
            <MyButton1 text={<BiQrScan size={22} />} classes={'blue_bg_btn w-auto flex flex-col items-center justify-center !py-2 !px-5'} onclick={() => setModalState(true)} />

            <Modal
                isOpen={modalState}
                // onAfterOpen={afterOpenModal}
                onRequestClose={() => setModalState(false)}
                // style={customStyles}
                contentLabel="QR Modal"
                ariaHideApp={false}
                className={'flex flex-col justify-center items-center h-max w-max mx-auto outline-none'}
            >
                <div className='relative card rounded-md p-12'>
                    <button onClick={() => setModalState(false)} className='text-red-600 absolute top-2 right-2'><MdCancel size={25} /></button>
                    <div className='p-4 rounded-md mx-auto'>
                        <QRCode value={text || 'Hello   '} />
                    </div>

                    <h5 style={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>{text} &nbsp; <CopyToClipboardButton text={text} /></h5>
                </div>
            </Modal>
        </>
    )
}

export default QRcodeModal
