const mongoose = require('mongoose');
// const {} = require("../utils/web3")



// QUERY SERVICES
const { getPackagesService, getSinglePackageService, createPackageService, updatePackageService, countPackagesService } = require('../services/package-services')
const { updateUserService, getSingleUserService, createUserService } = require('../services/user-services')
const { createLogService, getLatestDepositLog, getLogsService, updateDepositLog } = require('../services/log-services');
const { getComissionLevelService } = require('../services/comissionLevel-services');

// HELPERS UTILITY FUNCTIONS
const { validateAll } = require('../utils/validate');
const { createCommissionLogService } = require('../services/comission-log-service');

// SHORT UNIQUE ID GENERATOR PACKAGE
const ShortUniqueId = require('short-unique-id');

const axios = require("axios");
const { MintNFT, getGas, getLatestPkgId, Create_Package, Update_Package } = require('../utils/web3');
const { getPlatformService } = require('../services/platform-services');
const { backURL } = require("../config/config")
// GetAllPackages()

// PLISIO
const url = process.env.Plisio_url
const callback_url = process.env.Callback_url

/**
 * Minimum Amount for:
 *  -> ETH: 0.071675750373430750
 * 
 * Order number should be unique
*/

// CREATE NEW INVOICE
const createInvoice = async (req, res) => {
    try {
        const platform = await getPlatformService()
        const data = req.body;

        let API_Key = null;
        if (platform != null) API_Key = platform.plisioKey
        else throw "Can't proceed payment"

        validateAll(data.referredBy, null, "Referral code is required")
        const sponsor = await getSingleUserService({ referralCode: data.referredBy });
        validateAll(sponsor, null, "Invalid Referral Code")

        const user = await getSingleUserService({ walletAddress: data.walletAddress });

        if (user != null) {
            if (data.referredBy == user?.referralCode) throw "You Cannot Buy With Your Own Referral Code"
        }


        const log = await getLatestDepositLog();
        let order_number = log ? log.details.order_number : 0

        if (isNaN(order_number)) order_number = 0;

        const packageAvailable = await getSinglePackageService({ _id: data.packageID })
        if (!packageAvailable) throw "Package not found";
        if (parseInt(packageAvailable.stockQty) - parseInt(data.qty) < 0) throw "Insufficient stock for this Package";
        const amount = parseFloat(packageAvailable.price) * parseFloat(data.qty)

        const query = {
            email: "as87uih76eh76thi7gybn7gyujhiuni8uiijhu@gmail.com",
            // currency: "USDT_BSC",
            // currency: "USDT",
            currency: "USDT_TRX",
            source_amount: amount,
            source_currency: "USD",
            order_name: "NFT Proect",
            order_number: parseInt(order_number) + 1,
            description: "Balance Top Up",
            callback_url: `${callback_url}/packages/plisio-webhook?json=true`,
            success_callback_url: `${req.headers.origin}/confirmation`,
            fail_callback_url: `${req.headers.origin}/deposit`,
            expire_min: "40",
        }

        console.log("query", query);

        await axios.get(`${url}/invoices/new`, { params: { api_key: API_Key, ...query } })
            .then(result => {
                console.log(result?.data);

                createLogService({
                    userID: "",
                    action: "deposit",
                    details: {
                        walletAddress: data.walletAddress,
                        referredBy: data.referredBy || "",
                        amount: amount,
                        qty: parseInt(data.qty),
                        packageID: data.packageID,
                        status: "pending",
                        order_number: parseInt(order_number) + 1,
                        TX_URL: result?.data.data.txn_id,
                        currency: null,
                        invoice: result?.data.data.invoice_url,
                        mint: false
                    }
                })

                return res.json({ success: true, message: result.data })
            })
            .catch(err => {
                console.log("ERROR MIL GAYA -> ", process.env.Alchemy_API_Key, err.response);

                if (err.response) {
                    if (err.response.data) {
                        if (err.response.data.data) throw err.response.data.data.message;
                    }
                }
                throw err
            })

    } catch (error) {
        console.log("error");
        console.log(error);
        return res.status(400).json({ success: false, message: error })
    }
}


