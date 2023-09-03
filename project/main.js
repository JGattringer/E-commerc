import { renderCatalogo } from "./src/cardproducts";
import { inicializarFiltros } from "./src/filtrosCatalogo";
import { inicializarCarrinho,atualizarPrecoCarrinho, renderProdutosCarrinho } from "./src/menuChart";

inicializarCarrinho();
renderCatalogo();
renderProdutosCarrinho();
atualizarPrecoCarrinho();
inicializarFiltros();
