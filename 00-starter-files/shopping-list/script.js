//initial display will be (no list items) so code inside ul remoevd from html

//added item wont be stored in users local storage
const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");
const itemCross = document.querySelectorAll(".fa-solid");
const itemClear = document.querySelector("#clear");
const itemFilter = document.querySelector("#filter");
const inputFilter = document.querySelector(".form-input-filter");
const formBtn = itemForm.querySelector("button");
let isEditMode = false; //for state change of application

// const items = document.querySelector("li");

//triggered when submit/edit button clicked
//responsible for adding as well as editing
function onAddItemSubmit(e) {
  e.preventDefault(); //prevent refreshing when submit
  const newValue = itemInput.value;
  //validate input
  if (newValue === "") {
    alert("pls enter item name");
  } else {
    //if (checkIfItemExist(newValue))

    //editable items also need this,because the orig item deletd and new li created in its palec
    const li = document.createElement("li");
    const liText = document.createTextNode(newValue);

    //check for edit mode
    //we cant edit an item in local storage only get,set
    //remove ditable item from dom storage
    //via the add item dom, storage,the inputted value(edit btn click),is added inton both
    if (isEditMode) {
      const itemToEdit = itemList.querySelector(".edit-mode");
      removeItemFromStorage(itemToEdit.textContent); //remove storage

      itemToEdit.remove(); //remove dom
      isEditMode = false;
    } else {
      //if editing so if try to update withoutr edit,it wont give alert and again orig one deleted and a similar li added//else we couldnt have come out of update mode if the func in if condition on the outer else
      if (checkIfItemExist(newValue)) {
        alert("That item already exists!");
        itemInput.value = "";
        return;
      }
    }
    addItemToDOM(newValue); //updated dom
    addItemToStorage(newValue); //acc to updated dom local storage updated
    checkUI(); //so if originally empty array,now 1  li,so the view also needs to be updated,filt,clr added
    //also takes care of bringing edit btn=>back to orig
    itemInput.value = "";
  }

  // const liBtn = createButton("remove-item btn-link text-red");
  // // const liBtn = document.createElement("button");
  // // const liCross = document.createElement("i");
  // // liBtn.className = "remove-item btn-link text-red";
  // // liCross.className = "fa-solid fa-xmark";
  // // liBtn.appendChild(liCross);
  // li.appendChild(liText);
  // li.appendChild(liBtn);
  // itemList.appendChild(li);
  //check=>every time after element added
}

//checking so that we dont ahve duplicate items
//if we have=>return true else return=>false
function checkIfItemExist(item) {
  let OrigStorageItem = getItemsFromStorage();
  // if (OrigStorageItem.includes(item)) {
  //   return true;
  // } else {
  //   return false;
  // }
  // or
  return OrigStorageItem.includes(item);
}

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

//event handler=>based on area of click=>diff tasks completed
//edit mode=>state of application changes i.e add item btn changes to update btn,its icon also changed
//genralized click =>handles both cross click and any other area click
function onClickItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
}

function setItemToEdit(item) {
  isEditMode = true;

  //only one li can be edited at a time
  //so when some oither li is clicked for edit,initially all li dont have edit mode,then edit mode added to that particular li only that was clicked and which triggered the edit func recently
  itemList.querySelectorAll("li").forEach((item) => {
    item.classList.remove("edit-mode");
  });
  //change li txt to light when clicked on
  item.classList.add("edit-mode");
  //cahnging upper form btn=>editmode
  formBtn.innerHTML = `<i class="fa-solid fa-pen"></i> Update Item`;
  formBtn.style.backgroundColor = "#228B22";

  //add text from clicked li into form-input field
  itemInput.value = item.textContent;
}

const removeItem = (item) => {
  if (confirm("are you sure?")) {
    //remove item from DOM
    item.remove();

    //remove item from storage
    removeItemFromStorage(item.textContent); //we only need text content

    checkUI();
  }

  // console.log(e.target);
  // //contains is not methid of nodelist
  // // if (itemCross.contains(e.target)) {
  // //   e.target.parentElement.parentElement.remove();
  // // }
  // //or
  // //btn contains remove item class
  // //.contains method
  // //confirm=>window.confirm() instructs the browser to display a dialog with an optional message, and to wait until the user either confirms or cancels the dialog.
  // //if cancel=>the body of confirm if not executed
  // if (e.target.parentElement.classList.contains("remove-item")) {
  //   if (confirm("are you sure?")) {
  //     e.target.parentElement.parentElement.remove();
  //     checkUI();
  //   }
  // }
};

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage(); //gives orig array,now we have to remove item from this arr

  //filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  //reset the local storage(items responsible for storing data in local storage)
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

