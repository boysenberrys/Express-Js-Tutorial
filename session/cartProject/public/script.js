const productsDiv = document.getElementById("products");
const cartDiv = document.getElementById("cart");

loadProducts();
loadCart();

async function loadProducts() {
  const res = await fetch("/products");
  const products = await res.json();

  productsDiv.innerHTML = "";

  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <img src="${p.image}">
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <strong>$${p.price}</strong>
      <button onclick="addToCart('${p._id}')">Add to Cart</button>
    `;

    productsDiv.appendChild(div);
  });
}

async function addToCart(id) {
  await fetch("/cart/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId: id }),
  });

  loadCart();
}

async function loadCart() {
  const res = await fetch("/cart");
  const cart = await res.json();

  cartDiv.innerHTML = "";

  cart.forEach(p => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <h4>${p.name}</h4>
      <strong>$${p.price}</strong>
      <button onclick="removeFromCart('${p._id}')">Remove</button>
    `;

    cartDiv.appendChild(div);
  });
}

async function removeFromCart(id) {
  await fetch("/cart/remove", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId: id }),
  });

  loadCart();
}