const plisioWebhook = async (req, res) => {

    console.log("/plisio-webhook", req.body);
    console.log("req.query", req.query);
    console.log("req.params", req.params);
    console.log();
    console.log();

    const data = req.body;
    const query = { "details.order_number": Number(data.order_number) }

    try {
        await getLogsService(query)
            .then(async log => {
                console.log(log);

                if (log.length == 0) throw "log not found for order #" + data.order_number;


                if (log[0].details.status == "deposited") {
                    res.writeHead(422);
                    res.end('Incorrect data 1');
                    return
                }


                if (data.status == "pending") {
                    await updateDepositLog(query, { $set: { 'details.amount': parseFloat(data.source_amount) } })
                }
                else if (data.status == 'completed' || data.status == 'mismatch') {
                    /**
                     * use data.amount for status -> mismatch
                     * use data.source_amount for status -> completed
                     */

                    let newAmount = 0;

                    if (data.status == 'completed') {
                        newAmount = data.source_amount;

                        console.log(log[0].details.walletAddress, log[0].details.packageID, log[0].details.qty)
                        const Mint = await MintNFT(log[0].details.walletAddress, log[0].details.packageID, log[0].details.qty)
                        if (Mint.success) {
                            console.log(Mint.msg);
                            await updateDepositLog(query, {
                                "details.mint": true,
                                "details.status": "deposited",
                                "details.currency": data.currency,
                                "details.amount": newAmount
                            })
                                .then(async (data22) => {

                                    await buyPackage({
                                        packageID: log[0].details.packageID,
                                        amountPaid: log[0].details.amount,
                                        qty: log[0].details.qty,
                                        walletAddress: log[0].details.walletAddress,
                                        referredBy: log[0].details.referredBy || "",
                                    })
                                })

                        } else {
                            console.log(Mint.error);
                            throw new Error(`Error in Minting NFT: ${(Mint.error).toString()}`)
                        }

                    } else if (data.status == 'mismatch') {

                        // const text = data.comment;
                        // const split1 = text.split('(')
                        // const split2 = split1[1].split('USD')
                        // let overpaidAmount = parseFloat(split2[0])
                        // newAmount = parseFloat(parseFloat(data.source_amount));
                        console.log(parseFloat(parseFloat(data.source_amount)));

                    }
                    else {
                        throw new Error('INVALID STATUS!')
                    }
                }

                res.writeHead(200);
                res.end('This is a correct JSON callback');

            })


    } catch (error) {
        console.log(error);
        res.writeHead(422);
        res.end('Incorrect data 1');
    }
}


