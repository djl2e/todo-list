import createItem from "./item.js";

const items = [];
const projects = [];
const customProjects = [];

function setUpProjects() {
    const initialProjects = ["all", "important", "today", "week", "late"];
    for (let i = 0; i < initialProjects.length; i++) {
        addProject(initialProjects[i]);
    }
}

function addProject(name) {
    projects.push(name);
}

function addCustomProject(name) {
    customProjects.push(name);
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