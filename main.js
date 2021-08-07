// const test = document.getElementById('test');
// console.log(test.dataset.idNote);
// [{id: '1', value: 'vlad', date: '12-12-2001:13:32}, {id: '2', value: 'kirill', date: '12-12-2001:13:32}]

// ---- CREATE VARIABLES HERE ----
const NOTE_KEY = 'notes';
const textarea = document.querySelector('.textarea-create');
const buttonAdd = document.querySelector('.add-button');
const notesContainer = document.querySelector(".notes-container");
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

function createNote() {
    // notes = [];
    // notes.push({id: 1});
    // notes -> [{id: 1}]
    // notes.push({id: 2})
    // notes -> [{id: 1}, {id: 2}]

    const newNote = { id: Math.random() + '', value: textAriaValue };
    notes.push(newNote);
    localStorage.setItem(NOTE_KEY, JSON.stringify(notes));

    let noteDiv = document.createElement('div');
    noteDiv.classList.add('note');
    noteDiv.setAttribute('data-id-note', newNote.id);
    noteDiv.innerHTML = newNote.value;
    notesContainer.appendChild(noteDiv);
}

// ---- START LOGIC HERE ----
const notes = createNotes();

textarea.addEventListener('input', saveTextAriaInput)
buttonAdd.addEventListener('click', createNote);




// --- END START LOGIC ---