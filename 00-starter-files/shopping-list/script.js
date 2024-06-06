//added item wont be stored in users local storage

const itemForm = document.querySelector(".item-form");
const itemInput = document.querySelector(".item-input");
const itemList = document.querySelector(".item-list");

const addItem = (e) => {
  //validate input
  if (itemInput.value === "") {
    alert("pls enter item name");
  }

  // create and add listitem
  const li = document.createElement("li");
  const liText = document.createTextNode(`${itemInput.value}`);

  const liBtn = createButton("remove-item btn-link text-red");
  // const liBtn = document.createElement("button");
  // const liCross = document.createElement("i");
  // liBtn.className = "remove-item btn-link text-red";
  // liCross.className = "fa-solid fa-xmark";
  // liBtn.appendChild(liCross);
  li.appendChild(liText);
  li.appendChild(liBtn);
  itemList.appendChild(li);
  itemForm.value = "";
};

function createButton(classes) {
  const btn = document.createElement("button");
  btn.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  btn.appendChild(icon);
  return btn;
}
function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

itemForm.addEventListener("submit", addItem);
