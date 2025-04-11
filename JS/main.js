
// Select needed DOM elements
let light = document.querySelector(".light");
let container = document.querySelector(".container");
let body = document.body;
let add = document.querySelector(".add");
let style = document.createElement("style");
let total = document.querySelector(".total");
let names = document.querySelector(".name");
let price = document.querySelector(".Dprice");
let taxs = document.querySelector(".Dtaxs");
let ads = document.querySelector(".Dads");
let number = document.querySelector(".Dnumber");
let category = document.querySelector(".category");
let discount = document.querySelector(".Ddiscount");
let deleteall = document.querySelector(".deleteall");
let input = document.querySelectorAll("input");
let inp = document.querySelector(".inputs");
let search = document.querySelector(".SEARCH");

// Meta product Storage
let storage = [];


// Load products from localStorage on page load if existed
window.addEventListener("DOMContentLoaded", function () {
  const savedProducts = localStorage.getItem("products");
  if (savedProducts) {
    storage = JSON.parse(savedProducts);
    storage.forEach((product) => renderProduct(product));
  }
});

// Save products to localStorage, called when adding or deleting products from storage
function saveToLocalStorage() {
  localStorage.setItem("products", JSON.stringify(storage));
}

// Dark to light mode toggle
light.addEventListener("click", function (event) {
  event.preventDefault();
  if (this.classList.contains("on")) {
    this.classList.remove("on");
    this.classList.add("off");
    body.style.backgroundColor = "#222";
    container.style.backgroundColor = "#222";
    style.remove();
  } else {
    this.classList.remove("off");
    this.classList.add("on");
    body.style.backgroundColor = "rgb(227, 245, 184)";
    let placeholderStyle = document.createElement("style");
    placeholderStyle.innerHTML = `input{color: white;}`;
    document.head.appendChild(placeholderStyle);
    style.innerHTML = `* { color: #222; }`;
    document.head.appendChild(style);
    container.style.backgroundColor = "rgb(227, 245, 184)";
  }
});

// Add a new product
add.addEventListener("click", function () {
  if (names.value && +price.value && +taxs.value && +ads.value && typeof category.value === "string") {
    const existingProduct = storage.find((product) => product.name === names.value);

    if (existingProduct) {
      alert("Product already exists. Updating total.");
      existingProduct.total = +existingProduct.total + +number.value;
      document.querySelectorAll(".wibe").forEach((target) => {
        if (target.querySelector(".name").innerHTML === existingProduct.name) {
          target.querySelector(".totals").innerHTML = existingProduct.total;
        }
      });
    } else {
      const product = {
        name: names.value,
        price: price.value,
        tax: taxs.value,
        ads: ads.value,
        discount: discount.value || 0,
        total: number.value,
        category: category.value,
      };
      storage.push(product);
      renderProduct(product);
    }

    saveToLocalStorage();
    document.querySelectorAll("input").forEach((input) => (input.value = ""));
    total.innerHTML = "Total";
    total.style.color = "red";
  } else {
    alert("Please fill in all fields correctly before adding a new item.");
  }
});



// Render products in the DOM
function renderProduct(product) {
  let newDiv = document.createElement("div");
  let id = document.createElement("p");
  let name = document.createElement("p");
  let pricess = document.createElement("p");
  let taxss = document.createElement("p");
  let adss = document.createElement("p");
  let discountss = document.createElement("p");
  let totalss = document.createElement("p");
  let categoryss = document.createElement("p");
  let update = document.createElement("button");
  let deleted = document.createElement("button");

  newDiv.className = "bar";
  newDiv.classList.add("wibe");
  name.className = "name";
  totalss.className = "totals";

  id.innerHTML = storage.indexOf(product) + 1;
  name.innerHTML = product.name;
  pricess.innerHTML = product.price;
  taxss.innerHTML = product.tax;
  adss.innerHTML = product.ads;
  discountss.innerHTML = product.discount;
  totalss.innerHTML = product.total;
  categoryss.innerHTML = product.category;

  update.innerHTML = "UPDATE";
  update.className = "UPDATE";
  deleted.innerHTML = "DELETE";
  deleted.className = "DELETE";
  deleted.style.setProperty("color", "rgb(231, 179, 6)", "important");

  let elements = [id, name, pricess, taxss, adss, discountss, totalss, categoryss, update, deleted];
  elements.forEach((e) => newDiv.appendChild(e));
  container.appendChild(newDiv);
}


// Calculate total price
Array.from(inp.children).forEach(function (inn) {
  inn.addEventListener("keyup", function () {
    if (names.value) {
      total.style.color = "green";
      total.innerHTML = `Total: ${+price.value + +taxs.value + +ads.value - +(discount.value || 0)}`;
    }
  });
});



// Update a product
container.addEventListener("click", function (event) {
  if (event.target.classList.contains("UPDATE")) {
    let parent = event.target.parentElement;
    let name = parent.querySelector(".name").innerHTML;
    let product = storage.find((product) => product.name === name);

    if (product) {
      names.value = product.name;
      price.value = product.price;
      taxs.value = product.tax;
      ads.value = product.ads;
      discount.value = product.discount || 0;
      number.value = product.total;
      category.value = product.category;

      storage = storage.filter((p) => p.name !== name);
      parent.remove();
      saveToLocalStorage();
    }
  }
});

// Delete a single product
container.addEventListener("click", function (event) {
  if (event.target.classList.contains("DELETE")) {
    let parent = event.target.parentElement;
    let name = parent.querySelector(".name").innerHTML;
    storage = storage.filter((p) => p.name !== name);
    parent.remove();
    saveToLocalStorage();
  }
});

// Search for products
function searchmod(value) {
  document.querySelectorAll(".wibe").forEach((wibe, i) => {
    wibe.style.display = storage[i].name.toLowerCase().includes(value.toLowerCase()) ? "grid" : "none";
  });
}

// Delete all products
deleteall.addEventListener("click", function () {
  document.querySelectorAll(".wibe").forEach(function (wibe) {
    wibe.remove();
  });
  storage = [];
  saveToLocalStorage();
});