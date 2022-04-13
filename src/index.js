import "./style.css"
import { setUpProjects } from "./js-modules/project.js";
import {changeMainDisplay, openProject, handleItem, addItem, addNewProject} from "./js-modules/ui.js";
import { displayProjects } from "./js-modules/ui-project";


function main() {
    setUpProjects();
    changeMainDisplay("all");
    displayProjects();
    openProject();
    handleItem();
    addItem();
    addNewProject();
}


main();

