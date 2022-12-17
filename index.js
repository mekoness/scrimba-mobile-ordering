import {menuData} from "./data.js";
let myOrder = [];
let darkMode = false;

document.addEventListener("click", e => {
    if (e.target.dataset.id) {
        handleOrderClick(e.target.dataset.id);
    } else if (e.target.dataset.remove) {
        handleRemoveClick(e.target.dataset.remove);
    } else if (e.target.id === "order-btn") {
        handleOrderBtnClick();
    } else if (e.target.id === "pay-btn") {
        e.preventDefault();
        handlePayBtnClick();
    } else if (e.target.id === "stars-btn") {
        e.preventDefault();
        handleStarsBtnClick();
    } else if (e.target.id === "mode") {
        handleModeClick();
    };
});

function render() {
    document.querySelector("#menu").innerHTML = getMenuHtml();
};

render();

function getMenuHtml() {
    let menuHtml = ``;

    menuData.forEach(menuItem => {
        menuHtml += `
            <div class="menu-container">
                <div class="menu-item">
                    <div class="menu-emoji">
                        <p class="item-emoji">${menuItem.emoji}</p>
                    </div>
                    <div class="menu-details">
                        <p class="item-name">${menuItem.name}</p>
                        <p class="item-ingredients">${menuItem.ingredients}</p>
                        <p class="item-price">$${menuItem.price}</p>
                    </div>
                </div>
                <div>
                    <button class="menu-btn" data-id="${menuItem.id}"><i class="fa-solid fa-plus"></i></button>
                </div>
            </div>
        `
    });
    return menuHtml;
};

function renderOrders() {
    document.querySelector("#order-feed").innerHTML = getOrderHtml();
}

function getOrderHtml() {
    let orderHtml = ``;

    myOrder.forEach(orderItem => {
        orderHtml += `
            <div class="order-container">
                <div class="order-item" data-item="${orderItem.id}">
                    <p class="order-name">${orderItem.name}</p>
                    <p class="order-quantity" id="order-area-${orderItem.id}">x ${orderItem.quantity}</p>
                    <button class="remove-btn" id="remove-id-${orderItem.id}" data-remove="${orderItem.id}">remove</button>
                </div>
                <div>
                    <p class="item-price" id="item-price-${orderItem.id}">$${orderItem.price * orderItem.quantity}</p>
                </div>
            </div>
        `
    });
    return orderHtml;
};

function renderPrice() {
    const priceArea = document.querySelector("#price-area");
    const priceValue = document.querySelector("#price-total");
    let priceTotal = 0;

    myOrder.forEach(orderItem => {
        priceTotal += orderItem.price * orderItem.quantity;

    });

    if (myOrder.length === 3) {
        priceTotal -= 10
        priceArea.innerHTML = `
            <p>Total Price: <span class="discount">(with Combo Discount -$10)</span></p>
        `
    } else {
        priceArea.innerHTML = `
            <p>Total Price:</p>
        `
    }
    priceValue.textContent = `$${priceTotal}`;
};

function handleOrderClick(itemId) {
    const menuObj = menuData.filter(menuItem => parseInt(menuItem.id) === parseInt(itemId))[0];

    if (myOrder.includes(menuObj)) {
        menuObj.quantity ++;
    } else {
        menuObj.quantity ++;
        myOrder.push(menuObj);
        document.querySelector("#order").classList.remove("hidden");
    };
    renderPrice();
    renderOrders();
};

function handleRemoveClick(itemId) {
    const menuObj = myOrder.filter(menuItem => parseInt(menuItem.id) === parseInt(itemId))[0];

    if (menuObj.quantity >= 2) {
        menuObj.quantity --;
    } else if (menuObj.quantity === 1) {
        menuObj.quantity --;
        myOrder.filter((orderItem, index) => {
            if (parseInt(orderItem.id) === parseInt(itemId)) {
                myOrder.splice(index, 1);
            };
        });
    };
    renderPrice();
    renderOrders();
};

function handleOrderBtnClick() {
    if (myOrder.length > 0) {
        document.querySelector("#modal").classList.remove("hidden");
    };
};

function handlePayBtnClick() {
    const modalInputs = document.querySelectorAll(".modal-input");
    let name = document.querySelector("#name").value;

    if (modalInputs[0].value.length > 0 && modalInputs[1].value.length > 0 && modalInputs[2].value.length === 3) {
        document.querySelector("#modal").classList.add("hidden");
        document.querySelector("#order").innerHTML = `
            <div class="confirm">
                <p>Thanks, ${name}! Your order is on its way!</p>
            </div>
        `
        document.querySelector("#stars-modal").classList.remove("hidden");
    };
};

function handleStarsBtnClick() {
    document.querySelector("#stars-modal").classList.add("hidden");
}

function handleModeClick() {
    const modeArea = document.querySelector("#mode-area");

    if (darkMode) {
        document.querySelector(":root").style.setProperty("--bgcolor", "#fff");
        document.querySelector(":root").style.setProperty("--textcolor", "#000");
        modeArea.innerHTML = `<i class="fa-solid fa-moon mode" id="mode"></i>`;
    } else if (!darkMode) {
        document.querySelector(":root").style.setProperty("--bgcolor", "#000");
        document.querySelector(":root").style.setProperty("--textcolor", "#fff");
        modeArea.innerHTML = `<i class="fa-solid fa-sun mode" id="mode"></i>`;
    };
    darkMode = !darkMode;
};