const buyPackage = async (body) => {
    console.log("- = - = - = - = - = - = - = - = - = -");
    console.log("- = - = - =  BUY PACKAGE - = - = - =");
    console.log("- = - = - = - = - = - = - = - = - = -");

    console.log("body", body);

    const packageData = {
        _id: body.packageID,
        amountPaid: body.amountPaid,
        qty: body.qty,
    }

    const walletAddress = body.walletAddress
    const referredBy = body.referredBy


    try {

        validateAll(packageData._id, 'id')
        validateAll(packageData.amountPaid, 'amountPaid')
        validateAll(packageData.qty, 'qty')
        validateAll(walletAddress, "Wallet Address")

        let user = {}
        let getuser = await getSingleUserService({ walletAddress: walletAddress });
        if (getuser !== null) {
            user = getuser
        }

        console.log("usususus", user);
        // return 


        let sponsor;

        if (referredBy) {

            const LowerCaseReferal = referredBy.toLowerCase();

            sponsor = await getSingleUserService({ referralCode: LowerCaseReferal });
            validateAll(sponsor, null, "Invalid Referral Code")

            let ifSponsorAlreadyInUser = [];
        }

        if (!user || !user._id || typeof user._id == "undefined" || user._id == null || user._id == "") {
            const uid = new ShortUniqueId({ length: 7 });
            console.log("walletAddress!!", walletAddress);
            user.walletAddress = walletAddress;
            console.log("LLLL", uid.rnd())
            const referealCode123 = uid.rnd()
            // const lowerRef = 
            user.referralCode = referealCode123.toLowerCase();

            if (sponsor) {
                console.log(sponsor);
                let duplicateSponsorReferredBy = [];
                if (sponsor.referredBy.length > 0) {

                    function deepCopyArray(arr) {
                        return arr.map(item => {
                            if (Array.isArray(item)) {
                                // If the item is an array, recursively deep copy it
                                return deepCopyArray(item);
                            } else if (typeof item === 'object' && item !== null) {
                                // If the item is an object, deep copy it
                                return { ...item };
                            } else {
                                // If the item is a primitive value, return it as is
                                return item;
                            }
                        });
                    }

                    duplicateSponsorReferredBy = deepCopyArray(sponsor.referredBy);
                    duplicateSponsorReferredBy.forEach(element => {
                        element.sponsorComission = 0
                    });
                }
                user.referredBy = [{ sponsorID: sponsor._id.toString(), sponsorComission: 0 }, ...duplicateSponsorReferredBy]
            }

            // user.totalInvestment = body.amountPaid

            console.log("new user create", user);

            user = await createUserService(user)
        }



        if (sponsor) {
            const ifUserAlreadyInSponsor = sponsor.referredTo.find(obj => obj.affiliate == user._id)

            if (!ifUserAlreadyInSponsor) {
                sponsor.referredTo = [{ affiliate: user._id.toString() }, ...sponsor.referredTo]
                await updateUserService({ _id: sponsor._id }, sponsor)
            }
        }


        const comissionLevels = await getComissionLevelService({ isActive: true })
        validateAll(comissionLevels, null, "Comission Level Not Found!")

        const totalComissionLevels = comissionLevels.length;
        const foundPackage = await getSinglePackageService({ _id: packageData._id })


        if (foundPackage) {
            if (packageData.amountPaid < (foundPackage.price * packageData.qty)) throw `Amount To Be Paid is $${foundPackage.price * packageData.qty}, You Paid $${packageData.amountPaid}.`
            if (foundPackage.stockQty < packageData.qty) throw `Package Out Of Stock!`


            // UPDATING PACKAGE
            const updatedPackageData = {
                _id: foundPackage._id,
                stockQty: foundPackage.stockQty - packageData.qty
            }

            await updatePackageService({ _id: foundPackage._id }, updatedPackageData)

            // CALCULATING COMISSION
            let totalFees;
            const limitForRecursive = user.referredBy.length > totalComissionLevels ? totalComissionLevels : user.referredBy.length;


            if (user.referredBy.length > 0) {
                async function comissionCalculateAndUpdateSponsor(limit, i = 0) {
                    if (i < limit) {
                        totalFees = (comissionLevels[i].fees / 100) * packageData.amountPaid

                        if (user.referredBy[i]) {

                            console.log(user.referredBy[i].sponsorComission, 'before');
                            if (user.referredBy[i].sponsorComission) {
                                user.referredBy[i].sponsorComission += totalFees

                            } else {
                                console.log(user.referredBy[i].sponsorComission, 'no sponsorComission');
                                user.referredBy[i].sponsorComission = totalFees

                            }

                            console.log(user.referredBy[i].sponsorComission, 'after');
                            await updateUserService({ _id: user.referredBy[i].sponsorID }, { $inc: { comission: totalFees, totalComission: totalFees } });
                            await createCommissionLogService({ userID: user.referredBy[i].sponsorID, affiliateWalletAddress: user.walletAddress, affiliateID: user._id, amount: totalFees })
                        }

                        comissionCalculateAndUpdateSponsor(limit, i + 1)

                    } else {
                        // UPDATING USER    
                        if (user.NFTs.length > 0) {

                            let packageIndex;
                            let filteredPackage = user.NFTs.find((obj, i) => {

                                // console.log("obj.packageID",obj.packageID);
                                // console.log("foundPackage._id",foundPackage._id);

                                // if ((obj.packageID).toString() == (foundPackage._id).toString()) {
                                //     packageIndex = i;
                                //     return obj
                                // }

                                console.log("obj.packageID", obj.packageID);
                                console.log("foundPackage._id", foundPackage._id);

                                if (obj.packageID && obj.packageID.toString() == foundPackage._id.toString()) {
                                    packageIndex = i;
                                    return obj;
                                } else {
                                    console.log("obj.packageID is undefined or does not match foundPackage._id");
                                }


                            })

                            if (filteredPackage) {
                                user.NFTs[packageIndex].qty = user.NFTs[packageIndex].qty + packageData.qty;

                            } else {
                                user.NFTs = [...user.NFTs, { packageID: foundPackage._id, qty: packageData.qty }]

                            }

                        } else {
                            user.NFTs = [...user.NFTs, { packageID: foundPackage._id, qty: packageData.qty }]
                            console.log("user after adding NFTs ", user);
                        }

                        console.log(user, "bahar ---");

                        // user.totalInvestment = body.amountPaid


                        // await updateUserService({ _id: user._id },
                        //     {
                        //         ...user,
                        //         $inc: {
                        //             totalInvestment: body.amountPaid
                        //         }
                        //     })
                        await updateUserService({ _id: user._id }, { $set: user })

                        await updateUserService({ _id: user._id }, {
                            $inc: {
                                totalInvestment: body.amountPaid
                            }
                        })



                        // CREATING LOG
                        // await createLogService({ userID: user._id, action: 'buy', details: { walletAddress: user.walletAddress, amount: packageData.amountPaid, qty: packageData.qty, packageID: updatedPackageData._id, status: "deposited" } })
                        return 'Transaction Sucessfull'
                    }
                }

                await comissionCalculateAndUpdateSponsor(limitForRecursive)

            } else {

                if (user.NFTs.length > 0) {
                    let packageIndex;
                    let filteredPackage = user.NFTs.find((obj, i) => {
                        if ((obj.packageID).toString() == (foundPackage._id).toString()) {
                            packageIndex = i;
                            return obj
                        }
                    })

                    if (filteredPackage) {
                        user.NFTs[packageIndex].qty = user.NFTs[packageIndex].qty + packageData.qty;

                    } else {
                        user.NFTs = [...user.NFTs, { packageID: foundPackage._id, qty: packageData.qty }]

                    }

                } else {
                    console.log("new user package", foundPackage, user.NFTs);
                    user.NFTs = [...user.NFTs, { packageID: foundPackage._id, qty: packageData.qty }]

                }

                // await updateUserService({ _id: user._id }, {
                //     ...user,
                //     $inc: {
                //         totalInvestment: body.amountPaid
                //     }
                // })

                console.log("kuch bhi ", user);
                await updateUserService({ _id: user._id }, { $set: user })

                await updateUserService({ _id: user._id }, {
                    $inc: {
                        totalInvestment: body.amountPaid
                    }
                })

                // body.amountPaid


                // CREATING LOG
                // await createLogService({ userID: user._id, action: 'buy', details: { walletAddress: user.walletAddress, amount: packageData.amountPaid, qty: packageData.qty, packageID: updatedPackageData._id, status: "deposited" } })
                return 'Transaction Sucessfull'
            }

        } else {
            throw "invalid package"

        }

    } catch (error) {
        console.log(error);
        return error;
    }
}


