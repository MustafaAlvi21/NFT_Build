
export function isValidObject(obj) {

    // console.log(typeof obj != "undefined", "CHECK NOT UNDEFINED");
    // console.log(typeof obj === 'object', "CHECK TYPE IS OBJECT");
    // console.log(obj !== null, "CHECK NOT NULL");
    // console.log(Object.keys(obj).length > 0, "CHECK KEYS MORE THAN 0");

    return typeof obj != "undefined" && typeof obj === 'object' && obj !== null && Object.keys(obj).length > 0;
}
