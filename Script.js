const cart = [];

function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    updateCart();
    notifyUser(productName);
}

function updateCart() {
    const cartElement = document.getElementById('cart');
    const cartContent = document.createElement('div');
    cartContent.innerHTML = '<h2>Shopping Cart</h2>';

    let total = 0;

    for (const item of cart) {
        total += item.price;
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        itemDiv.innerHTML = `
            <span>${item.name} - R${item.price.toFixed(2)}</span>
            <button onclick="removeFromCart('${item.name}')">Remove</button>`;
        cartContent.appendChild(itemDiv);
    }

    cartContent.innerHTML += `<strong>Total: R${total.toFixed(2)}</strong>`;

   
    cartElement.innerHTML = '';
    cartElement.appendChild(cartContent);
}


function removeFromCart(productName) {
    const index = cart.findIndex(item => item.name === productName);
    if (index !== -1) {
        cart.splice(index, 1);
        updateCart();
    }
}

function checkOut() {
    const cardNumber = document.getElementById('cardNumber').value;
    const expiration = document.getElementById('expiration').value;
    const cvv = document.getElementById('cvv').value;

    if (cardNumber && expiration && cvv) {
        alert("Checkout Successful. Thank you for your purchase!");
        cart.length = 0;
        updateCart();
    } else {
        alert("Please enter card details before checking out.");
    }
}

function notifyUser(productName) {
    alert(`${productName} has been added to your cart!`);
}


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});


const cartPreview = document.getElementById('cart-preview');

cartPreview.addEventListener('mouseover', function () {
    if (cart.length > 0) {
        const previewContent = document.createElement('div');
        previewContent.className = 'cart-preview-content';

        for (const item of cart) {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'preview-item';
            itemDiv.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            previewContent.appendChild(itemDiv);
        }

        this.appendChild(previewContent);
    }
});

cartPreview.addEventListener('mouseout', function () {
    const previewContent = document.querySelector('.cart-preview-content');
    if (previewContent) {
        previewContent.remove();
    }
});


