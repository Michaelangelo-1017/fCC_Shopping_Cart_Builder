const cartContainer = document.getElementById("cart-container");
const productsContainer = document.getElementById("products-container");
const dessertCards = document.getElementById("dessert-card-container");
const cartBtn = document.getElementById("cart-btn");
const clearCartBtn = document.getElementById("clear-cart-btn");
const totalNumberOfItems = document.getElementById("total-items");
const cartSubTotal = document.getElementById("subtotal");
const cartTaxes = document.getElementById("taxes");
const cartTotal = document.getElementById("total");
const showHideCartSpan = document.getElementById("show-hide-cart");
let isCartShowing = false;

const products = [
    {
        id: 1,
        name: "Vanilla Cupcakes (6 Pack)",
        price: 12.99,
        category: "Cupcake",
        amount: 0
    },
    {
        id: 2,
        name: "French Macaron",
        price: 3.99,
        category: "Macaron",
        amount: 0
    },
    {
        id: 3,
        name: "Pumpkin Cupcake",
        price: 3.99,
        category: "Cupcake",
        amount: 0
    },
    {
        id: 4,
        name: "Chocolate Cupcake",
        price: 5.99,
        category: "Cupcake",
        amount: 0
    },
    {
        id: 5,
        name: "Chocolate Pretzels (4 Pack)",
        price: 10.99,
        category: "Pretzel",
        amount: 0
    },
    {
        id: 6,
        name: "Strawberry Ice Cream",
        price: 2.99,
        category: "Ice Cream",
        amount: 0
    },
    {
        id: 7,
        name: "Chocolate Macarons (4 Pack)",
        price: 9.99,
        category: "Macaron",
        amount: 0
    },
    {
        id: 8,
        name: "Strawberry Pretzel",
        price: 4.99,
        category: "Pretzel",
        amount: 0
    },
    {
        id: 9,
        name: "Butter Pecan Ice Cream",
        price: 2.99,
        category: "Ice Cream",
        amount: 0
    },
    {
        id: 10,
        name: "Rocky Road Ice Cream",
        price: 2.99,
        category: "Ice Cream",
        amount: 0
    },
    {
        id: 11,
        name: "Vanilla Macarons (5 Pack)",
        price: 11.99,
        category: "Macaron",
        amount: 0
    },
    {
        id: 12,
        name: "Lemon Cupcakes (4 Pack)",
        price: 12.99,
        category: "Cupcake",
        amount: 0
    },
];

products.forEach(
    ({ name, id, price, category }) => {
        dessertCards.innerHTML += `
        <div class="dessert-card">
            <h2>${name}</h2>
            <p class="dessert-price">$${price}</p>
            <p class="product-category">Category: ${category}</p>
            <button 
            id="${id}" 
            class="btn add-to-cart-btn">Add to cart
            </button>
        </div>
        `;
    }
);

const itemsToRemove = []
class ShoppingCart {
    constructor() {
        this.items = [];
        this.total = 0;
        this.taxRate = 8.25;
    }

    addItem(id, products) {
        if(this.items.find((item)=>item.id == id)){
            const product = this.items.find((item)=>item.id === id);
            product.amount = product.amount + 1;
            console.log(`This is the updated items : ${JSON.stringify(this.items)}`)
        }
        else{
            const product = products.find((item)=>item.id === id);
            product.amount = 1;
            this.items.push(product);
            console.log(`This is the added items : ${JSON.stringify(this.items)}`)
        }
        const product = this.items.find((item)=>item.id === id);
        const {name, price, amount} = product;

        const totalCountPerProduct = {};
        this.items.forEach((dessert) => {
        totalCountPerProduct[dessert.id] = (totalCountPerProduct[dessert.id] || 0) + 1;
        })

        const currentProductCount = amount;
        const currentProductCountSpan = document.getElementById(`product-count-for-id${id}`);

        currentProductCount > 1 
        ? currentProductCountSpan.textContent = `${currentProductCount}x`
        : productsContainer.innerHTML += `
        <div id="dessert${id}" class="product">
            <p>
            <span class="product-count" id="product-count-for-id${id}"></span>
            ${name}
            </p>
            <p>${price}</p>
            <button class="btn remove-btn" id="b${id}">Remove</button>
        </div>
        `;

        /*const addedItem = {
            name: name,
            price: price,
            id: id,
            amount: currentProductCount
        }
        
        if(itemsToRemove.find((item)=>item.id == id)){
            const product = itemsToRemove.find((item)=>item.id === id);
            product.amount = currentProductCount;
        }
        else{
            itemsToRemove.push(addedItem);
        }*/
        
    }

