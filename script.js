"use strict";

const inputBox = document.querySelector(".inputfield input");
const addBtn = document.querySelector(".inputfield button");
const todoList = document.querySelector(".todoList");
const deleteBtn = document.querySelector(".footer button");
let listArr;

inputBox.onkeyup = () => {
  let userData = inputBox.value;
  return userData.trim().length !== 0
    ? addBtn.classList.add("active")
    : addBtn.classList.remove("active");
};
showTask();

addBtn.onclick = () => {
  let userData = inputBox.value;
  let getLocalStorage = localStorage.getItem("New Todo");
  if (getLocalStorage === null) {
    listArr = [];
  } else {
    listArr = JSON.parse(getLocalStorage);
  }
  listArr.push(userData);
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  showTask();
};

function showTask() {
  let userData = inputBox.value;
  let getLocalStorage = localStorage.getItem("New Todo");
  if (getLocalStorage === null) {
    listArr = [];
  } else {
    listArr = JSON.parse(getLocalStorage);
  }
  let pendingNum = document.querySelector(".pendingNum");
  pendingNum.textContent = listArr.length;
  inputBox.value = "";
  addBtn.classList.remove("active");
  let newLiTag = "";
  listArr.map((item) => {
    newLiTag += `<li> ${item} <span onclick="deleteTask()" ><i class="fas fa-trash"></i></span></li>`;
  });
  todoList.innerHTML = newLiTag;
  return listArr.length > 0
    ? deleteBtn.classList.add("active")
    : deleteBtn.classList.remove("active");
}

function deleteTask(index) {
  listArr.splice(index, 1);
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  showTask();
}

deleteBtn.onclick = () => {
  listArr = [];
  localStorage.setItem("New Todo", JSON.stringify(listArr));
  showTask();
};