// clearall button
function clearItems(e) {
  //dom removal
  if (confirm("are you sure?")) {
    while (itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
    }

    //clear from localStorage
    localStorage.removeItem("items"); //clear can also be used as only items key present in local storage,clear removes all keys
    checkUI();
  }
}

function checkUI() {
  //checking for lenth of li inside func as when placed in global scope,it's value
  //was defined only once(when just page loaded) so it,s value initializwdd to 0 ,and never edited again,even after changes made to ul.length
  //so we'll place items inside func=>so its value dynamically changed

  const items = document.querySelectorAll("li");
  if (items.length === 0) {
    itemFilter.style.display = "none";
    itemClear.style.display = "none";
  } else {
    itemFilter.style.display = "block";
    itemClear.style.display = "block";
  }

  //edit events complete=>bringing form back to original
  isEditMode = false;
  formBtn.innerHTML = ` <i class="fa-solid fa-plus"></i> Add Item`;
  formBtn.style.backgroundColor = "#333";
  //reset input field
  itemInput.value = "";
}

function searchFilter(e) {
  const items = document.querySelectorAll("li");
  console.log(items);
  // const arr = Arrays.rom(items);
  console.log(e.target.value);

  //lowercase done to avoid inconsistencies say filter input in upeercase and li lowercase
  items.forEach((element) => {
    //element.textContent !== e.target.value.tolowercase() (wrong)
    //item.firstchild.textcontent.tolowercase().indexof(text)!== -1
    if (
      element.firstChild.textContent
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    ) {
      element.style.display = "flex";
    } else {
      element.style.display = "none";
    }
  });
}

function addItemToDOM(item) {
  const li = document.createElement("li");
  const liText = document.createTextNode(item);

  const liBtn = createButton("remove-item btn-link text-red");

  li.appendChild(liText);
  li.appendChild(liBtn);
  itemList.appendChild(li);
}

// onAddItemSubmit internally calls this func=>so whenever thta func called locakl storage updated
function addItemToStorage(item) {
  //original arr(before update)=stored arr in local storage
  let itemFromStorage = getItemsFromStorage(); //used for assigning arr to it,or stringify arr

  //items arr of li
  if (localStorage.getItem("items") === null) {
    itemFromStorage = []; //assigning empty arr
  } else {
    itemFromStorage = JSON.parse(localStorage.getItem("items")); //string=>arr
  }
  //adding item in func arg//to array
  itemFromStorage.push(item);
  //stringifying updated arr and sending back to loc storage
  //in same key=>items
  localStorage.setItem("items", JSON.stringify(itemFromStorage));
}

//the local storage yet hasnt been used=>to display li,so after refresh =>blank display shown
//now only the storage has been properly managed ,dom still going back to orig after refresh
function getItemsFromStorage() {
  let itemFromStorage; //used for assigning arr to it,or stringify arr

  //items arr of li
  if (localStorage.getItem("items") === null) {
    itemFromStorage = []; //assigning empty arr
  } else {
    itemFromStorage = JSON.parse(localStorage.getItem("items")); //string=>arr
  }
  return itemFromStorage;
}

function displayItems() {
  //after refresh=>DOM back to orig//onAddItemSubmit its effect vanishes
  //so anytime DOM reloaded ,this func runs each item
  //and populates dom
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDOM(item));
  checkUI(); //as called after page reloaded when dom has no li//so after needed li added this func called
}

//event listener
function init() {
  //not needed to form func(has whatever initialization we need to happen when page loads inside this func)
  itemForm.addEventListener("submit", onAddItemSubmit); //on add=>2 func present=>add item to DOM,local storage

  //multiple elements that we want to click and delete
  //use event delegation current evnet listener=>ul
  // itemList.addEventListener("click", removeItem);
  //when click on li we dont just want to delete
  //also update functionality,so a more generalized ev liste
  itemList.addEventListener("click", onClickItem);

  itemClear.addEventListener("click", clearItems);
  inputFilter.addEventListener("input", searchFilter);

  document.addEventListener("DOMContentLoaded", displayItems);

  //if no list items=>then dont show filter and clearall functionality
  //executed wehn page loaded=> as no li=>filter and clearAll not shown
  checkUI();
  //now checking(no of list items) only happens once when page loade
  //for making website dynamic =>check=>every time after element added
}
//storing the li in local storage
//so the array of li=>converted into string format(json.stringify)
//when we take it out(json.parse)=>conv back tto arr

init();
