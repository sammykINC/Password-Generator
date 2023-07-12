const password_el = document.querySelector('#password');
const length_el = document.querySelector('#length');
const uppercase_el = document.querySelector('#uppercase');
const lowercase_el = document.querySelector('#lowercase');
const numbers_el = document.querySelector('#numbers');
const symbols_el = document.querySelector('#symbols');
const passCopy_el = document.querySelector('.passCopy');
const errorCopy_el = document.querySelector('.errorCopy');
const maxCopies_el = document.querySelector('.maxCopies');
const listContainer = document.querySelector(".list-container");

const generate_btn = document.querySelector('#generate');
generate_btn.addEventListener('click', GeneratePassword);
const copy_btn = document.querySelector('.copyPassword');
copy_btn.addEventListener('click', CopyPassword);

const uppercase_chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const lowercase_chars = "abcdefghijklmnopqrstuvwxyz"
const numbers_chars = "0123456789"
const symbols_chars = "!#$%&()*+-/=?@[]^_}{";
const elementLimit = 5;

function GeneratePassword() {
  let password = "";
  let lenght = length_el.value;
  let chars = "";

  chars += uppercase_el.checked ? uppercase_chars : "";
  chars += lowercase_el.checked ? lowercase_chars : "";
  chars += numbers_el.checked ? numbers_chars : "";
  chars += symbols_el.checked ? symbols_chars : "";

  for (let i = 0; i <= lenght; i++) {
    let rand = Math.floor(Math.random() * chars.length);
    password += chars.substring(rand, rand + 1);
  }

  password_el.value = password;

  if (listContainer.children.length <= elementLimit) {
    let li = document.createElement("li");
    li.innerHTML = password_el.value;
    listContainer.appendChild(li);

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);

    maxCopies_el.style.display = "none";

    saveData();
  } else {
    maxCopies_el.style.display = "block";
  }
}

listContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    password_el.value = "";
    saveData();
  }
}, false);

async function CopyPassword() {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(password_el.value);
    
    passCopy_el.style.display = "block";
  } if (password_el.value == "") {

    passCopy_el.style.display = "none";
    errorCopy_el.style.display = "block";
  }
  
  password_el.value = "";
}

window.onclick = function(e) {
  if (e.target !== copy_btn) {
    passCopy_el.style.display = "none";
    errorCopy_el.style.display = "none";
  }

  if (e.target !== generate_btn) {
    maxCopies_el.style.display = "none";
  }
}

function saveData() {
  localStorage.setItem("savedPass", listContainer.innerHTML);
}

function displayData() {
  listContainer.innerHTML = localStorage.getItem("savedPass");
}

displayData();