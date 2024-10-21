import React, { useEffect, useRef, useState } from "react";
import MyButton1 from "../../components/MyButton1";
import Modal from "react-modal";
import {
  buyPackageAPI,
  getPackagesAPI,
  verifyUserAPI,
} from "../../api/packages";
import { authenticateUserAPI, getAdminReferralAPI } from "../../api/user";
import { useAuth } from "../../ContextAPI/Components/auth";
import axios from "axios";
import { isValidObject } from "../../utils/isValidObject";
import { fileUrl } from "../../config";
import { handleImageError } from "../../utils/imageHandler";


import pack_1 from "../../assets/pack1-a7d959ba.png"
import pack_2 from "../../assets/pack2-e5fa0b2f.png"
import pack_3 from "../../assets/pack3-8cffc474.png"
import pack_4 from "../../assets/pack4-faf9c68f.png"
import pack_5 from "../../assets/pack5-6df9f906.png"
import pack_6 from "../../assets/pack6-c3e57763.png"
import pack_7 from "../../assets/pack7-a79b2c5c.png"
import pack_8 from "../../assets/pack8-6f1f3b02.png"
import content from "../../content.json"


const Buy = ({ toastAlert }) => {
  const [PackagesData, setPackagesData] = useState([]);
  const [modalStates, setModalStates] = useState(Array(0).fill(false));
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    referredBy: "",
    walletAddress: "",
    qty: 1,
    amount: 0,
    packageID: "",
  });
  const [existingReferralCode, setexistingReferralCode] = useState("");

  const openModal = (index, id, price) => {
    console.log(data);
    const newModalStates = [...modalStates];
    newModalStates[index] = true;
    setModalStates(newModalStates);
    setData({ ...data, packageID: id, amount: price, walletAddress: "" });
  };

  const closeModal = (index) => {
    const newModalStates = [...modalStates];
    newModalStates[index] = false;
    setData({ ...data, referredBy: "", qty: 1, amount: 0, packageID: "" });
    setStep(1);
    setexistingReferralCode("");
    setModalStates(newModalStates);
  };

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const nextStep = async () => {

    console.log("DDAAATTAAA----->>", data);


    const res = await verifyUserAPI({ ...data, _id: data.packageID });

    console.log("res123--->>", res);
    localStorage.setItem("walletAddress", data.walletAddress);
    GetAdminReferralCode()

    if (!res.success) return toastAlert(res.message, res.success);

    if (res.user !== null && isValidObject(res.user)) {
      if (res.sponsorReferralCode !== null) {
        console.log("true condition");
        setData({ ...data, referredBy: res.sponsorReferralCode });
        setexistingReferralCode(res.sponsorReferralCode);
      }
    }
    else {
      console.log("false  condition");

      // setData({ ...data, referredBy: "" });
      // setexistingReferralCode("");

    }



    setStep(step + 1);
    console.log(res);
  };

  const getPackages = async () => {
    const res = await getPackagesAPI({ showAll: false });
    if (res.success) {
      setPackagesData(res.message);
      setModalStates(Array(res.message.length).fill(false));
    }
  };

  const makeTransaction = async (payload) => {
    console.log(payload);

    const res = await buyPackageAPI(payload);

    if (res.success) {
      window.location.href = res.message.data.invoice_url;
      getPackages();
    }

    toastAlert(res.message, res.success);
  };

  const continueToPayment = async (e) => {
    e.preventDefault();

    // if (data.referredBy.length == 0)
    //   return toastAlert(
    //     "Invitation Code Is Required To Contiue Payment",
    //     false
    //   );

    const payload = data;
    await makeTransaction(payload);

    setData({ ...data, qty: 1, amount: 0, packageID: "" });

    localStorage.setItem("walletAddress", "");

    setStep(1);
    setModalStates(Array(PackagesData.length).fill(false));
  };

  const skipToPayment = async () => {
    const payload = { ...data, referredBy: "" };

    await makeTransaction(payload);

    setData({ ...data, referredBy: "", qty: 1, amount: 0, packageID: "" });
    setStep(1);
    setModalStates(Array(PackagesData.length).fill(false));
  };

  const GetAdminReferralCode = async () => {
    const searchParams = new URLSearchParams(window.location.search);
    const refCode = searchParams.has("ref") ? searchParams.get("ref") : "";
    console.log(searchParams.get("ref")); // price_descending
    console.log("searchParams====>>", searchParams.get("ref")); // price_descending
    console.log("refCode=======>>", refCode); // price_descending

    // let res = "";
    // if (!refCode) {
    //   res = await getAdminReferralAPI();
    //   console.log("res=====>>>", res);
    // }

    // alert("refCode", refCode);

    const walletAddress = localStorage.getItem("walletAddress");
    // const walletAddress = null;

    console.log("walletAddress====>>", walletAddress);

    if (walletAddress != null) {

      // setData({ ...data, referredBy: refCode || res.message });
      setData({ ...data, walletAddress, referredBy: refCode || "" });

    } else {

      // setData({ ...data, referredBy: res.message });
      setData({ ...data, walletAddress, referredBy: "" });

    }
  };

  const [checked, setchecked] = useState(false)
  function policyerror(e) {
    e.preventDefault()
    return toastAlert("You have to confirm policy", false)
  }

  useEffect(() => {
    if (modalStates.includes(true)) {
      document.body.style.overflow = "hidden";
      if (screen.availWidth > 768) document.body.style.paddingRight = "17px";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    }
  }, [modalStates]);

  useEffect(() => {
    getPackages();
    GetAdminReferralCode();
  }, []);

  return (
    <>

      {/* <!-------------HEADER END------------> */}
      <section className="bg-black">
        <div className="container mx-auto max-xl:px-0 pt-[146px]">
          <h1 className="text-blue-400 uppercase text-5xl text-center font-atami mb-14">NFT PACKAGES</h1>
          <div className="text-box-banner text-white mb-14 text-black">
            <p className="text-2xl md:text-2xl text-center font-normal font-montserrat mb-7 text-black "><strong>For each package brought, you will receive 2 or 3 NFTs instead of 1.<br/>These NFTs are transferable after one year and add immense value to your portfolio.</strong></p>
            <p className="text-2xl md:text-2xl text-center font-normal font-montserrat mb-7 text-black">USDT 50, USDT 100, USDT 250, USDT 500  Package: Receive two NFTs of your selected package!</p>
            <p className="text-2xl md:text-2xl text-center font-normal font-montserrat mb-7 text-black">USDT 1 000, USDT 2 500, USDT 5 000, USDT 10 000 Package: Receive two NFTs of your selected package PLUS one NFT from the next lower package!</p>

          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-[36px] mx-auto text-center">

            {PackagesData.map((e, index) => {
              return (
                <React.Fragment key={index}>
                  {/* <!---item--> */}
                  <div className="flex flex-col justify-center text-white text-center font-montserrat size-full max-w-[375px] mb-5 mx-auto">
                    <h3 className="uppercase font-base font-semibold text-center mb-4">{e.name}</h3>
                    <img src={`${fileUrl}/${e?.image}`} alt="pack_1" className="max-w-[288px] h-[200px] object-contain mx-auto relative z-1 mb-[-140px]" />
                    <div className="package_card_bg bg-no-repeat bg-center pt-[155px] bg-contain min-w-full min-h-[445px]">

                      <div>
                        <h2 className="mb-1 text-2xl font-semibold">USDT {e.price}</h2>
                        {
                          e?.showQty && (
                            <p className='text-card-text text-sm font-semibold mb-4'>Quantity: {e.stockQty}</p>
                          )
                        }
                        <p className='text-card-text text-md font-semibold mb-0'>Benefit</p>
                        <p className='text-card-text text-xs font-semibold mb-4'>{e.description}</p>

                        {
                          e.description2 && <>
                            <p className='text-card-text text-md font-semibold mb-0'>Pre-Sales Benefit Tokens right</p>
                            <p className='text-card-text text-xs font-semibold mb-4'>{e.description2}</p>
                          </>
                        }

                        {
                          e.description3 && <>
                            <p className='text-card-text text-md font-semibold mb-0'>Extra bonus</p>
                            <p className='text-card-text text-xs font-semibold mb-4'>{e.description3}</p>
                          </>
                        }
                      </div>

                    </div>

                    <MyButton1
                      disabled={e.stockQty == 0}
                      classes={"package_blue_btn !py-2 mt-[-30px] mb-14"}
                      onclick={() => openModal(index, e._id, e.price)}
                      text={"Choose NFT Package"}
                    />
                  </div>
                  {/* <!---item end--> */}


                  <Modal
                    isOpen={modalStates[index]}
                    onRequestClose={() => closeModal(index)}
                    contentLabel="Example Modal"
                    ariaHideApp={false}
                    className={
                      "flex flex-col justify-center items-center h-max w-max mx-auto outline-none focus:outline-none px-4"
                    }
                  >
                    <div className="sm:w-[400px] w-[90vw] min-h-[400px] text-card-text rounded-2xl overflow-hidden">
                      <div className="bg-color-unique px-4 py-2 flex justify-between items-center">
                        <h3 className="text-2xl font-bold text-black">
                          Complete Purchase
                        </h3>
                        <button onClick={() => closeModal(index)}>X</button>
                      </div>
                      <div className="card rounded-2xl rounded-t-none gap-2">
                        <h4 className="text-xl text-color-unique font-bold">
                          Your Selected Package:
                        </h4>
                        <h5 className="text-lg font-semibold">{e.name}</h5>
                        <p className="text-card-text text-xs">
                          NFT Features Description
                        </p>
                        <p className="text-card-text text-xs">
                          {e.description}
                        </p>
                        <h4 className="text-xl font-bold">${e.price}</h4>

                        <form
                          onSubmit={(e) => continueToPayment(e)}
                          className="mt-2"
                        >
                          {step == 2 && (
                            <>
                              {existingReferralCode.length > 0 ? (
                                <p>
                                  Invitation Code:{" "}
                                  {existingReferralCode}
                                </p>
                              ) : (
                                <div className="flex flex-col gap-1">
                                  <label
                                    htmlFor="referredBy"
                                    className="font-semibold"
                                  >
                                    Invitation Code:
                                  </label>
                                  <input
                                    type="text"
                                    id="referredBy"
                                    name="referredBy"
                                    // value={data.referredBy}
                                    defaultValue={data.referredBy}
                                    onChange={handleInput}
                                    className="rounded-md py-1 px-2 text-color-inverted outline-none ring-0 focus:ring-0 focus:outline-none"
                                  />
                                </div>
                              )}

                            </>
                          )}
                          {step == 1 ? (
                            <>
                              <div className="flex flex-col gap-1 mt-4">
                                <label htmlFor="walletAddress" className="font-semibold" >
                                  Your Recipient Wallet (Polygon):
                                </label>
                                <input type="text" id="walletAddress" name="walletAddress" value={data.walletAddress} onChange={handleInput} required className="rounded-md py-1 px-2 text-color-inverted outline-none ring-0 focus:ring-0 focus:outline-none" />
                              </div>
                              <MyButton1 type="button" classes={"package_blue_btn !py-2 mt-4"} text={"Next"} onclick={nextStep} />
                            </>
                          ) : (
                            <>
                              {existingReferralCode.length == 0 && (
                                <p className="text-xs mt-4">
                                  Continue to payment requires invitation code.
                                  If you do not have an invitation code you can
                                  skip invitation code.
                                </p>
                              )}
                              <MyButton1
                                type="submit"
                                classes={"text-2xl !py-2 bg-color-unique w-full mt-3"}
                                text={"Continue To Payment"}
                              />

                              <div style={{ paddingTop: "10px"}}>
                                
                                <label htmlFor="policy" onclick={() => setchecked(true)}>
                                  {
                                    checked ?
                                      <input type="checkbox" name="" id="policy" required checked />
                                      :
                                      <input type="checkbox" name="" id="policy" required />
                                  }
                                  &nbsp; I have read and agree to the <a href="javascript:void(0)" onClick={() => window.open("/Clonely_Terms_of_Service_24_10_02.pdf", "_blank")} style={{ textDecoration: "underline"}}>Terms of Service and Privacy Policy</a>
                                </label>

                              </div>

                            </>
                          )}

                        </form>
                      </div>
                    </div>
                  </Modal>
                </React.Fragment>
              )
            }
            )}


            {/* <!---item 2--> */}
            {/* <div className="flex flex-col justify-center text-white text-center font-montserrat size-full max-w-[375px] mb-5 mx-auto">
              <h3 className="uppercase font-base font-semibold text-center mb-4">PACKAGE TEST</h3>
              <img src={pack_2} alt="pack_2" className="max-w-[288px] mx-auto relative z-10 mb-[-140px]" />
              <div className="package_card_bg bg-no-repeat bg-center pt-[155px] bg-contain min-w-full min-h-[445px]">
                <h2 className="mb-4 text-2xl font-semibold">$50.00</h2>
                <p className="font-semibold">Lorem</p>
                <p className="">1 month free access</p>
                <p className="mb-4">+ ipsum</p>
                <p className="font-semibold">Lorem ipsum dolor</p>
                <p className="">50</p>
              </div>
              <a href=""
                className="package_blue_btn flex justify-center self-center items-center relative z-10 bg-center bg-contain bg-no-repeat w-[244px] h-[63px] mt-[-30px] mx-auto uppercase text-black text-base font-semibold mb-14">
                choose NFT package
              </a>
            </div> */}
            {/* <!---item end--> */}

            {/* <!---item 3--> */}
            {/* <div className="flex flex-col justify-center text-white text-center font-montserrat size-full max-w-[375px] mb-5 mx-auto">
              <h3 className="uppercase font-base font-semibold text-center mb-4">PACKAGE TEST</h3>
              <img src={pack_3} alt="pack_3" className="max-w-[288px] mx-auto relative z-10 mb-[-140px]" />
              <div className="package_card_bg bg-no-repeat bg-center pt-[155px] bg-contain min-w-full min-h-[445px]">
                <h2 className="mb-4 text-2xl font-semibold">$50.00</h2>
                <p className="font-semibold">Lorem</p>
                <p className="">1 month free access</p>
                <p className="mb-4">+ ipsum</p>
                <p className="font-semibold">Lorem ipsum dolor</p>
                <p className="">50</p>
              </div>
              <a href=""
                className="package_blue_btn flex justify-center self-center items-center relative z-10 bg-center bg-contain bg-no-repeat w-[244px] h-[63px] mt-[-30px] mx-auto uppercase text-black text-base font-semibold mb-14">
                choose NFT package
              </a>
            </div> */}
            {/* <!---item end--> */}

            {/* <!---item 4--> */}
            {/* <div className="flex flex-col justify-center text-white text-center font-montserrat size-full max-w-[375px] mb-5 mx-auto">
              <h3 className="uppercase font-base font-semibold text-center mb-4">PACKAGE TEST</h3>
              <img src={pack_4} alt="pack_4" className="max-w-[288px] mx-auto relative z-10 mb-[-140px]" />
              <div className="package_card_bg bg-no-repeat bg-center pt-[155px] bg-contain min-w-full min-h-[445px]">
                <h2 className="mb-4 text-2xl font-semibold">$50.00</h2>
                <p className="font-semibold">Lorem</p>
                <p className="">1 month free access</p>
                <p className="mb-4">+ ipsum</p>
                <p className="font-semibold">Lorem ipsum dolor</p>
                <p className="">50</p>
              </div>
              <a href=""
                className="package_blue_btn flex justify-center self-center items-center relative z-10 bg-center bg-contain bg-no-repeat w-[244px] h-[63px] mt-[-30px] mx-auto uppercase text-black text-base font-semibold mb-14">
                choose NFT package
              </a>
            </div> */}
            {/* <!---item end--> */}

            {/* <!---item 5--> */}
            {/* <div className="flex flex-col justify-center text-white text-center font-montserrat size-full max-w-[375px] mb-5 mx-auto">
              <h3 className="uppercase font-base font-semibold text-center mb-4">PACKAGE TEST</h3>
              <img src={pack_5} alt="pack_5" className="max-w-[288px] mx-auto relative z-10 mb-[-140px]" />
              <div className="package_card_bg bg-no-repeat bg-center pt-[155px] bg-contain min-w-full min-h-[445px]">
                <h2 className="mb-4 text-2xl font-semibold">$50.00</h2>
                <p className="font-semibold">Lorem</p>
                <p className="">1 month free access</p>
                <p className="mb-4">+ ipsum</p>
                <p className="font-semibold">Lorem ipsum dolor</p>
                <p className="">50</p>
              </div>
              <a href=""
                className="package_blue_btn flex justify-center self-center items-center relative z-10 bg-center bg-contain bg-no-repeat w-[244px] h-[63px] mt-[-30px] mx-auto uppercase text-black text-base font-semibold mb-14">
                choose NFT package
              </a>
            </div> */}
            {/* <!---item end--> */}

            {/* <!---item 6--> */}
            {/* <div className="flex flex-col justify-center text-white text-center font-montserrat size-full max-w-[375px] mb-5 mx-auto">
              <h3 className="uppercase font-base font-semibold text-center mb-4">PACKAGE TEST</h3>
              <img src={pack_6} alt="pack_6" className="max-w-[288px] mx-auto relative z-10 mb-[-140px]" />
              <div className="package_card_bg bg-no-repeat bg-center pt-[155px] bg-contain min-w-full min-h-[445px]">
                <h2 className="mb-4 text-2xl font-semibold">$50.00</h2>
                <p className="font-semibold">Lorem</p>
                <p className="">1 month free access</p>
                <p className="mb-4">+ ipsum</p>
                <p className="font-semibold">Lorem ipsum dolor</p>
                <p className="">50</p>
              </div>
              <a href=""
                className="package_blue_btn flex justify-center self-center items-center relative z-10 bg-center bg-contain bg-no-repeat w-[244px] h-[63px] mt-[-30px] mx-auto uppercase text-black text-base font-semibold mb-14">
                choose NFT package
              </a>
            </div> */}
            {/* <!---item end--> */}

            {/* <!---item 7--> */}
            {/* <div className="flex flex-col justify-center text-white text-center font-montserrat size-full max-w-[375px] mb-5 mx-auto">
              <h3 className="uppercase font-base font-semibold text-center mb-4">PACKAGE TEST</h3>
              <img src={pack_7} alt="pack_7" className="max-w-[288px] mx-auto relative z-10 mb-[-140px]" />
              <div className="package_card_bg bg-no-repeat bg-center pt-[155px] bg-contain min-w-full min-h-[445px]">
                <h2 className="mb-4 text-2xl font-semibold">$50.00</h2>
                <p className="font-semibold">Lorem</p>
                <p className="">1 month free access</p>
                <p className="mb-4">+ ipsum</p>
                <p className="font-semibold">Lorem ipsum dolor</p>
                <p className="">50</p>
              </div>
              <a href=""
                className="package_blue_btn flex justify-center self-center items-center relative z-10 bg-center bg-contain bg-no-repeat w-[244px] h-[63px] mt-[-30px] mx-auto uppercase text-black text-base font-semibold mb-14">
                choose NFT package
              </a>
            </div> */}
            {/* <!---item end--> */}

            {/* <!---item 8--> */}
            {/* <div className="flex flex-col justify-center text-white text-center font-montserrat size-full max-w-[375px] mb-5 mx-auto">
              <h3 className="uppercase font-base font-semibold text-center mb-4">PACKAGE TEST</h3>
              <img src={pack_8} alt="pack_8" className="max-w-[288px] mx-auto relative z-10 mb-[-140px]" />
              <div className="package_card_bg bg-no-repeat bg-center pt-[155px] bg-contain min-w-full min-h-[445px]">
                <h2 className="mb-4 text-2xl font-semibold">$50.00</h2>
                <p className="font-semibold">Lorem</p>
                <p className="">1 month free access</p>
                <p className="mb-4">+ ipsum</p>
                <p className="font-semibold">Lorem ipsum dolor</p>
                <p className="">50</p>
              </div>
              <a href=""
                className="package_blue_btn flex justify-center self-center items-center relative z-10 bg-center bg-contain bg-no-repeat w-[244px] h-[63px] mt-[-30px] mx-auto uppercase text-black text-base font-semibold mb-14">
                choose NFT package
              </a>
            </div> */}
            {/* <!---item end--> */}

          </div>

        </div>
      </section>

    </>
  );
};

export default Buy;
