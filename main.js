// ---- CREATE VARIABLES HERE ----
const NOTE_KEY = 'notes';
const createTextarea = document.querySelector('.create-textarea');
const changeTextarea = document.querySelector('.change-textarea');
const buttonAdd = document.querySelector('#add-button');
const buttonChange = document.querySelector('#save-button');
const notesContainer = document.querySelector('.notes-container');
const createTextareaContainer = document.querySelector('.create-textarea-container');
const changeTextareaContainer = document.querySelector('.change-textarea-container');
let textAriaValue = '';
// --- END CREATE VARIABLES ---
function createNotes() {
    let notesFromLocalStorage = localStorage.getItem(NOTE_KEY); // this returns string
    let parsedNotesFromString = JSON.parse(notesFromLocalStorage); // this returns object (Array)
    // undefined -> false, [{id: 123}] -> true, !false -> true, !true -> false
    if (!parsedNotesFromString) {
        parsedNotesFromString = [];
    }
    return parsedNotesFromString;
}

function saveTextAriaInput(event) {
    textAriaValue = event.target.value;
    if (textAriaValue === ''){
        buttonAdd.setAttribute('disabled', 'disabled');
    } else{
        buttonAdd.removeAttribute("disabled");
    }
}

function addNoteToNotesSection(newNote) {
    const noteContainer = document.createElement('div');
    noteContainer.classList.add('noteContainer');

    const newButtonDelete = document.createElement('button');
    newButtonDelete.classList.add('buttonDelete');
    newButtonDelete.setAttribute('data-id-note', newNote.id);
    newButtonDelete.innerHTML = "Delete";

    const textElement = document.createElement('div');
    textElement.classList.add('note');
    textElement.innerHTML = newNote.value;
    textElement.setAttribute('data-id-note', newNote.id);

    noteContainer.appendChild(textElement);
    noteContainer.appendChild(newButtonDelete);
    notesContainer.appendChild(noteContainer);

    textElement.addEventListener('click', function (){
        createTextareaContainer.style.display = 'none';
        changeTextareaContainer.style.display = 'block';

        changeTextarea.setAttribute('data-id-note', newNote.id);
        changeTextarea.value = newNote.value;
        textAriaValue = newNote.value;
    });

    newButtonDelete.addEventListener('click', function (event) {
        const clickedIdNote = event.target.dataset.idNote;
        for (let i = 0; i < notes.length; i++) {
            if (notes[i].id === clickedIdNote) {
                notes.splice(i, 1);
            }
        }
        localStorage.setItem(NOTE_KEY, JSON.stringify(notes));
        notesContainer.removeChild(noteContainer);
    });
}

function addNote() {
    const newNote = {id: Math.random().toString(), value: textAriaValue};

    notes.push(newNote);
    textAriaValue = '';
    localStorage.setItem(NOTE_KEY, JSON.stringify(notes));

    createTextarea.value = '';
    buttonAdd.setAttribute('disabled', 'disabled');
    addNoteToNotesSection(newNote);
}

function createNotesSection(notes) {
    for (let i = 0; i < notes.length; i++) {
        addNoteToNotesSection(notes[i]);
    }
}

// ---- START LOGIC HERE ----
const notes = createNotes();
createNotesSection(notes);

createTextarea.addEventListener('input', saveTextAriaInput);
changeTextarea.addEventListener('input', saveTextAriaInput);

buttonAdd.addEventListener('click', addNote);
buttonChange.addEventListener('click', function () {
    createTextareaContainer.style.display = 'block';
    changeTextareaContainer.style.display = 'none';
    const changeNoteId = changeTextarea.dataset.idNote;
    for (let i = 0; i < notes.length; i++) {
        if (notes[i].id === changeNoteId) {
            notes[i].value = textAriaValue;
        }
    }
    const noteToChange = document.querySelector(`.note[data-id-note="${changeNoteId}"]`);
    noteToChange.innerHTML = textAriaValue;
    localStorage.setItem(NOTE_KEY, JSON.stringify(notes));
});

// --- END START LOGIC ---