const validateAll = (value, key, customMessage) => {
    console.log("Validate: ", value);
    if (value == undefined || value == null|| value.length == 0 ) {
        if (key) {
            throw `${key} is required`;
        } else {
            throw `${customMessage}`;
        }
    }
}


module.exports = {
    validateAll
}