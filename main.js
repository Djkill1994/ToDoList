// const test = document.getElementById('test');
// console.log(test.dataset.idNote);
// [{id: '1', value: 'vlad', date: '12-12-2001:13:32}, {id: '2', value: 'kirill', date: '12-12-2001:13:32}]

// ---- CREATE VARIABLES HERE ----
const NOTE_KEY = 'notes';
const textarea = document.querySelector('.textarea-create');
const buttonAdd = document.querySelector('.add-button');
const notesContainer = document.querySelector('.notes-container');
let textAriaValue;


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

    newButtonDelete.addEventListener('click', function (event) {
        console.log(event.target.dataset.idNote);
        // add logic here
    });
}

function addNote() {
    const newNote = {id: Math.random() + '', value: textAriaValue};

    notes.push(newNote);
    localStorage.setItem(NOTE_KEY, JSON.stringify(notes));
    addNoteToNotesSection(newNote);
}

// ---- START LOGIC HERE ----
const notes = createNotes();

textarea.addEventListener('input', saveTextAriaInput)
buttonAdd.addEventListener('click', createNote);


// --- END START LOGIC ---