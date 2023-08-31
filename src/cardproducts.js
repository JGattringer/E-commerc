import { addItemCarrinho } from "./menuChart";
import { catalago } from "./ultilitys";

export function renderCatalogo() {
  for (const produtoCatalago of catalago) {
    const cartaoProduto = `<div id="card-produto-${produtoCatalago.id}" class="border-solid w-48 m-2 flex flex-col p-2 justify-between shadow-xl shadow-yellow-100 bg-yellow-50 rounded-lg group">
      <img 
      src="./assets/img/${produtoCatalago.imagem}" 
      alt="Produto do E-commerc 1"
      class="group-hover:scale-110 duration-300 my-3 rounded-lg"
      />
      <p class="text-sm" >${produtoCatalago.marca}</p>
      <p class="text-sm">${produtoCatalago.nome}</p>
      <p class="text-sm">$${produtoCatalago.preco}</p>
      <button id="adicionar-${produtoCatalago.id}" class="bg-yellow-600 hover:bg-slate-700 text-slate-200 ">
      <i class="fa-solid fa-cart-plus">
      </i></button>  
      </div>`;

    document.getElementById("container-produto").innerHTML += cartaoProduto;
  }

  for (const produtoCatalago of catalago) {
    document.getElementById(`adicionar-${produtoCatalago.id}`).addEventListener("click", () => addItemCarrinho(produtoCatalago.id));
  }
}