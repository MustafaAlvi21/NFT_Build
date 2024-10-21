import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import MyButton1 from './MyButton1';
import { BiCopy } from 'react-icons/bi';

const CopyToClipboardButton = ({text}) => {


    const copyToClipboard = (text) => {
        // Copy the text inside the text field
        navigator.clipboard.writeText(text);

        console.log(text);

        // Alert the copied text
        alert("Copied");
    }


    return (
        <CopyToClipboard text={text}
            onCopy={(e) => { alert('Copied!') }}>
            <MyButton1 text={<BiCopy size={22} />} classes={'blue_bg_btn w-auto flex flex-col items-center justify-center !py-2 !px-5'} onclick={(e) => { copyToClipboard(text) }} />
        </CopyToClipboard>
    )
}

export default CopyToClipboardButton
