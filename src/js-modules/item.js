class Item {
    constructor(title, description, dueDate, isImportant, project) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.isImportant = isImportant;
        this.project = project;
    }

    getTitle() {
        return this.title;
    }

    getDescription() {
        return this.description;
    }

    getDueDate() {
        return this.dueDate;
    }

    getIsImportant() {
        return this.isImportant;
    }

    getProject() {
        return this.project;
    }

    changeTitle(newTitle) {
        this.title = newTitle;
    }

    changeDescription(newDescription) {
        this.description = newDescription;
    }

    changeDueDate(newDueDate) {
        this.dueDate = newDueDate;
    }

    toggleImportant() {
        this.isImportant = !this.isImportant;
    }

    changeProject(newProject) {
        this.project = newProject;
    }
}

function createItem(title, description, dueDate, isImportant, project) {
    return new Item(title, description, dueDate, isImportant, project);
}

export default createItem;