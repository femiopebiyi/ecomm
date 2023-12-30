import { initializeApp } from "firebase/app";

import{
    getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut,
    onAuthStateChanged, sendEmailVerification
} from "firebase/auth";
    
import {
    getFirestore, onSnapshot, addDoc, serverTimestamp,
    collection
} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBWI9QBD-sdKXMxNkA-hXqei5gBFdXyNYk",
    authDomain: "femi-store.firebaseapp.com",
    projectId: "femi-store",
    storageBucket: "femi-store.appspot.com",
    messagingSenderId: "780697984323",
    appId: "1:780697984323:web:f5301c31747adca32863f6"
};

const username = document.getElementById("username")
const signin = document.getElementById("signin")
const logout = document.getElementById("logout")


initializeApp(firebaseConfig)

const auth = getAuth()
const database = getFirestore()

const colRef = collection(database, "userDetails")


// alert("hello")
import { products } from "./product.js"
// import { cart } from "./cartItems.js"

let cart = JSON.parse(localStorage.getItem("carts")) || []
console.log("cart", cart)

let productsHTML = ``


products.forEach((product)=>{
productsHTML += `
    <div class="product-container" data-product-div="${product.name}">
        <div class="img-contain"><img src="${product.image}" alt="" class="product-img"><i class="fa-solid fa-square-check" data-green="${product.name}"></i></div>
        <h2 class="product-name">${product.name}</h2>
        <div class="add">
            <p class="price">₦${product.price}</p> 
            <button class="to-cart js-add" data-product-name="${product.name}">Add to Cart</button>
        </div>
    </div>
    
`;



})

if(window.document.title === "Femi Store"){
    document.querySelector(".container").innerHTML = productsHTML
}





const cartButton = document.querySelector(".fa-cart-shopping");

cartButton.addEventListener("click", ()=>{
    let cartUrl = `cart.html`

    window.location.href = cartUrl
})



const home = document.querySelector(".logo")

home.addEventListener("click", ()=>{
    console.log("omaiwa")
    window.location.href = "index.html"
})

const addToCart = document.querySelectorAll(".js-add")

function greenCheck(dataset){
    const greenColor = document.querySelectorAll(".fa-square-check")
    greenColor.forEach((item)=>{
        const greenData = item.dataset.green;
        if(dataset === greenData){
            item.style.visibility = "visible";
            setTimeout(()=>{
                item.style.visibility = "hidden";
            },1000)
        }
    })
}

addToCart.forEach((button)=>{
        button.addEventListener ("click", ()=>{
        const productName = button.dataset.productName;
        const matchingColor = cart.find(item=> item.name === productName)
        if(matchingColor){
            button.innerHTML = "already in cart"
            return;
        }
        greenCheck(button.dataset.productName)
        const existingItem = cart.find(item => item.name === productName)

        if(existingItem){
            const buttons = document.querySelectorAll(".to-cart")
            buttons.forEach((button)=>{
                if(existingItem.name === button.dataset.productName){
                    console.log("alreadyyy")
                    button.innerHTML = "already in cart"
                }
            })
        } else {
            products.forEach((item)=>{
            
            if (item.name === productName){
            
            cart.push({
            name: productName,
            price: item.price,
            quantity: 1,
            image: item.image
        })
        }
        localStorage.setItem("carts", JSON.stringify(cart))
        })
        }
        countCart()
    })


})






let cartHtml = ``

cart.forEach ((cartItem)=>{
    cartHtml += `
    <div class="product-contain" data-product="${cartItem.name}">
                <div class="cart-image-container"><img src="${cartItem.image}"></div>
                <div class="details">
                    <p>${cartItem.name}</p>
                    <p class="stock">In stock!!!</p>
                    <div class="quantity">
                    <label for="for">Qty</label>
                    <select name="for"class="item-quantity" data-quantity="${cartItem.name}">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                    </div>
                    <button class="remove js-remove" data-item-name="${cartItem.name}">Remove from cart</button>
                </div>
                <div><h4 class="new-price" data-new-price="${cartItem.name}">₦${cartItem.price}</h4></div>
            </div>
    `
})



