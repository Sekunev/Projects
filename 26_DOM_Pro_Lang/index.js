console.log("**** app.js *******");

//? Selectors
const langInput = document.querySelector(".lang-input");
const addBtn = document.querySelector("#add-btn");
const deleteBtn = document.querySelector("#delete-btn");
const langList = document.getElementById("lang-list");

const newUl = document.createElement("ul");
langList.appendChild(newUl);

//? addBtn event handler
addBtn.addEventListener("click", () => {
  if (!langInput.value) {
    alert("Please enter a language");
  } else if (langInput.value.toLowerCase() === "javascript") {
    newUl.innerHTML += `<li class = "text-danger">${langInput.value}</li>`;
    langInput.value = "";
  } else {
    newUl.innerHTML += `<li>${langInput.value}</li>`;
    langInput.value = "";
  }
  langInput.focus();
});

//? deleteBtn event handler
deleteBtn.addEventListener("click", () => {
  newUl.childElementCount > 0
    ? newUl.removeChild(newUl.lastElementChild)
    : alert("There is no item to delete");
});

//? enter key and  del key event handler
langInput.addEventListener("keydown", (event) => {
  // console.log(event);
  // console.log(event.target);
  // console.log(event.keyCode);
  // console.log(event.code);

  if (event.keyCode === 13) {
    addBtn.click();
  }

  // if (event.code === "Delete") {
  //   deleteBtn.click();
  // }

  if (event.keyCode === 46) {
    deleteBtn.click();
  }
});

//? onload event handler
window.addEventListener("load", () => {
  langInput.focus();
});

//! exam Lamba

let on = document.querySelector(".btn-on");
let off = document.querySelector(".btn-off");
let on_off = document.querySelector(".btn-on_off");
let yananlamb = document.querySelector(".yanan");
let sonenlamb = document.querySelector(".sonen");

off.addEventListener("click", () => {
  yananlamb.classList.add("d-none");
  sonenlamb.classList.remove("d-none");
  // yananlamb.classList.toggle("d-none");
  // sonen.classList.toggle("d-none");
});
on.addEventListener("click", () => {
  yananlamb.classList.remove("d-none");
  sonenlamb.classList.add("d-none");
  // yananlamb.classList.toggle("d-none");
  // sonen.classList.toggle("d-none");
});
on_off.addEventListener("click", () => {
  yananlamb.classList.toggle("d-none");
  sonenlamb.classList.toggle("d-none");
});

console.log(on);
console.log(off);
