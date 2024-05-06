document.addEventListener("DOMContentLoaded", function() {
    var loadingScreen = document.getElementById('loading-screen');
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
            setTimeout(function() {
                loadingScreen.style.display = 'none';
            }, timeLeftToShow);
        } else {
            loadingScreen.style.display = 'none';
        }
    }

    window.addEventListener('beforeunload', showLoading);

    window.addEventListener('load', hideLoading);

    document.body.addEventListener('click', function(event) {
        if(event.target.tagName === 'A') {
            showLoading();
        }
    });
    const cartInfo = JSON.parse(localStorage.getItem("cartInfo"));

    if (cartInfo) {
        const cartItemsContainer = document.querySelector(".cart-items");
  
        cartInfo.cartItems.forEach((item) => {
        const cartItemDiv = document.createElement("div");
        cartItemDiv.classList.add("cart-item");
  
        const img = document.createElement("img");
        img.src = item.imgSrc;
        img.alt = item.name;
        img.classList.add("cart-item-img");
        cartItemDiv.appendChild(img);
  
        const itemName = document.createElement("span");
        itemName.classList.add("productname");
        itemName.textContent = item.name;
        cartItemDiv.appendChild(itemName);
  
        const itemPrice = document.createElement("span");
        itemPrice.classList.add("productprice");
        itemPrice.textContent = `LE ${item.price.toFixed(2)} EGP`;
        cartItemDiv.appendChild(itemPrice);

        const svgElement = document.createElement("div");
        svgElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="ionicon trash-icon" viewBox="0 0 512 512"><path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M80 112h352"/><path d="M192 112V72h0a23.93 23.93 0 0124-24h80a23.93 23.93 0 0124 24h0v40M256 176v224M184 176l8 224M328 176l-8 224" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>`;
        svgElement.onclick = () => removeItem(item, cartItemDiv);
        cartItemDiv.appendChild(svgElement);

        function removeItem(item, cartItemElement) {
            const index = cartInfo.cartItems.indexOf(item);
            if (index > -1) {
                cartInfo.cartItems.splice(index, 1);
                cartItemElement.remove();

                const itemSubtotal = parseFloat(item.price) * item.quantity;
                cartInfo.subtotal -= itemSubtotal;
        
                TotalPrice.textContent = `LE ${cartInfo.subtotal.toFixed(2)} EGP`;
                updateTotalVisibility();
            }
        }

        //quantity
        const removeInc = document.createElement("div");
        removeInc.classList.add("remove_inc");

        const minusButton = document.createElement("button");
        minusButton.classList.add("minus");
        minusButton.textContent = "-";
        minusButton.addEventListener("click", () => {
            if (item.quantity > 1) {
                item.quantity--;
                quantityElement.textContent = item.quantity;
                cartInfo.subtotal -= parseFloat(item.price);
                TotalPrice.textContent = `LE ${cartInfo.subtotal.toFixed(2)} EGP`;
            } else {
                const index = cartInfo.cartItems.indexOf(item);
                if (index > -1) {
                    cartInfo.cartItems.splice(index, 1);
                    cartItemDiv.remove();
                    cartInfo.subtotal -= parseFloat(item.price);
                    TotalPrice.textContent = `LE ${cartInfo.subtotal.toFixed(2)} EGP`;
                }
            }
            updateTotalVisibility();
        });
        removeInc.appendChild(minusButton);

        const quantityElement = document.createElement("p");
        quantityElement.classList.add("Quantity");
        quantityElement.textContent = item.quantity;
        removeInc.appendChild(quantityElement);

        // Create "+" button
        const plusButton = document.createElement("button");
        plusButton.classList.add("plus");
        plusButton.textContent = "+";
        plusButton.addEventListener("click", () => {
            item.quantity++;
            quantityElement.textContent = item.quantity;
            console.log("cartInfo.subtotal before: "+cartInfo.subtotal);
            cartInfo.subtotal = parseFloat(cartInfo.subtotal) + parseFloat(item.price);
            console.log("cartInfo.subtotal after: "+cartInfo.subtotal);
            TotalPrice.textContent = `LE ${cartInfo.subtotal}.00 EGP`;
            updateTotalVisibility();
        });
        removeInc.appendChild(plusButton);

        cartItemDiv.appendChild(removeInc);

        cartItemsContainer.appendChild(cartItemDiv);
        });
        function updateTotalVisibility() {
            const totalDiv = document.querySelector(".cart-Total"); // Adjust if class name is different
            if (cartInfo.cartItems.length === 0) {
                totalDiv.style.display = 'none';
            } else {
                totalDiv.style.display = 'block';
            }
        }
  
        const Total = document.createElement("div");
        Total.classList.add("cart-Total");
        const TotalLabel = document.createElement("span");
        TotalLabel.classList.add("TotalLabel");
        const TotalPrice = document.createElement("span");
        TotalPrice.classList.add("TotalPrice");
        Total.appendChild(TotalLabel);
        Total.appendChild(TotalPrice);
        TotalLabel.textContent = `Total`;
        TotalPrice.textContent = `LE ${cartInfo.subtotal} EGP`;
        cartItemsContainer.appendChild(Total);
        updateTotalVisibility();

        let totalQuantity = 0;
        let totalPrice = 0;

        cartInfo.cartItems.forEach(item => {
            totalQuantity += item.quantity;
            totalPrice += item.quantity * item.price;
        });

        let order = {
            OrderID: Date.now(),
            OrderDate: new Date().toISOString().split('T')[0],
            TotalQuantity: totalQuantity,
            TotalPrice: totalPrice.toFixed(2)
        };
        
        let queryParams = new URLSearchParams(order).toString();
        
        fetch(`http://localhost/Web%20Project/Check-out/checkout.php?${queryParams}`, {
            method: 'GET'
        })
        .then(response => response.text())
        .then(data => console.log('Response from PHP:', data))
        .catch(error => console.error('Fetch error:', error));
    }
    
});

