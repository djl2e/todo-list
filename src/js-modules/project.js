import { format } from "date-fns";
import createItem from "./item.js";
import headerIconImage from "../img/header-icon.png";
import allIconImage from "../img/all.svg";
import importantIconImage from "../img/important.svg";
import todayIconImage from "../img/today.svg";
import thisWeekIconImage from "../img/this-week.svg";
import lateIconImage from "../img/passed.svg";
import addIconImage from "../img/add.svg";

const initialProjects = ["all", "important", "today", "week", "late"];

let items = [];
let projects = [];
let customProjects = [];

function setUpProjects() {

    if (localStorage.getItem("customProjects")) {
        customProjects = JSON.parse(localStorage.getItem("customProjects"));
    }

    if (localStorage.getItem("projects")) {
        projects = JSON.parse(localStorage.getItem('projects'));
    } else {
        for (let i = 0; i < initialProjects.length; i++) {
            addProject(initialProjects[i]);
        }
    }

    if (localStorage.getItem("items")) {
        let tempItems = JSON.parse(localStorage.getItem('items'));
        for (let i = 0; i < tempItems.length; i++) {
            let tempItem = tempItems[i];
            let dateInput = new Date(tempItem.dueDate);
            addItem(tempItem.title, tempItem.description, dateInput,
                tempItem.isImportant, tempItem.project);
        }
    }

    loadImages();
}

function loadImages() {
    const headerIcon = document.querySelector("#header-icon");
    const headerAddIcon = document.querySelector("#header-add-icon");
    const allIcon = document.querySelector("#all-icon");
    const importantIcon = document.querySelector("#important-icon");
    const todayIcon = document.querySelector("#today-icon");
    const thisWeekIcon = document.querySelector("#this-week-icon");
    const lateIcon = document.querySelector("#late-icon");
    const addIcon = document.querySelector("#add-project");

    headerIcon.src = headerIconImage;
    headerAddIcon.src = addIconImage;
    allIcon.src = allIconImage;
    importantIcon.src = importantIconImage;
    todayIcon.src = todayIconImage;
    thisWeekIcon.src = thisWeekIconImage;
    lateIcon.src = lateIconImage;
    addIcon.src = addIconImage;
}

function addProject(name) {
    projects.push(name);
    localStorage.setItem('projects', JSON.stringify(projects));
}

function addCustomProject(name) {
    customProjects.push(name);
    localStorage.setItem('customProjects', JSON.stringify(customProjects));
}

function getAllItems() {
    return items;
}

function getProjects() {
    return projects;
}

function getCustomProjects() {
    return customProjects;
}

function deleteProject(name) {
    let index = projects.map(project => project).indexOf(name);
    if (index > -1) {
        projects.splice(index, 1);
    }
    let customIndex = customProjects.map(project => project).indexOf(name);
    if (customIndex > -1) {
        customProjects.splice(customIndex, 1);
    }


    for (let i = items.length - 1; i >= 0; i--) {
        let item = items[i];
        if (item.getProject() == name) {
            items.splice(i, 1);
        }
    }
}


function addItem(title, description, inputDate, isImportant, project) {
    const newItem = createItem(title, description, inputDate, isImportant, project);
    items.push(newItem);
    localStorage.setItem('items', JSON.stringify(items));
}

function getItemByTitle(title) {
    let index = items.map(item => item.getTitle()).indexOf(title);
    return items[index];
}

function deleteItemByTitle(title) {
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        if (item.getTitle() == title) {
            items.splice(i, 1);
            return;
        }
    }
}

export { setUpProjects, addProject, addCustomProject, getAllItems, getProjects, getCustomProjects,
        deleteProject, addItem, getItemByTitle, deleteItemByTitle}