if(window.document.title === "Cart"){
    document.querySelector(".container1").innerHTML = cartHtml
}


const removeFromCart = document.querySelectorAll(".js-remove")

removeFromCart.forEach((item)=>{
    
    item.addEventListener("click", function(){
        
        const cartItemName = item.dataset.itemName;
        let objectToRemoveIndex = cart.findIndex(item => item.name === cartItemName)
        let objectToRemoveName = cart.find(item => item.name === cartItemName)
        

        if (objectToRemoveIndex !== -1) {
            cart.splice(objectToRemoveIndex, 1);
            localStorage.setItem("carts", JSON.stringify(cart));
        const allProduts = document.querySelectorAll(".product-contain")
            allProduts.forEach((all)=>{
                if(all.dataset.product === objectToRemoveName.name){
                    all.remove()
                    
                    
                }
            })
            // console.log(cart)
}
    
    
    updateTotalPrice()
    countCart()
    removeRefresh()
    })
})




let totalPrice = document.querySelector(".total-price")

function updateTotalPrice (){
    
let totalItems = document.querySelector(".total-item")
    const length = document.querySelectorAll(".product-contain")
    const totalLength = length.length
    if(window.document.title === "Cart"){
    totalItems.innerHTML = `Total(${totalLength} items)`

}
    
    let total = 0;

    cart.forEach((item)=>{
        total += item.price

    })
    
    if(totalPrice === null) return
    
    let resultString = addCommas(`${total}`);
    totalPrice.innerHTML = `₦${resultString}`

    if(total === 0){
        checkIfEmpty()
    }
}





updateTotalPrice()




function removeRefresh (){
    const newprices = document.querySelectorAll(".new-price");
    let total = 0

    newprices.forEach((pri)=>{
        const remove = pri.innerHTML.substring(1)
        const number = parseFloat(remove, 10);
        total+=number

    })

    const totalPrice = document.querySelector(".total-price")
    console.log(total)
    

    
    let resultString = addCommas(`${total}`);
    totalPrice.innerHTML = `₦${resultString}`
}


function checkIfEmpty(){
if(window.document.title === "Cart"){
    document.body.innerHTML = `
    <div class="empty-cart">
    <img src="./empty-cart.png" class="empty">
    <h4>Your Cart is empty <a href="index.html">Go to Store</a></h4>
    </div>
    `
    const emptyCart = document.querySelector(".empty-cart")
}

    
    // emptyCart.style.height = "100vh"

}


const productContain = document.querySelectorAll(".product-contain")
if(productContain.length < 1){
checkIfEmpty()

}


const newprice = document.querySelectorAll(".new-price")

const quantity = document.querySelectorAll(".item-quantity");

quantity.forEach((item)=>{
    item.addEventListener("change", function(){
        const quantityData = item.dataset.quantity;
        const match =  cart.find(item => item.name === quantityData)
        const stagnantPrice = match.price;
        let newPrice = match.price * item.value;
        match.price = newPrice;
        newprice.forEach((priceData)=>{
            const data = priceData.dataset.newPrice;
            if(data == quantityData){
                const newData = data;
                const find = cart.find(item1 => item1.name === newData)
                find.price = newPrice
                priceData.innerHTML = `₦${find.price}`
                updateTotalPrice()
                find.price = stagnantPrice
            }
            
        })
        
        removeRefresh()
    })
})



function countCart(){
const cartCount = document.querySelector(".cartcount");

if(cart.length >= 10){
    cartCount.innerHTML = cart.length
} else{
    cartCount.innerHTML = `0${cart.length}`
}



}

countCart()


// var navbar = document.querySelector(".cart");

// // Get the offset position of the navbar
// var sticky = navbar.offsetTop;

