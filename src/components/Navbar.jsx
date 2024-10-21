import { Fragment, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
// import { useAuth } from "../ContextAPI/Components/auth";
// DOMAINS
import { MLMDomains, adminDomains, buyDomains, wholeAppDomains } from "../config";
// import Logo from "../assets/logo-lorem.png"

import Logo from "../assets/logo-98446daa.svg"




const Navbar = ({ user, setuser, isValidObject }) => {

    // REACT HOOKS
    const navigate = useNavigate()

    // STATES
    const [isToggled, setisToggled] = useState(false)
    const [darkMode, setdarkMode] = useState(false)

    let links = []

    if (buyDomains.includes(window.location.origin)) {
        links = [
            {
                name: "Packages",
                auth: false,
                link: '/packages',
                role: "user"
            },
            {
                name: "Roadmap",
                auth: false,
                link: './#roadmap',
                role: "user"
            },
            {
                name: "Docs",
                auth: false,
                link: 'https://docs.clonely.io/',
                role: "user"
            },
            {
                name: "Contact",
                auth: false,
                link: './#contact',
                role: "user"
            },
            {
                name: "About",
                auth: false,
                link: './#about',
                role: "user"
            },
            {
                name: "Connect Your Wallet",
                auth: false,
                link: 'https://team.clonely.io',
                role: "user"
            },
        ]
    }

    else if (adminDomains.includes(window.location.origin)) {
        links = [
            {
                name: 'Payouts',
                auth: true,
                link: '/admin-payout',
                role: "admin"
            },
            {
                name: 'Packages',
                auth: true,
                link: '/admin-packages',
                role: "admin"
            },
            {
                name: 'Creact Package',
                auth: true,
                link: '/admin-create-package',
                role: "admin"
            },
            {
                name: 'Platform',
                auth: true,
                link: '/admin-platform',
                role: "admin"
            },
            {
                name: 'users',
                auth: true,
                link: '/users',
                role: "admin"
            },
            {
                name: 'general',
                auth: true,
                link: '/general',
                role: "admin"
            },
        ]
    }

    else if (MLMDomains.includes(window.location.origin)) {
        links = [
            {
                name: 'Home',
                auth: false,
                link: 'https://clonely.io',
                role: "user"
            },
            {
                name: 'Home',
                auth: false,
                link: 'https://clonely.io',
                role: "admin"
            },
            {
                name: 'Affiliate',
                auth: true,
                link: '/affiliate',
                role: "admin"
            },
            {
                name: 'Affiliate',
                auth: true,
                link: '/affiliate',
                role: "user"
            },
            {
                name: 'Payments',
                auth: true,
                link: '/deposit-logs',
                role: "admin"
            },
            {
                name: 'Payments',
                auth: true,
                link: '/deposit-logs',
                role: "user"
            },
            {
                name: 'Withdraw',
                auth: true,
                link: '/withdraw',
                role: "user"
            },
            {
                name: 'Withdraw',
                auth: true,
                link: '/withdraw',
                role: "admin"
            },
            // {
            //     name: 'Connect Your Wallet',
            //     auth: true,
            //     link: 'https://team.clonely.io',
            //     role: "admin"
            // },
            // {
            //     name: 'Connect Your Wallet',
            //     auth: true,
            //     link: 'https://team.clonely.io',
            //     role: "user"
            // },
        ]
    }

    else if (wholeAppDomains.includes(window.location.origin)) {
        links = [
            {
                name: 'Home',
                link: '/',
                role: "user"
            },
            {
                name: 'Conect Wallet',
                link: 'https://team.clonely.io',
                role: "user"
            },
            {
                name: 'Buy',
                link: '/buy',
                role: "user"
            },
            {
                name: 'Withdraw',
                link: '/withdraw',
                role: "user"
            },
            {
                name: 'FAQs',
                link: '/faqs',
                role: "user"
            },
            {
                name: 'Payouts',
                link: '/admin-payout',
                role: "admin"
            },
        ]
    }

    const token = sessionStorage.getItem("pk2")

    const logout = () => {
        sessionStorage.removeItem('pk2');
        setuser({})
        navigate('/')
    }

    useEffect(() => {
        if (darkMode == false) {
            document.documentElement.setAttribute('theme-mode', 'light');
        } else {
            document.documentElement.setAttribute('theme-mode', 'dark');
        }
    }, [darkMode])


    useEffect(() => {

        if (window.location.hash !== "") {
            const ele = (window.location.hash).replace("#","")
            document.getElementById(ele).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

        }

    }, [window.location.href])



    return (
        <>
            {/* <!-------------HEADER------------> */}
            <header className="absolute inset-x-0 top-0 z-50 mx-auto pt-3">
                <nav className="">
                    <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                        <Link to="/" className="-m-1.5 p-1.5 ">
                            {/* <img src={Logo} alt="logo" /> */}
                            <img src={"https://clonely.io/assets/logo-98446daa.svg"} alt="logo" />
                        </Link>

                        {/* <button onClick={() => setisToggled(!isToggled)} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden  focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-sticky" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button> */}

                        <div className="flex lg:order-2 space-x-3 lg:space-x-0 rtl:space-x-reverse">
                            {isValidObject(user) &&
                                <button onClick={logout} className="hidden text-card-text text-lg border-2 border-color-inverted transition-all duration-300 focus:outline-none focus:ring-0 font-medium rounded-lg px-2 lg:px-4 py-1 lg:py-2 text-center lg:flex justify-center items-center">Logout</button>
                            }

                            {/* if buy page is open then menu will not show */}
                            {
                                <button onClick={() => setisToggled(!isToggled)} type="button" className="inline-flex items-center p-1 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden focus:outline-none focus:ring-0" aria-controls="navbar-sticky" aria-expanded="false">
                                    <span className="sr-only">Open main menu</span>
                                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                        <path stroke="#FFFFFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                                    </svg>
                                </button>
                            }
                        </div>


                        {/* <div className="hidden w-full md:block md:w-auto"> */}
                        {/* <div className={`overflow-hidden absolute z-10 lg:static left-0 px-2 top-20 lg:top-14 transition-all duration-300 items-center justify-between h-max lg:max-h-full ${!isToggled ? 'max-h-0' : 'max-h-[290px]'} w-full lg:flex lg:w-auto lg:order-1`}>
                            <ul className="font-semibold uppercase gap-2 lg:gap-0 pb-5 lg:pb-0 text-center flex flex-col lg:py-0 mt-4 pt-2 bg-black lg:bg-transparent lg:flex-row lg:space-x-14 rtl:space-x-reverse lg:mt-0 border border-white rounded-md lg:border-none">
                                <li>
                                    <Link to="/packages" className="text-sm leading-6 text-white hover:text-blue-400 ">Packages</Link>
                                </li>
                                <li>
                                    <a href="./#roadmap" className="text-sm leading-6 text-white hover:text-blue-400">Roadmap</a>
                                </li>
                                <li>
                                    <a href="./#features" className="text-sm leading-6 text-white hover:text-blue-400">Docs</a>
                                </li>
                                <li>
                                    <Link to="/mlm" class="text-sm leading-6 text-white hover:text-blue-400">Affiliate</Link>
                                </li>
                                <li>
                                    <a href="./#about" className="text-sm leading-6 text-white hover:text-blue-400">About</a>
                                </li>
                                <li>
                                    <a href="#contact" className="text-sm leading-6 text-white hover:text-blue-400">Contact</a>
                                </li>
                            </ul>
                        </div> */}

                        {
                            <div className={`overflow-hidden absolute z-10 lg:static left-0 px-2 top-20 lg:top-14 transition-all duration-300 items-center justify-between h-max lg:max-h-full ${!isToggled ? 'max-h-0' : 'max-h-[auto]'} w-full lg:flex lg:w-auto lg:order-1`}>
                                <ul className="font-semibold uppercase gap-2 lg:gap-0 pb-5 lg:pb-0 text-center flex flex-col lg:py-0 mt-4 pt-2 bg-black lg:bg-transparent lg:flex-row lg:space-x-14 rtl:space-x-reverse lg:mt-0 border border-white rounded-md lg:border-none">

                                    {
                                        token ?
                                            links.map((e, i) => {
                                                return <Fragment key={i}>
                                                    {
                                                        (e.role == "user" && user.role == "user") ?
                                                            <li key={i}>
                                                                <Link to={e.link} className="block py-2 px-3 text-white hover:text-white text-sm leading-6 transition-all duration-300 md:p-0">{e.name}</Link>
                                                            </li>
                                                            :
                                                            (e.role == "admin" && user.role == "admin") ?
                                                                <li key={i}>
                                                                    <Link to={e.link} className="block py-2 px-3 text-white hover:text-white text-sm leading-6 transition-all duration-300 md:p-0">{e.name}</Link>
                                                                </li>
                                                                :
                                                                (e.role == "user" && user.role !== "admin") ?
                                                                    <li key={i}>
                                                                        <Link to={e.link} className="block py-2 px-3 text-white hover:text-white text-sm leading-6 transition-all duration-300 md:p-0">{e.name}</Link>
                                                                    </li>
                                                                    :
                                                                    ""
                                                    }
                                                </Fragment>
                                            })
                                            :
                                            links.map((e, i) => {
                                                if (!e.auth) {
                                                    return <Fragment key={i}>
                                                        {
                                                            (e.role == "user" && user.role == "user") ?
                                                                <li key={i}>
                                                                    <Link to={e.link} className="block py-1 px-3 text-white text-sm leading-6 hover:text-white transition-all duration-300 md:p-0">{e.name}</Link>
                                                                </li>
                                                                :
                                                                (e.role == "admin" && user.role == "admin") ?
                                                                    <li key={i}>
                                                                        <Link to={e.link} className="block py-1 px-3 text-white text-sm leading-6 hover:text-white transition-all duration-300 md:p-0">{e.name}</Link>
                                                                    </li>
                                                                    :
                                                                    (e.role == "user" && user.role !== "admin") ?
                                                                        <li key={i}>
                                                                            <Link to={e.link} className="block py-1 px-3 text-white text-sm leading-6 hover:text-white transition-all duration-300 md:p-0">{e.name}</Link>
                                                                        </li>
                                                                        :
                                                                        ""
                                                        }
                                                    </Fragment>
                                                }
                                            })
                                    }

                                    {
                                        token &&
                                        <li>
                                            <button onClick={logout} className="lg:hidden text-card-text text-lg border-2 border-color-inverted transition-all duration-300 focus:outline-none focus:ring-0 font-medium rounded-lg px-2 sm:px-4 py-1 sm:py-2 text-center justify-center items-center">Logout</button>
                                        </li>
                                    }

                                </ul>
                            </div>
                        }


                    </div>
                </nav>
            </header>
            {/* <!-------------HEADER END------------> */}

        </>

    )
}

export default Navbar
