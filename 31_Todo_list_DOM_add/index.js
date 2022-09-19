const input = document.querySelector(".input");
const buton1 = document.getElementById("add-btn");
const myul = document.querySelector(".myul");
const liste = document.querySelector(".liste");
let tota = document.querySelector(".tota");
let compl = document.querySelector(".comp");
const newElement = document.createElement("li");

const btnSil = document.querySelector(".trash");

let total = 0;
let completed = 0;

buton1.addEventListener("click", () => {
  if (!input.value) {
    alert("lütfen bir seyler yazınız...");
  } else {
    myul.innerHTML += `<li class="myli d-flex justify-content-between">
    <i class="fa-regular fa-square "></i>
    <span class="">${input.value}</span>
    <i class="fa-solid fa-trash-can"></i>
  </li>`;
    total++;
    input.value = "";
    input.focus();
  }
  tota.innerHTML = `Total: ${total}`;
});

input.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    buton1.click();
  }
});
// keyCode === 13 girildiğinde hem numara bölümündeki enter hemde diğer enterı kapsıyor.

console.log(myul);
myul.addEventListener("click", (e) => {
  console.log(e); //PointerEvent {isTrusted: true, pointerId: 1, width: 1, height: 1, pressure: 0, …}
  console.log(e.target); //
  // target metodu uygulamak ile uygulamamak arasındaki fark: "e" içerisinde "fa-trash-can" class'lı element'e tıklayınca işlem yap demiş oluyoruz.

  if (e.target.classList.contains("fa-trash-can")) {
    e.target.parentElement.remove();
    total--;
  } else if (e.target.classList.contains("fa-square")) {
    e.target.classList.remove("fa-square", "fa-regular");
    e.target.classList.add("fa-solid", "fa-check");
    e.target.parentElement.classList.add("bg");
    // completed++;
  } else if (e.target.classList.contains("fa-check")) {
    e.target.classList.add("fa-square", "fa-regular");
    e.target.classList.remove("fa-solid", "fa-check");
    e.target.parentElement.classList.remove("bg");
    // completed--;
  }
  // compl.innerHTML = `Completed: ${completed}`;
  tota.innerHTML = `Total: ${total}`;
});

window.addEventListener("load", () => {
  input.focus();
});

// ***DATE****

const date = new Date();

const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();

const fullyear = `${year}/${month}/${day}`;

console.log(fullyear);
document.querySelector(".date").innerText = `${fullyear}`;
