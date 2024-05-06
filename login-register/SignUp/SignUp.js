const btn = document.querySelectorAll(".btn");
const cart = document.getElementById("cart");
const closeCartBtn = document.getElementById("close-cart");
const cartContainer = document.querySelector(".add_cart");
const cartIcon = document.querySelector(".shopping_cart");
const cartNum = document.querySelector(".num_add_cart1");
const num_add_cart = document.querySelector(".num_add_cart");
const body = document.body;
const overlay = document.createElement("div");

let isCartOpen = false;
let itemCount = 0;

overlay.classList.add("overlay");
body.appendChild(overlay);

cartContainer.addEventListener('click', (event) => {
  const target = event.target;

  if (target.classList.contains("remove-btn")) {
    const cartItem = target.closest(".cart-item");
    if (cartItem) {
      cartItem.remove();
      updateCartNumber(--itemCount);
    }
  }
});

for (let i = 0; i < btn.length; i++) {
  btn[i].addEventListener('click', (event) => {
    const imgSrc = event.currentTarget.getAttribute('data-img-src');
    const name = event.currentTarget.getAttribute('data-name');

    const itemDetails = {
      imgSrc: imgSrc,
      name: name,
      quantity: 1
    };

    addToCart(itemDetails);
    updateCartNumber(++itemCount);

    if (!isCartOpen) {
      openCart();
    }
  });
}

closeCartBtn.addEventListener('click', () => {
  closeCart();
});

function addToCart(itemDetails) {
  const cartContent = document.querySelector(".cart-content");
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  const img = document.createElement("img");
  img.src = itemDetails.imgSrc;
  img.alt = itemDetails.name;
  img.classList.add("cart-item-img");

  const itemName = document.createElement("span");
  itemName.textContent = itemDetails.name;

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.classList.add("remove-btn");
  
  removeBtn.addEventListener('click', (event) => {
    const cartItem = event.target.closest(".cart-item");
    if (cartItem) {
      cartItem.remove();
      updateCartNumber(--itemCount);
    }
  });

  cartItem.appendChild(img);
  cartItem.appendChild(itemName);
  cartItem.appendChild(removeBtn);
  cartContent.appendChild(cartItem);
}
var ff = false;
cartIcon.addEventListener('click', () => {
  toggleCart();
});
num_add_cart.addEventListener('click', () => {
  toggleCart();
});
cartNum.addEventListener('click', () => {
  console.log("Cart num clicked");
  ff = true;
  toggleCart();
});
function toggleCart() {
  
  if (isCartOpen && ff) {
    closeCart();
  }
  else {
    openCart();
  }
  ff = false;
}

function openCart() {
    isCartOpen = true;
    body.classList.add("cart-open");
    overlay.style.display = "block";
    cart.style.right = "0";
}

function closeCart() {
    isCartOpen = false;
    body.classList.remove("cart-open");
    overlay.style.display = "none";
    cart.style.right = "-500px";
}

function updateCartNumber(num) {
  cartNum.textContent = num;
}

overlay.addEventListener('click', () => {
  closeCart();
});

// document.addEventListener('DOMContentLoaded', function () {
//   const popupContainer = document.getElementById('popup-container');
//   const closeButton = document.getElementById('close-popup');
//   const subscribeForm = document.getElementById('subscribe-form');

//   // Display the popup
//   popupContainer.style.display = 'block';

//   // Close the popup when the close button is clicked
//   closeButton.addEventListener('click', function () {
//       popupContainer.style.display = 'none';
//   });

//   // Handle form submission (subscribe action)
//   subscribeForm.addEventListener('submit', function (e) {
//       e.preventDefault();
//       // Perform subscription action here
//       // You can send the email to your server or add a confirmation message
//       alert('Thank you for subscribing!');
//       popupContainer.style.display = 'none';
//   });
// });

