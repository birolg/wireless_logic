import {Product} from "../types/product";
import {getProductsPageData} from "../repo/product-repo";
import {markupData2Products} from "./product-markup-service";

export const sortProductsByPriceDesc = (products: Product[]) => {
    products.sort((a, b) => b.price > a.price ? 1 : -1);
}

export const getProducts = async (): Promise<Product[]> => {
    const data = await getProductsPageData();

    const products = markupData2Products(data);

    exports.sortProductsByPriceDesc(products);

    return products;
}
