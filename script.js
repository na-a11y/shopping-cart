document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || {};
    updateCartCount();
  
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', () => {
        const card = button.closest('.card');
        const id = card.dataset.id;
        if (!cart[id]) {
          cart[id] = 0;
        }
        cart[id]++;
        updateCart(card, cart[id]);
        updateCartCount();
        saveCart();
  
        // Show the quantity controls and hide the "Add to Cart" button
        card.querySelector('.quantity').style.display = 'flex';
        button.style.display = 'none';
      });
    });
  
    document.querySelectorAll('.increase').forEach(button => {
      button.addEventListener('click', () => {
        const card = button.closest('.card');
        const id = card.dataset.id;
        if (!cart[id]) {
          cart[id] = 0;
        }
        cart[id]++;
        updateCart(card, cart[id]);
        updateCartCount();
        saveCart();
      });
    });
  
    document.querySelectorAll('.decrease').forEach(button => {
      button.addEventListener('click', () => {
        const card = button.closest('.card');
        const id = card.dataset.id;
        if (cart[id] > 0) {
          cart[id]--;
          updateCart(card, cart[id]);
          updateCartCount();
          saveCart();
  
          // Hide the quantity controls and show the "Add to Cart" button if quantity is 0
          if (cart[id] === 0) {
            card.querySelector('.quantity').style.display = 'none';
            card.querySelector('.add-to-cart').style.display = 'inline-block';
          }
        }
      });
    });
  
    function updateCart(card, quantity) {
      card.querySelector('.quantity-number').textContent = quantity;
    }
  
    function updateCartCount() {
      const totalCount = Object.values(cart).reduce((acc, count) => acc + count, 0);
      document.getElementById('cart-count').textContent = totalCount;
    }
  
    function saveCart() {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  });
  