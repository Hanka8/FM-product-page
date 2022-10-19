// ___________________variables___________________

// mobile menu
const hamburgerBtn = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
const filter = document.getElementById("filter");

// changing prewiev 
const smallImg = document.querySelectorAll(".main__left__thumbnails__small");
const bigImg = document.getElementById("bigImg");

// small screen buttons
const next = document.querySelector(".next");
const previous = document.querySelector(".previous");

// button for counting orders
const itemCount = document.querySelector(".itemCount");
const increaser = document.querySelector(".increaser");
const decreaser = document.querySelector(".decreaser");

// modal
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const bigImgModal = document.getElementById("bigImgModal");

const modalNext = document.querySelector(".modal-next");
const modalPrevious = document.querySelector(".modal-previous");

const modalThumbnails = document.querySelectorAll(".modal__thumbnails__small");

// cart
const cartBtn = document.getElementById("cartBtn");
const cartBox = document.getElementById("cartBox");
const ordersInCart = document.getElementById("ordersInCart");

const addBtn = document.getElementById("addBtn");
const itemCounter = document.querySelector(".itemCount");

const emptyText = document.getElementById("emptyCart");

const countOrders = document.getElementById("countOrders");

// MOBILE MENU

let menuOpen = false;

function mobileMenuHandler() {
    if (menuOpen) {
        mobileMenu.classList.remove("showMenu");
        hamburgerBtn.classList.remove("close");
        filter.classList.remove("filter");
        menuOpen = false;
    } else {
        mobileMenu.classList.add("showMenu");
        hamburgerBtn.classList.add("close");
        filter.classList.add("filter");
        menuOpen = true;
    }
}

filter.addEventListener("click", mobileMenuHandler);
hamburgerBtn.addEventListener("click", mobileMenuHandler);

// CHANGING PREVIEW

// on big screen
smallImg.forEach((img) => {
    img.addEventListener("click", (e) => {
        bigImg.src = `images/image-product-${e.target.querySelector("img").id}.jpg`;
        bigImgModal.indexNumber = e.target.querySelector("img").id;
        smallImg.forEach((pic) => {
            pic.classList.remove("selected");
        });
        e.target.classList.add("selected");
    });  
});

// on small screen
let counter = 1;

function nextImage(whatToChange) {
    if (counter < 4) {
        counter++;
        whatToChange.src = `images/image-product-${counter}.jpg`;
    } else {
        counter = 1;
        whatToChange.src = `images/image-product-${counter}.jpg`;
    }
}

function previousImage(whatToChange) {
    if (counter > 1) {
        counter--;
        whatToChange.src = `images/image-product-${counter}.jpg`;
    } else {
        counter = 4;
        whatToChange.src = `images/image-product-${counter}.jpg`;
    }
}

next.addEventListener("click", () => nextImage(bigImg));
previous.addEventListener("click", () => previousImage(bigImg));


// mobile touch events

let startTouch = 0; 
let endTouch = 0;

bigImg.addEventListener("touchstart", (e) => {
    startTouch = e.changedTouches[0].pageX;
});

bigImg.addEventListener("touchend", (x) => {
    endTouch = x.changedTouches[0].pageX;

    if (Math.abs(startTouch - endTouch) > 100) {
        if (startTouch > endTouch) {
            nextImage(bigImg);
        } else {
            previousImage(bigImg);
        }
    }
});


// CHANGING THE NUMBER OF ORDERS

decreaser.addEventListener("click", () => {
    if (parseInt(itemCount.textContent) > 0) {
        itemCount.textContent = parseInt(itemCount.textContent) - 1;     
    } else {
        return;
    }
});

increaser.addEventListener("click", () => {
    itemCount.textContent = parseInt(itemCount.textContent) + 1;
});

// MODAL

// opening and closing modal
bigImg.addEventListener("click", (e) => {
    modal.classList.add("showModal");
    bigImgModal.src = e.target.src;
    counter = bigImgModal.indexNumber;
    modalThumbnails.forEach((pic) => {
        if (pic.querySelector("img").dataset.indexNumber == bigImgModal.indexNumber) {
            pic.classList.add("selected");
        } else {
            pic.classList.remove("selected");
        }
    });
});

window.addEventListener("click", (e) =>{
    if (e.target.id == "modal") {
        modal.classList.remove("showModal");
    };
});

closeModal.addEventListener("click", () => {
    modal.classList.remove("showModal");
});

