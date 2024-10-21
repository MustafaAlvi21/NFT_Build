import React, { useEffect, useState } from "react";

// UTILS
import { createAffiliateLink } from "../../utils/createAffiliateLink";

// COMPONENTS
import Accordion from "../../components/Accordion";
import MyButton1 from "../../components/MyButton1";
import QRcodeModal from "../../components/QRcodeModal";
import CopyToClipboardButton from "../../components/CopyToClipboardButton";
import { getCommissionLogsAPI } from "../../api/commissionLogs";
import { getMLMUsersAPI } from "../../api/user";
import {
  getTeamMembersRevenueApi,
  getTeamRevenue,
} from "../../api/teamMembers";

import content from "../../content.json"

import copyicon from "../../assets/copyicon-8538a49a.svg";
import pasteicon from "../../assets/pasteicon-cc8cc338.svg";

import afficon1 from "../../assets/afficon1-6d096605.svg";
import afficon2 from "../../assets/afficon2-02edb482.svg";
import afficon3 from "../../assets/afficon3-9bbc3273.svg";

import step1 from "../../assets/new_images/step-1.svg";
import step2 from "../../assets/new_images/step-2.svg";
import step3 from "../../assets/new_images/step-3.svg";
import { useParams } from "react-router-dom";




const Affiliate = ({ user, toastAlert }) => {
  const { id } = useParams();

  // STATES
  const [TableView, setTableView] = useState("tree");
  const [commissionLogs, setcommissionLogs] = useState([]);
  const [TeamData, setTeamData] = useState({
    teamMembers: 0,
    earnings: 2,
    revenue: 0,
  });
  const [TreeData, setTreeData] = useState([]);
  const [TeamListData, setTeamListData] = useState([]);

  const [earnings, setEarnings] = useState(0)

  const getAllCommissionLogs = async (userId) => {
    let p;
    if (
      userId &&
      userId !== null &&
      typeof userId !== undefined &&
      userId !== ""
    ) {
      p = userId;
    } else {
      p = user._id;
    }

    const res = await getCommissionLogsAPI(p);

    if (res.success) {
      setcommissionLogs(res.message);
    }
  };


  const getTeamMembersRevenue = async () => {
    let APIQuery = "";

    if (user.role == "admin") {
      APIQuery = `?qUser=${id}`;
    }


    const res = await getTeamMembersRevenueApi(APIQuery);
    const rev = await getTeamRevenue(APIQuery);

    let p = {};

    if (rev.success) {
      p.revenue = rev?.message;
    }

    if (res.success) {
      setTreeData(res.message);
      setTeamListData(res.teamList);
      p.teamMembers = res.teamMembers;

      if (user.role == "admin") {
        console.log("only ruins when admin sdsdd");
        console.log("only ruins when admin sdsdd", OpenUser.totalComission);
        if (OpenUser.totalComission) {
          setEarnings(OpenUser.totalComission)
        }
        // p.earnings = OpenUser.totalComission;
      } else {
        console.log("only ruins when user");
        setEarnings(user.totalComission)
        // p.earnings = user.totalComission;
      }

      setTeamData(p);
    }
  };

  const [OpenUser, setOpenUser] = useState({});

  const OpenedUser = async () => {
    try {
      const response = await getMLMUsersAPI({ _id: id });

      console.log("OpenedUser", response);

      if (response.success) {
        setOpenUser(response.message);
        // setTeamData({
        // ...TeamData,
        // earnings: parseFloat(response?.message?.totalComission),
        // });
        console.log("response?.message?.totalComission", response?.message?.totalComission);

        setEarnings(parseFloat(response?.message?.totalComission))
      }
    } catch (e) {
      console.log(e);
    }
  };


  useEffect(() => {

    console.log("user.role", user.role);

    if (user.role == "admin") {
      console.log("only run when admin");
      OpenedUser();
    }
    else {
      // setTeamData({
      //   ...TeamData,
      //   // earnings: parseFloat(user?.totalComission),
      // });
      console.log("only run when user");
      console.log("user?.totalComission", user?.totalComission);

      setEarnings(user?.totalComission)
    }
  }, []);


  useEffect(() => {
    if (user) {
      getAllCommissionLogs(id);
      getTeamMembersRevenue();
    }

  }, [user]);


  return (
    <>
      <section className="py-4 px-4 sm:px-12 bg-black">
        {/* MEMBERS REVENUE EARNINGS */}
        <div className="container mx-auto pt-[146px]  mb-14">
          <h1 className="text-blue-400 uppercase text-5xl text-center font-atami mb-28">
            Affiliate
          </h1>
          <div className="flex gap-[35px] flex-col lg:flex-row  ">
            <div className="border-cut-1 text-white min-h-[157px] flex items-center justify-center w-full">
              <div className="text-center">
                <h3 className="text-white text-base font-semibold mb-5">
                  TEAM MEMBERS
                </h3>
                <div className="text-2xl font-semibold">
                  {TeamData.teamMembers}
                </div>
              </div>
            </div>

            <div className="border-cut-1 text-white min-h-[157px] flex items-center justify-center w-full">
              <div className="text-center">
                <h3 className="text-white text-base font-semibold mb-5">
                  REVENUE
                </h3>
                <div className="text-2xl font-semibold">
                  ${TeamData.revenue?.toFixed(2)}
                </div>
              </div>
            </div>

            <div className="border-cut-1 text-white min-h-[157px] flex items-center justify-center w-full">
              <div className="text-center">
                <h3 className="text-white text-base font-semibold mb-5">
                  EARNINGS
                </h3>
                <div className="text-2xl font-semibold">
                  ${earnings?.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AFFILIATE LINK */}
        <div className="container mx-auto mb-14">
          <div className="border-cut-1 py-8">

            <div className="flex justify-between items-center text-white min-h-[50px] flex lg:items-center justify-between flex-col md:flex-row w-full px-8 py-6 lg:py-2">
              <div className="text-left">
                <h3 className="text-white text-base font-semibold mb-2">AFFILIATE LINK</h3>
                <div className="text-base ">

                  {user.role == "admin" ? (
                    <a
                      href={createAffiliateLink(user)}
                      className="text-white hover:text-blue-400"
                    >
                      {createAffiliateLink(user)}
                    </a>
                  ) : (
                    <a
                      href={createAffiliateLink(user)}
                      className="text-white hover:text-blue-400"
                    >
                      {createAffiliateLink(user)}
                    </a>
                  )}

                </div>
              </div>
              <div className="flex mt-4 lg:mt-0 gap-4 mr-4 flex-start md:flex-end">
                <CopyToClipboardButton text={createAffiliateLink(user)} />
                <QRcodeModal text={createAffiliateLink(user)} />
              </div>
            </div>


            <div className="flex justify-between lg:items-center text-white flex lg:items-center justify-between flex-col md:flex-row w-full px-8 py-6 lg:py-2">
              <div className="text-left">
                <h3 className="text-white text-base font-semibold mb-2"> Opensea </h3>
                <div className="text-base ">
                  <a href={`https://opensea.io/${user.walletAddress}`} target="_blank" className="text-white hover:text-blue-400" > {`https://opensea.io/${user.walletAddress}`} </a>
                </div>
              </div>
            </div>

            <div className="flex justify-between lg:items-center text-white flex lg:items-center justify-between flex-col md:flex-row w-full px-8 py-6 lg:py-2">
              <div className="text-left">
                <h3 className="text-white text-base font-semibold mb-2"> Polygon </h3>
                <div className="text-base ">
                  <a href={`https://polygonscan.com/token/0x752773363029157e600d2afd9a61e59e2b84642e?a=${user.walletAddress}`} target="_blank" className="text-white hover:text-blue-400" > {`https://polygonscan.com/token/0x752773363029157e600d2afd9a61e59e2b84642e`} </a>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* STEPS */}
        <div className="container mx-auto mb-14">
          <div className="flex gap-[35px] flex-col lg:flex-row ">
            <div className="border-cut-1 text-white min-h-[157px] flex items-center justify-center w-full px-10 pb-8">
              <div className="text-center">
                <img
                  src={step1}
                  alt="afficon1"
                  className="max-w-[150px] mx-auto mt-14 mb-12"
                />
                <h3 className="text-white text-base font-semibold mb-5"> STEP 1 </h3>
                <p>
                  {content.mlm.step1.text}
                </p>
              </div>
            </div>

            <div className="border-cut-1 text-white min-h-[157px] flex items-center justify-center w-full px-10 pb-8">
              <div className="text-center">
                <img
                  src={step2}
                  alt="afficon2"
                  className="max-w-[150px] mx-auto mt-14 mb-12"
                />
                <h3 className="text-white text-base font-semibold mb-5"> STEP 2 </h3>
                <p>
                  {content.mlm.step2.text}
                </p>
              </div>
            </div>

            <div className="border-cut-1 text-white min-h-[157px] flex items-center justify-center w-full px-10 pb-8">
              <div className="text-center">
                <img
                  src={step3}
                  alt="afficon3"
                  className="max-w-[150px] mx-auto mt-14 mb-12"
                />
                <h3 className="text-white text-base font-semibold mb-5"> STEP 3 </h3>
                <p>
                  {content.mlm.step3.text}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* TEAM DATA / TEAM TREE / TEAM LIST */}
        <div className="container mx-auto mb-14">
          <div className="border-cut-1 text-white min-h-[157px] items-center justify-start w-full px-8 py-8">
            <div className="text-left">
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-white text-base font-semibold uppercase">
                  YOUR TEAM
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setTableView("list")}
                    className="bg-blue-400 px-3 py-2 font-semibold text-black"
                  >
                    Team List
                  </button>
                  <button
                    onClick={() => setTableView("tree")}
                    className="bg-blue-400 px-3 py-2 font-semibold text-black"
                  >
                    Team Tree
                  </button>
                </div>
              </div>

              {!TreeData ||
                TreeData.length == 0 ||
                TreeData?.referredTo.length == 0 ? (
                <div className="mb-6">no team data found</div>
              ) : (
                <>
                  {
                    TableView == "list" ? (
                      <div className="relative overflow-x-auto shadow-md">
                        <table className="w-full text-sm text-left text-card-text">
                          <thead className="text-sm font-bold">
                            <tr>
                              <th scope="col" className="px-6 py-3">
                                Name
                              </th>
                              <th scope="col" className="px-6 py-3">
                                Level
                              </th>
                              <th scope="col" className="px-6 py-3">
                                Revenue
                              </th>
                              <th scope="col" className="px-6 py-3">
                                Your Comission
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {TeamListData?.referredTo.map((listData, index) => {
                              return (
                                <tr
                                  key={index}
                                  className="odd:bg-color-inverted/20  even:bg-transparent"
                                >
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    {listData?.walletAddress}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    {listData?.Level}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    {`${listData?.totalComission?.toFixed(
                                      3
                                    )} USDT`}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    {`${listData?.sponsorComission?.toFixed(
                                      3
                                    )} USDT`}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <TreeViewTable TreeData={TreeData} />
                    )}
                </>
              )}

              {/* <div className="text-base">no team data found</div> */}
            </div>
          </div>
        </div>

        {/* LATEST COMMISSIONS */}
        <div className="container mx-auto mb-14">
          <div className="border-cut-1 text-white min-h-[157px] items-center justify-start w-full px-8 py-8">
            <div className="text-left">
              <h3 className="text-white text-base font-semibold mb-5 uppercase">
                Latest comission
              </h3>

              {commissionLogs.length == 0 && (
                <div className="flex flex-col justify-start mb-6">
                  <h2 className="">no comission found</h2>
                </div>
              )}

              {commissionLogs.length > 0 && (
                <div className="relative overflow-x-auto shadow-md">
                  <table className="w-full text-sm text-left text-card-text">
                    <thead className="text-sm font-bold">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Referral
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Amount
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Time
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {commissionLogs.map((e) => {
                        return (
                          <tr
                            key={e._id}
                            className="odd:bg-color-inverted/20  even:bg-transparent "
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              {e?.affiliateWalletAddress}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {e?.amount?.toFixed(3)} USDT
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
              )}

              {/* <div className="text-base ">no comission found</div> */}
            </div>
          </div>
        </div>

        <div className="container mx-auto hidden">
          <div className="flex flex-col gap-8 md:col-span-2">
            {/* MEMBERS REVENUE EARNINGS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="card py-8 gap-2 text-card-text">
                <h4 className="text-xl font-semibold">Team Members</h4>
                <p className="text-4xl font-bold">{TeamData.teamMembers}</p>
              </div>
              <div className="card py-8 gap-2 text-card-text">
                <h4 className="text-xl font-semibold">Revenue</h4>
                <p className="text-4xl font-bold text-lime-600">
                  {TeamData.revenue?.toFixed(3)} USDT
                </p>
              </div>
              <div className="card py-8 gap-2 text-card-text">
                <h4 className="text-xl font-semibold">Earnings</h4>
                <p className="text-4xl font-bold text-lime-600">
                  {TeamData.earnings?.toFixed(3)} USDT
                </p>
              </div>
            </div>

            {/* AFFILIATE LINK */}
            <div className="card">
              <h2 className="h2">Affiliate Link</h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={createAffiliateLink(user)}
                  className="rounded-md w-full py-1"
                  disabled
                />
                <CopyToClipboardButton text={createAffiliateLink(user)} />
                <QRcodeModal text={createAffiliateLink(user)} />
              </div>
            </div>

            {/* STEPS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card min-h-[400px] w-full items-center">
                <img src={step1} className="max-w-[150px]" alt="logo" />
                <h4 className="text-2xl font-bold text-center">Step 1</h4>
                <p className="text-center">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
                  quod quibusdam quae sed animi maiores, deleniti incidunt omnis
                  unde cupiditate.
                </p>
              </div>
              <div className="card min-h-[400px] w-full items-center">
                <img src={step2} className="max-w-[150px]" alt="logo" />
                <h4 className="text-2xl font-bold text-center">Step 2</h4>
                <p className="text-center">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
                  quod quibusdam quae sed animi maiores, deleniti incidunt omnis
                  unde cupiditate.
                </p>
              </div>
              <div className="card min-h-[400px] w-full items-center">
                <img src={step3} className="max-w-[150px]" alt="logo" />
                <h4 className="text-2xl font-bold text-center">Step 3</h4>
                <p className="text-center">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
                  quod quibusdam quae sed animi maiores, deleniti incidunt omnis
                  unde cupiditate.
                </p>
              </div>
            </div>

            {/* TEAM DATA / TEAM TREE / TEAM LIST */}
            <div className="card">
              <div className="flex justify-between items-center">
                <h2 className="h2">Your Team</h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setTableView("list")}
                    className="rounded-md bg-color-unique px-2 text-card-text font-semibold"
                  >
                    Team List
                  </button>
                  <button
                    onClick={() => setTableView("tree")}
                    className="rounded-md bg-color-unique px-2 text-card-text font-semibold"
                  >
                    Team Tree
                  </button>
                </div>
              </div>
              {!TreeData ||
                TreeData.length == 0 ||
                TreeData?.referredTo.length == 0 ? (
                <div className="mb-6">no team data found</div>
              ) : (
                <>
                  {TableView == "list" ? (
                    <div className="relative overflow-x-auto shadow-md">
                      <table className="w-full text-sm text-left text-card-text">
                        <thead className="text-sm font-bold">
                          <tr>
                            <th scope="col" className="px-6 py-3">
                              Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Level
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Revenue
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Your Comission
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {TeamListData?.referredTo.map((listData, index) => {
                            return (
                              <tr
                                key={index}
                                className="odd:bg-color-inverted/20  even:bg-transparent"
                              >
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {listData?.walletAddress}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {listData?.Level}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {`${listData?.totalComission?.toFixed(
                                    3
                                  )} USDT`}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {`${listData?.sponsorComission?.toFixed(
                                    3
                                  )} USDT`}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <TreeViewTable TreeData={TreeData} />
                  )}
                </>
              )}
            </div>

            {/* LATEST COMMISSIONS */}
            <div className="card h-max">
              <h2 className="h2">Latest Comissions</h2>

              {commissionLogs.length == 0 && (
                <div className="flex flex-col justify-center items-center mb-6">
                  <h2 className="h2">No Commissions Found</h2>
                </div>
              )}

              {commissionLogs.length > 0 && (
                <div className="relative overflow-x-auto shadow-md">
                  <table className="w-full text-sm text-left text-card-text">
                    <thead className="text-sm font-bold">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Referral
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Amount
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Time
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {commissionLogs.map((e) => {
                        return (
                          <tr
                            key={e._id}
                            className="odd:bg-color-inverted/20  even:bg-transparent "
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              {e?.affiliateWalletAddress}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {e?.amount?.toFixed(3)} USDT
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
              )}
            </div>
          </div>
          {/* 
          <div className="md:col-span-1">
            <div className='card h-max'>
              <h2 className='h2'>Help</h2>

              <div className='iframe-parent'>
                <iframe className='iframe' src="https://www.youtube.com/embed/NpEaa2P7qZI" title="video" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
              </div>
              <Accordion />
            </div>

          </div> */}
        </div>
      </section>
    </>
  );
};

export default Affiliate;

export function TreeViewTable({ TreeData }) {
  // const data = [
  //     {
  //         id: 1,
  //         name: 'Parent Name 1',
  //         level: 'Parent Level 1',
  //         revenue: '$100,000',
  //         commissions: '$20,000',
  //         investment: '$80,000',
  //         viewDetail: <button className="btn detail_btn" onClick={() => console.log('View Detail clicked')}>View Detail</button>,
  //         children: [
  //             {
  //                 id: 2,
  //                 name: 'Child Name 1.1',
  //                 level: 'Child Level 1.1',
  //                 revenue: '$30,000',
  //                 commissions: '$6,000',
  //                 investment: '$24,000',
  //                 viewDetail: <button className="btn detail_btn" onClick={() => console.log('View Detail clicked')}>View Detail</button>,
  //                 children: [
  //                     {
  //                         id: 3,
  //                         name: 'Child Name 1.2',
  //                         level: 'Child Level 1.2',
  //                         revenue: '$100,000',
  //                         commissions: '$20,000',
  //                         investment: '$80,000',
  //                         viewDetail: <button className="btn detail_btn" onClick={() => console.log('View Detail clicked')}>View Detail</button>,
  //                         children: [
  //                             {
  //                                 id: 33,
  //                                 name: 'Child Name 1.2.1',
  //                                 level: 'Child Level 1.2.1',
  //                                 revenue: '$100,000',
  //                                 commissions: '$20,000',
  //                                 investment: '$80,000',
  //                                 viewDetail: <button className="btn detail_btn" onClick={() => console.log('View Detail clicked')}>View Detail</button>,
  //                             },
  //                             {
  //                                 id: 333,
  //                                 name: 'Child Name 1.2.2',
  //                                 level: 'Child Level 1.2.2',
  //                                 revenue: '$100,000',
  //                                 commissions: '$20,000',
  //                                 investment: '$80,000',
  //                                 viewDetail: <button className="btn detail_btn" onClick={() => console.log('View Detail clicked')}>View Detail</button>,
  //                             },
  //                         ]
  //                     },
  //                     {
  //                         id: 4,
  //                         name: 'Child Name 1.3',
  //                         level: 'Child Level 1.3',
  //                         revenue: '$100,000',
  //                         commissions: '$20,000',
  //                         investment: '$80,000',
  //                         viewDetail: <button className="btn detail_btn" onClick={() => console.log('View Detail clicked')}>View Detail</button>,
  //                     },
  //                 ],
  //             },
  //             {
  //                 id: 5,
  //                 name: 'Child #2 of Parent #1',
  //                 level: 'Parent Level 1',
  //                 revenue: '$100,000',
  //                 commissions: '$20,000',
  //                 investment: '$80,000',
  //                 viewDetail: <button className="btn detail_btn" onClick={() => console.log('View Detail clicked')}>View Detail</button>,
  //                 children: [
  //                     {
  //                         id: 6,
  //                         name: 'Child #2.1 of Child #2',
  //                         level: 'Parent Level 1',
  //                         revenue: '$100,000',
  //                         commissions: '$20,000',
  //                         investment: '$80,000',
  //                         viewDetail: <button className="btn detail_btn" onClick={() => console.log('View Detail clicked')}>View Detail</button>,
  //                     }
  //                 ]
  //             },
  //             {
  //                 id: 13,
  //                 name: 'Child #3 of Parent #1',
  //                 level: 'Parent Level 1',
  //                 revenue: '$100,000',
  //                 commissions: '$20,000',
  //                 investment: '$80,000',
  //                 viewDetail: <button className="btn detail_btn" onClick={() => console.log('View Detail clicked')}>View Detail</button>,
  //                 children: [
  //                     {
  //                         id: 14,
  //                         name: 'Child #3.1 of Child #3',
  //                         level: 'Parent Level 1',
  //                         revenue: '$100,000',
  //                         commissions: '$20,000',
  //                         investment: '$80,000',
  //                         viewDetail: <button className="btn detail_btn" onClick={() => console.log('View Detail clicked')}>View Detail</button>,
  //                     }
  //                 ]
  //             },
  //             {
  //                 id: 15,
  //                 name: 'Child #4 of Parent #1',
  //                 level: 'Parent Level 1',
  //                 revenue: '$100,000',
  //                 commissions: '$20,000',
  //                 investment: '$80,000',
  //                 viewDetail: <button className="btn detail_btn" onClick={() => console.log('View Detail clicked')}>View Detail</button>,
  //                 children: [
  //                     {
  //                         id: 16,
  //                         name: 'Child #4.1 of Child #4',
  //                         level: 'Parent Level 1',
  //                         revenue: '$100,000',
  //                         commissions: '$20,000',
  //                         investment: '$80,000',
  //                         viewDetail: <button className="btn detail_btn" onClick={() => console.log('View Detail clicked')}>View Detail</button>,
  //                     }
  //                 ]
  //             },
  //             {
  //                 id: 17,
  //                 name: 'Child #5 of Parent #1',
  //                 level: 'Parent Level 1',
  //                 revenue: '$100,000',
  //                 commissions: '$20,000',
  //                 investment: '$80,000',
  //                 viewDetail: <button className="btn detail_btn" onClick={() => console.log('View Detail clicked')}>View Detail</button>,
  //                 children: [
  //                     {
  //                         id: 18,
  //                         name: 'Child #5.1 of Child #5',
  //                         level: 'Parent Level 1',
  //                         revenue: '$100,000',
  //                         commissions: '$20,000',
  //                         investment: '$80,000',
  //                         viewDetail: <button className="btn detail_btn" onClick={() => console.log('View Detail clicked')}>View Detail</button>,
  //                     }
  //                 ]
  //             },
  //         ],
  //     },
  //     {
  //         id: 7,
  //         name: 'Parent Name 2',
  //         level: 'Parent Level 2',
  //         revenue: '$150,000',
  //         commissions: '$30,000',
  //         investment: '$120,000',
  //         viewDetail: <button className='btn detail_btn' onClick={() => console.log('View Detail clicked')}>View Detail</button>,
  //         children: [
  //             {
  //                 id: 8,
  //                 // label: 'Child #1 of Parent #2',
  //                 name: 'Child Name 2.1',
  //                 level: 'Child Level 2.1',
  //                 revenue: '$40,000',
  //                 commissions: '$8,000',
  //                 investment: '$32,000',
  //                 viewDetail: <button className='btn detail_btn' onClick={() => console.log('View Detail clicked')}>View Detail</button>,
  //             },
  //             {
  //                 id: 10,
  //                 // label: 'Child #2 of Parent #2',
  //                 name: 'Child Name 3.1',
  //                 children: [
  //                     { id: 11, name: 'Child #2.1 of Child #2' },
  //                     { id: 12, name: 'Child #2.2 of Child #2' },
  //                 ],
  //             },
  //             { id: 19, name: 'Child #3 of Parent #2', children: [{ id: 20, name: 'Child #3.1 of Child #3' }] },
  //             {
  //                 id: 21,
  //                 name: 'Child #4 of Parent #2',
  //                 // label: 'Child #4 of Parent #2',
  //                 children: [{ id: 22, name: 'Child #4.1 of Child #4' }],
  //             },
  //             { id: 23, name: 'Child #5 of Parent #2', children: [{ id: 24, name: 'Child #5.1 of Child #5' }] },
  //         ],
  //     },
  //     // Add other parents
  // ];

  let a = 0;

  // const data = [
  //     {
  //         user: {
  //             "id": "65d734dfaeb5c06622b7e14a",
  //             "name": "U1",
  //             "lastname": "Level - NA",
  //             "email": "u1@gmai.com",
  //             "password": "123456",
  //             "status": "active",
  //             "role": "user",
  //             "deposited": 0,
  //             "invested": 0,
  //             "profit": 0,
  //             "lastLogin": null,
  //             "kyc": null,
  //             "referralCode": "wkzS0pjC90",
  //             "referredBy": [],
  //             "children": [
  //                 {
  //                     "user": {
  //                         "id": "65d735e1aeb5c06622b7e14f",
  //                         "name": "U2",
  //                         "lastname": "Level - 1",
  //                         "children": [
  //                             {
  //                                 "user": {
  //                                     "id": "65d736ceaeb5c06622b7e159",
  //                                     "name": "U4",
  //                                     "lastname": "Level - 2",
  //                                     "children": [
  //                                         {
  //                                             "user": {
  //                                                 "id": "65d7372daeb5c06622b7e16d",
  //                                                 "name": "U8",
  //                                                 "lastname": "Level - 3",
  //                                                 "children": []
  //                                             }
  //                                         },
  //                                         {
  //                                             "user": {
  //                                                 "id": "65d73751aeb5c06622b7e172",
  //                                                 "name": "U9",
  //                                                 "lastname": "Level - 3",
  //                                                 "children": []
  //                                             }
  //                                         }
  //                                     ]
  //                                 }
  //                             },
  //                             {
  //                                 "user": {
  //                                     "id": "65d736d9aeb5c06622b7e15e",
  //                                     "name": "U5",
  //                                     "lastname": "Level - 2",
  //                                     "children": [
  //                                         {
  //                                             "user": {
  //                                                 "id": "65d7377baeb5c06622b7e177",
  //                                                 "name": "U10",
  //                                                 "lastname": "Level - 3",
  //                                                 "children": []
  //                                             }
  //                                         },
  //                                         {
  //                                             "user": {
  //                                                 "id": "65d73783aeb5c06622b7e17c",
  //                                                 "name": "U11",
  //                                                 "lastname": "Level - 3",
  //                                                 "children": []
  //                                             }
  //                                         }
  //                                     ]
  //                                 }
  //                             }
  //                         ]
  //                     }
  //                 },
  //                 {
  //                     "user": {
  //                         "id": "65d736b3aeb5c06622b7e154",
  //                         "name": "U3",
  //                         "lastname": "Level - 1",
  //                         "children": [
  //                             {
  //                                 "user": {
  //                                     "id": "65d736f4aeb5c06622b7e163",
  //                                     "name": "U6",
  //                                     "lastname": "Level - 2",
  //                                     "children": [
  //                                         {
  //                                             "user": {
  //                                                 "id": "65d737a6aeb5c06622b7e181",
  //                                                 "name": "U12",
  //                                                 "lastname": "Level - 3",
  //                                                 "children": []
  //                                             }
  //                                         },
  //                                         {
  //                                             "user": {
  //                                                 "id": "65d737aeaeb5c06622b7e186",
  //                                                 "name": "U13",
  //                                                 "lastname": "Level - 3",
  //                                                 "children": []
  //                                             }
  //                                         }
  //                                     ]
  //                                 }
  //                             },
  //                             {
  //                                 "user": {
  //                                     "id": "65d736fbaeb5c06622b7e168",
  //                                     "name": "U7",
  //                                     "lastname": "Level - 2",
  //                                     "children": [
  //                                         {
  //                                             "user": {
  //                                                 "id": "65d737e1aeb5c06622b7e18b",
  //                                                 "name": "U14",
  //                                                 "lastname": "Level - 3",
  //                                                 "children": []
  //                                             }
  //                                         },
  //                                         {
  //                                             "user": {
  //                                                 "id": "65d737e9aeb5c06622b7e190",
  //                                                 "name": "U15",
  //                                                 "lastname": "Level - 3",
  //                                                 "children": []
  //                                             }
  //                                         }
  //                                     ]
  //                                 }
  //                             }
  //                         ]
  //                     }
  //                 }
  //             ],

  //         }
  //     }
  // ]

  let data = [...TreeData.referredTo];

  // const data = [
  //   {
  //     affiliate: {
  //       "_id": "65d734dfaeb5c06622b7e14a",
  //       "firstname": "U1",
  //       "lastname": "Level - 0",
  //       "email": "u1@gmai.com",
  //       "password": "123456",
  //       "status": "active",
  //       "role": "user",
  //       "deposited": 0,
  //       "invested": 0,
  //       "profit": 0,
  //       "lastLogin": null,
  //       "kyc": null,
  //       "referralCode": "wkzS0pjC90",
  //       "referredBy": [],
  //       "referredTo": [
  //         {
  //           "affiliate": {
  //             "_id": "65d735e1aeb5c06622b7e14f",
  //             "firstname": "U2",
  //             "lastname": "Level - 1",
  //             "referredTo": [
  //               {
  //                 "affiliate": {
  //                   "_id": "65d736ceaeb5c06622b7e159",
  //                   "firstname": "U4",
  //                   "lastname": "Level - 2",
  //                   "referredTo": [
  //                     {
  //                       "affiliate": {
  //                         "_id": "65d7372daeb5c06622b7e16d",
  //                         "firstname": "U8",
  //                         "lastname": "Level - 3",
  //                         "referredTo": []
  //                       }
  //                     },
  //                     {
  //                       "affiliate": {
  //                         "_id": "65d73751aeb5c06622b7e172",
  //                         "firstname": "U9",
  //                         "lastname": "Level - 3",
  //                         "referredTo": []
  //                       }
  //                     }
  //                   ]
  //                 }
  //               },
  //               {
  //                 "affiliate": {
  //                   "_id": "65d736d9aeb5c06622b7e15e",
  //                   "firstname": "U5",
  //                   "lastname": "Level - 2",
  //                   "referredTo": [
  //                     {
  //                       "affiliate": {
  //                         "_id": "65d7377baeb5c06622b7e177",
  //                         "firstname": "U10",
  //                         "lastname": "Level - 3",
  //                         "referredTo": []
  //                       }
  //                     },
  //                     {
  //                       "affiliate": {
  //                         "_id": "65d73783aeb5c06622b7e17c",
  //                         "firstname": "U11",
  //                         "lastname": "Level - 3",
  //                         "referredTo": []
  //                       }
  //                     }
  //                   ]
  //                 }
  //               }
  //             ]
  //           }
  //         },
  //         {
  //           "affiliate": {
  //             "_id": "65d736b3aeb5c06622b7e154",
  //             "firstname": "U3",
  //             "lastname": "Level - 1",
  //             "referredTo": [
  //               {
  //                 "affiliate": {
  //                   "_id": "65d736f4aeb5c06622b7e163",
  //                   "firstname": "U6",
  //                   "lastname": "Level - 2",
  //                   "referredTo": [
  //                     {
  //                       "affiliate": {
  //                         "_id": "65d737a6aeb5c06622b7e181",
  //                         "firstname": "U12",
  //                         "lastname": "Level - 3",
  //                         "referredTo": []
  //                       }
  //                     },
  //                     {
  //                       "affiliate": {
  //                         "_id": "65d737aeaeb5c06622b7e186",
  //                         "firstname": "U13",
  //                         "lastname": "Level - 3",
  //                         "referredTo": []
  //                       }
  //                     }
  //                   ]
  //                 }
  //               },
  //               {
  //                 "affiliate": {
  //                   "_id": "65d736fbaeb5c06622b7e168",
  //                   "firstname": "U7",
  //                   "lastname": "Level - 2",
  //                   "referredTo": [
  //                     {
  //                       "affiliate": {
  //                         "_id": "65d737e1aeb5c06622b7e18b",
  //                         "firstname": "U14",
  //                         "lastname": "Level - 3",
  //                         "referredTo": []
  //                       }
  //                     },
  //                     {
  //                       "affiliate": {
  //                         "_id": "65d737e9aeb5c06622b7e190",
  //                         "firstname": "U15",
  //                         "lastname": "Level - 3",
  //                         "referredTo": []
  //                       }
  //                     }
  //                   ]
  //                 }
  //               }
  //             ]
  //           }
  //         }
  //       ],
  //       "commission": 0,
  //       "timestamp": 1708602591678,
  //       "__v": 0
  //     }
  //   }
  // ]

  const removeMinus = (value) => {
    let number = value.toString();

    if (number.includes("-")) {
      return parseFloat(number.split("-")[1]);
    }

    return parseFloat(value);
  };

  const [expandedRows, setExpandedRows] = useState([]);

  const handleToggle = (rowId) => {
    setExpandedRows((prevExpandedRows) =>
      prevExpandedRows.includes(rowId)
        ? prevExpandedRows.filter((id) => id !== rowId)
        : [...prevExpandedRows, rowId]
    );
  };

  const renderRows = (rows, indentationLevel = 0) => {
    return rows.flatMap((row) => {
      const parentRow = (
        <tr
          key={row.affiliate._id}
          id={row.affiliate._id}
          className="odd:bg-color-inverted/20  even:bg-transparent"
        >
          <td className="px-6 py-4 whitespace-nowrap flex items-center">
            <span
              onClick={() => handleToggle(row.affiliate._id)}
              className="flex"
              style={{
                marginLeft: `${0 + 1.5 * indentationLevel}rem`,
                cursor: "pointer",
                paddingLeft: `${typeof row?.affiliate.referredTo !== "undefined" &&
                  row?.affiliate.referredTo.length > 0
                  ? 0
                  : 2
                  }rem`,
              }}
            >
              {typeof row.affiliate.referredTo !== "undefined" &&
                row.affiliate.referredTo.length > 0 &&
                indentationLevel + 1 < 5 && (
                  <>
                    {expandedRows.includes(row.affiliate._id) ? (
                      <button className="rounded-full w-6 h-6 flex justify-center items-center bg-color-unique mr-2">
                        -
                      </button>
                    ) : (
                      <button className="rounded-full w-6 h-6 flex justify-center items-center bg-color-unique mr-2">
                        +
                      </button>
                    )}
                  </>
                )}
            </span>
            {row.affiliate?.walletAddress}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            {indentationLevel + 1}
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            {row.affiliate?.totalComission?.toFixed(3)} USDT
          </td>
          {/* <td className='px-6 py-4 whitespace-nowrap'>
            {row.affiliate?.referredBy && ((row.affiliate?.referredBy.find(d => d.affiliate == affiliate?._id))?.commission ? formatter.format((row.affiliate?.referredBy.find(d => d.affiliate == affiliate?._id))?.commission || 0) : 0.00)}
          </td> */}
          <td className="px-6 py-4 whitespace-nowrap">
            {row.affiliate.sponsorComission?.toFixed(3)} USDT
          </td>
        </tr>
      );

      const childRows =
        expandedRows.includes(row.affiliate._id) &&
          row.affiliate.referredTo &&
          row.affiliate.referredTo.length > 0
          ? renderRows(row.affiliate.referredTo, indentationLevel + 1)
          : [];

      return [parentRow, ...childRows];
    });
  };

  return (
    <div className="relative overflow-x-auto shadow-md">
      <table className="w-full text-sm text-left text-card-text">
        <thead className="text-sm font-bold">
          <tr>
            <th scope="col" className="px-6 py-3">
              {"Name"}
            </th>
            <th scope="col" className="px-6 py-3">
              {"Level"}
            </th>
            <th scope="col" className="px-6 py-3">
              {"Revenue"}
            </th>
            <th scope="col" className="px-6 py-3">
              {"Your Commissions"}
            </th>
            {/* <th>View Detail</th> */}
          </tr>
        </thead>
        <tbody>{renderRows(data)}</tbody>
      </table>
    </div>
  );
}
