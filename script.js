const inputEl = document.querySelector('input');
const addEl = document.querySelector('.img');
const taskContainerEl = document.querySelector('.task-bar');

const notes = {};

/*
A note will be represented by
[ 
  {
    note: text,
    isCompleted: boolean
  },
  {}, 
  ....
]

{
   id : {note object},
   id2: {note object 2}
}

{"hello", false, 123}
{"hello 2", false, 124}


[{"hello", false, 123}, {"hello 2", false, 124}]

{
    123 : {"hello", false, 123},
    124 : {"hello 2", false, 124},
}


-------------------------------------

Sort checked & unchecked notes
1. Clear all children of notes container
2. iterate array, uncompleted tasks add
3. again iterate arry, complete task add


1. Each note will have a crated on note with date and time
2. if note was modified, edited on note with date and time

*/

function changeStatus(id, status) {

    const note = notes[id];
    note.isCompleted = true;
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
    crossBtnEl.classList.add('cross-btn');

    // const spnaEl = document.createElement('span');

    toolContainerEl.append(editEl, crossBtnEl)

    taskEl.appendChild(toolContainerEl)
    // taskEl.appendChild(spnaEl);

    crossBtnEl.onclick = () => deleteHandler(taskObj.id, taskEl);
    editEl.onclick = () => editHandler(taskObj, taskNameEl);



    // delete handler
  
    // crossBtnEl.onclick = () => {
    //     taskContainerEl.removeChild(taskEl);
    //     // iterate the array which is tracking the record of note which formed;

    //     for(let i = 0; i < notes.length; i++) { // O(n) =>  n + n = 2n => O(n)
    //         if(notes[i].id === taskObj.id) {
    //             notes.splice(i, 1); // removing the note which is present 0n the that index;
    //             // O(n)
    //             break;
    //         }
    //     }
    // }


    // edit note handler
    // editEl.onclick = function() {
    //     const editedText = prompt("Edit your note", taskObj.note);
    //     if(editedText.length === 0) return ;
    //     taskNameEl.textContent = editedText;

    //     // for(let i = 0; i < notes.length; i++) {
    //     //     if(notes[i].id === taskObj.id) {
    //     //         notes[i].note = editedText;
    //     //         break;
    //     //     }
    //     // }
    //     const editedNote = notes[taskObj.id];
    //     editedNote.note = editedText;

    // }


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
    editedNote.note = editedText;
}

function deleteHandler(id, task) {
    delete notes[id];
    taskContainerEl.removeChild(task)
}

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
        isCompleted: false
    };

    const taskEl = generateElement(taskObj);

    taskContainerEl.insertBefore(taskEl, taskContainerEl.firstChild);// adding new one to the first postin 
    const audioEl = new Audio('./assets/ting.mp3');  // playing audio
    audioEl.play();
        inputEl.value = "";

//    notes.push(taskObj); /// new formed obj push to array;
    // notes[]
    // id : taskObj, 123
    notes[taskObj.id] = taskObj



    console.log(notes);
}



addEl.addEventListener('click', formTaskBar);
// when enter pressed then also element should form ;

window.addEventListener('keypress', (e) => {
    if(e.keyCode === 13) {
        // user has pressed enter
        formTaskBar();
    }
})





