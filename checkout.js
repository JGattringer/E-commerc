import { desenharProdutoCarrinhoFinal, lerLocalStorage } from "./src/ultilitys";

function desenharProdutosCheckout() {
    const idProdutosCarrinhoQuantidade = lerLocalStorage("carrinho");
    for( const idProduto in idProdutosCarrinhoQuantidade) {
        desenharProdutoCarrinhoFinal(idProduto,"container-produto-checkout", idProdutosCarrinhoQuantidade[idProduto]);
    }
}

desenharProdutosCheckout();