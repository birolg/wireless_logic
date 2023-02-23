import {describe} from "node:test";
import { sortProductsByPriceDesc, getProducts } from "../../src/service/product-service";
import {Product} from "../../src/types/product";
import * as productRepo from "../../src/repo/product-repo";
import * as productMarkupService from "../../src/service/product-markup-service";

const product_1 = {
  title: 'Optimum: 24GB Data - 1 Year',
  description: 'The optimum subscription providing you with enough service time to support the above-average with data and SMS services to allow access to your device.',
  price: 174,
  discount: 17.9
};

const product_2 = {
  title: 'Basic: 6GB Data - 1 Year',
  description: 'The basic starter subscription providing you with all you need to get you up and running with Data and SMS services to allow access to your device.',
  price: 66,
  discount: 5.86
};

const product_3 = {
  title: 'Basic: 500MB Data - 12 Months',
  description: 'The basic starter subscription providing you with all you need to get your device up and running with inclusive Data and SMS services.',
  price: 5.99,
  discount: 0
};

describe('#sortProductsByPriceDesc', () => {
  it('should sort products', ()=>{
    const products: Product[] = [product_3, product_1, product_2];

    sortProductsByPriceDesc(products);

    expect(products[0]).toEqual(product_1);
    expect(products[1]).toEqual(product_2);
    expect(products[2]).toEqual(product_3);
  })
})

describe('#getProducts', () => {

  it('should return products sorted', async ()=>{

    jest.spyOn(productRepo, 'getProductsPageData').mockResolvedValue('markup data');
    jest.spyOn(productMarkupService, 'markupData2Products').mockReturnValue([product_2, product_3, product_1]);

    const products = await getProducts();

    expect(products[0]).toEqual(product_1);
    expect(products[1]).toEqual(product_2);
    expect(products[2]).toEqual(product_3);
  })
})
