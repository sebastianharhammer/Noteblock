let notes = [];
let notesTitle = [];
let notesDeleted = [];
let notesTitleDeleted = [];
load();

function render() {
  let content = document.getElementById('content');
  let contentDeleted = document.getElementById('content-deleted');
  content.innerHTML = '';
  contentDeleted.innerHTML = ''; 
  addContent();
  addContentDeleted();
}


function addNote() {

  let noteValue = document.getElementById('note').value;
  let titleValue = document.getElementById('title').value;
  let note = document.getElementById('note');
  let title = document.getElementById('title');
  if (noteValue === `` || titleValue === ``)
    { 
      alert('Es muss Titel sowie eine Notiz angegeben werden');
      window.location.reload(true);
    }
    else {
      notes.push(note.value);
      notesTitle.push(title.value);
      save();
      render();
         }
}


function addContent() {
  
  for (let i = 0; i < notes.length; i++) 
    {
    addContentHTML(i);
    }
}


function addContentHTML (i) {
    const note = notes[i];
    const noteTitle = notesTitle[i];
    document.getElementById('content').innerHTML += /*html*/`
      <div class="card">
        <b>${noteTitle}:</b>
        ${note}
        <button onclick="deleteNote(${i})">delete</button>
      </div>
      `
      
}


function addContentDeleted() {
  for (let i = 0; i < notesDeleted.length; i++)
    {
    addContentDeletedHTML(i);
    }
    
    returnHTML();
}


function returnHTML() {document.getElementById('content-deleted').innerHTML += /*html*/
  `
  <div id="trash-overlay">
    <img src="./img/recycle-solid.svg" id="recycle" onclick="showTrash(), addBlur(), restoreAll()" title="restore all">
    <img src="./img/dumpster-fire-solid.svg" id="empty-trash" onclick="emptyTrash()" title="empty trash">
    <button onclick="closeTrash(), removeBlur()" id="btn-back-recycle">back</button>
    </div>`;
}


function addContentDeletedHTML(i){
  const note = notesDeleted[i];
  const noteTitle = notesTitleDeleted[i];
  document.getElementById('content-deleted').innerHTML += /*html*/`
    <div class="card">
        <b>${noteTitle}:</b>
        ${note}
        <button onclick="restore(${i})">restore</button>
    </div>
    `;
    
}


function deleteNote(i) {
  let deletedNote = notes[i];
  let deletedNoteTitle = notesTitle[i];
  notesDeleted.push(deletedNote);
  notesTitleDeleted.push(deletedNoteTitle);
  notes.splice(i, 1);
  notesTitle.splice(i, 1); 
  save();
  render();
}


function restore(i) {
 let restoreNote = notesDeleted[i];
 let restoreNoteTitle = notesTitleDeleted[i];
 notes.push(restoreNote);
 notesTitle.push(restoreNoteTitle);
  notesDeleted.splice(i, 1);
  notesTitleDeleted.splice(i, 1);
  if (notesDeleted.length === 0)
    {removeBlur();
      closeTrash();
    }
  save();
  render();
}

function restoreAll() {
  notes.push(...notesDeleted);
  notesTitle.push(...notesTitleDeleted);
  notesDeleted.splice(0);
  notesTitleDeleted.splice(0);
  closeTrash();
  removeBlur();
    save();
    render();
}


function save() {
  let notesAsText = JSON.stringify(notes);
  let notesDeletedAsText = JSON.stringify(notesDeleted);
  localStorage.setItem('notes', notesAsText);
  localStorage.setItem('notes-deleted', notesDeletedAsText);
  let titleAsText = JSON.stringify(notesTitle);
  let deletedTitleAsText = JSON.stringify(notesTitleDeleted);
  localStorage.setItem('titles', titleAsText);
  localStorage.setItem('titles-deleted', deletedTitleAsText);
}


function load() {
  let notesAsText = localStorage.getItem('notes');
  let deletednoteAsText = localStorage.getItem('notes-deleted');
  let titleAsText = localStorage.getItem('titles');
  let deletedtitleAsText = localStorage.getItem('titles-deleted');
  if (notesAsText || titleAsText) 
    {
    notes = JSON.parse(notesAsText);
    notesTitle = JSON.parse(titleAsText);
    }
  if (deletednoteAsText || deletedtitleAsText)
    {
      notesDeleted = JSON.parse(deletednoteAsText);
      notesTitleDeleted = JSON.parse(deletedtitleAsText);
    }
}


function emptyTrash() {
  notesDeleted.splice(0);
  notesTitleDeleted.splice(0);
  closeTrash();
  removeBlur();
  save();
  render();
}


function showTrash() {
  if (notesDeleted.length>0)
    {
  document.getElementById('content-deleted').classList.remove('d-none');
  document.getElementById('content-deleted').classList.add('d-flex');
  document.getElementById('placeholder-header').classList.remove('d-none');
  addBlur();
  closeNote();
}
}


function closeTrash() {
  document.getElementById('content-deleted').classList.add('d-none');
  document.getElementById('content-deleted').classList.remove('d-flex');
  document.getElementById('placeholder-header').classList.add('d-none');
}


function showNote() {
  document.getElementById('new-note').classList.remove('d-none');
  document.getElementById('placeholder-header').classList.remove('d-none');
  closeTrash();
  document.getElementById('note').value = ``;
  document.getElementById('title').value = ``;
}


function closeNote() {
  document.getElementById('new-note').classList.add('d-none');
  document.getElementById('placeholder-header').classList.add('d-none');
}

function addBlur() {
  document.getElementById('content').classList.add('blur');
}


function removeBlur() {
  document.getElementById('content').classList.remove('blur');
}