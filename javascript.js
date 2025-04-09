const items = [
  { Image: "./pitcures/apple watch.png", title: "Apple Watch", quantity: 10, price: 500 },
  { Image: "./pitcures/electronicvape.png", title: "Vape Electronics", quantity: 20, price: 20 },
  { Image: "./pitcures/samsong01.png", title: "B12 Pro", quantity: 5, price: 10 },
  { Image: "./pitcures/lenovolaptop.png", title: "Lenovo Laptop", quantity: 5, price: 250 },
  { Image: "./pitcures/vapeb1.png", title: "ELf Bar", quantity: 10, price: 15 },
  { Image: "./pitcures/electronicvape1.png", title: "VooPoo", quantity: 17, price: 12 },
  { Image: "./pitcures/lenovo.png", title: "Lenovo Watch", quantity: 4, price: 45 },
  { Image: "./pitcures/vaporesso.png", title: "Vaporesso", quantity: 5, price: 10 },
  { Image: "./pitcures/samsung.png", title: "Cheap Watch", quantity: 6, price: 30 },
  { Image: "./pitcures/Skyhunt.png", title: "Sky Hunt", quantity: 4, price: 14 },
  { Image: "./pitcures/desktop.png", title: "PC Gaming", quantity: 5, price: 1000 },
  { Image: "./pitcures/screen appel.png", title: "Screen Apple", quantity: 3, price: 300 },
  { Image: "./pitcures/gaming chair.png", title: "Gaming Chair", quantity: 4, price: 200 },
  { Image: "./pitcures/gaming headphones.png", title: "Gaming Headphones", quantity: 4, price: 30 },
];

const itemsContainer = document.getElementById('shop-container');
const searchInput = document.getElementById('input-bar');

function displayItems(filter = "") {
  itemsContainer.innerHTML = "";
  items.forEach((currentItem, i) => {
    if (currentItem.title.toLowerCase().includes(filter.toLowerCase())) {
      itemsContainer.innerHTML += `
        <div class="shop-item">      
          <div class="product-details">
            <div>${currentItem.title}</div>
            <div>
              <img src="${currentItem.Image}" alt="${currentItem.title}" width="50" height="50" />
              <div>Price: $${currentItem.price}</div>
              <div>Quantity: ${currentItem.quantity}</div>
            </div>
          </div>
          <button onclick="addToCart(${i})">Add to Cart</button>
        </div>
      `;
    }
  });
}

displayItems();

searchInput.addEventListener("input", () => {
  displayItems(searchInput.value);
});

const cartItems = [];

function addToCart(index) {
  const currentItem = items[index];
  const existingItem = cartItems.find(item => item.title === currentItem.title);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({ ...currentItem, quantity: 1 });
  }
  updateCartDisplay();
}

function removeFromCart(index) {
  cartItems.splice(index, 1);
  updateCartDisplay();
}

function removeOne(index) {
  if (cartItems[index].quantity > 1) {
    cartItems[index].quantity -= 1;
  } else {
    cartItems.splice(index, 1);
  }
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartContent = document.getElementById('cart-content');
  cartContent.innerHTML = '';
  let totalPrice = 0;

  cartItems.forEach((item, index) => {
    totalPrice += item.price * item.quantity;
    cartContent.innerHTML += `
      <div class="cart-item">
        <div class="cart-details">
          <img src="${item.Image}" alt="${item.title}" width="50" height="50" />
          <div>${item.title}</div>
          <div>Price: $${item.price}</div>
          <div>Quantity: ${item.quantity}</div>
          <div style="display: flex; gap: 5px; margin-top: 5px;">
            <button onclick="removeOne(${index})">➖ Remove 1</button>
            <button onclick="removeFromCart(${index})">❌ Remove All</button>
          </div>
        </div>
      </div>
    `;
  });

  cartContent.innerHTML += `<div class="total-price">Total: $${totalPrice}</div>`;
}
