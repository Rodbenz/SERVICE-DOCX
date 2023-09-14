function findMedian(arr) {
    arr.sort((a, b) => a - b); // Sort the array in ascending order

    const n = arr.length;
    if (n % 2 === 1) {
        // If the array has an odd number of elements, return the middle element
        return arr[Math.floor(n / 2)];
    } else {
        // If the array has an even number of elements, return the average of the two middle elements
        const middle1 = arr[Math.round((n - 1) / 2)];
        const middle2 = arr[n / 2];
        return (middle1 + middle2) / 2;
    }
}

function conVertNumberMode(x) {
    if (x == "" || x == null || x == undefined) {
        return ""
    }
    let number = numberWithCommas(x);
    let numberArray = number.split(','); // แปลงสตริงเป็นอาร์เรย์
    numberArray[numberArray.length - 1] = '000';
    let myString = numberArray.join(',');
    let toArray = myString.split(",");
    let toNumber = "";
    toArray.forEach((el, index) => {
        toNumber += el
    });
    return (Number(toNumber));
}
const numberWithCommas = (x) => {
    try {
        var parts = String(x).split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    } catch
    {
        return null
    }
}
const numberTens = (x) => {
    try {
        var parts = String(x).split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{2})+(?!\d))/g, ",");
        return parts.join(".");
    } catch
    {
        return null
    }
}

function convertTens(x) {
    console.log(x);
    if (x == "" || x == null || x == undefined) {
        return ""
    }
    let number = numberTens(x);
    let numberArray = number.split(','); // แปลงสตริงเป็นอาร์เรย์
    if (numberArray[numberArray.length - 1] < 50) {
        numberArray[numberArray.length - 1] = '00';
    }else if(numberArray[numberArray.length - 1] >= 50){
        numberArray[numberArray.length - 2] = Number(numberArray[numberArray.length - 2]) + 1;
        numberArray[numberArray.length - 1] = '00';
    }

    let toNumber = "";
    numberArray.forEach((el, index) => {
        toNumber += el
    });
    return (Number(toNumber));
}

module.exports = {
    findMedian,
    numberWithCommas,
    conVertNumberMode,
    convertTens
}