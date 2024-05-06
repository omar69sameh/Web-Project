document.addEventListener("DOMContentLoaded", function () {
  const btn = document.querySelectorAll(".btn");
  const cart = document.getElementById("cart");
  const closeCartBtn = document.getElementById("close-cart");
  const cartContainer = document.querySelector(".cart-content");
  const cartIcon = document.querySelector(".shopping_cart");
  const cartNum = document.querySelector(".num_add_cart1");
  const num_add_cart = document.querySelector(".num_add_cart");
  const body = document.body;
  const overlay = document.createElement("div");
  const loadingScreen = document.getElementById('loading-screen');
  let isCartOpen = false;
  let itemCount = 0;
  let cartTotal = 0;
  const cartItems = [];

  overlay.classList.add("overlay");
  body.appendChild(overlay);

  cartContainer.addEventListener("click", (event) => {
    const target = event.target;

    if (target.classList.contains("remove-btn")) {
      const cartItem = target.closest(".cart-item");
      if (cartItem) {
        const index = cartItems.findIndex((item) =>
          item.name === cartItem.dataset.name
        );
        if (index !== -1) {
          cartTotal -= cartItems[index].price * cartItems[index].quantity;
          itemCount -= cartItems[index].quantity;
          cartItems.splice(index, 1);
          cartItem.remove();
          updateCartNumber(itemCount);
          updateSubtotal();
        }
      }
    }
  });

  for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", (event) => {
      const imgSrc = event.currentTarget.getAttribute("data-img-src");
      const name = event.currentTarget.getAttribute("data-name");
      const price = parseFloat(event.currentTarget.getAttribute("data-price"));

      const itemDetails = {
        imgSrc: imgSrc,
        name: name,
        price: price,
        quantity: 1,
      };

      addToCart(itemDetails);
      itemCount++;
      cartTotal += price;
      updateCartNumber(itemCount);
      updateSubtotal();

      if (!isCartOpen) {
        openCart();
      }
    });
  }

  closeCartBtn.addEventListener("click", () => {
    closeCart();
  });

  function addToCart(itemDetails) {
    const existingItem = cartItems.find((item) => item.name === itemDetails.name);

    if (existingItem) {
      existingItem.quantity++;
      updateCartItemQuantity(existingItem);
    } else {
      cartItems.push(itemDetails);

      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.dataset.name = itemDetails.name;

      const img = document.createElement("img");
      img.src = itemDetails.imgSrc;
      img.alt = itemDetails.name;
      img.classList.add("cart-item-img");

      const itemName = document.createElement("span");
      itemName.textContent = itemDetails.name;

      const itemPrice = document.createElement("span");
      itemPrice.textContent = `LE ${itemDetails.price.toFixed(2)} EGP`;

      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.classList.add("remove-btn");

      removeBtn.addEventListener("click", (event) => {
        const cartItem = event.target.closest(".cart-item");
        if (cartItem) {
          const index = cartItems.findIndex(
            (item) => item.name === cartItem.dataset.name
          );
          if (index !== -1) {
            cartTotal -= cartItems[index].price * cartItems[index].quantity;
            itemCount -= cartItems[index].quantity;
            cartItems.splice(index, 1);
            cartItem.remove();
            updateCartNumber(itemCount);
            updateSubtotal();
          }
        }
      });

      cartItem.appendChild(img);
      cartItem.appendChild(itemName);
      cartItem.appendChild(itemPrice);
      cartItem.appendChild(removeBtn);
      cartContainer.appendChild(cartItem);

      // Add Quantity elements and event listeners for + and - buttons
      const removeInc = document.createElement("div");
      removeInc.classList.add("remove_inc");
      const incDec = document.createElement("div");
      incDec.classList.add("inc_dec");
      const plusButton = document.createElement("button");
      plusButton.classList.add("plus");
      plusButton.textContent = "+";
      const minusButton = document.createElement("button");
      minusButton.classList.add("minus");
      minusButton.textContent = "-";
      const quantityElement = document.createElement("p");
      quantityElement.classList.add("Quantity");
      quantityElement.textContent = "1";

      minusButton.addEventListener("click", () => {
        if (itemDetails.quantity > 1) {
          itemDetails.quantity--;
          quantityElement.textContent = itemDetails.quantity;
          updateCartItemQuantity(itemDetails);
          cartTotal -= itemDetails.price;
          updateSubtotal();
        } else {
          const index = cartItems.findIndex((item) => item.name === itemDetails.name);
          if (index !== -1) {
            cartTotal -= cartItems[index].price;
            itemCount--;
            cartItems.splice(index, 1);
            cartItem.remove();
            updateCartNumber(itemCount);
            updateSubtotal();
          }
        }
      });

      plusButton.addEventListener("click", () => {
        itemDetails.quantity++;
        quantityElement.textContent = itemDetails.quantity;
        updateCartItemQuantity(itemDetails);
        cartTotal += itemDetails.price;
        updateSubtotal();
      });

      
      incDec.appendChild(minusButton);
      incDec.appendChild(quantityElement);
      incDec.appendChild(plusButton);
      removeInc.appendChild(incDec);
      cartItem.appendChild(removeInc);
    }
  }
  

  function updateCartItemQuantity(item) {
    const cartItem = document.querySelector(`[data-name="${item.name}"]`);
    if (cartItem) {
      const quantityElement = cartItem.querySelector(".Quantity");
      quantityElement.textContent = item.quantity;
    }
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

  function updateSubtotal() {
    const subtotalPrice = document.querySelector(".Subtotal-price");
    subtotalPrice.textContent = `LE ${cartTotal.toFixed(2)} EGP`;

    const cartIsEmpty = cartItems.length === 0;

    if (cartIsEmpty) {
      document.querySelector(".subtotal_content").style.display = "none";
      document.querySelector(".subtot_hr").style.display = "none";
    } else {
      document.querySelector(".subtotal_content").style.display = "block";
      document.querySelector(".subtot_hr").style.display = "block";
      subtotalPrice.textContent = `LE ${cartTotal.toFixed(2)} EGP`;
    }
  }

  overlay.addEventListener("click", () => {
    closeCart();
  });

  var ff = false;
  cartIcon.addEventListener("click", () => {
    toggleCart();
  });

  num_add_cart.addEventListener("click", () => {
    toggleCart();
  });

  cartNum.addEventListener("click", () => {
    console.log("Cart num clicked");
    ff = true;
    toggleCart();
  });

  function toggleCart() {
    if (isCartOpen && ff) {
      closeCart();
    } else {
      openCart();
    }
    ff = false;
  }

  // Loading

  var loadingScreenVisible = 0;

  function showLoading() {
    loadingScreen.style.display = 'flex';
    loadingScreenVisible = Date.now();
  }
  var minimumLoadingTime = 4000;

  function hideLoading() {
    var timeElapsed = Date.now() - loadingScreenVisible;
    var timeLeftToShow = minimumLoadingTime - timeElapsed;

    if (timeLeftToShow > 0) {
      setTimeout(function () {
        loadingScreen.style.display = 'none';
      }, timeLeftToShow);
    } else {
      loadingScreen.style.display = 'none';
    }
  }

  window.addEventListener('beforeunload', showLoading);

  window.addEventListener('load', hideLoading);

  document.body.addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {
      showLoading();
    }
  });
  const checkoutButton = document.querySelector(".Check_Out.btn_order");

  checkoutButton.addEventListener("click", () => {
  // Create an object to store all cart information
  const cartInfo = {
    cartItems: cartItems.map(item => ({
      imgSrc: `../home/Assets/${item.name}${item.imgSrc.endsWith('.webp') ? '.webp' : '.jpg'}`,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    })),
    cartTotal: cartTotal,
    itemCount: itemCount,
    productImage: cartItems.map(item => `../home/Assets/${item.name}${item.imgSrc.endsWith('.webp') ? '.webp' : '.jpg'}`),
    productName: cartItems.map(item => item.name),
    productPrice: cartItems.map(item => item.price),
    productQuantity: cartItems.map(item => item.quantity),
    totalQuantity: cartItems.reduce((total, item) => total + item.quantity, 0),
    subtotal: cartTotal.toFixed(2)
  };

  // Save the cart information to localStorage
  localStorage.setItem("cartInfo", JSON.stringify(cartInfo));

  console.log("Cart Information:", cartInfo);

  // Redirect to the checkout page
  window.location.href = "../Check-out/checkout.html";
  });
});