// // Add the sticky class to the navbar when you reach its scroll position
// window.onscroll = function() {
//   if (window.scrollY >= sticky) {
//     navbar.classList.add("sticky");
//   } else {
//     navbar.classList.remove("sticky");
//   }
// };


function performSearch(query) {
    const regex = new RegExp(query, 'i'); // 'i' flag for case-insensitive search
    const results = products.filter(product => regex.test(product.name));
    return results;
    }
    

    function updateResults(query) {
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";

    if (query !== "") {
    const searchResults = performSearch(query);
    searchResults.forEach(result => {
        const listItem = document.createElement("li");
        listItem.classList.add("searchResults");
        listItem.textContent = result.name;
        resultsContainer.appendChild(listItem);
    });
    }

    const searchClick = document.querySelectorAll(".searchResults")

    searchClick.forEach((item)=>{
        item.addEventListener("click", ()=>{
            console.log("yes")
            const name = item.innerHTML;
            const addToCart = document.querySelectorAll(".product-container");
            

            addToCart.forEach((add)=>{
                const addData = add.dataset.productDiv
                if(name == addData){
                add.scrollIntoView({ behavior: "smooth" })
                
            }
            })

            
        })
    })

    }

    const searchInput = document.querySelectorAll(".searchInput");

    searchInput.forEach((search)=>{
        search.addEventListener("input", function () {
    const query = this.value.trim();
    updateResults(query);
    })
    
    })



    function addCommas(str) {
    if (str.length >= 6) {
        // Use regular expression to insert a comma after every 3 characters
        str = str.slice(0, 3) + ',' + str.slice(3);
    } else if(str.length === 5){
        str = str.slice(0, 2) + ',' + str.slice(2);
    } else if(str.length === 4){
        str = str.slice(0, 1) + ',' + str.slice(1);
    }
    return str;
}


const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('email');


    console.log(`Welcome ${name}`)

    const popUp = document.querySelector("#popup-container")
    const popUpMsg = document.querySelector(".usermail")

function showPopup() {
    popUp.style.transform = "translateY(0px)";
    popUpMsg.innerHTML = name;
}

// Set a timeout to call the function after 2 seconds


    function delay(timeout) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}



if (name) {
  if (window.document.title === 'Femi Store') {
    delay(2000)
      .then(() => {
        showPopup();
      })
      .then(() => {
        // After the popup is shown, replace the URL
        const newUrl = window.location.pathname;
        history.replaceState({}, document.title, newUrl);
      });
  }
}
    
    const cancelPopUp = document.querySelector(".fa-xmark")

    

    cancelPopUp.addEventListener("click", ()=>{
        popUp.style.transform = "translateY(-200px)"
    })

    onSnapshot(colRef, (snapshot)=>{
    let details =[]
    snapshot.docs.forEach(doc=>{
        details.push({...doc.data(), id: doc.id})
    })

    console.log(details)
})

let authObserver;

const monitorAuth = () => {
     authObserver = onAuthStateChanged(auth, (user) => {
        if (user) {
            
            
            // User is signed in
            console.log('User is signed in:', user);
            username.innerHTML = user.email || "usermail";
            signin.style.display = "none";
        } else {
            // User is signed out
            console.log('User is signed out');
            logout.style.display = 'none';
            username.innerHTML = "usermail";
        }
    });
};

const unsubscribe = () => authObserver();

// Call the function to set up the listener
monitorAuth()

function openSidebar() {
        document.getElementById("sidebar").style.width = "250px";
    }

    function closeSidebar() {
        document.getElementById("sidebar").style.width = "0";
    }


     document.getElementById("menu-btn").addEventListener("click", openSidebar);
    document.getElementById("close").addEventListener("click", (e)=>{
        e.preventDefault()
        closeSidebar()
    });


    const signOutUser = () => {
    signOut(auth)
    logout.style.display = 'none'
    location.reload();
    

};

logout.addEventListener("click", signOutUser)


