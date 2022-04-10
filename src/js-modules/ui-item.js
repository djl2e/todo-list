import format from "date-fns/format";
import { getCustomProjects, addItem, getItemByTitle, deleteItemByTitle } from "./project.js";

const form = document.querySelector(".form");

const formTitle = document.createElement("h2");
const titleLabel = document.createElement("label");
const titleInput = document.createElement("input");
const descriptionLabel = document.createElement("label");
const descriptionInput = document.createElement("textarea");
const dueDateLabel = document.createElement("label");
const dueDateInput = document.createElement("input");
const isImportantContainer = document.createElement("div");
const isImportantLabel = document.createElement("label");
const isImportantInput = document.createElement("input");
const projectLabel = document.createElement("label");
const projectInput = document.createElement("select");


formTitle.textContent = "Add New Task";
    
titleLabel.htmlFor = "title-input";
titleLabel.textContent = "Title *";
titleInput.type = "text";
titleInput.setAttribute("id", "title-input");

descriptionLabel.htmlFor = "description-input";
descriptionLabel.textContent = "Description";
descriptionInput.setAttribute("id", "description-input");
descriptionInput.setAttribute("rows", 5);
descriptionInput.setAttribute("cols", 33);

dueDateLabel.htmlFor = "date-input";
dueDateLabel.textContent = "Due Date *";
dueDateInput.type = "date";
dueDateInput.setAttribute("id", "date-input");

isImportantContainer.setAttribute("class", "important-container");
isImportantLabel.htmlFor = "is-important";
isImportantLabel.textContent = "Extra Important";
isImportantInput.type = "checkbox";
isImportantInput.setAttribute("id", "is-important");

projectLabel.htmlFor = "project-input";
projectLabel.textContent = "Project";
projectInput.setAttribute("id", "project-input");




function itemForm() {
    form.innerHTML = "";

    titleInput.value = "";
    descriptionInput.value = "";
    dueDateInput.value = format(new Date().setHours(0, 0, 0, 0), "yyyy-MM-dd");
    isImportantInput.checked = false;
    projectInput.value = "";


    projectInput.innerHTML = "";
    const defaultOption = document.createElement("option");
    projectInput.appendChild(defaultOption);

    const projectList = getCustomProjects();
    for (let i = 0; i < projectList.length; i++) {
        const option = document.createElement("option");
        const optionName = projectList[i];
        option.value = optionName;
        option.textContent = optionName;
        projectInput.appendChild(option);
    }

    const submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.setAttribute("id", "submit-add-task");

    form.appendChild(formTitle);
    form.appendChild(titleLabel);
    form.appendChild(titleInput);
    form.appendChild(descriptionLabel);
    form.appendChild(descriptionInput);
    form.appendChild(dueDateLabel);
    form.appendChild(dueDateInput);
    isImportantContainer.appendChild(isImportantLabel);
    isImportantContainer.appendChild(isImportantInput);
    form.appendChild(isImportantContainer);
    form.appendChild(projectLabel);
    form.appendChild(projectInput);
    form.appendChild(submitButton);
    
    displayForm();
}

function editItemForm(title) {
    const item = getItemByTitle(title);

    form.innerHTML = "";

    titleInput.value = item.getTitle();
    descriptionInput.value = item.getDescription();
    dueDateInput.value = format(item.getDueDate(), "yyyy-MM-dd");
    isImportantInput.checked = item.getIsImportant();

    projectInput.innerHTML = "";
    const defaultOption = document.createElement("option");
    projectInput.appendChild(defaultOption);

    const projectList = getCustomProjects();
    for (let i = 0; i < projectList.length; i++) {
        const option = document.createElement("option");
        const optionName = projectList[i];
        option.value = optionName;
        option.textContent = optionName;
        projectInput.appendChild(option);
    }
    projectInput.value = item.getProject();

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.setAttribute("id", "submit-edit-task");

    form.appendChild(formTitle);
    form.appendChild(titleLabel);
    form.appendChild(titleInput);
    form.appendChild(descriptionLabel);
    form.appendChild(descriptionInput);
    form.appendChild(dueDateLabel);
    form.appendChild(dueDateInput);
    isImportantContainer.appendChild(isImportantLabel);
    isImportantContainer.appendChild(isImportantInput);
    form.appendChild(isImportantContainer);
    form.appendChild(projectLabel);
    form.appendChild(projectInput);
    form.appendChild(editButton);
    
    displayForm();
}