const getPackages = async (req, res) => {

    try {
        let query = {}
        if (req.query.showAll) query = { stockQty: { $gt: 0 } }
        
        console.log(query);
        

        const data = await getPackagesService(query);
        return res.json({ success: true, message: data })

    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: error })
    }


}


const getSinglePackage = async (req, res) => {
    let query = {}

    if (req.query.id) query = { ...query, "_id": parseInt(req.query.id) }
    console.log(query);

    try {
        const data = await getSinglePackageService(query);
        return res.json({ success: true, message: data })

    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: error })
    }
}


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'pdfs/');
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//         cb(null, uniqueSuffix + '-' + file.originalname);
//     }
// });

// const upload = multer({ storage: storage });


const createPackage = async (req, res) => {
    console.log("req?.pdfFile", req?.files['pdfFile']);
    console.log("req?.imageFile", req?.files['imageFile']);


    let nftPdf = null
    let nftImage = null

    if (typeof req?.files['pdfFile'] !== "undefined") {
        nftPdf = req?.files['pdfFile'][0]?.filename ? req.files['pdfFile'][0].filename : null;
    }
    if (typeof req?.files['imageFile'] !== "undefined") {
        nftImage = req?.files['imageFile'][0]?.filename ? req.files['imageFile'][0].filename : null;

    }



    console.log("nftPdf", nftPdf);

    console.log("nftImage", nftImage);

    // if (!nftPdf || nftPdf == null) {
    //     return res.status(400).json({ success: false, message: "No pdf file uploaded." });
    // }

    // if (!nftImage || nftImage == null) {
    //     return res.status(400).json({ success: false, message: "No image file uploaded." });
    // }

    // return 
    try {
        const packagesCount = await countPackagesService(); // Replace with your actual function
        const packageData = {
            name: req.body.packageName,
            price: req.body.packagePrice,
            stockQty: req.body.packageQuantity,
            description: req.body.packageDescription,
            description2: req.body.packageDescription2,
            description3: req.body.packageDescription3,
            URI: req.body.packageURI,
            packageURI: req.body.packageURI,
            uniqueId: req.body.uniqueId,
            nftPdf: nftPdf,
            image: nftImage,
            showQty: req.body.showQty,
        };

        // Validate package data
        // Example: Replace validateAll with your validation function
        validateAll(packageData.name, 'Package Name');
        validateAll(packageData.price, 'Package Price');
        validateAll(packageData.stockQty, 'Package Quantity');
        validateAll(packageData.description, 'Package Description');
        validateAll(packageData.URI, 'Package URI');

        const foundPackage = await getSinglePackageService({ name: packageData.name });
        const foundPackagebyUniqueId = await getSinglePackageService({ uniqueId: req.body.uniqueId });

        if (foundPackage) throw "Package Already Exists";
        if (foundPackagebyUniqueId) throw "Unique Id Already Exists";

        const response = await Create_Package(packageData.name, packageData.packageURI, packageData.stockQty); // Replace with your actual function

        if (response.success) {
            const response2 = await getLatestPkgId(); // Replace with your actual function
            if (response2.success) {
                packageData._id = response2.packageId;
                await createPackageService(packageData); // Replace with your actual function
                return res.json({ success: true, message: "Package Created Successfully" });
            } else {
                throw "Error while fetching Package Id";
            }
        } else {
            throw "Error while creating Package";
        }
        

    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: error });
    }
}


