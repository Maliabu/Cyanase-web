import { codes } from "./currency";

export const
    getCurrency = (country) => {
        // creating the array of objects
        var getCountry = country
        var objArray = codes;
        var currency = ""
        for (var _i = 0, objArray_1 = objArray; _i < objArray_1.length; _i++) {
            var obj = objArray_1[_i];
            if (obj.code === getCountry) {
                currency = obj.currency
            }
        }
        return currency
    }
export const invOption = (option) =>{
    return option
}
// export const
//     callBack = (status) => {
//         return status
//     }