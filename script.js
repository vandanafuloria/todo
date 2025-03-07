const inputEl = document.querySelector('input');
const addEl = document.querySelector('.img');
const taskContainerEl = document.querySelector('.task-bar');

let notes = {};


function saveToLocalStorage(taskObj) {

    const notesString = JSON.stringify(notes);
    localStorage.setItem('notes', notesString);
    console.log('notes string: ', notesString);
  
}
/*----------------------------------------------------------------- */

function changeStatus(id, status) {

    const note = notes[id];
    note.isCompleted = true;
    saveToLocalStorage();
}



function generateElement(taskObj) {
    
    
    const taskEl =  document.createElement('div');
    const checkList = document.createElement('input')
    checkList.checked = taskObj.isCompleted;
    checkList.setAttribute("type", "checkbox");
 //the checked property in JavaScript is used to determine whether a checkbox or
 //  radio button is selected. It is a Boolean property of an <input> element with 
 // type="checkbox" or type="radio".;

    taskEl.appendChild(checkList);
 
    // creating note para//
    const taskNameEl = document.createElement('p');
    taskNameEl.innerText = taskObj.note;
    taskEl.appendChild(taskNameEl);

    // tools for delete and edit are used here  // 
    const toolContainerEl = document.createElement('div');
    toolContainerEl.classList.add('note-tools')

    const editEl = document.createElement('img');
    editEl.setAttribute('src', './image/pencil.png');
    editEl.setAttribute('alt', 'pencil');


    const crossBtnEl = document.createElement('button');
    crossBtnEl.textContent = "X";
    crossBtnEl.classList.add('cross-btn')
    toolContainerEl.append(editEl, crossBtnEl)
    taskEl.appendChild(toolContainerEl)
    const spanEl= document.createElement('span');
    // const editedDateEl = new Date();
  
    // const formattedDate = taskObj.created.toLocaleString("en-US", {
    //   day: "2-digit",    // "07"
    //   weekday: "short",  // "Fri"
    //   month: "short",    // "Mar"
    //   year: "numeric",   // "2025"
    //   hour: "2-digit",   // "03"
    //   minute: "2-digit", // "22"
    //   // second: "2-digit", // "31" seconde i dont wnat 
    //   hour12: true       // AM/PM format
    // });

    console.log(`created: ${taskObj.created}, modified: ${taskObj.edited}`)
    if(taskObj.created.getTime() === taskObj.edited.getTime()) {
        // this has not been modified
        spanEl.innerText = `Created At: ${taskObj.created.toLocaleString()}`;
    } else {
        spanEl.innerText = `Modified At: ${taskObj.edited.toLocaleString()}`;
    }

    taskEl.appendChild(spanEl);
    crossBtnEl.onclick = () => deleteHandler(taskObj.id, taskEl);
    editEl.onclick = () => editHandler(taskObj, taskNameEl);
        checkList.addEventListener('change', (e) => {
        changeStatus(taskObj.id, e.target.checked)
        taskContainerEl.appendChild(taskEl);
    });

    return taskEl;
}


function editHandler (taskObj, taskNameEl) {
    const editedText = prompt("Edit your note", taskObj.note);
    if(editedText.length === 0) return ;
    taskNameEl.textContent = editedText;

    const editedNote = notes[taskObj.id];
    taskObj.edited = new Date();
    editedNote.note = editedText;


    taskNameEl.nextSibling.nextSibling.textContent = `Modified at ${taskObj.edited.toLocaleString()}`;
    taskNameEl.textContent = editedText;
    
    console.log("this is edite:", taskObj.edited);
    saveToLocalStorage();
   
}

function deleteHandler(id, task) {
    delete notes[id];
    taskContainerEl.removeChild(task)
   saveToLocalStorage();
}



//************************************************************************************************************ */

function formTaskBar(){
    const taskName = inputEl.value;
    // if no task added : check;
    if(!taskName){
        alert("Add Task 🧑🏻‍💻");
        return;
    }
    // every time when task bar will form then task obj will form;
    const taskObj = {
        id: Date.now(),
        note: taskName,
        isCompleted: false,
        created: new Date(),
        edited: new Date(),
    };
    

    const taskEl = generateElement(taskObj);
    console.log(taskEl);
    

    taskContainerEl.insertBefore(taskEl, taskContainerEl.firstChild);
    const audioEl = new Audio('./assets/ting.mp3');
    audioEl.play();
    inputEl.value = "";

    notes[taskObj.id] = taskObj;
    saveToLocalStorage(taskObj);
 
}



//************************************************************************************************



function initializeApplication() {

/**
 * 1. get items from local storage
 * 2. parse the json string
 * 3. render the notes in UI
 */
    console.log("Loaded")
    const notesString = localStorage.getItem('notes');
    const notesObj = JSON.parse(notesString);
    if(!notesObj) return;

    console.log(notesObj)

    for(let id in notesObj) {
        const note = notesObj[id];

        note.created = new Date(note.created);
        note.edited = new Date(note.edited);

        const noteEl = generateElement(note);
        taskContainerEl.appendChild(noteEl);
    }
    notes = notesObj;
}




addEl.addEventListener('click', formTaskBar);
// when enter pressed then also element should form ;

window.addEventListener('keypress', (e) => {
    if(e.keyCode === 13) {
        // user has pressed enter
        formTaskBar();
    }
})

window.addEventListener('load', initializeApplication);



