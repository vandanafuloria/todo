const inputEl = document.querySelector('input');
const addEl = document.querySelector('.img');
const taskContainerEl = document.querySelector('.task-bar');

const notes = [];

/*
A note will be represented by
{
    note: text,
    isCompleted: boolean
}
-------------------------------------

Sort checked & unchecked notes
1. Clear all children of notes container
2. iterate array, uncompleted tasks add
3. again iterate arry, complete task add

*/

function changeStatus(id, status) {
    for(let note of notes) {
        if(note.id === id) {
            note.isCompleted = status;
            break;
        }
    }
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


    // delete handler
  
    crossBtnEl.onclick = () => {
        taskContainerEl.removeChild(taskEl);
        // iterate the array which is tracking the record of note which formed;
        for(let i = 0; i < notes.length; i++) {
            if(notes[i].id === taskObj.id) {
                notes.splice(i, 1); // removing the note which is present 0n the that index;
                break;
            }
        }
    }

    // edit note handler
    editEl.onclick = function() {
        const editedText = prompt("Edit your note", taskObj.note);
        if(editedText.length === 0) return ;
        taskNameEl.textContent = editedText;

        for(let i = 0; i < notes.length; i++) {
            if(notes[i].id === taskObj.id) {
                notes[i].note = editedText;
                break;
            }
        }
    }


    checkList.addEventListener('change', (e) => {
        changeStatus(taskObj.id, e.target.checked)
        taskContainerEl.appendChild(taskEl);
    });

    return taskEl;
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
        id: notes.length,
        note: taskName,
        isCompleted: false
    };

    const taskEl = generateElement(taskObj);

    taskContainerEl.insertBefore(taskEl, taskContainerEl.firstChild);// adding new one to the first postin 
    const audioEl = new Audio('./assets/ting.mp3');  // playing audio
    audioEl.play();
        inputEl.value = "";

    notes.push(taskObj); /// new formed obj push to array;

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





