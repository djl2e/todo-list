import {deleteProject, getAllItems, getCustomProjects} from "./project.js";
import {format, isSameDay, isSameWeek} from "date-fns";
import isBefore from "date-fns/isBefore";
import minusImg from "../img/delete.svg";

let currentPage = "all";
const main = document.querySelector(".main");
const today = new Date();
today.setHours(0, 0, 0, 0);

function display() {
    main.innerHTML = "";

    const mainHeader = document.createElement("h2");
    mainHeader.textContent = currentPage.charAt(0).toUpperCase() + currentPage.slice(1);
    main.appendChild(mainHeader);

    let projectItems = getAllItems();
    for (let i = 0; i < projectItems.length; i++) {
        let item = projectItems[i];

        if (currentPage == "important") {
            if (!item.getIsImportant()) {
                continue;
            }
        } else if (currentPage == "today") {
            if (!isSameDay(item.getDueDate(), today)) {
                continue;
            }
        } else if (currentPage == "week") {
            if (!isSameWeek(item.getDueDate(), today)) {
                continue;
            }
        } else if (currentPage == "late") {
            if (!isBefore(item.getDueDate(), today)) {
                continue;
            }
        } else if (currentPage != "all") {
            if (item.getProject() != currentPage) {
                continue;
            }
        }

        const itemDisplay = document.createElement("div");
        const itemLeftDisplay = document.createElement("div");
        const itemRightDisplay = document.createElement("div");
        const itemViewButton = document.createElement("button");
        const itemEditButton = document.createElement("button");
        const itemDoneButton = document.createElement("button");
        const itemDateDisplay = document.createElement("p");
        const itemTitleDisplay = document.createElement("p");

        itemDisplay.classList.add("item-display");
        itemLeftDisplay.classList.add("item-left-display");
        itemRightDisplay.classList.add("item-right-display");
        itemViewButton.classList.add("item-view-button");
        itemEditButton.classList.add("item-edit-button");
        itemDoneButton.classList.add("item-done-button");
        itemDateDisplay.classList.add("item-date-display");
        itemTitleDisplay.classList.add("item-title-display");

        itemTitleDisplay.textContent = item.getTitle();
        itemDateDisplay.textContent = format(item.getDueDate(), "yyyy-MM-dd");
        itemViewButton.textContent = "View";
        itemEditButton.textContent = "Edit";
        itemDoneButton.textContent = "Complete";

        itemLeftDisplay.appendChild(itemTitleDisplay);
        itemLeftDisplay.appendChild(itemDateDisplay);
        itemRightDisplay.appendChild(itemViewButton);
        itemRightDisplay.appendChild(itemEditButton);
        itemRightDisplay.appendChild(itemDoneButton);

        itemDisplay.appendChild(itemLeftDisplay);
        itemDisplay.appendChild(itemRightDisplay);

        main.appendChild(itemDisplay);
    }

    let customProjects = getCustomProjects();
    if (customProjects.includes(currentPage)) {
        const deleteProjectButton = document.createElement("button");
        deleteProjectButton.setAttribute("class", "project-delete-button");

        const deleteProjectImage = new Image();
        const deleteProjectContent = document.createElement("p");

        deleteProjectImage.src = minusImg;
        deleteProjectContent.textContent = "Delete Project"; 
        
        deleteProjectButton.appendChild(deleteProjectImage);
        deleteProjectButton.appendChild(deleteProjectContent);

        main.appendChild(deleteProjectButton);
    }
}

function reloadCurrentPage() {
    display();
}


function changeCurrentPage(newPage) {
    currentPage = newPage;
    display();
}


export {reloadCurrentPage, changeCurrentPage} ;