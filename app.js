// Simple SPA navigation
const views = document.querySelectorAll('.view');
const navBtns = document.querySelectorAll('.nav-btn');
navBtns.forEach(btn => {
  btn.onclick = () => {
    navBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    views.forEach(v => v.classList.remove('active'));
    document.getElementById('view-' + btn.dataset.view).classList.add('active');
    if (btn.dataset.view === 'cart') renderCart();
    if (btn.dataset.view === 'history') renderHistory();
    if (btn.dataset.view === 'checkout') renderCheckout();
  };
});

// --- Cart Logic ---
let cart = JSON.parse(localStorage.getItem('cart') || '[]');
let orders = JSON.parse(localStorage.getItem('orders') || '[]');

// Add to cart
document.querySelectorAll('.add-cart-btn').forEach(btn => {
  btn.onclick = () => {
    const id = btn.dataset.id;
    const name = btn.dataset.name;
    const price = parseInt(btn.dataset.price, 10);
    const found = cart.find(i => i.id === id);
    if (found) found.qty += 1;
    else cart.push({ id, name, price, qty: 1 });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart!');
  };
});

// Render cart
function renderCart() {
  const cartList = document.getElementById('cart-list');
  const cartSummary = document.getElementById('cart-summary');
  cart = JSON.parse(localStorage.getItem('cart') || '[]');
  if (!cart.length) {
    cartList.innerHTML = '<p>Your cart is empty.</p>';
    cartSummary.innerHTML = '';
    return;
  }
  cartList.innerHTML = '';
  let subtotal = 0;
  cart.forEach(item => {
    subtotal += item.price * item.qty;
    const row = document.createElement('div');
    row.className = 'cart-item-row';
    row.innerHTML = `
      <span>${item.name}</span>
      <span>₹${item.price}</span>
      <span>
        <button class="cart-qty-btn" data-id="${item.id}" data-action="dec">-</button>
        ${item.qty}
        <button class="cart-qty-btn" data-id="${item.id}" data-action="inc">+</button>
      </span>
      <span>₹${item.price * item.qty}</span>
      <button class="cart-qty-btn" data-id="${item.id}" data-action="remove">🗑</button>
    `;
    cartList.appendChild(row);
  });
  cartList.querySelectorAll('.cart-qty-btn').forEach(btn => {
    btn.onclick = () => {
      const id = btn.dataset.id;
      const action = btn.dataset.action;
      const idx = cart.findIndex(i => i.id === id);
      if (action === 'inc') cart[idx].qty += 1;
      if (action === 'dec') cart[idx].qty = Math.max(1, cart[idx].qty - 1);
      if (action === 'remove') cart.splice(idx, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    };
  });
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + tax;
  cartSummary.innerHTML = `
    <div>Subtotal: ₹${subtotal}</div>
    <div>Tax (5%): ₹${tax}</div>
    <div><b>Total: ₹${total}</b></div>
  `;
}
document.getElementById('to-checkout').onclick = () => {
  navBtns.forEach(b => b.classList.remove('active'));
  document.querySelector('[data-view="checkout"]').classList.add('active');
  views.forEach(v => v.classList.remove('active'));
  document.getElementById('view-checkout').classList.add('active');
  renderCheckout();
};

// --- Checkout Logic ---
function renderCheckout() {
  renderCart();
  const summary = document.getElementById('checkout-summary');
  cart = JSON.parse(localStorage.getItem('cart') || '[]');
  if (!cart.length) {
    summary.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }
  let subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  let tax = Math.round(subtotal * 0.05);
  let total = subtotal + tax;
  summary.innerHTML = `
    <div>Subtotal: ₹${subtotal}</div>
    <div>Tax (5%): ₹${tax}</div>
    <div><b>Total: ₹${total}</b></div>
  `;
}
document.getElementById('checkout-form').onsubmit = e => {
  e.preventDefault();
  cart = JSON.parse(localStorage.getItem('cart') || '[]');
  if (!cart.length) return alert('Cart is empty!');
  const fd = new FormData(e.target);
  const order = {
    id: Date.now(),
    at: new Date().toLocaleString(),
    items: cart,
    customer: Object.fromEntries(fd.entries()),
    total: cart.reduce((sum, i) => sum + i.price * i.qty, 0),
  };
  orders = JSON.parse(localStorage.getItem('orders') || '[]');
  orders.unshift(order);
  localStorage.setItem('orders', JSON.stringify(orders));
  localStorage.setItem('cart', '[]');
  alert('Order placed!');
  renderCart();
  renderHistory();
  navBtns.forEach(b => b.classList.remove('active'));
  document.querySelector('[data-view="history"]').classList.add('active');
  views.forEach(v => v.classList.remove('active'));
  document.getElementById('view-history').classList.add('active');
};

// --- Order History ---
function renderHistory() {
  orders = JSON.parse(localStorage.getItem('orders') || '[]');
  const list = document.getElementById('history-list');
  if (!orders.length) {
    list.innerHTML = '<p>No orders yet.</p>';
    return;
  }
  list.innerHTML = '';
  orders.forEach(order => {
    const div = document.createElement('div');
    div.className = 'order-history-row';
    div.innerHTML = `
      <div><b>${order.at}</b> — ₹${order.total} — ${order.items.length} items</div>
      <div>Order #${order.id}</div>
    `;
    list.appendChild(div);
  });
}

// --- Profile Save (dummy) ---
document.getElementById('profile-form').onsubmit = e => {
  e.preventDefault();
  alert('Profile saved!');
};