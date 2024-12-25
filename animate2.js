const animationContainer = document.getElementById("animation-container");

let animationContainerArray = [];

export function animationIntialization(arr, n) {
    arr = arr.map((a, i) => {
        const divNumBox = document.createElement("div");
        divNumBox.classList.add("div-num-box");
        divNumBox.textContent = a;
        divNumBox.id = i;
        divNumBox.value = a;

        return divNumBox;
    });

    displayDividedArray(arr, 0, arr.length - 1, 0);

    function merge(arr, low, mid, high, l) {
        let x = low,
            y = mid + 1;

        let temp = [];

        // Compare and push elements in ascending order from both arrays
        while (x <= mid && y <= high) {
            if (arr[x].value <= arr[y].value) {
                temp.push(arr[x++]);
            } else {
                temp.push(arr[y++]);
            }
        }

        // Push leftover elements into the array
        while (x <= mid) {
            temp.push(arr[x++]);
        }
        while (y <= high) {
            temp.push(arr[y++]);
        }

        // Update original array
        for (let i = 0; i < temp.length; i++) {
            arr[low + i] = temp[i];
        }

        return temp;
    }

    function mergeSort(arr, low, high, level) {
        if (low < high) {
            let mid = Math.floor((low + high) / 2);

            displayDividedArray(arr, low, mid, level);
            mergeSort(arr, low, mid, level + 1); // left array

            displayDividedArray(arr, mid + 1, high, level);
            mergeSort(arr, mid + 1, high, level + 1); // right array

            merge(arr, low, mid, high, level);
            displayMergedArray(arr, low, high, level);
        }
    }
    mergeSort(arr, 0, arr.length - 1, 1);

    // Append all elements in animationContainerArray to animationContainer

    animationDisplay(animationContainerArray);
}

async function animationDisplay(animationContainerArray) {
    for (const levelContainer of animationContainerArray) {
        animationContainer.appendChild(levelContainer);
        console.log(levelContainer);
        await new Promise((resolve) => setTimeout(resolve, 1000));
    }
}

function getNumDiv(arr, low, high, type) {
    const NumDivs = document.createElement("div");
    NumDivs.classList.add("num-box-container");
    NumDivs.dataset.type = type ? true : false;

    let divs = arr.slice(low, high + 1);
    divs.forEach((div) => {
        NumDivs.appendChild(div.cloneNode(true));
    });
    return NumDivs;
}

function newLevelContainer(level, type = "divided") {
    const levelContainer = document.createElement("div");
    levelContainer.classList.add("level-container");
    levelContainer.dataset.level = level;
    levelContainer.dataset.type = type;
    return levelContainer;
}

function displayDividedArray(arr, low, high, level) {
    const NumDivs = getNumDiv(arr, low, high);

    let lvctNodes = animationContainerArray;

    let levelIndex = lvctNodes.findIndex(
        (node) => node.dataset.level == level && node.dataset.type === "divided"
    );

    if (levelIndex === -1) {
        const levelContainer = newLevelContainer(level);
        levelContainer.appendChild(NumDivs.cloneNode(true));
        animationContainerArray.push(levelContainer);
    } else {
        lvctNodes[levelIndex].appendChild(NumDivs.cloneNode(true));

        while (
            lvctNodes[++levelIndex] &&
            low - high == 0
            // && lvctNodes[levelIndex].dataset.type == "divided"
        ) {
            // console.log(lvctNodes[levelIndex].children.length);
            lvctNodes[levelIndex].appendChild(NumDivs.cloneNode(true));
        }
    }
}

function displayMergedArray(arr, low, high, level) {
    let lvctNodes = animationContainerArray.filter(
        (node) => node.dataset.type !== "divided"
    );

    const NumDivs = getNumDiv(arr, low, high, "merged");

    let levelIndex = lvctNodes.findIndex(
        (node) => node.dataset.level == level && node.dataset.type === "merged"
    );

    if (levelIndex === -1) {
        const levelContainer = newLevelContainer(level, "merged");
        levelContainer.appendChild(NumDivs.cloneNode(true));
        animationContainerArray.push(levelContainer);
    } else {
        while (low++ <= high) {
            // console.log(low);
            lvctNodes[levelIndex].removeChild(lvctNodes[levelIndex].lastChild);

            // lvctNodes[levelIndex].removeChild(lvctNodes[levelIndex].lastChild);
        }
        lvctNodes[levelIndex].appendChild(NumDivs.cloneNode(true));
    }
}
