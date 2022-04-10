import { isSameDay, isSameWeek } from "date-fns";
import isBefore from "date-fns/isBefore";
import createItem from "./item.js";
import createProject from "./project.js";

const projects = []
const customProjects = []

function setUpProjects() {
    const initialProjects = ["all", "important", "today", "week", "late"];
    for (let i = 0; i < initialProjects.length; i++) {
        addProject(initialProjects[i]);
    }
}

function addProject(name) {
    const newProject = createProject(name);
    projects.push(newProject);
}

function addCustomProject(name) {
    const newProject = createProject(name);
    customProjects.push(newProject);
}

function addItemToProject(item, projectName) {
    const index = getIndex(projectName);
    projects[index].addItem(item);
}

function getProject(name) {
    let index = getIndex(name);
    return projects[index];
}

function deleteProject(name) {
    let index = getIndex(name);
    if (index > -1) {
        projects.splice(index, 1);
    }
    let customIndex = getCustomIndex(name);
    if (customIndex > -1) {
        customProjects.splice(customIndex, 1);
    }
}

function getCustomProjects() {
    return customProjects;
}

function addItem(title, description, inputDate, isImportant, project) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const newItem = createItem(title, description, inputDate, isImportant);

    addItemToProject(newItem, "all");
    
    if (isBefore(inputDate, today)) {
        addItemToProject(newItem, "late");
    } 
    
    if (isSameDay(inputDate, today)) {
        addItemToProject(newItem, "today")
    } 
    
    if (isSameWeek(inputDate, today)) {
        addItemToProject(newItem, "week")
    }

    if (isImportant) {
        addItemToProject(newItem, "important");
    }

    if (project.length != 0) {
        addItemToProject(newItem, project);
    }
}

function getIndex(name) {
    return projects.map(project => project.name).indexOf(name);
}

function getCustomIndex(name) {
    return customProjects.map(project => project.name).indexOf(name);
}

export {setUpProjects, addProject, addCustomProject, getProject, 
    deleteProject, getCustomProjects, addItem};