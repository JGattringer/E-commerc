import { desenharProdutoCarrinhoFinal, lerLocalStorage, apagarDoLocalStorage, salvarLocalStorage } from "./src/ultilitys";

function desenharProdutosCheckout() {
    const idProdutosCarrinhoQuantidade = lerLocalStorage("carrinho") ?? {};
    for( const idProduto in idProdutosCarrinhoQuantidade) {
        desenharProdutoCarrinhoFinal(idProduto,"container-produto-checkout", idProdutosCarrinhoQuantidade[idProduto]);
    }
}

function finalizarCompra(evento) {
    evento.preventDefault();
    const idProdutosCarrinhoQuantidade = lerLocalStorage("carrinho") ?? {};
    if(Object.keys(idProdutosCarrinhoQuantidade).length === 0) {
        return;
    }
    const dataAtual = new Date();
    const pedidoFeito = {
        dataPedido: dataAtual,
        pedido: idProdutosCarrinhoQuantidade
    }

    const historicoDePedidos = lerLocalStorage("historico0") ?? [];
    const historicoDePedidosAtualizado = [pedidoFeito, ...historicoDePedidos];
    
    salvarLocalStorage("historico", historicoDePedidosAtualizado);
    apagarDoLocalStorage("carrinho");
    
    window.location.href = "./pedidos.html";
}

desenharProdutosCheckout();
document.addEventListener("submit", (evento) => finalizarCompra(evento));