class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
    }

    add(name, price) {
        this.items.push({ name, price });
        this.save();
        alert(`${name} ha sido agregado al carrito.`);
    }

    remove(index) {
        this.items.splice(index, 1);
        this.save();
    }

    save() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    displayCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = this.items.length === 0 ? 
        '<p class = "text-capitalize fw-bold text-white mt-3">El carrito está vacío.</p>' : 
        this.items.map((item, index) => 
            `<div class="cart-item mt-5">
        <p class="text-capitalize fw-bold text-white">${item.name} - $${item.price}</p>
        <button class="btn btn-danger btn-sm remove-item" data-index="${index}">Eliminar</button></div>`).join('');
    }
}


const cart = new Cart();


document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productBox = this.closest('.box');
        const name = productBox.querySelector('.name_supp').textContent;
        const priceText = productBox.querySelector('.price_supp').textContent;
        const price = parseFloat(priceText.replace(/[^0-9.-]+/g, ""));
        cart.add(name, price);
    });
});



cart.displayCart();

document.getElementById('cart-items').addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-item')) {
        const index = event.target.getAttribute('data-index');
        cart.remove(index);
        cart.displayCart();
    }
});


document.getElementById('clear-cart').addEventListener('click', function() {

    if (confirm('¿Estás seguro que quieres vaciar el carrito?')) {
        while(cart.items.length > 0) {
            cart.remove(0);
        }
        cart.displayCart();
    }
})