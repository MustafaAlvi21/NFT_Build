
const logInterface = (data) => {

    const statusEnum = ['pending', 'cancelled', 'deposited', 'withdrawn', 'rejected'];

    if (!data.action || data.action == " " || data.action == undefined) throw "action is required"


    if (data.action == "buy" || data.action == "deposit") {
        if ((!data.userID && !data.details.walletAddress) || !data.details || !data.details.amount || !data.details.qty || !data.details.status || !statusEnum.includes(data.details.status)) {
            throw `something is not send in ${data.action.toUpperCase()} LOG Payload`
        }
        else if (data.userID == " " || data.details == " " || data.details.walletAddress == " " || data.details.amount == " " || data.details.qty == " " || data.details.status == " ") {
            throw `something is empty in ${data.action.toUpperCase()} LOG Payload`
        }
        else if (data.userID == undefined || data.details == undefined || data.details.walletAddress == undefined || data.details.amount == undefined || data.details.qty == undefined || data.details.packageID == undefined || data.details.status == undefined) {
            throw `something is undefined in ${data.action.toUpperCase()} LOG Payload`
        }
    }
    else if (data.action == "sell") {
        if (!data.userID || !data.details || !data.details.walletAddress || !data.details.sellerID || !data.details.amount || !data.details.qty || !data.details.status || !statusEnum.includes(data.details.status)) {
            throw "something is not send in SELL LOG Payload"
        }
        else if (data.userID == " " || data.details == " " || data.details.walletAddress == " " || data.details.sellerID == " " || data.details.amount == " " || data.details.qty == " " || data.details.status == " ") {
            throw "something is empty in SELL LOG Payload"
        }
        else if (data.userID == undefined || data.details == undefined || data.details.walletAddress == undefined || data.details.sellerID == undefined || data.details.amount == undefined || data.details.qty == undefined || data.details.packageID == undefined || data.details.status == undefined) {
            throw "something is undefined in SELL LOG Payload"
        }

    }
    else if (data.action == "withdraw") {
        if (!data.userID || !data.details || !data.details.walletAddress || !data.details.amount || !data.details.status || !statusEnum.includes(data.details.status)) {
            throw "something is not send in WITHDRAW LOG Payload"
        }
        else if (data.userID == " " || data.details == " " || data.details.walletAddress == " " || data.details.amount == " " || data.details.qty == " " || data.details.status == " ") {
            throw "something is empty in WITHDRAW LOG Payload"
        }
        else if (data.userID == undefined || data.details == undefined || data.details.walletAddress == undefined || data.details.amount == undefined || data.details.status == undefined) {
            throw "something is undefined in WITHDRAW LOG Payload"
        }
    }
    else if (data.action == "login" || data.action == 'register') {
        if (!data.userID || !data.details || !data.details.walletAddress) {
            throw `something is not send in ${data.action.toUpperCase()} LOG Payload`
        }
        else if (data.userID == " " || data.details == " " || data.details.walletAddress == " ") {
            throw `something is empty in ${data.action.toUpperCase()} LOG Payload`
        }
        else if (data.userID == undefined || data.details == undefined || data.details.walletAddress == undefined) {
            throw `something is undefined in ${data.action.toUpperCase()} LOG Payload`
        }
    }

}


module.exports = {
    logInterface
}