// const createPackage = async (req, res) => {

//     // const nftPdf = req.files['nftPdf'] ? req.files['nftPdf'][0] : null;
//     // const nftImage = req.files['nftImage'] ? req.files['nftImage'][0] : null;
//     const nftPdf = req.files['nftPdf'] ? req.files['nftPdf'][0] : null;
//     const nftImage = req.files['nftImage'] ? req.files['nftImage'][0] : null;

//     console.log("nftPdf",nftPdf);
//     console.log("nftImage",nftImage);


//     if (!nftPdf || nftPdf== null) {
//         return res.status(400).json({ success: false, message: "No pdf file uploaded." })
//     }

//     if (!nftImage || nftImage== null) {
//         return res.status(400).json({ success: false, message: "No Image uploaded." })
//     }


//     const packagesCount = await countPackagesService()



//     let packageData = {
//         name: req.body.packageName,
//         price: req.body.packagePrice,
//         stockQty: req.body.packageQuantity,
//         description: req.body.packageDescription,
//         URI: req.body.packageURI,
//         packageURI: req.body.packageURI,
//         uniqueId: req.body.uniqueId,
//         nftPdf: nftPdf,
//         image: nftImage
//     }


//     try {

//         const respinse = await getLatestPkgId()
//         console.log("respinse", respinse);

//         // return 

