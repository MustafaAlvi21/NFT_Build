const authenticateWalletAddress = (req, res, next) => {


    const payload = {
        // name: req.body.name,
        // age: req.body.age,
        walletAddress: req.body.walletAddress,
    }

    console.log(payload);
    
    
    const char1 = payload.walletAddress[0];

    const char2 = payload.walletAddress[1];



    if (payload.walletAddress.length != 42) {
        return res.status(400).json({ success: false, message: 'Invalid Wallet Address' })
    }
    else if (char1 != '0' || char2 != "x") {
        return res.status(400).json({ success: false, message: 'Invalid Wallet Address' })
    }

    next()

}

module.exports = {
    authenticateWalletAddress
}

