import { renderCatalogo } from "./cardproducts";
import { catalago, salvarLocalStorage, lerLocalStorage } from "./ultilitys";

const idProdutosCarrinhoQuantidade = lerLocalStorage("carrinho") ?? {};

function abrirCarrinho() {
    document.getElementById("carrinho").classList.remove("right-[-360px]");
    document.getElementById("carrinho").classList.add("right-[0px]");
}

function fecharCarrinho() {
    document.getElementById("carrinho").classList.remove("right-[0px]");
    document.getElementById("carrinho").classList.add("right-[-360px]");
}

function irParaCheckout() {
  if(Object.keys(idProdutosCarrinhoQuantidade).length === 0 ) {
    return
  }
  window.location.href = "./checkout.html";
}

export function inicializarCarrinho() {
    const botaoFecharCarrinho = document.getElementById("fechar-carrinho");
    const botaoAbrirCarrinho = document.getElementById("abrir-carrinho");
    const botaoIrParaCheckout = document.getElementById("finalizar-compra")

    botaoFecharCarrinho.addEventListener("click", fecharCarrinho);
    botaoAbrirCarrinho.addEventListener("click", abrirCarrinho); 
    botaoIrParaCheckout.addEventListener("click", irParaCheckout);
}

function removerDoCarrinho(idProduto) {
  delete idProdutosCarrinhoQuantidade[idProduto];
  salvarLocalStorage("carrinho", idProdutosCarrinhoQuantidade);
  atualizarPrecoCarrinho();
  renderProdutosCarrinho();
}

function incrementarQuantidadeDeProduto(idProduto) {
  idProdutosCarrinhoQuantidade[idProduto]++;
  salvarLocalStorage("carrinho", idProdutosCarrinhoQuantidade);
  atualizarPrecoCarrinho();
  atualizarInformacaoQuantidade(idProduto);
}

function decrementarQuantidadeDeProduto(idProduto) {
  if(idProdutosCarrinhoQuantidade[idProduto] === 1) {
    removerDoCarrinho(idProduto);
    return
  }
  idProdutosCarrinhoQuantidade[idProduto]--;
  salvarLocalStorage("carrinho", idProdutosCarrinhoQuantidade);
  atualizarPrecoCarrinho();
  atualizarInformacaoQuantidade(idProduto);
}

function atualizarInformacaoQuantidade(idProduto) {
  document.getElementById(`quantidade-${idProduto}`).innerText = idProdutosCarrinhoQuantidade[idProduto];
}

function desenharProdutoNoCarrinho(idProduto) {
  
  const produto = catalago.find((p) => p.id === idProduto);
  const containerProdutosCarrinho = document.getElementById("produtos-carrinho")
  
  const elementoArticle = document.createElement("article");
  const articleClasses = [
    "flex",
    "bg-slate-100",
    "rounded-lg",
    "p-1",
    "relative",
  ];
  
  for (const articleClass of articleClasses) {
    elementoArticle.classList.add(articleClass);
  }

  const cartaoProdutoCarrinho = `
  <button id="remover-item-${produto.id}" class=" absolute top-0 right-2" >
    <i class="fa-solid fa-circle-xmark text-slate-500 hover:text-slate-800"></i>
  </button>
  <img 
  src="./assets/img/${produto.imagem}"
  alt="Carrinho: ${produto.nome}" 
  class="h-24 rounded-lg"
  />
  <div class="p-2 flex flex-col justify-between">
    <p class="text-slate-900 text-sm">${produto.nome}</p>
    <p class="text-slate-400 text-xs">${produto.marca}</p>
    <p class="text-green-700 text-lg">$${produto.preco}</p>
  </div>
  <div class="text-gray-950 flex items-end absolute bottom-0 right-2 text-lg">
    <button id="decrementar-produto-${produto.id}">-</button>
    <p id="quantidade-${produto.id}" class="ml-2">${idProdutosCarrinhoQuantidade[produto.id]}</p>
    <button id="incrementar-produto-${produto.id}" class="ml-2">+</button>
  </div>`;

  elementoArticle.innerHTML = cartaoProdutoCarrinho;
  containerProdutosCarrinho.appendChild(elementoArticle);

  document.getElementById(`incrementar-produto-${produto.id}`).addEventListener("click", () => incrementarQuantidadeDeProduto(produto.id));
  document.getElementById(`decrementar-produto-${produto.id}`).addEventListener("click", () => decrementarQuantidadeDeProduto(produto.id));
  document.getElementById(`remover-item-${produto.id}`).addEventListener("click", () => removerDoCarrinho(produto.id));
}

export function renderProdutosCarrinho() {
  const containerProdutosCarrinho = document.getElementById("produtos-carrinho");
  containerProdutosCarrinho.innerHTML = "";

  for (const idProduto in idProdutosCarrinhoQuantidade) {
    desenharProdutoNoCarrinho(idProduto)
  }
 
}

export function addItemCarrinho(idProduto) {
  if(idProduto in idProdutosCarrinhoQuantidade){
    incrementarQuantidadeDeProduto(idProduto);
    return;
  }
  idProdutosCarrinhoQuantidade[idProduto] = 1;
  salvarLocalStorage("carrinho", idProdutosCarrinhoQuantidade);
  atualizarPrecoCarrinho();
  desenharProdutoNoCarrinho(idProduto);
}

export function atualizarPrecoCarrinho() {
  const precoCarrinho = document.getElementById("preco-total");
  let precoTotalCarrinho = 0;
  for(const idProdutoCarrinho in idProdutosCarrinhoQuantidade) {
    precoTotalCarrinho += catalago.find(p => p.id === idProdutoCarrinho).preco * idProdutosCarrinhoQuantidade[idProdutoCarrinho];
  }
  precoCarrinho.innerText = `Total: $${precoTotalCarrinho}`;
}