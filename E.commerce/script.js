// --------------------------NAV MENU-------------------------

const navMenu = document.querySelector('.nav-menu');
const hamburger = document.querySelector('.hamburger');
const navClose = document.querySelector('.close');

hamburger.addEventListener('click', function(){
    navMenu.classList.add('show-menu');
})

navClose.addEventListener('click', function(){
    navMenu.classList.remove('show-menu');
})



var images = [
    {
        id: 0,
        img: './E.commerce/images/image-product-1.jpg',
        name: 'product 1',
        button: 'Add to Cart',
    },

    {
        id: 1,
        img: './E.commerce/images/image-product-2.jpg',
        name: 'product 2',
        button: 'Add to Cart',
    },

    {
        id: 2,
        img: './E.commerce/images/image-product-3.jpg',
        name: 'product 3',
        button: 'Add to Cart',
    },

    {
        id: 3,
        img: './E.commerce/images/image-product-4.jpg',
        name: 'product 4',
        button: 'button',
    }
];



const image = document.querySelector('#big-image');
const prevBtn = document.querySelector('.backward');
const nextBtn = document.querySelector('.forward');
const cartButton = document.querySelector('.cart-button');

window.addEventListener('DOMContentLoaded', function() {
    mergeItems();

});

// Image Switch on Mobile View.

let countItems = 0;

function mergeItems(){
    var item = images[countItems];
    image.src = item.img;
    cartButton.button = item.button;
}

prevBtn.addEventListener('click', function(){
    countItems--;
    if(countItems < 0){
        countItems = images.length-1;
    }
    mergeItems();
})

nextBtn.addEventListener('click', function(){
    countItems++;
    if(countItems > images.length-1){
        countItems = 0;
    }
    mergeItems();
})


// Quantity Section.

const minus = document.querySelector('.minus');
const plus = document.querySelector('.plus');
let value = document.querySelector('.value');

minus.addEventListener('click',function(){
    value.innerText--;

    if(value.innerText < 0){
        alert("You can't order zero(0) items");
        value.innerText = 0;
    }
})

plus.addEventListener('click',function(){
    value.innerText++;
})

// Image Switch on Desktop View.

const thumbnails = document.querySelectorAll('.thumbnail');

thumbnails.forEach(function(thumb){
    thumb.addEventListener('click', function(event){
        // console.log(thumb.src);
        var id = event.target.dataset.id;
        if(id == images[id].id){
            image.src = images[id].img;
        }
    })
})

// Display Cart.

const cartBtn = document.querySelector('.cart-logo');
const cart = document.querySelector('.cart')

cartBtn.addEventListener('click', function(){
    cart.classList.toggle('show-cart')
    emptyCart();
})






//--------------------------- Add Cart Items. ----------------------

const closeCart = document.querySelector('.close-cart');

cartButton.addEventListener('click', function(event){
    var container = event.target.parentElement.parentElement.parentElement;
    // console.log(container.hasChildNodes());
    var imageSrc = container.querySelector('#big-image').src;
    var amountText = container.querySelector('.percentage-amount').innerText;
    var valueValue = container.querySelector('.value').innerText;

    var amountText = parseFloat(amountText.slice(1));
    var valueValue = parseFloat(valueValue);
    // console.log(container);

    let val = document.querySelector('.value')
    
    if(val.innerText == "0"){
        alert("You can't order 0 of this item")
        return;
    }

    val.innerText = "0";

    cart.classList.add('show-cart');

    addToCart(imageSrc, amountText, valueValue);
    emptyCart();
});



let cartArray = [];
function addToCart(imageSrc, amountText, valueValue){
    var cartRow = document.createElement('div');

    let myImage = document.querySelector('#big-image');
    // for(let i=0; i < myImage.length; i++){
        // if(myImage.src == imageSrc){
        //     alert("This item has already been added to your cart!")
        //     // console.log(true);
        //     // console.log(myImage.src);
        //     // console.log(imageSrc);
        //     return;
        // }
        // else{
        //     console.log(false);
        // }
    // }

    cartRow.innerHTML = `
        <div class="cart-item" id="cart-item">
            <img src="${imageSrc}" alt="" class="cart-item-image">
            <div>
                <p class="cart-item-text">${'autumn limited edition...'}</p>
                <p class="single-price">$${amountText} x ${valueValue} <span class="total">$${amountText*valueValue} </span></p>
            </div>
            <img src="./E.commerce/images/icon-delete.svg" alt="" class="delete">
        </div>`

    cart.insertBefore(cartRow, closeCart);

    var dels = document.querySelectorAll('.delete');
    dels.forEach(function(del){
        del.addEventListener('click', function(event){
        event.target.parentElement.parentElement.remove();
        emptyCart();
        })
    })
};







// Checkout Cart Button.

const cartContainer = document.querySelector('.cart-item-container');

closeCart.addEventListener('click', function(){
    var dels = document.querySelectorAll('.delete');
    for(var i = 0; i < dels.length; i++){
        dels.forEach(function(del){
            del.parentElement.parentElement.remove();
        })
    }

    cart.classList.remove('show-cart');
    emptyCart();
})




//  Image-avatar

document.querySelector('.image-avatar').addEventListener('click', function(){
    document.querySelector('.image-avatar').classList.toggle('avatar'); 
});




// Empty Cart Function.

function emptyCart(){
    let cartItemCont = document.querySelector('.cart-item-container');
    let cartItem = document.querySelector('.cart-item')
    if(cartItem){
        // console.log(true);
        cartItemCont.classList.remove('empty-cart');
        closeCart.style.display = "block";

    } else{
        cartItemCont.classList.add('empty-cart');
        closeCart.style.display = "none";
        // console.log(false);
    }
}