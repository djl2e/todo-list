import plusImg from "../img/add.svg";
import projectImg from "../img/project.svg";
import { addProject, addCustomProject, getCustomProjects } from "./project.js";

const projectDisplay = document.querySelector(".projects");
const newProjectContainer = document.querySelector(".new-project");

function addToAllProjects(name) {
    addProject(name);
    addCustomProject(name);
}

function displayProjects() {
    projectDisplay.innerHTML = "";
    const customProjects = getCustomProjects();
    console.log(customProjects);
    for (let i = 0; i < customProjects.length; i++) {
        let currentProject = customProjects[i];

        const projectContainer = document.createElement("button");
        const projectImage = new Image();
        const projectName = document.createElement("p");

        projectContainer.setAttribute("class", "project");
        projectContainer.setAttribute("id", currentProject);
        projectImage.src = projectImg;
        projectName.textContent = currentProject.charAt(0).toUpperCase() + currentProject.slice(1);


        projectContainer.appendChild(projectImage);
        projectContainer.appendChild(projectName);

        projectDisplay.appendChild(projectContainer);
    }
}

function displayProjectForm() {
    newProjectContainer.innerHTML = "";

    const newProjectInputContainer = document.createElement("div");
    newProjectInputContainer.setAttribute("class", "project-input-container");

    const newProjectInput = document.createElement("input");
    newProjectInput.type = "text";
    newProjectInput.setAttribute("id", "project-input");

    const newProjectButton = document.createElement("button");
    newProjectButton.setAttribute("id", "submit-new-project");
    newProjectButton.textContent = "Add!";

    newProjectInputContainer.appendChild(newProjectInput);
    newProjectInputContainer.appendChild(newProjectButton);

    newProjectContainer.appendChild(newProjectInputContainer);
}

function hideProjectForm() {
    newProjectContainer.innerHTML = "";

    const addProjectButton = document.createElement("button");
    addProjectButton.setAttribute("id", "add-project");
    
    const buttonImg = new Image();
    buttonImg.src = plusImg;
    
    const buttonContent = document.createElement("p");
    buttonContent.textContent = "Add Project";

    addProjectButton.appendChild(buttonImg);
    addProjectButton.appendChild(buttonContent);

    newProjectContainer.appendChild(addProjectButton);
}

export {addToAllProjects, displayProjects, displayProjectForm, hideProjectForm};