//         validateAll(packageData.name, 'Package Name')
//         validateAll(packageData.price, 'Package Price')
//         validateAll(packageData.stockQty, 'Package Quantity')
//         validateAll(packageData.description, 'Package Description')
//         validateAll(packageData.URI, 'Package URI')


//         const foundPackage = await getSinglePackageService({ name: packageData.name })

//         const foundPackagebyUniqueId = await getSinglePackageService({ uniqueId: req.body.uniqueId })

//         if (foundPackage) {
//             throw "Package Already Exists"
//         }

//         if (foundPackagebyUniqueId) {
//             throw "Unique Id Already Exists"
//         }


//         const response = await Create_Package(packageData.name, packageData.packageURI, packageData.stockQty)

//         if (response.success) {
//             const response2 = await getLatestPkgId()
//             if (response2.success) {
//                 packageData._id = response2.packageId
//                 await createPackageService(packageData)
//                 // response = 
//                 return res.json({ success: true, message: "Package Created Successfully" })
//             }
//             else {
//                 throw "Error while fetching Package Id"
//             }
//         }
//         else {
//             throw "Error while creating Package"
//         }

//     } catch (error) {
//         console.error(error);
//         return res.status(400).json({ success: false, message: error })
//     }
// }


const editPackage = async (req, res) => {

    const data = req.body



    let packageData = {
    }


    // const nftPdf = req?.files['pdfFile']?.filename ? req.files['pdfFile'][0].filename : null;
    // const nftImage = req?.files['imageFile']?.filename ? req.files['imageFile'][0].filename : null;

    //   console.log("nftPdf-----....",req.files['pdfFile'][0]);
    //   console.log("nftPdf",nftPdf);
    //   console.log("nftImage",nftImage);


    const pdfFile = req.files['pdfFile'] ? req.files['pdfFile'][0] : null;
    const imageFile = req.files['imageFile'] ? req.files['imageFile'][0] : null;

    const nftPdf = pdfFile ? pdfFile.filename : null;
    const nftImage = imageFile ? imageFile.filename : null;

    console.log("pdfFile:", pdfFile);

    console.log("nftPdf:", nftPdf);
    console.log("nftImage:", nftImage);

    //   return 
    try {

        if (nftPdf && nftPdf !== null) {

            console.log("packageData.nftPdf", packageData.nftPdf);
            packageData.nftPdf = nftPdf
        }

        if (nftImage && nftImage !== null) {

            console.log("packageData.nftPdf", packageData.nftPdf);
            packageData.image = nftImage
        }

        if (req.body._id || req.body._id !== "" || req.body._id !== null || typeof req.body._id !== undefined) {
            console.log("packageData._id", req.body._id);
            packageData._id = req.body._id
        }
        if (req.body.name || req.body.name !== "" || req.body.name !== null || typeof req.body.name !== undefined) {
            console.log("packageData.name", req.body.packageName);
            packageData.name = req.body.packageName
        }
        if (req.body.price || req.body.price !== "" || req.body.price !== null || typeof req.body.price !== undefined) {
            console.log("packageData.price", req.body.packagePrice);
            packageData.price = req.body.packagePrice
        }
        if (req.body.stockQty || req.body.stockQty !== "" || req.body.stockQty !== null || typeof req.body.stockQty !== undefined) {
            console.log("packageData.stockQty", req.body.packageQuantity);
            packageData.stockQty = req.body.packageQuantity
        }

        if (req.body.description || req.body.description !== "" || req.body.description !== null || typeof req.body.description !== undefined) {
            console.log("packageData.description", req.body.packageDescription);
            packageData.description = req.body.packageDescription
        }

        if (req.body.description2 || req.body.description2 !== "" || req.body.description2 !== null || typeof req.body.description2 !== undefined) {
            console.log("packageData.description2", req.body.packageDescription2);
            packageData.description2 = req.body.packageDescription2
        }

        if (req.body.description3 || req.body.description3 !== "" || req.body.description3 !== null || typeof req.body.description3 !== undefined) {
            console.log("packageData.description3", req.body.packageDescription3);
            packageData.description3 = req.body.packageDescription3
        }

        if (req.body.packageURI || req.body.packageURI !== "" || req.body.packageURI !== null || typeof req.body.packageURI !== undefined) {
            console.log("packageData.packageURI", req.body.packageURI);
            packageData.packageURI = req.body.packageURI
            packageData.URI = req.body.packageURI
        }

        packageData.showQty = req.body.showQty

        console.log("datatata", packageData);


        validateAll(packageData._id, 'Package ID')
        validateAll(packageData.name, 'Package Name')
        validateAll(packageData.price, 'Package Price')
        validateAll(packageData.stockQty, 'Package Quantity')
        validateAll(packageData.description, 'Package Description')
        validateAll(packageData.packageURI, 'Package URI')
        // validateAll(packageData.URI, 'Package URI')

        const foundPackage = await getSinglePackageService({ _id: packageData?._id })
        console.log("foundPackage--<>", foundPackage);
        console.log("packageData--<>", packageData);

        if (foundPackage.stockQty !== parseInt(packageData.stockQty) || foundPackage.name !== packageData?.name || foundPackage.URI !== packageData?.packageURI) {

            const response = await Update_Package(parseInt(packageData?._id), packageData?.stockQty, packageData?.name, packageData?.packageURI)

            if (response.success) {

                await updatePackageService({ _id: packageData._id }, packageData)
                return res.status(200).json({ success: true, message: "Package Updated Successfully" })

            }
            else {
                throw "Error whuile updating package"
            }

        }
        else {
            await updatePackageService({ _id: packageData._id }, packageData)

            return res.status(200).json({ success: true, message: "Package Updated Successfully" })

        }





        // const response = await Update_Package(parseInt(packageData?._id), packageData?.stockQty, packageData?.name, packageData?.packageURI)

        // if (response.success) {


        // }
        // else {
        //     throw "Error whuile updating package"
        // }


    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: error })
    }
}


