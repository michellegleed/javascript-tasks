allItemsDiv = document.querySelector('#all-items');
cartDiv = document.querySelector('#cart');
total = document.querySelector('#total');


class Item {
    constructor(name, price) {
      this.name = name;
      this.price = price;
    }
}

const items = [
    new Item("apple", .50),
    new Item("orange", .70),
    new Item("lime", 1.00)
];

cart = [];

addToCart = (item) => {
    cart.push(item);
    updateCart();
}

updateCart = () => {
    while (cartDiv.hasChildNodes()) {
        cartDiv.removeChild(cartDiv.lastChild);
    }
    runningTotal = 0.0;
    for (let i=0; i < cart.length; i++) {
        var listItem = document.createElement("LI");
        var node = document.createTextNode(cart[i].name);
        listItem.appendChild(node);
        cartDiv.appendChild(listItem);
        runningTotal += cart[i].price
    }
    runningTotal = runningTotal.toFixed(2);
    total.innerHTML = `Total: $${runningTotal}`;
}

for (let i=0; i < items.length; i++) {

    var p1 = document.createElement("P");
    p1.className = "name";
    var p1Node = document.createTextNode(items[i].name);
    p1.appendChild(p1Node);

    var p2 = document.createElement("P");
    p2.className = "price";
    itemPrice = items[i].price.toFixed(2);
    var p2Node = document.createTextNode(`$${itemPrice}`);
    p2.appendChild(p2Node);

    var btn = document.createElement("BUTTON");
    btn.className = "button";
    btn.addEventListener('click', function() {
        addToCart(items[i]);
    }, false);
    var btnNode = document.createTextNode("Add To Cart");
    btn.appendChild(btnNode);

    allItemsDiv.appendChild(p1);
    allItemsDiv.appendChild(p2);
    allItemsDiv.appendChild(btn);
}



