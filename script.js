let inputEl = document.querySelector('input');
const addEl = document.querySelector('.img');
const taskContainerEl = document.querySelector('.task-bar');



function formTaskBar(){
    const taskName = inputEl.value;
    if(!taskName){
        alert("Add Task 🧑🏻‍💻");
        return;
    }
    
   const task =  document.createElement('div');
   const checkList = document.createElement('input')
   checkList.setAttribute("type", "checkbox");
   task.appendChild(checkList);
   const taskNameEl = document.createElement('div');
   taskNameEl.innerText = taskName;
   taskNameEl.classList.add('text-div');
   
//    const node = document.createTextNode(taskName);
   
   task.appendChild(taskNameEl);
   taskContainerEl.appendChild(task);
   const audioEl = new Audio('./assets/ting.mp3');
   audioEl.play();
   inputEl.value = "";


  
}



addEl.addEventListener('click', formTaskBar)
