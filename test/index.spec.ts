import {describe} from "node:test";
import * as productService from "../src/service/product-service";
import {Product} from "../src/types/product";

const products: Product[] = [
  {
    title: 'Optimum: 24GB Data - 1 Year',
    description: 'The optimum subscription providing you with enough service time to support the above-average with data and SMS services to allow access to your device.',
    price: 174,
    discount: 17.9
  },
  {
    title: 'Standard: 12GB Data - 1 Year',
    description: 'The standard subscription providing you with enough service time to support the average user with Data and SMS services to allow access to your device.',
    price: 108,
    discount: 11.9
  },
  {
    title: 'Basic: 6GB Data - 1 Year',
    description: 'The basic starter subscription providing you with all you need to get you up and running with Data and SMS services to allow access to your device.',
    price: 66,
    discount: 5.86
  },
  {
    title: 'Optimum: 2 GB Data - 12 Months',
    description: 'The optimum subscription providing you with enough service time to support the above-average user to enable your device to be up and running with inclusive Data and SMS services',
    price: 15.99,
    discount: 0
  },
  {
    title: 'Standard: 1GB Data - 12 Months',
    description: 'The standard subscription providing you with enough service time to support the average user to enable your device to be up and running with inclusive Data and SMS services.',
    price: 9.99,
    discount: 0
  },
  {
    title: 'Basic: 500MB Data - 12 Months',
    description: 'The basic starter subscription providing you with all you need to get your device up and running with inclusive Data and SMS services.',
    price: 5.99,
    discount: 0
  }
]

describe('main app', () => {
  it('should print products to console', async ()=>{
    jest.spyOn(productService, 'getProducts').mockResolvedValue(products);
    const logSpy = jest.spyOn(console, "log").mockImplementation();

    require('../src/index');

    await new Promise(process.nextTick);

    expect(logSpy).toBeCalledWith(products)
  })
})
