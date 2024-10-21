import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllUsersAPI } from "../../../api/user";


const Users = ({ user, toastAlert }) => {
  // STATES
  const [commissionLogs, setcommissionLogs] = useState([
    {
      affiliateWalletAddress: "sdasjhdad",
      amount: "zsdzdszsd",
      name: "zsddsdz",
    },
    {
      affiliateWalletAddress: "sdasjhdad",
      amount: "zsdzdszsd",
      name: "zsddsdz",
    },
    {
      affiliateWalletAddress: "sdasjhdad",
      amount: "zsdzdszsd",
      name: "zsddsdz",
    },
    {
      affiliateWalletAddress: "sdasjhdad",
      amount: "zsdzdszsd",
      name: "zsddsdz",
    },
  ]);


  const [allUsers,setAllUsers] = useState([])

  const getUsers = async ()=>{
    try{
        const response = await getAllUsersAPI()
        if(response.success)
        {
            setAllUsers(response.message)
        }
    } 
    catch(e)
    {
        console.log(e);
    }
  }
  useEffect(() => {
    getUsers()
  }, []);

  return (
    <>
      <section className="py-4 px-4 sm:px-12 bg-black">
        {/* LATEST COMMISSIONS */}
        <div className="container mx-auto mt-24">
          <div className="border-cut-1 text-white min-h-[157px] items-center justify-start w-full px-8 py-8">
            <div className="text-left">
              <h3 className="text-white text-base font-semibold mb-5 uppercase">
                All Users
              </h3>

              {commissionLogs.length == 0 && (
                <div className="flex flex-col justify-center items-center mb-6">
                  <h2 className="h2">No Users Found</h2>
                </div>
              )}

              {commissionLogs.length > 0 && (
                <div className="relative overflow-x-auto shadow-md">
                  <table className="w-full text-sm text-left text-card-text">
                    <thead className="text-sm font-bold">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Wallet Address
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Total Comission
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Total Investment
                        </th>
                        <th scope="col" className="px-6 py-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {allUsers.map((e) => {
                        return (
                          <tr
                            key={e._id}
                            className="odd:bg-color-inverted/20  even:bg-transparent "
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              {e?.walletAddress}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {e?.totalComission}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {e.totalInvestment}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Link
                                to={`/user/mlm/${e._id}`}
                                className="py-2 px-2 font-bold text-card-text rounded-md transition-all duration-300 bg-color-unique hover:bg-color-unique/80 text-center"
                              >
                                Affiliate{" "}
                              </Link>
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
      </section>
    </>
  );
};

export default Users;
