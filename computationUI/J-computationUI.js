// Kathabí checkout: the math and the buttons

// ----- Settings -----
var VAT_RATE = 0.12;

var shippingOptions = [
  { id: "standard", label: "Standard",     note: "3 to 5 days",    fee: 100 },
  { id: "express",  label: "Express",      note: "1 to 2 days",    fee: 250 },
  { id: "pickup",   label: "Store pickup", note: "Ready tomorrow", fee: 0 }
];

// ----- Products (copy a line to add a product) -----
var ADULT = ["S", "M", "L", "XL"];
var KIDS  = ["S", "M", "L", "XL"];
var BABY  = ["S", "M", "L", "XL"];
var ONE   = ["One size"];

var products = [
  { name: "Inabel Top", price: 690, sizes: ADULT, colors: ["#6B4226", "#FFFFFF"] },
  { name: "Kawayan Linen Crop Shirt", price: 550, sizes: ADULT, colors: ["#ADD8E6", "linear-gradient(135deg,#FFFFFF 50%,#111111 50%)"] },
  { name: "Alon Draped Halter Top", price: 490, sizes: ADULT, colors: ["#FFFFFF", "#111111"] },
  { name: "Yakan-Trim High-Waisted Trousers", price: 790, sizes: ADULT, colors: ["#000000", "#FFFFFF", "#c07506"] },
  { name: "Harana Tiered Maxi Skirt", price: 690, sizes: ADULT, colors: [
      "linear-gradient(135deg,#E07A3F 33%,#6B8E4E 33% 66%,#B5382F 66%)",
      "linear-gradient(135deg,#BFE3D0 33%,#C9B8E3 33% 66%,#F4EBDD 66%)",
      "linear-gradient(135deg,#7A2B3A 33%,#4B3A7A 33% 66%,#2F6B6B 66%)" ] },
  { name: "Bayanihan Upcycled Cargo Pants", price: 750, sizes: ADULT, colors: ["#1c0a6d", "#1b42ac"] },
  { name: "Modern Barong Street Polo", price: 790, sizes: ADULT, colors: ["#E8B896", "#EDE6D6"] },
  { name: "Kayumanggi Everyday Henley", price: 450, sizes: ADULT, colors: ["#f5f5f4", "#332504"] },
  { name: "Kadena Upcycled Graphic Tee", price: 390, sizes: ADULT, colors: ["#dbdbdb", "#dfb690", "#060608"] },
  { name: "Katipunan Upcycled Denim Shacket", price: 990, sizes: ADULT, colors: [
      "linear-gradient(135deg,#2F4A6B 33%,#5B7FA6 33% 66%,#9DB8D4 66%)",
      "linear-gradient(135deg,#C4513A 25%,#E3B23C 25% 50%,#3F7F86 50% 75%,#F1E6D3 75%)" ] },
  { name: "Giting Tailored Linen Shorts", price: 490, sizes: ADULT, colors: ["#032c09", "#000000"] },
  { name: "Balangay Relaxed Fit Chinos", price: 690, sizes: ADULT, colors: ["#030729"] },
  { name: "Haraya Linen Trousers", price: 790, sizes: ADULT, colors: ["#dae0a2"] },
  { name: "Bulilit Inabel Smocked Dress (Girls)", price: 450, sizes: KIDS, colors: ["#EDE6D6"] },
  { name: "Lahi Mini Barong Shirt (Boys)", price: 390, sizes: KIDS, colors: ["#F3EEE3", "#1F2A44"] },
  { name: "Laro Unisex Drawstring Shorts", price: 250, sizes: ADULT, colors: ["#1C1C1C", "#3d0409"] },
  { name: "Sinag Romper (Infants/Toddlers)", price: 290, sizes: BABY, colors: [
      "#6B7F4A", "#E8B92E", "linear-gradient(135deg,#C9343F 50%,#F6E9EA 50%)" ] },
  { name: "Solihiya Structured Tote Bag", price: 790, sizes: ONE, colors: ["#d4b772"] },
  { name: "Sampaguita Reversible Bucket Hat", price: 290, sizes: ONE, colors: [
      "linear-gradient(135deg,#C9A57A 33%,#5A3E2B 33% 66%,#2F3E66 66%)",
      "linear-gradient(135deg,#8A5A3C 33%,#D7BE9A 33% 66%,#3F7F86 66%)" ] },
  { name: "Habing-Yaman Woven Crossbody Pouch", price: 350, sizes: ONE, colors: ["#dbbd4e"] },
  { name: "Kawayan Frame Polarized Sunglasses", price: 490, sizes: ONE, colors: ["#e7af35"] },
  { name: "Hiraya Embroidered Scrunchie Set", price: 150, sizes: ONE, colors: ["#6E3B43", "#CDB89B", "#B8B5AB"] },
  { name: "Likha Beaded Pearl Choker", price: 250, sizes: ONE, colors: ["#FFFFFF"] }
];

// ----- What the customer has chosen -----
var cart = [];
var shippingId = "standard";
var pickedColor = 0;

// ----- Small helpers -----
function getEl(id) {
  return document.getElementById(id);
}

