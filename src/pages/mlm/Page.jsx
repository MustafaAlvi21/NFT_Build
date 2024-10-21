import React from 'react'

import copyicon from "../../assets/copyicon-8538a49a.svg"
import pasteicon from "../../assets/pasteicon-cc8cc338.svg"

import afficon1 from "../../assets/afficon1-6d096605.svg"
import afficon2 from "../../assets/afficon2-02edb482.svg"
import afficon3 from "../../assets/afficon3-9bbc3273.svg"

function MLM() {
    return (
        <>

            <main className='bg-black'>

                {/* <!-------------sec 1------------> */}
                <div className="container mx-auto pt-[146px] mb-14">
                    <h1 className="text-blue-400 uppercase text-5xl text-center font-atami mb-28">Affiliate</h1>
                    <div className="flex gap-[35px] flex-col lg:flex-row  ">
                        <div className="border-cut-1 text-white min-h-[157px] flex items-center justify-center w-full">
                            <div className="text-center">
                                <h3 className="text-white text-base font-semibold mb-5">TEAM MEMBERS</h3>
                                <div className="text-2xl font-semibold">$0</div>
                            </div>
                        </div>

                        <div className="border-cut-1 text-white min-h-[157px] flex items-center justify-center w-full">
                            <div className="text-center">
                                <h3 className="text-white text-base font-semibold mb-5">REVENUE</h3>
                                <div className="text-2xl font-semibold">$0</div>
                            </div>
                        </div>

                        <div className="border-cut-1 text-white min-h-[157px] flex items-center justify-center w-full">
                            <div className="text-center">
                                <h3 className="text-white text-base font-semibold mb-5">EARNINGS</h3>
                                <div className="text-2xl font-semibold">$0</div>
                            </div>
                        </div>

                    </div>
                </div>
                {/* <!-------------sec 1 end------------> */}


                {/* <!-------------sec 2------------> */}
                <div className="container mx-auto mb-14">
                    <div className="border-cut-1 text-white min-h-[157px] flex lg:items-center justify-between flex-col md:flex-row w-full px-8 py-6 lg:py-2">
                        <div className="text-left">
                            <h3 className="text-white text-base font-semibold mb-5">AFFILIATE LINK</h3>
                            <div className="text-base "><a href="webaddress.com/wa-web-v1?node-id=2-dfsdgsdg"
                                className="text-white hover:text-blue-400">webaddress.com/wa-web-v1?node-id=2-dfsdgsdg</a>
                            </div>
                        </div>
                        <div className="flex  mt-4 lg:mt-0 gap-9 mr-4 flex-start md:flex-end">
                            <a href=""><img src={copyicon} alt="" /></a>
                            <a href=""><img src={pasteicon} alt="" /></a>
                        </div>
                    </div>
                </div>
                {/* <!-------------sec 2 end------------> */}


                {/* <!-------------sec 3------------> */}
                <div className="container mx-auto mb-14">

                    <div className="flex gap-[35px] flex-col lg:flex-row ">
                        <div className="border-cut-1 text-white min-h-[157px] flex items-center justify-center w-full px-10 pb-8">
                            <div className="text-center">
                                <img src={afficon1} alt="afficon1" className="mx-auto mt-14 mb-12" />
                                <h3 className="text-white text-base font-semibold mb-5">STEP 1</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elementum pulvinar eros, ut euismod purus ultricies sit amet. Praesent ut pretium turpis, a imperdiet justo.</p>
                            </div>
                        </div>

                        <div className="border-cut-1 text-white min-h-[157px] flex items-center justify-center w-full px-10 pb-8">
                            <div className="text-center">
                                <img src={afficon2} alt="afficon2" className="mx-auto mt-14 mb-12" />
                                <h3 className="text-white text-base font-semibold mb-5">STEP 2</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elementum pulvinar eros, ut euismod purus ultricies sit amet. Praesent ut pretium turpis, a imperdiet justo.</p>
                            </div>
                        </div>

                        <div className="border-cut-1 text-white min-h-[157px] flex items-center justify-center w-full px-10 pb-8">
                            <div className="text-center">
                                <img src={afficon3} alt="afficon3" className="mx-auto mt-14 mb-12" />
                                <h3 className="text-white text-base font-semibold mb-5">STEP 3</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elementum pulvinar eros, ut euismod purus ultricies sit amet. Praesent ut pretium turpis, a imperdiet justo.</p>
                            </div>
                        </div>

                    </div>
                </div>
                {/* <!-------------sec 3 end------------> */}


                {/* <!-------------sec 4------------> */}
                <div className="container mx-auto mb-14">
                    <div className="border-cut-1 text-white min-h-[157px] items-center justify-start w-full px-8 py-8">
                        <div className="text-left">
                            <h3 className="text-white text-base font-semibold mb-5 uppercase">YOUR TEAM</h3>

                            <table className="table w-full">
                                <thead className='border-y border-[#77aafa]'>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">First</th>
                                        <th scope="col">Last</th>
                                        <th scope="col">Handle</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Larry the Bird</td>
                                        <td>Otto</td>
                                        <td>@twitter</td>
                                    </tr>
                                </tbody>
                            </table>


                            {/* <div className="text-base">no team data found</div> */}
                        </div>
                    </div>
                </div>
                {/* <!-------------sec 4 end------------> */}


                {/* <!-------------sec 5------------> */}
                <div className="container mx-auto mb-14">
                    <div className="border-cut-1 text-white min-h-[157px] items-center justify-start w-full px-8 py-8">
                        <div className="text-left">
                            <h3 className="text-white text-base font-semibold mb-5 uppercase">Latest comission</h3>

                            <table className="table w-full">
                                <thead className='border-y border-[#77aafa]'>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">First</th>
                                        <th scope="col">Last</th>
                                        <th scope="col">Handle</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Larry the Bird</td>
                                        <td>Otto</td>
                                        <td>@twitter</td>
                                    </tr>
                                </tbody>
                            </table>

                            {/* <div className="text-base ">no comission found</div> */}
                        </div>
                    </div>
                </div>
                {/* <!-------------sec 5 end------------> */}

            </main>
        </>
    )
}

export default MLM