function completeEdit(title) {
    const item = getItemByTitle(title);

    if (titleInput.value != item.getTitle()) {
        item.changeTitle(titleInput.value);
    }
    if (descriptionInput.value != item.getDescription()) {
        item.changeDescription(descriptionInput.value);
    }
    if (dueDateInput.value != format(item.getDueDate(), "yyyy-MM-dd").toString()) {
        item.changeDueDate(new Date(dueDateInput.value));
    }
    if (isImportantInput.checked != item.getIsImportant()) {
        item.toggleImportant();
    }
    if (projectInput.value != item.getProject()) {
        item.changeProject(projectInput.value);
    }
}

function viewItem(title) {
    const item = getItemByTitle(title);

    form.innerHTML = "";

    const formHeader = document.createElement("h2");
    const titleContainer = document.createElement("div");
    const titleTag = document.createElement("p");
    const titleInfo = document.createElement("p");
    const descriptionContainer = document.createElement("div");
    const descriptionTag = document.createElement("p");
    const descriptionInfo = document.createElement("p");
    const dateContainer = document.createElement("div");
    const dateTag = document.createElement("p");
    const dateInfo = document.createElement("p");
    const importantContainer = document.createElement("div");
    const importantTag = document.createElement("p");
    const importantInfo = document.createElement("p");
    const projectContainer = document.createElement("div");
    const projectTag = document.createElement("p");
    const projectInfo = document.createElement("p");
    const closeButton = document.createElement("button");

    descriptionInfo.setAttribute("class", "task-description");
    closeButton.setAttribute("id", "view-close-button");

    formHeader.textContent = "View Task";
    titleTag.textContent = "Title:";
    titleInfo.textContent = item.getTitle();
    descriptionTag.textContent = "Description:";
    descriptionInfo.textContent = item.getDescription();
    dateTag.textContent = "Due Date:";
    dateInfo.textContent = format(item.getDueDate(), "yyyy-MM-dd");
    importantTag.textContent = "Important:";
    if (item.getIsImportant()) {
        importantInfo.textContent = "\u2713";
    } else {
        importantInfo.textContent = "\u2715";
    }
    projectTag.textContent = "Project:";
    projectInfo.textContent = item.getProject();
    closeButton.textContent = "Close";

    form.appendChild(formHeader);
    titleContainer.appendChild(titleTag);
    titleContainer.appendChild(titleInfo);
    form.appendChild(titleContainer);
    descriptionContainer.appendChild(descriptionTag);
    descriptionContainer.appendChild(descriptionInfo);
    form.appendChild(descriptionContainer);
    dateContainer.appendChild(dateTag);
    dateContainer.appendChild(dateInfo);
    form.appendChild(dateContainer);
    importantContainer.appendChild(importantTag);
    importantContainer.appendChild(importantInfo);
    form.appendChild(importantContainer);
    projectContainer.appendChild(projectTag);
    projectContainer.appendChild(projectInfo);
    form.appendChild(projectContainer);
    form.appendChild(closeButton);

    displayForm();
}

function deleteItem(title) {
    deleteItemByTitle(title);
}


function add(title, description, dueDate, isImportant, project) {
    const date = new Date(dueDate);
    addItem(title, description, date, isImportant, project);
}

function displayForm() {
    form.style.visibility = "visible";
}

function hideForm() {
    form.style.visibility = "hidden";
}

export { itemForm, editItemForm, completeEdit, viewItem, deleteItem,
     add, displayForm, hideForm };