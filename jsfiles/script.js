import { products } from "./product.js"

let productsHTML = ``


products.forEach((product)=>{
    // Assuming product.price is a variable containing the actual price value

// Assuming product.image is a variable containing the actual image source URL

productsHTML += `
    <div class="product-container">
        <div class="img-contain"><img src="${product.image}" alt="" class="product-img"></div>
        <h2 class="product-name">${product.name}</h2>
        <div class="add">
            <p class="price">₦${product.price}</p>
            <button class="to-cart">Add to Cart</button>
        </div>
    </div>
    
`;

// Continue with the rest of your code...



// Continue with the rest of your code...

})

document.querySelector(".container").innerHTML = productsHTML


const cartButton = document.querySelector(".fa-cart-shopping");

cartButton.addEventListener("click", ()=>{
    let cartUrl = `cart.html`

    window.location.href = cartUrl
})