// 1300 becomes Php 1,300.00
function peso(amount) {
  return "Php " + amount.toLocaleString("en-PH", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function getShipping() {
  for (var i = 0; i < shippingOptions.length; i++) {
    if (shippingOptions[i].id === shippingId) {
      return shippingOptions[i];
    }
  }
}

// One color circle
function swatch(color, isSelected, onclick, extraClass) {
  var html = '<button type="button" class="swatch ' + extraClass + (isSelected ? " selected" : "") + '"';
  html += ' style="background:' + color + '" ' + onclick + '></button>';
  return html;
}

// ----- The math -----
// Total = subtotal + shipping
// VAT = total / 1.12 x 0.12 (already inside the price)
function getTotals() {
  var subtotal = 0;
  for (var i = 0; i < cart.length; i++) {
    subtotal = subtotal + cart[i].price * cart[i].qty;
  }

  var shipping = 0;
  if (cart.length > 0) {
    shipping = getShipping().fee;
  }

  var total = subtotal + shipping;
  var vat = total / (1 + VAT_RATE) * VAT_RATE;

  return { subtotal: subtotal, shipping: shipping, vat: vat, total: total };
}

// ----- Show things on the page -----
function showCart() {
  var html = "";

  if (cart.length === 0) {
    html = '<p class="empty-cart">Your cart is empty. Add a product below.</p>';
  }

  for (var i = 0; i < cart.length; i++) {
    var item = cart[i];
    var sizeText = (item.size === "One size") ? "One size" : "Size " + item.size;

    html += '<div class="item">';
    html += '<div class="item-name">' + item.name + '</div>';
    html += '<div class="item-price">' + peso(item.price * item.qty) + '</div>';
    html += '<div>';
    html += '<div class="small">' + sizeText + ' &times; ' + peso(item.price) + '</div>';
    html += '<div class="controls">';
    html += '<span class="stepper">';
    html += '<button type="button" onclick="changeQty(' + i + ', -1)">&minus;</button>';
    html += '<output>' + item.qty + '</output>';
    html += '<button type="button" onclick="changeQty(' + i + ', 1)">+</button>';
    html += '</span>';
    html += swatch(item.color, false, "", "small-swatch");
    html += '<button class="remove" type="button" onclick="removeItem(' + i + ')">Remove</button>';
    html += '</div></div></div>';
  }

  getEl("items").innerHTML = html;
}

function showShipping() {
  var html = "";

  for (var i = 0; i < shippingOptions.length; i++) {
    var option = shippingOptions[i];
    var checked = (option.id === shippingId) ? " checked" : "";
    var fee = (option.fee > 0) ? peso(option.fee) : "Free";

    html += '<label class="option"><span>';
    html += '<input type="radio" name="shipping"' + checked + ' onclick="chooseShipping(\'' + option.id + '\')">';
    html += option.label + '<span class="small">' + option.note + '</span>';
    html += '</span><span>' + fee + '</span></label>';
  }

  getEl("shippingBox").innerHTML = html;
}

function showTotals() {
  var t = getTotals();

  getEl("subtotalText").textContent = peso(t.subtotal);
  getEl("shippingText").textContent = (t.shipping > 0) ? peso(t.shipping) : "Free";
  getEl("vatText").textContent = peso(t.vat);
  getEl("totalText").textContent = peso(t.total);

  // Disable Pay now if the cart is empty
  getEl("payButton").setAttribute("aria-disabled", cart.length === 0);
}

function refresh() {
  showCart();
  showTotals();
}

// ----- Add a product area -----
function showProducts() {
  var html = "";
  for (var i = 0; i < products.length; i++) {
    html += '<option value="' + i + '">' + products[i].name + ' - ' + peso(products[i].price) + '</option>';
  }
  getEl("productSelect").innerHTML = html;
  showSizesAndColors();
}

function showSizesAndColors() {
  var product = products[getEl("productSelect").value];

  var sizeHtml = "";
  for (var i = 0; i < product.sizes.length; i++) {
    sizeHtml += "<option>" + product.sizes[i] + "</option>";
  }
  getEl("sizeSelect").innerHTML = sizeHtml;

  pickedColor = 0;
  showColors();
}

function showColors() {
  var product = products[getEl("productSelect").value];

  var html = '<span class="small">Color</span> ';
  for (var i = 0; i < product.colors.length; i++) {
    html += swatch(product.colors[i], i === pickedColor, 'onclick="pickColor(' + i + ')"', "");
  }
  getEl("colorPicker").innerHTML = html;
}

// ----- Buttons -----
function pickColor(index) {
  pickedColor = index;
  showColors();
}

function chooseShipping(id) {
  shippingId = id;
  showShipping();
  showTotals();
}

function changeQty(index, amount) {
  cart[index].qty = cart[index].qty + amount;
  if (cart[index].qty < 1) {
    cart[index].qty = 1;
  }
  refresh();
}

function removeItem(index) {
  cart.splice(index, 1);
  refresh();
}

// Add button: same product, size and color just adds to the quantity
getEl("addButton").onclick = function () {
  var product = products[getEl("productSelect").value];
  var size = getEl("sizeSelect").value;
  var color = product.colors[pickedColor];

  var found = false;
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].name === product.name && cart[i].size === size && cart[i].color === color) {
      cart[i].qty = cart[i].qty + 1;
      found = true;
    }
  }

  if (found === false) {
    cart.push({ name: product.name, price: product.price, size: size, color: color, qty: 1 });
  }

  getEl("addMessage").textContent = "Added " + product.name + " (" + size + ").";
  refresh();
};

getEl("productSelect").onchange = showSizesAndColors;

// Pay now: save the order, then the link opens the receipt page
getEl("payButton").onclick = function (event) {
  if (cart.length === 0) {
    event.preventDefault();
    return;
  }

  var order = getTotals();
  order.items = cart;
  order.shippingMethod = getShipping().label;
  order.payment = getEl("paymentSelect").value;
  sessionStorage.setItem("kathabiOrder", JSON.stringify(order));
};

// ----- Start the page -----
showProducts();
showShipping();

// Sample items (delete these 2 lines to start empty)
cart.push({ name: "Kadena Upcycled Graphic Tee", price: 390, size: "M", color: "#dbdbdb", qty: 2 });
cart.push({ name: "Haraya Linen Trousers", price: 790, size: "L", color: "#dae0a2", qty: 1 });
refresh();
