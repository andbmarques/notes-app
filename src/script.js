import hashCode from './Utils/hashCode.js';
import Modal from './Utils/Modal/modal.js';

window.onload = () => {
    const createNoteButton = document.getElementById("create-note-button");
    const createNoteInput = document.getElementById("create-note-input");
    const notesList = document.getElementById("notes-list");
    const saveButton = document.getElementById("save-button");
    const clearAllButton = document.getElementById("clear-all-button");
    
    let notesArr = JSON.parse(localStorage.getItem("notes")) || [];
    
    if (notesArr) {
        notesArr.forEach((element) => {
            const noteItem = document.createElement("li");
            noteItem.innerHTML = element.title;
            noteItem.classList.add("note-item");
            notesList.appendChild(noteItem);
        })
    }
    
    createNoteButton.addEventListener("click", (event) => {
        event.preventDefault();
        if (createNoteInput.value === "") {
            alert("Insira um titulo para nota.");
        }
        else if (notesArr.find((obj) => obj.title === createNoteInput.value)) {
            alert("Já existe uma nota com este título!");
            createNoteInput.value = "";
        }
        else {
            
            notesArr.push({ id: hashCode(createNoteInput.value), title: createNoteInput.value, description: "" });
            const noteItem = document.createElement("li");
            noteItem.innerHTML = createNoteInput.value;
            noteItem.classList.add("note-item");
            noteItem.addEventListener("click", (event) => {
                event.preventDefault();
                Modal(notesArr.find((obj) => obj.title === noteItem.innerText), notesArr);
            })
            notesList.appendChild(noteItem);
            createNoteInput.value = "";
        }
    });
    
    saveButton.addEventListener("click", (event) => {
        event.preventDefault();
        localStorage.setItem("notes", JSON.stringify(notesArr));
        alert("Salvo com sucesso!");
    });
    
    clearAllButton.addEventListener("click", (event) => {
        event.preventDefault();
        localStorage.removeItem("notes");
        document.location.reload(true);
    });
    
    document.querySelectorAll(".note-item").forEach((element) => {
        element.addEventListener("click", (event) => {
            event.preventDefault();
            Modal(notesArr.find((obj) => obj.title === element.innerText), notesArr);
        })
    });
    
}