
export const createAffiliateLink = (user) => {

    console.log("useruseruseruseruser");
    console.log(user);
    console.log(user?.referralCode);
    
    
    if (user) {
        return "https://clonely.io/packages" + '/?ref=' + user?.referralCode
    }
}

