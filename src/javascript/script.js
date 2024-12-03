$(document).ready(function () {
  handleMobileMenu();
  setupScrollReveal();
  highlightActiveMenuItem();
  setupFilters();
  setupWhatsAppLinks();
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

// Gerenciar Menu Mobile
function handleMobileMenu() {
  $("#mobile_btn").on("click", function () {
    $("#mobile_menu").toggleClass("active");
    $("#mobile_btn").find("i").toggleClass("fa-x");
  });
}

// Configurar ScrollReveal
function setupScrollReveal() {
  ScrollReveal().reveal("#cta", {
    origin: "bottom",
    duration: 1500,
    distance: "15%",
  });
}

// Destacar o item ativo no menu
function highlightActiveMenuItem() {
  const currentPage = window.location.pathname;
  const navItems = document.querySelectorAll("#nav_list .nav-item a");

  navItems.forEach((item) => {
    item.parentElement.classList.remove("active");
    if (item.getAttribute("href") === currentPage) {
      item.parentElement.classList.add("active");
    }
  });
}

// Configurar Filtros de Produtos
function setupFilters() {
  const applyFiltersButton = document.querySelector(".btn-apply-filters");
  const filterFeedback = document.getElementById("filter-feedback");

  applyFiltersButton.addEventListener("click", () => {
    showFeedback("Filtrando produtos, aguarde...");

    setTimeout(() => {
      applyFilters();
      hideFeedback();
    }, 500); // Pequeno atraso para exibir o feedback
  });
}

function showFeedback(message) {
  const feedback = document.getElementById("filter-feedback");
  feedback.textContent = message;
  feedback.style.display = "block";
}

function hideFeedback() {
  const feedback = document.getElementById("filter-feedback");
  feedback.style.display = "none";
}

function applyFilters() {
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

  console.log(`Filtrado por categoria: ${category} e ordenado por: ${sortBy}`);
}

// Configurar Links do WhatsApp
function setupWhatsAppLinks() {
  const productLinks = document.querySelectorAll(".product-card a");

  productLinks.forEach((link) => {
    const productName = link.querySelector("h5")?.innerText || "Produto";
    const price =
      link.querySelector(".current-price")?.innerText || "Preço não disponível";

    // Monta a mensagem personalizada
    const message = encodeURIComponent(
      `Estou interessado neste produto: ${productName} - ${price}`
    );

    // Atualiza o link do WhatsApp
    link.href = `https://api.whatsapp.com/send?text=${message}`;
  });
}

// Carrossel Automático
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

// Inicializar carrossel
document.addEventListener("DOMContentLoaded", function () {
  showSlide(currentSlide);
  startAutoSlide();

  const carouselContainer = document.querySelector(".carousel-container");
  carouselContainer.addEventListener("mouseover", stopAutoSlide);
  carouselContainer.addEventListener("mouseout", startAutoSlide);
});

// Preloader
setTimeout(function () {
  document.getElementById("loading").classList.add("none");
}, 3000);

// Formulário de Contato
document
  .getElementById("contact-form")
  ?.addEventListener("submit", function (event) {
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

const products = [
  {
    category: "tabuas",
    price: 160,
    name: "Tábua Churrasco Personalizada com seu Time",
    image: "public/assets/images/products/tabua-marchatada-time.jfif",
    description: "Tamanho 350mm x 500mm",
    installments: "2x de R$79,99 sem juros",
  },
  {
    category: "tabuas",
    price: 200,
    name: "Tábua Madeira Maciça de Churrasco Personalizada",
    image: "public/assets/images/products/tabua-macica-personalizada.jfif",
    description: "Tamanho 350mm x 500mm",
    installments: "2x de R$99,99 sem juros",
  },
  {
    category: "tabuas",
    price: 180,
    name: "Tábua Churrasco Personalizada com Ramequim",
    image: "public/assets/images/products/tabua-marchatada-time-01.jfif",
    description: "Tamanho 350mm x 500mm",
    installments: "2x de R$89,99 sem juros",
  },
  {
    category: "tabuas",
    price: 180,
    name: "Tábua Churrasco Personalizada com Ramequim",
    image: "public/assets/images/products/tabua-marchetada-ramekin.jfif",
    description: "Tamanho 350mm x 500mm",
    installments: "2x de R$89,99 sem juros",
  },
  {
    category: "tabuas",
    price: 180,
    name: "Tábua Churrasco Personalizada com Ramequim",
    image: "public/assets/images/products/tabua-marchetada-ramekin-01.jfif",
    description: "Tamanho 350mm x 500mm",
    installments: "2x de R$89,99 sem juros",
  },
  {
    category: "tabuas",
    price: 180,
    name: "Tábua Churrasco Personalizada com Ramequim",
    image: "public/assets/images/products/tabua-marchetada-ramekin-02.jfif",
    description: "Tamanho 350mm x 500mm",
    installments: "2x de R$89,99 sem juros",
  },
  {
    category: "tabuas",
    price: 180,
    name: "Tábua Churrasco com Ramequim",
    image: "public/assets/images/products/tabua-macica-2ramekin.jfif",
    description: "Tamanho 30cm x 30cm",
    installments: "2x de R$89,99 sem juros",
  },
  {
    category: "petisqueira",
    price: 135,
    name: "Petisqueira com 2 Ramequim",
    image: "public/assets/images/products/petisqueira-dois-ramekin-1.jfif",
    description: "Tamanho 30cm x 30cm",
    installments: "2x de R$67,50 sem juros",
  },
  {
    category: "petisqueira",
    price: 120,
    name: "Petisqueira com 1 Ramequim",
    image: "public/assets/images/products/petisqueira-ramekin-1.jfif",
    description: "Tamanho 30cm x 30cm",
    installments: "2x de R$59,99 sem juros",
  },
  {
    category: "petisqueira",
    price: 100,
    name: "Petisqueira Coração",
    image: "public/assets/images/products/petisqueira5.jfif",
    description: "Tamanho 30cm x 30cm",
    installments: "2x de R$49,99 sem juros",
  },
  {
    category: "petisqueira",
    price: 100,
    name: "Petisqueira",
    image: "public/assets/images/products/petisqueira4.jfif",
    description: "Tamanho 30cm x 30cm",
    installments: "2x de R$49,99 sem juros",
  },
  {
    category: "petisqueira",
    price: 100,
    name: "Petisqueira",
    image: "public/assets/images/products/petisqueira3.jfif",
    description: "Tamanho 30cm x 30cm",
    installments: "2x de R$49,99 sem juros",
  },
  {
    category: "petisqueira",
    price: 100,
    name: "Petisqueira com 2 divisões",
    image: "public/assets/images/products/petisqueira2.jfif",
    description: "Tamanho 30cm x 30cm",
    installments: "2x de R$49,99 sem juros",
  },
  {
    category: "petisqueira",
    price: 100,
    name: "Petisqueira com 4 divisões",
    image: "public/assets/images/products/petisqueira1.jfif",
    description: "Tamanho 30cm x 30cm",
    installments: "2x de R$49,99 sem juros",
  },
  {
    category: "petisqueira",
    price: 80,
    name: "Petisqueira em Forma Geométrica",
    image: "public/assets/images/products/petisqueira-ramekin-5.jfif",
    description: "Tamanho 30cm x 30cm",
    installments: "2x de R$39,99 sem juros",
  },
  {
    category: "petisqueira",
    price: 80,
    name: "Petisqueira em Forma Geométrica",
    image: "public/assets/images/products/petisqueira-ramekin-4.jfif",
    description: "Tamanho 30cm x 30cm",
    installments: "2x de R$39,99 sem juros",
  },
  {
    category: "petisqueira",
    price: 80,
    name: "Petisqueira em Forma Geométrica",
    image: "public/assets/images/products/petisqueira-ramekin-3.jfif",
    description: "Tamanho 30cm x 30cm",
    installments: "2x de R$39,99 sem juros",
  },
  {
    category: "tabua e petisqueira",
    price: 250,
    name: "Tábua de Corte Conjugada com petisqueira",
    image: "public/assets/images/products/petisqueiraetabua-de-corte.jfif",
    description: "Tamanho 30cm x 30cm",
    installments: "2x de R$124,99 sem juros",
  },
  {
    category: "tabuas",
    price: 30,
    name: "Tábua de Corte para o dia a dia",
    image: "public/assets/images/products/tabua-comum4.jfif",
    description: "Tamanho 30cm x 30cm",
    installments: "1x de R$30,00 sem juros",
  },
  {
    category: "tabuas",
    price: 30,
    name: "Tábua de Corte para o dia a dia",
    image: "public/assets/images/products/tabua-comum3.jfif",
    description: "Tamanho 30cm x 30cm",
    installments: "1x de R$30,00 sem juros",
  },
  {
    category: "tabuas",
    price: 30,
    name: "Tábua de Corte para o dia a dia",
    image: "public/assets/images/products/tabua-comum2.jfif",
    description: "Tamanho 30cm x 30cm",
    installments: "1x de R$30,00 sem juros",
  },
  {
    category: "tabuas",
    price: 30,
    name: "Tábua de Corte para o dia a dia",
    image: "public/assets/images/products/tabua-comum1.jfif",
    description: "Tamanho 30cm x 30cm",
    installments: "1x de R$30,00 sem juros",
  },
  {
    category: "tabua dia a dia",
    price: 35,
    name: "Tábua de Corte dia-a-dia Cutelo",
    image: "public/assets/images/products/tabua-cutelo.jpeg",
    description: "Gravação a escolher",
    installments: "1x de R$34,99 sem juros",
  },
  {
    category: "tabua dia a dia",
    price: 35,
    name: "Tábua de Corte dia-a-dia Cutelo",
    image: "public/assets/images/products/tabua-cutelo2.jpeg",
    description: "Gravação a escolher",
    installments: "1x de R$34,99 sem juros",
  },
  {
    category: "tabuas",
    price: 150,
    name: "Tábua de Corte Cutelo",
    image: "public/assets/images/products/tabua-cutelo1.jfif",
    description: "Tamanho 30cm x 30cm",
    installments: "2x de R$74,99 sem juros",
  },
  {
    category: "tabua porcao e frios",
    price: 100,
    name: "Tábua para Porções e Frios",
    image: "public/assets/images/products/tabuas-porcoes-6.jfif",
    description: "Tamanho 30cm x 30cm",
    installments: "2x de R$49,99 sem juros",
  },
  {
    category: "tabua porcao e frios",
    price: 100,
    name: "Tábua para Porções e Frios Personalizada",
    image: "public/assets/images/products/tabuas-porcoes-5.jfif",
    description: "Tamanho 30cm x 30cm",
    installments: "2x de R$49,99 sem juros",
  },
  {
    category: "tabua porcao e frios",
    price: 100,
    name: "Tábua para Porções e Frios Comum",
    image: "public/assets/images/products/tabuas-porcoes-4.jfif",
    description: "Tamanho 30cm x 30cm",
    installments: "2x de R$49,99 sem juros",
  },
  {
    category: "tabua porcao e frios",
    price: 100,
    name: "Tábua para Porções e Frios Comum",
    image: "public/assets/images/products/tabuas-porcoes-3.jfif",
    description: "Tamanho 30cm x 30cm",
    installments: "2x de R$49,99 sem juros",
  },
  {
    category: "tabua porcao e frios",
    price: 100,
    name: "Tábua para Porções e Frios Comum",
    image: "public/assets/images/products/tabuas-porcoes-1.jfif",
    description: "Tamanho 30cm x 30cm",
    installments: "2x de R$49,99 sem juros",
  },
  {
    category: "relogios",
    price: 50,
    name: "Relógio de Parede",
    image: "public/assets/images/products/clock-normal.jfif",
    description: "Tamanho 30cm x 30cm",
    installments: "2x de R$24,99 sem juros",
  },
  {
    category: "relogios",
    price: 50,
    name: "Relógio de Parede do Corinthians",
    image: "public/assets/images/products/clock-corinthians2.jfif",
    description: "Tamanho 30cm x 30cm",
    installments: "2x de R$24,99 sem juros",
  },
  {
    category: "relogios",
    price: 50,
    name: "Relógio de Parede do Corinthians Black",
    image: "public/assets/images/products/clock-corinthians.jfif",
    description: "Tamanho 30cm x 30cm",
    installments: "2x de R$24,99 sem juros",
  },
  {
    category: "relogios",
    price: 50,
    name: "Relógio de Parede do Santos Black",
    image: "public/assets/images/products/clock-santos2.jfif",
    description: "Tamanho 30cm x 30cm",
    installments: "2x de R$24,99 sem juros",
  },
  {
    category: "relogios",
    price: 50,
    name: "Relógio de Parede do Santos",
    image: "public/assets/images/products/clock-santos3.jfif",
    description: "Tamanho 30cm x 30cm",
    installments: "2x de R$24,99 sem juros",
  },
  {
    category: "relogios",
    price: 50,
    name: "Relógio de Parede do Santos",
    image: "public/assets/images/products/clock-jesus2.jfif",
    description: "Tamanho 30cm x 30cm",
    installments: "2x de R$24,99 sem juros",
  },
  {
    category: "canivete",
    price: 90,
    name: "Canivete Modelo 1",
    image: "public/assets/images/products/canivete-modelo1.jpeg",
    description: "Gravação a escolher",
    installments: "2x de R$44,99 sem juros",
  },
  {
    category: "canivete",
    price: 80,
    name: "Canivete Modelo 2",
    image: "public/assets/images/products/canivete-modelo2.jpeg",
    description: "Gravação a escolher",
    installments: "2x de R$39,99 sem juros",
  },
  {
    category: "canivete",
    price: 70,
    name: "Canivete Modelo 2",
    image: "public/assets/images/products/canivete-modelo3.jpeg",
    description: "Gravação a escolher",
    installments: "2x de R$34,99 sem juros",
  },
  {
    category: "quadro decorativo",
    price: 50,
    name: "Quadro Decorativo - duas peças",
    image: "public/assets/images/products/quadro-abraco.jfif",
    description: "Tamanho 30cm x 30cm",
    installments: "2x de R$24,99 sem juros",
  },
  {
    category: "abridor de parede",
    price: 35,
    name: "Abridor de Cerveja Personalizado",
    image: "public/assets/images/products/abridor-parade-cerveja2.jfif",
    description: "Gravação a escolher",
    installments: "1x de R$34,99 sem juros",
  },
  {
    category: "decoracao",
    price: 40,
    name: "Pêndulo hora da Cerveja Clear",
    image: "public/assets/images/products/pendulo-horadacerveja2.jfif",
    description: "Gravação a escolher",
    installments: "1x de R$39,99 sem juros",
  },
  {
    category: "decoracao",
    price: 40,
    name: "Pêndulo hora da Cerveja Verniz",
    image: "public/assets/images/products/pendulo-horadacerveja.jfif",
    description: "Gravação a escolher",
    installments: "1x de R$39,99 sem juros",
  },
  {
    category: "porta copo",
    price: 25,
    name: "Porta Copo tião carreiro",
    image: "public/assets/images/products/copo-7.jfif",
    description: "Conjunto de 4 Peças",
    installments: "1x de R$24,99 sem juros",
  },
  {
    category: "porta copo",
    price: 25,
    name: "Porta Copo Redondo tião carreiro",
    image: "public/assets/images/products/copo-1.jfif",
    description: "Conjunto de 4 Peças",
    installments: "1x de R$24,99 sem juros",
  },
  {
    category: "porta copo",
    price: 25,
    name: "Porta Copo Heineken",
    image: "public/assets/images/products/copo-6.jfif",
    description: "Conjunto de 4 Peças",
    installments: "1x de R$24,99 sem juros",
  },
  {
    category: "porta copo",
    price: 25,
    name: "Porta Copo Brahma",
    image: "public/assets/images/products/copo-5.jfif",
    description: "Conjunto de 4 Peças",
    installments: "1x de R$24,99 sem juros",
  },
  {
    category: "porta copo",
    price: 25,
    name: "Porta Copo Redondo da Brahma",
    image: "public/assets/images/products/copo-3.jfif",
    description: "Conjunto de 4 Peças",
    installments: "1x de R$24,99 sem juros",
  },
  {
    category: "porta copo",
    price: 25,
    name: "Porta Copo Skol",
    image: "public/assets/images/products/copo-4.jfif",
    description: "Conjunto de 4 Peças",
    installments: "1x de R$24,99 sem juros",
  },
  {
    category: "porta copo",
    price: 25,
    name: "Porta Copo Redondo Skol",
    image: "public/assets/images/products/copo-2.jfif",
    description: "Conjunto de 4 Peças",
    installments: "1x de R$24,99 sem juros",
  },
];

const productsContainer = document.querySelector(".products");
function generateProducts(products) {
  const productsContainer = document.querySelector(".products");
  productsContainer.innerHTML = ""; // Limpa o container para filtros
  products.forEach((product) => {
    // Gera o link dinâmico para WhatsApp
    const whatsappMessage = `Estou interessado no produto ${
      product.name
    } - R$${product.price.toFixed(2)}`;
    const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    // Cria o card do produto
    const productCard = `
          <div class="product-card" data-category="${
            product.category
          }" data-price="${product.price}" data-name="${product.name}">
              <a style="text-decoration: none;" href="${whatsappLink}" target="_blank">
                  <div class="product-image">
                      <img src="${product.image}" alt="${product.name}">
                  </div>
                  <div class="product-info">
                      <h5>${product.name}</h5>
                      <h6 class="current-price">R$${product.price.toFixed(
                        2
                      )}</h6>
                      <h6 class="discount">${product.description}</h6>
                      <h6 class="installments">${product.installments}</h6>
                  </div>
              </a>
          </div>
      `;
    productsContainer.insertAdjacentHTML("beforeend", productCard);
  });
}

// Chama a função para gerar os produtos
generateProducts(products);

// function showSlide(index) {
//   const slides = document.querySelectorAll(".carousel-slide");
//   const totalSlides = slides.length;

//   if (index >= totalSlides) {
//     currentSlide = 0;
//   } else if (index < 0) {
//     currentSlide = totalSlides - 1;
//   } else {
//     currentSlide = index;
//   }

//   const offset = (-currentSlide * 100) / 2;
//   document.querySelector(
//     ".carousel-track"
//   ).style.transform = `translateX(${offset}%)`;
// }

// function nextSlide() {
//   showSlide(currentSlide + 1);
// }

// function prevSlide() {
//   showSlide(currentSlide - 1);
// }

// function startAutoSlide() {
//   autoSlideInterval = setInterval(nextSlide, 1500);
// }

// function stopAutoSlide() {
//   clearInterval(autoSlideInterval);
// }

// showSlide(currentSlide);
// startAutoSlide();

// const carouselContainer = document.querySelector(".carousel-container");
// carouselContainer.addEventListener("mouseover", stopAutoSlide);
// carouselContainer.addEventListener("mouseout", startAutoSlide);

// // product

// /* Preloader after 3second adding none class and removing preloader*/
// setTimeout(function () {
//   document.getElementById("loading").classList.add("none");
// }, 3000);

// document.querySelector(".btn-apply-filters").addEventListener("click", () => {
//   const category = document.getElementById("filter-category").value;
//   const sortBy = document.getElementById("sort-by").value;

//   const productCards = Array.from(document.querySelectorAll(".product-card"));

//   // Filtrar os produtos pela categoria
//   const filteredProducts = productCards.filter((card) => {
//     const productCategory = card.getAttribute("data-category");
//     return category === "all" || productCategory === category;
//   });

//   // Ordenar os produtos com base na opção selecionada
//   filteredProducts.sort((a, b) => {
//     if (sortBy === "price-low-high") {
//       return a.getAttribute("data-price") - b.getAttribute("data-price");
//     } else if (sortBy === "price-high-low") {
//       return b.getAttribute("data-price") - a.getAttribute("data-price");
//     } else if (sortBy === "name-a-z") {
//       return a
//         .getAttribute("data-name")
//         .localeCompare(b.getAttribute("data-name"));
//     } else {
//       return 0; // Padrão sem ordenação
//     }
//   });

//   // Limpar a exibição dos produtos atuais
//   const productsContainer = document.querySelector(".products");
//   productsContainer.innerHTML = "";

//   // Adicionar os produtos filtrados e ordenados de volta ao container
//   filteredProducts.forEach((card) => productsContainer.appendChild(card));

//   console.log(
//     `Filtrando por categoria: ${category} e ordenando por: ${sortBy}`
//   );
// });
