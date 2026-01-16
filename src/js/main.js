
// --- LÓGICA DO MODAL ---

// Adiciona evento de clique em todos os cards de produto
document.querySelectorAll('.product-card').forEach((card) => {
  card.addEventListener('click', () => {
    const name = card.querySelector('.product-name').innerText;
    const price = card.querySelector('.price').innerText;
    const imgSrc = card.querySelector('img').src;
    const rating = card.querySelector('.rating').innerHTML;

    openModal(name, price, imgSrc, rating);
  });
});

function openModal(name, price, img, rating) {
  document.getElementById('modalTitle').innerText = name;
  document.getElementById('modalPrice').innerText = price;
  document.getElementById('modalImg').src = img;
  document.getElementById('modalRating').innerHTML = rating;
  document.getElementById('modalQty').value = 1;

  modal.style.display = 'flex';
}

closeModal.onclick = () => (modal.style.display = 'none');
window.onclick = (event) => {
  if (event.target == modal) modal.style.display = 'none';
};

// --- LÓGICA DO CARRINHO ---

function changeQty(value) {
  const input = document.getElementById('modalQty');
  let current = parseInt(input.value);
  if (current + value >= 1) {
    input.value = current + value;
  }
}

document.getElementById('addToCartBtn').addEventListener('click', () => {
  const qty = parseInt(document.getElementById('modalQty').value);
  const productName = document.getElementById('modalTitle').innerText;

  cartCount += qty;

  // Feedback visual
  alert(`${qty}x ${productName} adicionado ao carrinho!`);
  updateCartIcon();
  modal.style.display = 'none';
});

function updateCartIcon() {
  // Adiciona ou atualiza o contador no ícone de carrinho
  let badge = document.getElementById('cartBadge');
  cartIcon.style.position = 'relative';
  cartIcon.appendChild(badge);
  badge.style.display = 'block';
  badge.innerText = cartCount;
}
