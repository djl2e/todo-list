import "./style.css"
import { setUpProjects } from "./js-modules/project.js";
import {changeMainDisplay, openProject, handleItem, addItem, addNewProject} from "./js-modules/ui.js";

setUpProjects();
changeMainDisplay("all");
openProject();
handleItem();
addItem();
addNewProject();



