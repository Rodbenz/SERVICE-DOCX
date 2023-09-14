
function getNameWithTitle(t, f, l) {
    // console.log(t, f, l, "getNameWithTitle");
    let titile = t == null ? "" : t;
    let firstname = f == null ? "" : f;
    let lastname = l == null ? "" : l;
    // console.log(titile, "titile");
    if (titile) {
        let titleAddtionalPosition = titile.indexOf("...");
        // console.log(titleAddtionalPosition, "titleAddtionalPosition");
        if (titleAddtionalPosition > 0) {
            let titleFirst = t.substring(0, titleAddtionalPosition);
            let titleLast = t.substring(titleAddtionalPosition + 3, t.length);
            // console.log(titleFirst, titleLast, "titleFirst, titleLast");
            return titleFirst + " " + firstname + " " + lastname + titleLast;
        } else {
            return titile + "" + firstname + " " + lastname;
        }
    } else {
        return firstname + " " + (lastname == null ? "" : lastname);
    }

}

function toThaiNumber(input) {
    if (!input) return ""
    // Thai numbers use different digits than Western numbers, so we need to map them
    input = input.toString();
    const digitMap = {
        '0': '๐',
        '1': '๑',
        '2': '๒',
        '3': '๓',
        '4': '๔',
        '5': '๕',
        '6': '๖',
        '7': '๗',
        '8': '๘',
        '9': '๙'
    };

    // Use the String.prototype.replace method to replace the numeric digits in the input string with their Thai equivalents
    return input.replace(/[0-9]/g, function (match) {
        return digitMap[match];
    });
}



function getObjectiveName(array, colname = "OBJECTIVE_NAME_TH") {
    // let usedArray = []
    // let string = ""
    // for (var i in data) {
    //     let obj = data[i]
    //     if (!usedArray.includes(obj[column])) {
    //         usedArray.push(obj[column])
    //         if (i < data.length - 1) {
    //             string += obj[column] + " "
    //         } else {
    //             string += "และ" + obj[column]
    //         }
    //     }
    // }
    // return string
    // ถ้าเป็น object เข้ามา จะทำเป็น array
    if (
        typeof array === 'object' &&
        !Array.isArray(array) &&
        array !== null
    ) {
        array = [array];
    }
    let newdata = array;
    let data = newdata.filter((item) => (item[colname] != null));
    let newData = "";
    let oldData = "";
    // let oldData = [];
    for (let i in data) {
        let req_location = data[i][colname] == null ? "" : data[i][colname];
        // if (!(oldData.includes(req_location))) {
        if (oldData != req_location) {
            if (i == 0) {
                newData += req_location;
            }
            else if ((parseInt(i) + 1) == array.length) {
                newData += " และ" + req_location;
            }
            else {
                newData += " " + req_location;
            }
        }
        // oldData.push(req_location);
        oldData = req_location;
    }
    console.log("viewObjectNameDoc", newData);
    return newData;
}


function thaiDate(dateString) {
    // Validate the input
    if (dateString == null || dateString == undefined
        // || !/^\d{4}-\d{2}-\d{2}$/.test(dateString)
    ) {
        return "";
    }

    // Split the date into year, month, and day
    const [year, month, day] = dateString.split("-");
    // Convert the year to the Buddhist era
    const beYear = parseInt(year) + 543;
    // Get the name of the month in Thai
    const thaiMonthNames = [
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม"
    ];
    const thaiMonth = thaiMonthNames[parseInt(month) - 1];
    // Return the Thai date string
    return `${day} ${thaiMonth} ${beYear}`;
}


// function addCommas(number, decimals = 0) {
//     if (Number.isFinite(number) && number >= 0) {
//         return number.toFixed(decimals).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//     } else {
//         return "";
//     }
// }

function addCommas(x) {
    try {
        if (isNaN(x)) {
            return null
        }
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    } catch
    {
        return null
    }
}

function addCommasToString(input) {
    // Use a regular expression to extract the number from the string
    const number = input.match(/\d+/);
    if (number) {
        // Convert the number to a float and use the addCommas function to add commas as the thousand separator
        return addCommas(parseFloat(number[0]), 0);
    } else {
        return "";
    }
}


function convertDateFormat(dateString, format) {
    if (!dateString) return ""
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Note: January is 0, so we need to add 1 to the month
    const day = date.getDate();
    return format
        .replace('YYYY', year)
        .replace('mm', month)
        .replace('dd', day);
}

function ReadNumber(number) // แปลงเลขเป็นภาษาไทย
{
    console.log(number, "numberXX");
    let position_call = ["แสน", "หมื่น", "พัน", "ร้อย", "สิบ", ""];
    let number_call = ["", "หนึ่ง", "สอง", "สาม", "สี่", "ห้า", "หก", "เจ็ด", "แปด", "เก้า"];
    number = parseInt(number);
    let ret = "";
    if (number == 0) return ret;
    console.log(number, "numberXX");
    if (number > 1000000) {
        ret += ReadNumber(parseInt(number / 1000000)) + "ล้าน";
        number = parseInt(number % 1000000);
    }

    let divider = 100000;
    let pos = 0;
    while (number > 0) {
        let d = parseInt(number / divider);
        ret += ((divider == 10) && (d == 2)) ? "ยี่" : (((divider == 10) && (d == 1)) ? "" : (((divider == 1) && (d == 1) && (ret != "")) ? "เอ็ด" : number_call[d]));
        ret += (d ? position_call[pos] : "");
        number = number % divider;
        divider = divider / 10;
        pos++;
    }
    return ret;
}

function Convert(amount_number)   // แปลงเลขเป็นภาษาไทย
{
    // return;
    try {
        let fraction = "";
        if (amount_number == "") {
            return "";
        } else {
            amount_number = (amount_number).toFixed(2);
            console.log(amount_number);
            let pt = amount_number.indexOf(".");
            let number = fraction;
            if (pt === false)
                number = amount_number;
            else {
                number = amount_number.substr(0, pt);
                fraction = amount_number.substr(pt + 1);
            }

            let ret = "";
            let baht = ReadNumber(number);
            if (baht != "")
                ret += baht + "บาท";

            let satang = ReadNumber(fraction);
            if (satang != "")
                ret += satang + "สตางค์";
            else
                ret += "ถ้วน";
            return ret;
        }
    } catch (error) {
        console.log("error", error);
        return "error";
        // die();
    }
}


module.exports = {
    getNameWithTitle,
    toThaiNumber,
    getObjectiveName,
    thaiDate,
    addCommas,
    convertDateFormat,
    ReadNumber,
    Convert,
}