// import { animationIntialization } from "./animate.js";
import { animationIntialization } from "./animate2.js";

let ml = 0;
let mergeLevels = {};
function merge(arr, low, mid, high, l) {
    let x = low,
        y = mid + 1;

    let temp = [];

    // compaire and push element in ascending order from both array
    while (x <= mid && y <= high) {
        if (arr[x] <= arr[y]) {
            temp.push(arr[x++]);
        } else {
            temp.push(arr[y++]);
        }
    }

    // push left over element into the array
    while (x <= mid) {
        temp.push(arr[x++]);
    }
    while (y <= high) {
        temp.push(arr[y++]);
    }

    // update original array
    for (let i = 0; i < temp.length; i++) {
        arr[low + i] = temp[i];
    }

    return temp;
}

let levels = {};

function mergeSort(arr, low, high, l) {
    if (low < high) {
        let mid = Math.floor((low + high) / 2);

        const leftArr = arr.slice(low, mid + 1);
        levels[l] = levels[l] ? [...levels[l], leftArr] : [leftArr];
        mergeSort(arr, low, mid, l + 1);

        const rightArr = arr.slice(mid + 1, high + 1);
        levels[l] = levels[l] ? [...levels[l], rightArr] : [rightArr];
        mergeSort(arr, mid + 1, high, l + 1);

        const merged = merge(arr, low, mid, high);
        mergeLevels[l] = mergeLevels[l]
            ? [...mergeLevels[l], merged]
            : [merged];
    }
}

const arr = [23, 12, 32, 56, 25, 67, 3, 69, 78, 34];
// const arr = [34, 67, 3, 41, 23, 6];
// mergeSort(arr, 0, arr.length - 1, 0);
// console.log(levels);
// console.log(mergeLevels);

animationIntialization(arr);