    removeItem(id){
        console.log(`${JSON.stringify(this.items)}`)
        const isItemRemoved = confirm(
        "Are you sure you want to remove this item from your shopping cart?"
        );
        
        if(isItemRemoved){
            const product = this.items.find((item) => item.id === id);
            const { name, price} = product;
            let amount = product.amount
            console.log(`The amount is ${amount}, and the type of amount is ${typeof amount}`)
            amount = amount - 1;
            product.amount = amount
            console.log(`${name} has been removed and the number of it remaining in the cart is : ${amount}`);
            const currentProductCount = amount;
            const currentProductCountSpan = document.getElementById(`product-count-for-id${id}`);

            /*currentProductCount > 1 
            ? currentProductCountSpan.textContent = `${currentProductCount}x`
            : productsContainer.innerHTML += `
            <div id="dessert${id}" class="product">
                <p>
                <span class="product-count" id="product-count-for-id${id}"></span>
                ${name}
                </p>
                <p>${price}</p>
                <button class="btn remove-btn" id="b${id}">Remove</button>
            </div>
            `;*/

            if(currentProductCount > 1){
                currentProductCountSpan.textContent = `${currentProductCount}x`
            }
            else if(currentProductCount == 1){
                currentProductCountSpan.textContent = ``;
            }
            else{
                const dessertId = document.querySelector(`#dessert${id}`);
                productsContainer.removeChild(dessertId)
            }
            console.log(`The amount of product is : ${product.amount}`)
        }
        
    }

    getCounts() {
        return this.items.reduce((total, item)=> total + item.amount, 0);
    }

    clearCart() {
        if (this.items.every((item) => item.amount == 0)) {
        alert("Your shopping cart is already empty");
        return;
        }

        const isCartCleared = confirm(
        "Are you sure you want to clear all items from your shopping cart?"
        );

        if (isCartCleared) {
        this.items = [];
        this.total = 0;
        productsContainer.innerHTML = "";
        totalNumberOfItems.textContent = 0;
        cartSubTotal.textContent = 0;
        cartTaxes.textContent = 0;
        cartTotal.textContent = 0;
        }
    }

    calculateTaxes(amount) {
        return parseFloat(((this.taxRate / 100) * amount).toFixed(2));
    }

    calculateTotal() {
        const subTotal = this.items.reduce((total, item) => total + (item.price * item.amount), 0);
        const tax = this.calculateTaxes(subTotal);
        this.total = subTotal + tax;
        cartSubTotal.textContent = `$${subTotal.toFixed(2)}`;
        cartTaxes.textContent = `$${tax.toFixed(2)}`;
        cartTotal.textContent = `$${this.total.toFixed(2)}`;
        if(this.items.every((item) => item.amount == 0)){
            cartSubTotal.textContent = 0;
            cartTaxes.textContent = 0;
            cartTotal.textContent = 0;
            console.log("It is working")
        }
        else{
                console.log("Something is wrong")
        }
        return this.total;
    }
};



const cart = new ShoppingCart();
const addToCartBtns = document.getElementsByClassName("add-to-cart-btn");
const removeBtns = document.getElementsByClassName("remove-btn");

[...addToCartBtns].forEach(
    (btn) => {
        btn.addEventListener("click", (event) => {
        cart.addItem(Number(event.target.id), products);
        totalNumberOfItems.textContent = cart.getCounts();
        cart.calculateTotal();
        })
    }
);

/*[...removeBtns].forEach(
    (btn) => {
        btn.addEventListener("click", (event) =>{
            console.log(`The id value : ${event.target.id.slice(1)}`)
            cart.removeItem(Number(event.target.id.slice(1)))
        })
    }
);*/

productsContainer.addEventListener("click", (event)=>{
    if(event.target.classList.contains("remove-btn")){
        cart.removeItem(Number(event.target.id.slice(1)))
        totalNumberOfItems.textContent = cart.getCounts();
        cart.calculateTotal();

    }
})
//console.log([...removeBtns])

cartBtn.addEventListener("click", () => {
    isCartShowing = !isCartShowing;
    showHideCartSpan.textContent = isCartShowing ? "Hide" : "Show";
    cartContainer.style.display = isCartShowing ? "block" : "none";
});

clearCartBtn.addEventListener("click",cart.clearCart.bind(cart))