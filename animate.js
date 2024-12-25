const animationContainer = document.getElementById("animation-container");

export function animationIntialization(arr, n) {
    arr = arr.map((a, i) => {
        const divNumBox = document.createElement("div");
        divNumBox.classList.add("div-num-box");
        divNumBox.textContent = a;
        divNumBox.id = i;
        divNumBox.value = a;

        return divNumBox;
    });

    displayDividedArray(arr, 0, arr.length - 1, 1);

    function merge(arr, low, mid, high, l) {
        let x = low,
            y = mid + 1;

        let temp = [];

        // compaire and push element in ascending order from both array
        while (x <= mid && y <= high) {
            if (arr[x].value <= arr[y].value) {
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

    function mergeSort(arr, low, high, level) {
        if (low < high) {
            // level++;
            let mid = Math.floor((low + high) / 2);

            displayDividedArray(arr, low, mid, level);
            mergeSort(arr, low, mid, level + 1); // left array

            displayDividedArray(arr, mid + 1, high, level);
            mergeSort(arr, mid + 1, high, level + 1); // right array

            merge(arr, low, mid, high, level);
            displayMergedArray(arr, low, high, level);
        }
    }
    mergeSort(arr, 0, arr.length - 1, 2);
}

function getNumDiv(arr, low, high) {
    const NumDivs = document.createElement("div");
    NumDivs.classList.add("num-box-container");

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

    // console.log(level);
    // console.log(arr[low].value, "left", level);
    let lvctNodes = animationContainer.querySelectorAll(".level-container");

    let levelIndex = Array.from(lvctNodes).findIndex(
        (node) => node.dataset.level == level
    );
    // if level is exist then append the num divs to the level container
    if (levelIndex == -1) {
        const levelContainer = newLevelContainer(level);
        // levelContainer.textContent = `Level ${level}`;

        levelContainer.appendChild(NumDivs.cloneNode(true));
        animationContainer.appendChild(levelContainer);
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
    let lvctNodes = animationContainer.querySelectorAll(
        ".level-container:not([data-type='divided'])"
    );

    const NumDivs = getNumDiv(arr, low, high);
    NumDivs.dataset.merging = "true";

    let levelIndex = Array.from(lvctNodes).findIndex(
        (node) => node.dataset.level == level
    );

    if (levelIndex == -1) {
        const levelContainer = newLevelContainer(level, "merged");
        levelContainer.appendChild(NumDivs.cloneNode(true));
        animationContainer.appendChild(levelContainer);
    } else {
        const oldContainer = lvctNodes[levelIndex].lastChild;
        const newContainer = NumDivs.cloneNode(true);

        const oldBoxes = Array.from(oldContainer.children);
        const newBoxes = Array.from(newContainer.children);

        oldBoxes.forEach((box, i) => {
            const rect = box.getBoundingClientRect();
            box.style.transform = `translateX(${rect.left}px)`;
        });

        lvctNodes[levelIndex].removeChild(oldContainer);
        lvctNodes[levelIndex].appendChild(newContainer);

        requestAnimationFrame(() => {
            newBoxes.forEach((box, i) => {
                const rect = box.getBoundingClientRect();
                box.style.transform = `translateX(0)`;
            });
        });
    }
}
// export function animateMergeSort(arr, low, high, dir = "left") {
//     console.log(low, high, arr.slice(low, high + 1));

// const divNumBoxesContainer = document.createElement("div");
// divNumBoxesContainer.classList.add("div-num-boxes-container");

// const leftDiv = document.createElement("div");
// leftDiv.classList.add("left");

// const rightDiv = document.createElement("div");
// rightDiv.classList.add("right");

//     for (let i = low; i <= high; i++) {
//         // console.log(arr[i])
//         leftDiv.innerHTML += divNumBoxes[i].value;
//     }

//     divNumBoxesContainer.appendChild(leftDiv);
//     divNumBoxesContainer.appendChild(rightDiv);

//     animationContainer.appendChild(divNumBoxesContainer);
// }
