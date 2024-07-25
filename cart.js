document.addEventListener('DOMContentLoaded', () => {
  displayCartItems();

  function displayCartItems() {
      const cartContainer = document.getElementById('cart-container');
      const cart = JSON.parse(localStorage.getItem('cart')) || {};
      
      if (!cartContainer) {
          console.error('Cart container not found');
          return;
      }

      const productData = {
          1: { name: 'Product 1', image: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1708668433_3948163.jpg?format=webp&w=480&dpr=1.3', price: 3299 },
          2: { name: 'Product 2', image: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1718188222_2574859.jpg?format=webp&w=480&dpr=1.3', price: 1999 },
          3: { name: 'Product 3', image: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1712312699_8681562.jpg?format=webp&w=480&dpr=1.3', price: 2499 },
          4: { name: 'Product 4', image: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1696401427_1028066.jpg?format=webp&w=480&dpr=1.3', price: 2999 },
          5: { name: 'Product 5', image: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1720850937_1050906.jpg?format=webp&w=480&dpr=1.3', price: 2699 },
          6: { name: 'Product 6', image: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1719415065_9369165.gif?format=webp&w=480&dpr=1.3', price: 2499 },
          7: { name: 'Product 1', image: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1708668433_3948163.jpg?format=webp&w=480&dpr=1.3', price: 3299 },
          8: { name: 'Product 2', image: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1718188222_2574859.jpg?format=webp&w=480&dpr=1.3', price: 1999 },
          9: { name: 'Product 3', image: 'https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1712312699_8681562.jpg?format=webp&w=480&dpr=1.3', price: 2499 },
      };

      let totalAmount = 0;
      cartContainer.innerHTML = '';  // Clear previous items

      Object.entries(cart).forEach(([id, quantity]) => {
          if (quantity > 0) {
              const product = productData[id];
              if (product) {
                  const cartItemElement = document.createElement('div');
                  cartItemElement.classList.add('cart-item');
                  cartItemElement.setAttribute('data-id', id);

                  cartItemElement.innerHTML = `
                      <img src="${product.image}" alt="${product.name}" style="width: 100px;">
                      <div class="cart-item-details">
                          <p>${product.name}</p>
                          <p class="price">₹${product.price}</p>
                          <div class="quantity">
                              <button class="decrease">-</button>
                              <span class="quantity-number">${quantity}</span>
                              <button class="increase">+</button>
                          </div>
                      </div>
                      <button class="delete-item">Delete</button>
                  `;

                  cartContainer.appendChild(cartItemElement);

                  totalAmount += product.price * quantity;
              } else {
                  console.warn(`Product with id="${id}" not found.`);
              }
          }
      });

      const cartTotal = document.createElement('div');
      cartTotal.className = 'cart-total';
      cartTotal.textContent = `Total: ₹${totalAmount}`;
      cartContainer.appendChild(cartTotal);

      attachEventListeners();
  }

  function attachEventListeners() {
      document.querySelectorAll('.delete-item').forEach(button => {
          button.addEventListener('click', () => {
              const cartItem = button.closest('.cart-item');
              const id = cartItem.dataset.id;
              deleteItemFromCart(id, cartItem);
          });
      });

      document.querySelectorAll('.increase').forEach(button => {
          button.addEventListener('click', () => {
              const cartItem = button.closest('.cart-item');
              const id = cartItem.dataset.id;
              updateItemQuantity(id, 1, cartItem);
          });
      });

      document.querySelectorAll('.decrease').forEach(button => {
          button.addEventListener('click', () => {
              const cartItem = button.closest('.cart-item');
              const id = cartItem.dataset.id;
              updateItemQuantity(id, -1, cartItem);
          });
      });
  }

  function deleteItemFromCart(id, cartItem) {
      const cart = JSON.parse(localStorage.getItem('cart')) || {};
      delete cart[id];
      saveCart(cart);
      cartItem.remove();
      updateCartCount();
      updateTotalAmount();
  }

  function updateItemQuantity(id, change, cartItem) {
      const cart = JSON.parse(localStorage.getItem('cart')) || {};
      cart[id] = (cart[id] || 0) + change;

      if (cart[id] <= 0) {
          delete cart[id];
          cartItem.remove();
      } else {
          cartItem.querySelector('.quantity-number').textContent = cart[id];
      }

      saveCart(cart);
      updateCartCount();
      updateTotalAmount();
  }

  function updateCartCount() {
      const cart = JSON.parse(localStorage.getItem('cart')) || {};
      const totalCount = Object.values(cart).reduce((acc, count) => acc + count, 0);
      document.getElementById('cart-count').textContent = `Cart (${totalCount})`;
  }

  function updateTotalAmount() {
      const cart = JSON.parse(localStorage.getItem('cart')) || {};
      const productData = {
          1: { name: 'Product 1', price: 3299 },
          2: { name: 'Product 2', price: 1999 },
          3: { name: 'Product 3', price: 2499 },
          4: { name: 'Product 4', price: 2999 },
          5: { name: 'Product 5', price: 2699 },
          6: { name: 'Product 6', price: 2499 },
          7: { name: 'Product 1', price: 3299 },
          8: { name: 'Product 2', price: 1999 },
          9: { name: 'Product 3', price: 2499 },
      };

      let totalAmount = 0;

      Object.entries(cart).forEach(([id, quantity]) => {
          if (quantity > 0) {
              const product = productData[id];
              if (product) {
                  totalAmount += product.price * quantity;
              }
          }
      });

      const cartTotal = document.querySelector('.cart-total');
      if (cartTotal) {
          cartTotal.textContent = `Total: ₹${totalAmount}`;
      }
  }

  function saveCart(cart) {
      localStorage.setItem('cart', JSON.stringify(cart));
  }

  document.getElementById('checkout-btn').addEventListener('click', () => {
      alert('Proceeding to checkout!');
      // You can add further checkout logic here
  });

  document.getElementById('close-cart').addEventListener('click', () => {
      document.getElementById('cart-popup').style.display = 'none';
  });

  // Optional: Show the cart popup if needed
  document.getElementById('cart-count').addEventListener('click', () => {
      document.getElementById('cart-popup').style.display = 'block';
  });
});