const verifyUser = async (req, res) => {

    const packageData = {
        // _id: req.body._id,
        qty: req.body.qty,
    }

    const walletAddress = req.body.walletAddress

    try {
        // validateAll(packageData._id, 'id')
        validateAll(packageData.qty, 'qty')
        validateAll(walletAddress, "Wallet Address")

        let user = await getSingleUserService({ walletAddress: walletAddress });
        let response = {};

        if (user) {
            let sponsor;

            if (user.referredBy.length > 0) {
                sponsor = await getSingleUserService({ _id: user.referredBy[0].sponsorID });
                let sponsorReferralCode = sponsor.referralCode;
                response = { success: true, message: 'User Found', user, sponsorReferralCode }

            } else {
                response = { success: true, message: 'User Found', user, sponsorReferralCode: null }

            }

        } else {
            response = { success: true, message: 'User Not Found', user: null, sponsorReferralCode: null }
        }

        return res.json(response)

    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: error })
    }
}


const NFTmetadata = async (req, res) => {
    try {
        const { uniqueId } = req.params
        console.log("uniqueId", uniqueId);

        if (!uniqueId) throw "Unique Id is required !"

        const response = await getSinglePackageService({ uniqueId: uniqueId })

        const payload = {
            name: response.name,
            id: response._id,
            pdf: `${backURL}/static/files/${response.nftPdf}`,
            image: `${backURL}/static/files/${response.image}`,
        }


        if (response !== null) return res.status(200).json(payload)
        else throw "Not Found"

    }
    catch (e) {
        console.log(e);
        return res.status(400).json({ success: false, message: e })
    }
}



const fetchdepositLogs = async (req, res) => {
    try {
        const response = await getLogsService({ action: "deposit", "details.status": "pending" })
        return res.status(200).json({ success: true, message: response })
    }
    catch (e) {
        console.log(e);
        return res.status(400).json({ success: false, message: e })

    }
}


module.exports = {
    getPackages,
    createPackage,
    buyPackage,
    verifyUser,
    createInvoice,
    plisioWebhook,
    getSinglePackage,
    editPackage,
    NFTmetadata,
    fetchdepositLogs
}