// Seletores de Elementos
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const overlay = document.getElementById('overlay');
const modal = document.getElementById('productModal');
const closeModal = document.querySelector('.close-modal');
const cartIcon = document.querySelector('.icon-btn'); // Primeiro botão de ícone (carrinho)

let cart = []; // Array para armazenar os itens do carrinho

// --- LÓGICA DO MENU (Existente) ---
function toggleMenu() {
  navLinks.classList.toggle('active');
  overlay.classList.toggle('active');
  menuBtn.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
}
menuBtn.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);

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
  const productPrice = document.getElementById('modalPrice').innerText;
  const productImg = document.getElementById('modalImg').src;

  // Verifica se o produto já está no carrinho
  const existingProduct = cart.find(item => item.name === productName);

  if (existingProduct) {
    existingProduct.quantity += qty;
  } else {
    cart.push({
      name: productName,
      price: productPrice,
      quantity: qty,
      img: productImg
    });
  }

  // Feedback visual
  alert(`${qty}x ${productName} adicionado(s) ao carrinho!`);
  updateCartIcon();
  modal.style.display = 'none';
  console.log(cart);
});

function updateCartIcon() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  let badge = document.getElementById('cartBadge');
   if (totalItems > 0) {
    cartIcon.style.position = 'relative';
    cartIcon.appendChild(badge);
    badge.style.display = 'block';
    badge.innerText = totalItems;
  } else {
    badge.style.display = 'none';
  }
}

// --- LÓGICA DE PESQUISA ---
const searchInput = document.querySelector('.search-bar input');
const productCards = document.querySelectorAll('.product-card');

searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();

  productCards.forEach((card) => {
    const productName = card.querySelector('.product-name').textContent.toLowerCase();
    if (productName.includes(searchTerm)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
});

// --- LÓGICA DO CHECKOUT MODAL ---
const checkoutModal = document.getElementById('checkoutModal');
const closeCheckoutModal = document.querySelector('.checkout-close-modal');
const cartIconButton = document.getElementById('cart-icon-btn');
const checkoutItemsList = document.getElementById('checkout-items-list');
const checkoutTotal = document.getElementById('checkout-total');
const checkoutBtn = document.getElementById('checkout-btn');
const paymentIcons = document.querySelectorAll('.payment-icons img');
let selectedPaymentMethod = null;

cartIconButton.addEventListener('click', openCheckoutModal);
closeCheckoutModal.addEventListener('click', () => checkoutModal.style.display = 'none');

function openCheckoutModal() {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    checkoutItemsList.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('checkout-item');

        // Extrai o valor numérico do preço
        const priceString = item.price.split('<span')[0].replace(/[^0-9.-]+/g,"");
        const price = parseFloat(priceString);
        
        total += price * item.quantity;

        itemElement.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div class="checkout-item-info">
                <p>${item.name} (x${item.quantity})</p>
                <p>Preço: $${(price * item.quantity).toFixed(2)}</p>
            </div>
        `;
        checkoutItemsList.appendChild(itemElement);
    });

    checkoutTotal.innerText = `Total: $${total.toFixed(2)}`;
    checkoutModal.style.display = 'flex';
}

paymentIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        paymentIcons.forEach(i => i.classList.remove('selected'));
        icon.classList.add('selected');
        selectedPaymentMethod = icon.dataset.method;
    });
});

checkoutBtn.addEventListener('click', () => {
    if (!selectedPaymentMethod) {
        alert("Por favor, selecione um método de pagamento.");
        return;
    }

    alert(`Compra finalizada com sucesso usando ${selectedPaymentMethod}!`);
    
    cart = []; // Limpa o carrinho
    updateCartIcon(); // Atualiza o ícone
    checkoutModal.style.display = 'none'; // Fecha o modal
    selectedPaymentMethod = null;
    paymentIcons.forEach(i => i.classList.remove('selected'));
});

// --- LÓGICA DA NEWSLETTER ---
const newsletterForm = document.getElementById('newsletterForm');
const newsletterEmailInput = document.getElementById('newsletterEmail');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = newsletterEmailInput.value.trim();

    // Regex simples para validação de email
    const emailRegex = /^\\S+@\\S+\\.\\S+$/;

    if (emailRegex.test(email)) {
        alert("Obrigado por se inscrever na nossa newsletter!");
        newsletterEmailInput.value = ''; // Limpa o campo
    } else {
        alert("Por favor, insira um endereço de email válido.");
    }
});
// --- L�GICA DO TOP BAR ---
document.addEventListener('DOMContentLoaded', () => {
    const topBar = document.querySelector('.top-bar');
    const closeTopBarBtn = document.querySelector('.top-bar .close');
    if (topBar && closeTopBarBtn) {
        closeTopBarBtn.addEventListener('click', () => {
            topBar.style.display = 'none';
        });
    }
});
