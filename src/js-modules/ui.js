import {reloadCurrentPage, changeCurrentPage} from "./ui-main.js";
import { itemForm, add, hideForm, viewItem, editItemForm, completeEdit, deleteItem } from "./ui-item.js";
import { addToAllProjects, displayProjects, displayProjectForm, hideProjectForm } from "./ui-project.js";
import { deleteProject } from "./project.js";

const addItemButton = document.querySelector("#add-task");
const projectButtons = document.querySelector(".side");
const mainButtons = document.querySelector(".main");
const parentDivToProjectButton = document.querySelector(".new-project");

function changeMainDisplay(name) {
    changeCurrentPage(name);
}

function openProject() {
    projectButtons.addEventListener("click", (event) => {
        const project = event.target.closest("button");
        if (project == null || project.id == "add-project" ||
            project.id == "submit-new-project") {
            return;
        }
        changeCurrentPage(project.id);
    });
}

function handleItem() {
    mainButtons.addEventListener("click", (event) => {
        const task = event.target.closest("button");
        if (task == null) {
            return;
        }
        const action = task.classList.value;

        if (action == "project-delete-button") {
            deleteProject(task.parentNode.firstChild.textContent.toLowerCase());
            displayProjects();
            changeCurrentPage("all");
            return;
        }

        const title = task.parentNode.previousSibling.firstChild.textContent;

        if (action == "item-view-button") {
            controlViewItem(title);
        } else if (action == "item-edit-button") {
            editItem(title);
        } else if (action == "item-done-button") {
            completeItem(title);
        }
    })
}

function controlViewItem(title) {
    viewItem(title);
    const closeButton = document.querySelector("#view-close-button");
    closeButton.addEventListener("click", () => {
        hideForm();
    })
}

function addItem() {
    addItemButton.addEventListener("click", () => {
        itemForm();
        const addItemSubmitButton = document.querySelector("#submit-add-task");
        addItemSubmitButton.addEventListener("click", addItemHelper);
    })  
}

function addItemHelper() {
    const taskTitle = document.querySelector("#title-input");
    const taskDueDate = document.querySelector("#date-input");
    if (taskTitle.value == 0 || taskDueDate.value == 0) {
        hideForm();
        return;
    }
    const taskDescription = document.querySelector("#description-input");
    const taskImportance = document.querySelector("#is-important");
    const taskProject = document.querySelector("#project-input");

    console.log(taskDueDate.value);

    add(taskTitle.value, taskDescription.value, taskDueDate.value, 
        taskImportance.checked, taskProject.value);

    hideForm();
    reloadCurrentPage();
}

function editItem(title) {
    editItemForm(title);
    const submitEditButton = document.querySelector("#submit-edit-task");
    submitEditButton.addEventListener("click", () => {
        editItemHelper(title);
    });
}

function editItemHelper(title) {
    const taskTitle = document.querySelector("#title-input");
    const taskDueDate = document.querySelector("#date-input");
    if (taskTitle.value == 0 || taskDueDate.value == 0) {
        hideForm();
        return;
    }
    completeEdit(title);
    hideForm();
    reloadCurrentPage();
}

function completeItem(title) {
    deleteItem(title);
    reloadCurrentPage();
}

function addNewProject() {
    parentDivToProjectButton.addEventListener("click", (event) => {
        let closestButton = event.target.closest("button");
        if (closestButton == null) {
            return;
        }
        else if (closestButton.id == "add-project") {
            displayProjectForm();
            const newProjectInput = document.querySelector("#project-input");
            const submitProjectButton = document.querySelector("#submit-new-project");
            submitProjectButton.addEventListener("click", () => {
                const newProjectName = newProjectInput.value
                if (newProjectName.length == 0) {
                    return;
                }
                addToAllProjects(newProjectName);
                displayProjects();
                hideProjectForm();
            });
        }
    });
}

export {changeMainDisplay, openProject, handleItem, addItem, addNewProject};