import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

// CONTEXTAPI
import { useAuth } from '../ContextAPI/Components/auth';
import { useToast } from '../ContextAPI/Components/notify';

// PrivateRoute
import PrivateRoute from './PrivateRoute';

// PAGES
import ConnectWallet from '../pages/connect-wallet/Page';
import Error from "../pages/error/Page"
import Affiliate from "../pages/affiliate/Page"
import Users from '../pages/admin/users/page';
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import Deposit from "../pages/deposit/Page"
import Withdraw from "../pages/withdraw/Page"
import Buy from "../pages/buy/Page"
import LoginRegisterPage from "../pages/loginRegisterPage/Page"
import Payout from "../pages/admin/payout/Page"

// UTILS
import { isValidObject } from '../utils/isValidObject';
import { MLMDomains, adminDomains, buyDomains, wholeAppDomains } from '../config';
import CreatePackagePage from '../pages/admin/create-package/Page';
import AdminPackages from '../pages/admin/packages/Page';
import EditPackagePage from '../pages/admin/edit-package/Page';
import PlisioPage from '../pages/admin/plisio/Page';
import DepositSuccess from '../pages/deposit/Page_Success';
import { Home } from '../pages/home/Page';
import MLM from '../pages/mlm/Page';
import GeneralForm from '../pages/admin/general';
import { MyDepositLogs } from '../pages/mlm_deposit/Page';



const MyRoutes = () => {
    const { user } = useAuth();
    const { toastAlert } = useToast();

    if (buyDomains.includes(window.location.origin)) {
        return (

            <Routes>
                <Route exact path='/' element={<Home toastAlert={toastAlert} />} />
                <Route exact path='/packages' element={<Buy user={user} toastAlert={toastAlert} />} />
                <Route exact path='/mlm' element={<MLM user={user} toastAlert={toastAlert} />} />
                <Route exact path='/confirmation' element={<DepositSuccess />} />
                <Route exact path='*' element={<Error />} />
            </Routes >

        )
    }

    else if (adminDomains.includes(window.location.origin)) {
        return (

            <Routes>

                <Route exact path='/' element={<ConnectWallet />} />
                <Route element={<PrivateRoute role={'admin'} />}>
                    <Route exact path='/admin-payout' element={<Payout user={user} toastAlert={toastAlert} />} />
                    <Route exact path='/admin-create-package' element={<CreatePackagePage user={user} toastAlert={toastAlert} />} />
                    <Route exact path='/admin-packages' element={<AdminPackages user={user} toastAlert={toastAlert} />} />
                    <Route exact path='/general' element={<GeneralForm user={user} toastAlert={toastAlert} />} />
                    <Route exact path='/admin-edit-package' element={<EditPackagePage user={user} toastAlert={toastAlert} />} />
                    <Route exact path='/admin-platform' element={<PlisioPage user={user} toastAlert={toastAlert} />} />
                    <Route exact path='/affiliate' element={<Affiliate user={user} toastAlert={toastAlert} />} />
                    <Route exact path='/users' element={<Users user={user} toastAlert={toastAlert} />} />
                    <Route exact path='/user/mlm/:id' element={<Affiliate user={user} toastAlert={toastAlert} />} />
                </Route>

                <Route exact path='*' element={<Error />} />

            </Routes >
        )
    }

    else if (wholeAppDomains.includes(window.location.origin)) {
        return (

            <Routes>

                <Route exact path='/buy' element={<Buy user={user} toastAlert={toastAlert} />} />
                {/* <Route exact path='/login-or-register' element={<LoginRegisterPage toastAlert={toastAlert} getLoginUser={getLoginUser} isValidObject={isValidObject} />} /> */}
                <Route exact path='/' element={<ConnectWallet />} />

                <Route element={<PrivateRoute role={'user'} />}>
                    <Route exact path='/affiliate' element={<Affiliate user={user} toastAlert={toastAlert} />} />
                    <Route exact path='/deposit-temp-page' element={<Deposit toastAlert={toastAlert} />} />
                    <Route exact path='/withdraw' element={<Withdraw user={user} toastAlert={toastAlert} />} />
                </Route>

                <Route element={<PrivateRoute role={'admin'} />}>
                    <Route exact path='/admin-payout' element={<Payout user={user} toastAlert={toastAlert} />} />
                </Route>

                <Route exact path='*' element={<Error />} />

            </Routes >
        )
    }

    else if (MLMDomains.includes(window.location.origin)) {
        console.log("lllllllllllllllllllllll");
        
        return (

            <Routes>

                <Route exact path='/' element={<ConnectWallet />} />
                <Route element={<PrivateRoute role={user?.role} />}>
                    <Route exact path='/affiliate' element={<Affiliate user={user} toastAlert={toastAlert} />} />
                    <Route exact path='/deposit-temp-page' element={<Deposit toastAlert={toastAlert} />} />
                    <Route exact path='/withdraw' element={<Withdraw user={user} toastAlert={toastAlert} />} />
                    <Route exact path='/deposit-logs' element={<MyDepositLogs user={user} toastAlert={toastAlert} />} />
                </Route>
             
                <Route exact path='*' element={<Error />} />

            </Routes >
        )
    }

}


export default MyRoutes