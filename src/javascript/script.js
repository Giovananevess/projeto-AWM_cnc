$(document).ready(function () {
  $("#mobile_btn").on("click", function () {
    $("#mobile_menu").toggleClass("active");
    $("#mobile_btn").find("i").toggleClass("fa-x");
  });

  ScrollReveal().reveal("#cta", {
    origin: "bottom",
    duration: 1500,
    distance: "15%",
  });
});

function toggleAnswer(element) {
  const answer = element.nextElementSibling;
  const icon = element.querySelector("i");

  if (answer.style.display === "block") {
    answer.style.display = "none";
    icon.classList.remove("fa-minus");
    icon.classList.add("fa-plus");
  } else {
    answer.style.display = "block";
    icon.classList.remove("fa-plus");
    icon.classList.add("fa-minus");
  }
}

const currentPage = window.location.pathname;

// Seleciona todos os itens do menu de navegação
const navItems = document.querySelectorAll("#nav_list .nav-item a");

// Remove a classe 'active' de todos os itens
navItems.forEach((item) => {
  item.parentElement.classList.remove("active");

  // Verifica se o href corresponde ao caminho atual e adiciona 'active'
  if (item.getAttribute("href") === currentPage) {
    item.parentElement.classList.add("active");
  }
});

document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch(this.action, {
      method: "POST",
      body: formData,
    }).then((response) => {
      if (response.ok) {
        this.reset();
        alert("Formulário enviado, em breve entraremos em contato!");
      } else {
        alert("Erro ao enviar!");
      }
    });
  });

let currentSlide = 0;
let autoSlideInterval;

function showSlide(index) {
  const slides = document.querySelectorAll(".carousel-slide");
  const totalSlides = slides.length;

  if (index >= totalSlides) {
    currentSlide = 0;
  } else if (index < 0) {
    currentSlide = totalSlides - 1;
  } else {
    currentSlide = index;
  }

  const offset = (-currentSlide * 100) / 2;
  document.querySelector(
    ".carousel-track"
  ).style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 1500);
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

showSlide(currentSlide);
startAutoSlide();

const carouselContainer = document.querySelector(".carousel-container");
carouselContainer.addEventListener("mouseover", stopAutoSlide);
carouselContainer.addEventListener("mouseout", startAutoSlide);

// product

/* Preloader after 3second adding none class and removing preloader*/
setTimeout(function () {
  document.getElementById("loading").classList.add("none");
}, 3000);

document.querySelector(".btn-apply-filters").addEventListener("click", () => {
  const category = document.getElementById("filter-category").value;
  const sortBy = document.getElementById("sort-by").value;

  const productCards = Array.from(document.querySelectorAll(".product-card"));

  // Filtrar os produtos pela categoria
  const filteredProducts = productCards.filter((card) => {
    const productCategory = card.getAttribute("data-category");
    return category === "all" || productCategory === category;
  });

  // Ordenar os produtos com base na opção selecionada
  filteredProducts.sort((a, b) => {
    if (sortBy === "price-low-high") {
      return a.getAttribute("data-price") - b.getAttribute("data-price");
    } else if (sortBy === "price-high-low") {
      return b.getAttribute("data-price") - a.getAttribute("data-price");
    } else if (sortBy === "name-a-z") {
      return a
        .getAttribute("data-name")
        .localeCompare(b.getAttribute("data-name"));
    } else {
      return 0; // Padrão sem ordenação
    }
  });

  // Limpar a exibição dos produtos atuais
  const productsContainer = document.querySelector(".products");
  productsContainer.innerHTML = "";

  // Adicionar os produtos filtrados e ordenados de volta ao container
  filteredProducts.forEach((card) => productsContainer.appendChild(card));

  console.log(
    `Filtrando por categoria: ${category} e ordenando por: ${sortBy}`
  );
});

document.addEventListener("DOMContentLoaded", function () {
  // Selecione todos os links de produtos
  const productLinks = document.querySelectorAll(".whatsapp-link");

  productLinks.forEach((link) => {
    const productName = link.querySelector("h5").innerText;
    const price = link.querySelector(".current-price").innerText;

    // Monta a mensagem personalizada
    const message = encodeURIComponent(
      `Estou interessado neste produto: ${productName} - ${price}`
    );

    // Atualiza o link do WhatsApp
    link.href = `https://api.whatsapp.com/send?text=${message}`;
  });
});