// switching the picture by buttons
modalNext.addEventListener("click", () => {
    nextImage(bigImgModal);
    modalThumbnails.forEach((pic) => {
        if (pic.querySelector("img").dataset.indexNumber == counter) {
            pic.classList.add("selected");
        } else {
            pic.classList.remove("selected");
        }
    });
});
modalPrevious.addEventListener("click", () => {
    previousImage(bigImgModal);
    modalThumbnails.forEach((pic) => {
        if (pic.querySelector("img").dataset.indexNumber == counter) {
            pic.classList.add("selected");
        } else {
            pic.classList.remove("selected");
        }
    });
});

// switching the picture by keyboard arrows
window.addEventListener("keydown", (e) => {
    if (modal.classList[1] == "showModal") {
        if (e.key == "ArrowLeft") {
            previousImage(bigImgModal);
            modalThumbnails.forEach((pic) => {
                if (pic.querySelector("img").dataset.indexNumber == counter) {
                    pic.classList.add("selected");
                } else {
                   pic.classList.remove("selected"); 
                }
            });
        } else if (e.key == "ArrowRight") {
            nextImage(bigImgModal);
            modalThumbnails.forEach((pic) => {
                if (pic.querySelector("img").dataset.indexNumber == counter) {
                    pic.classList.add("selected");
                } else {
                    pic.classList.remove("selected");
                }
            });
        }
    }
});

// switching the picture by clicking the thumbnails
modalThumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", (e) => {
        bigImgModal.src = `images/image-product-${e.target.querySelector("img").dataset.indexNumber}.jpg`;
        counter = parseInt(e.target.querySelector("img").dataset.indexNumber);
        modalThumbnails.forEach((pic) => {
            pic.classList.remove("selected");
        });
        thumbnail.classList.add("selected");
    });
});


// CREATING CART

cartBtn.addEventListener("click", () => {
    cartBox.classList.toggle("showCartbox");
});

let orderInCart, orderPic, orderFlex, orderName, orderPrice, orderTotal, orderDelete, orderCheck;

addBtn.addEventListener("click", () => {
    if (itemCount.textContent != "0") {
        countOrders.textContent = itemCount.textContent;
        countOrders.classList.add("countOrders");
    } else {
        countOrders.textContent = "";
        countOrders.classList.remove("countOrders");
    }

    if ((parseInt(itemCounter.textContent) > 0) && (document.querySelector(".orderbox") == undefined)) {
    orderInCart = document.createElement("div");
    orderInCart.classList.add("orderbox");
    ordersInCart.append(orderInCart);

    orderPic = document.createElement("img");
    orderPic.classList.add("orderbox__pic");
    orderPic.src = document.getElementById("1").src;
    orderInCart.append(orderPic);

    orderFlex = document.createElement("div");
    orderFlex.classList.add("orderbox__flex");
    orderInCart.append(orderFlex);

    orderName = document.createElement("p");
    orderName.classList.add("orderbox__flex__name");;
    orderName.textContent = document.getElementById("name").textContent;
    orderFlex.append(orderName);

    orderPrice = document.createElement("p");
    orderPrice.classList.add("orderbox__flex__price");
    orderPrice.textContent = `${document.querySelector(".price").textContent} x ${itemCount.textContent}`;
    orderFlex.append(orderPrice);

    orderTotal = document.createElement("p");
    orderTotal.classList.add("orderbox__flex__total");
    orderTotal.textContent = `$${parseInt(document.querySelector(".price").textContent.slice(1)) * parseInt(itemCount.textContent)}`;
    orderFlex.append(orderTotal);

    orderCheck = document.createElement("button");
    orderCheck.classList.add("checkBtn");
    orderCheck.textContent = "Checkout";
    cartBox.append(orderCheck);

    emptyCart.classList.add("fill--cart");


    orderDelete = document.createElement("button");
    orderDelete.classList.add("orderbox__delete");
    orderDelete.id = "deleteItem";
    orderInCart.append(orderDelete);
    orderDelete.addEventListener("click", () => {
        orderInCart.remove();
        orderCheck.remove();
        emptyCart.classList.remove("fill--cart");
        countOrders.textContent = "";
        countOrders.classList.remove("countOrders");
    });


    } else if ((parseInt(itemCounter.textContent) > 0) && (document.querySelector(".orderbox") != undefined)) {
        orderPrice.textContent = `${document.querySelector(".price").textContent} x ${itemCount.textContent}`;
        orderTotal.textContent = `$${parseInt(document.querySelector(".price").textContent.slice(1)) * parseInt(itemCount.textContent)}`;

    } else if (parseInt(itemCounter.textContent) == 0) {
        orderInCart.remove();
        orderCheck.remove();
        emptyCart.classList.remove("fill--cart");
    }
});

window.addEventListener("click", (e) => {
    if (!cartBox.contains(e.target) && e.target.id != "cartBtn" ) {
       cartBox.classList.remove("showCartbox");
    }
})