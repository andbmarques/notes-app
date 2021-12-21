export default function Modal(note, array) {

    const backgroundContainer = document.createElement("div");
    const cardContainer = document.createElement("div");
    const titleContainer = document.createElement("div");
    const titleText = document.createElement("textarea");
    const descriptionText = document.createElement("h2");
    const editTitleButton = document.createElement("i");
    const descriptionTextArea = document.createElement("textarea");
    const backButton = document.createElement("button");
    const saveButton = document.createElement("button");
    const deleteButton = document.createElement("button");
    const buttonsContainer = document.createElement("div");
    const descriptionContainer = document.createElement("div");
    const editDescriptionButton = document.createElement("i");

    titleText.innerText = note.title;
    descriptionTextArea.innerText = note.description;
    descriptionText.innerText = "Descrição";
    backButton.innerText = "Voltar";
    saveButton.innerText = "Salvar";
    deleteButton.innerText = "Deletar";
    
    backgroundContainer.classList.add("background-container");
    cardContainer.classList.add("card-container");
    titleContainer.classList.add("title-container");
    titleText.classList.add("title-text");
    descriptionText.classList.add("description-text");
    editTitleButton.classList.add("fas");
    editTitleButton.classList.add("fa-edit");
    editTitleButton.classList.add("edit-title-button");
    descriptionTextArea.classList.add("text-area-description");
    backButton.classList.add("back-button");
    saveButton.classList.add("save-button");
    deleteButton.classList.add("delete-button");
    buttonsContainer.classList.add("buttons-container");
    descriptionContainer.classList.add("description-container");
    editDescriptionButton.classList.add("fas");
    editDescriptionButton.classList.add("fa-edit");
    editDescriptionButton.classList.add("edit-description-button");

    titleText.disabled = true;
    titleText.rows = 1;
    descriptionTextArea.disabled = true;

    backgroundContainer.appendChild(cardContainer);
    titleContainer.appendChild(titleText);
    titleContainer.appendChild(editTitleButton);
    cardContainer.appendChild(titleContainer);
    descriptionContainer.appendChild(descriptionText);
    descriptionContainer.appendChild(editDescriptionButton);
    cardContainer.appendChild(descriptionContainer);
    cardContainer.appendChild(descriptionTextArea);
    buttonsContainer.appendChild(backButton);
    buttonsContainer.appendChild(saveButton);
    buttonsContainer.appendChild(deleteButton);
    cardContainer.appendChild(buttonsContainer);
    document.body.appendChild(backgroundContainer);

    backButton.addEventListener("click", () => {
        backgroundContainer.style.display = "none";
    })

    editDescriptionButton.addEventListener("click", () => {
        descriptionTextArea.disabled = false;
    })

    editTitleButton.addEventListener("click", () => {
        titleText.disabled = false;
    })

    deleteButton.addEventListener("click", () => {
        array.find((obj, index) => obj.id === note.id ? array.splice(index, 1) : null);
        localStorage.setItem("notes", JSON.stringify(array));
        document.location.reload(true);
    });

    saveButton.addEventListener("click", () => {        
        const newArray = array.map((element) => {
            if (element.id === note.id) {
                return { id: element.id, title: titleText.value, description: descriptionTextArea.value }
            }
            else {
                return { id: element.id, title: element.title, description: element.description }
            }
        });
        localStorage.setItem("notes", JSON.stringify(newArray));
        document.location.reload(true);
    })

}
