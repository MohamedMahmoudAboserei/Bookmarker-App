let siteName = document.getElementById("bookmarkName");
let siteURL = document.getElementById("bookmarkURL");
let BtnSubmit = document.getElementById("BtnSubmit");
let tableContent = document.getElementById("tableContent");
let BtnDelete;
let BtnVisit;
let closeBtn = document.getElementById("closeBtn");
let boxModal = document.querySelector(".box-info");
let bookmarks = [];
let search = document.getElementById("search");

// ==> Verify the presence of the menu in localStorage <==

if (localStorage.getItem("bookmarksList") != null) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarksList"));

    let storedBookmarks = localStorage.getItem("bookmarksList");
    try {
        bookmarks = JSON.parse(storedBookmarks);
        if (!Array.isArray(bookmarks)) {
            bookmarks = [];
        }
    } catch (e) {
        bookmarks = [];
    }

    for (var x = 0; x < bookmarks.length; x++) {
        displayBookmark(x);
    }
}

// ==> Display Function and adding click event to visit and delete buttons <==

function displayBookmark(indexOfWebsite) {
    let userURL = bookmarks[indexOfWebsite].siteURL;
    let httpsRegex = /^https?:\/\//g;
    let fixedURL, validURL;
    if (httpsRegex.test(userURL)) {
        validURL = userURL;
        fixedURL = validURL
            .split("")
            .splice(validURL.match(httpsRegex)[0].length)
            .join("");
    } else {
        fixedURL = userURL;
        validURL = `https://${userURL}`;
    }

    let newBookmark = `
    <tr>
        <td>${indexOfWebsite + 1}</td>
        <td>${bookmarks[indexOfWebsite].siteName}</td>
        <td>
            <button class="btn btn-visit" data-index="${indexOfWebsite}">
                <i class="fa-solid fa-eye"></i>
            </button>
        </td>
        <td>
            <button class="btn btn-delete" data-index="${indexOfWebsite}">
                <i class="fa-solid fa-trash"></i>
            </button>
        </td>
    </tr>
    `;

    tableContent.innerHTML += newBookmark;

    // ==> Adding Click Event to All delete buttons every time a new bookmark being added <==
    let BtnDelete = document.querySelectorAll(".btn-delete");
    if (BtnDelete) {
        for (let j = 0; j < BtnDelete.length; j++) {
            BtnDelete[j].addEventListener("click", function (e) {
                deleteBookmark(e);
            });
        }
    }

    // ==> Adding Click Event to All visit buttons every time a new bookmark being added <==

    let BtnVisit = document.querySelectorAll(".btn-visit");
    if (BtnVisit) {
        for (let l = 0; l < BtnVisit.length; l++) {
            BtnVisit[l].addEventListener("click", function (e) {
                visitWebsite(e);
            });
        }
    }

}

// ==> Clear Input <==

function clearInput() {
    siteName.value = "";
    siteURL.value = "";
}

function capitalize(str) {
    let strArr = str.split("");
    strArr[0] = strArr[0].toUpperCase();
    return strArr.join("");
}

// ==> Submit <==

BtnSubmit.addEventListener("click", function () {
    if (
        siteName.classList.contains("is-valid") &&
        siteURL.classList.contains("is-valid")
    ) {
        let bookmark = {
            siteName: capitalize(siteName.value),
            siteURL: siteURL.value,
        };
        if (!Array.isArray(bookmarks)) {
            bookmarks = [];
        }
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
        displayBookmark(bookmarks.length - 1);
        clearInput();
        siteName.classList.remove("is-valid");
        siteURL.classList.remove("is-valid");
    } else {
        boxModal.classList.remove("d-none");
    }
});

// ==> Delete <==

function deleteBookmark(e) {
    tableContent.innerHTML = "";
    let deletedIndex = e.target.dataset.index;
    bookmarks.splice(deletedIndex, 1);
    for (let k = 0; k < bookmarks.length; k++) {
        displayBookmark(k);
    }
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
}

// ==> Visit <==

function visitWebsite(e) {
    let websiteIndex = e.target.dataset.index;
    let httpsRegex = /^https?:\/\//;
    if (httpsRegex.test(bookmarks[websiteIndex].siteURL)) {
        open(bookmarks[websiteIndex].siteURL);
    } else {
        open(`https://${bookmarks[websiteIndex].siteURL}`);
    }
}

// ==> validatio <==

let nameRegex = /^\w{3,}(\s+\w+)*$/;
let urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

siteName.addEventListener("input", function () {
    validate(siteName, nameRegex);
});

siteURL.addEventListener("input", function () {
    validate(siteURL, urlRegex);
});

function validate(element, regex) {
    let testRegex = regex;
    if (testRegex.test(element.value)) {
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
    } else {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
    }
}

// ==> Close Modal Function <==

function closeModal() {
    boxModal.classList.add("d-none");
}

// ==> 3 ways to close modal => close button -  Esc key - clicking outside modal <==

closeBtn.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
    if (e.key == "Escape") {
        closeModal();
    }
});

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("box-info")) {
        closeModal();
    }
});

// ==> Search Function <==

function searchName() {
    let searchterm = search.value.toLowerCase();
    let searchCartoona = "";

    for (let i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].siteName.toLowerCase().includes(searchterm)) {
            searchCartoona += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${bookmarks[i].siteName}</td>
                    <td>
                        <button class="btn btn-visit" data-index="${i}">
                            <i class="fa-solid fa-eye"></i>
                        </button>
                    </td>
                    <td>
                        <button class="btn btn-delete" data-index="${i}">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        }
    }
    tableContent.innerHTML = searchCartoona;
}

















