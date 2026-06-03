// 1.3
function sumOfSquares(arr) {
    return arr.reduce((sum, current) => sum + (current * current), 0);
}

// Задание 1.7
function isEqualObj(obj1, obj2) {
    if (obj1 === obj2) return true;
    if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) return false;
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) return false;
    for (let key of keys1) {
        if (!keys2.includes(key) || !isEqualObj(obj1[key], obj2[key])) return false;
    }
    return true;
}

//  2.3 
function getMaxOnes(str) {
    let maxCount = 0;
    let currentCount = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === '1') {
            currentCount++;
            if (currentCount > maxCount) maxCount = currentCount;
        } else {
            currentCount = 0;
        }
    }
    return maxCount;
}

// 3.2
function inverse(arr, keep) {
    if (keep === undefined || keep === 0) return [...arr].reverse();
    if (keep > 0) return [...arr.slice(0, keep), ...arr.slice(keep).reverse()];
    if (keep < 0) {
        const splitIndex = Math.max(0, arr.length - Math.abs(keep)); 
        return [...arr.slice(0, splitIndex).reverse(), ...arr.slice(splitIndex)];
    }
}



// tests


console.log("Задание 1.3:");
console.log(sumOfSquares([1, 2, 3])); // 14

console.log("\nЗадание 1.7:");
console.log(isEqualObj({ a: 1, b: 2 }, { a: 1, b: 2 })); // true
console.log(isEqualObj({ a: 1 }, { b: 1 })); // false

console.log("\nЗадание 2.3:");
console.log(getMaxOnes('1000000111100011111010111101111111')); // 7

console.log("\nЗадание 3.2:");
console.log(inverse([1, 2, 3, 4, 5], 2));   // [1, 2, 5, 4, 3]
console.log(inverse([1, 2, 3, 4, 5], -2));  // [3, 2, 1, 4, 5]