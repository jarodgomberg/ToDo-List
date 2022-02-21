//get everything necessary
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

//on keyup
inputBox.onkeyup = ()=>{
  let userEnteredValue = inputBox.value; //get entered val
  if(userEnteredValue.trim() != 0){ 
    addBtn.classList.add("active"); 
  }else{
    addBtn.classList.remove("active"); 
  }
}
getTasks(); //call getTasks
addBtn.onclick = ()=>{ //onclick plus icon
  let userEnteredValue = inputBox.value; //get input val
  let getLocalStorageData = localStorage.getItem("New Todo"); //get local storage
  if(getLocalStorageData == null){ //if localstorage is null
    listArray = []; //create new blank array
  }else{
    listArray = JSON.parse(getLocalStorageData);  //create json string into a js object
  }
  listArray.push(userEnteredValue); //push or add new value
  localStorage.setItem("New Todo", JSON.stringify(listArray)); //create js object into a json string
  getTasks(); //call getTasks
  addBtn.classList.remove("active"); 
}
function getTasks(){
  let getLocalStorageData = localStorage.getItem("New Todo");
  if(getLocalStorageData == null){
    listArray = [];
  }else{
    listArray = JSON.parse(getLocalStorageData); 
  }
  const pendingTasksNumb = document.querySelector(".pendingTasks");
  pendingTasksNumb.textContent = listArray.length; //pass array length
  if(listArray.length > 0){ //length is greater than 0
    deleteAllBtn.classList.add("active"); 
  }else{
    deleteAllBtn.classList.remove("active"); 
  }
  let newLiTag = "";
  listArray.forEach((element, index) => {
    newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
  });
  todoList.innerHTML = newLiTag; //add new li tag inside ul tag
  inputBox.value = ""; //once added leave field blank
}
// delete function
function deleteTask(index){
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1); //delete
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  getTasks(); //call getTasks
}
// delete all function
deleteAllBtn.onclick = ()=>{
  listArray = []; //empty array
  localStorage.setItem("New Todo", JSON.stringify(listArray)); //set item in localstorage
  getTasks(); //call getTasks 
}