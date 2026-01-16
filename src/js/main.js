const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const overlay = document.getElementById('overlay');

// Função para abrir/fechar
function toggleMenu() {
  navLinks.classList.toggle('active');
  overlay.classList.toggle('active');

  // Muda o ícone
  if (navLinks.classList.contains('active')) {
    menuBtn.textContent = '✕';
    menuBtn.style.position = 'relative';
    menuBtn.style.zIndex = '1000'; // Garante que o X fique visível acima de tudo
  } else {
    menuBtn.textContent = '☰';
  }
}

menuBtn.addEventListener('click', toggleMenu);

// Se clicar na sombra, o menu também fecha
overlay.addEventListener('click', toggleMenu);
