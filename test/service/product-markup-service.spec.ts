import {describe} from "node:test";
import * as productMarkupService from "../../src/service/product-markup-service";
import * as cheerio from "cheerio";
import {CheerioAPI} from "cheerio";
import {getDescriptionFromDiv} from "../../src/service/product-markup-service";

const product_1 = {
  title: 'Optimum: 24GB Data - 1 Year',
  description: 'The optimum subscription providing you with enough service time to support the above-average with data and SMS services to allow access to your device.',
  price: 174,
  discount: 17.9
};

const product_2 = {
  title: 'Basic: 500MB Data - 12 Months',
  description: 'The basic starter subscription providing you with all you need to get your device up and running with inclusive Data and SMS services.',
  price: 5.99,
  discount: 0
};

describe('#markupData2Products', () => {
  it('should scrape data and return products', ()=>{

    const cheerioApiMock = jest.fn();
    const array = ['el', 'el2'];
    array['each'] = array.forEach;
    cheerioApiMock.mockReturnValue(array)

    jest.spyOn(cheerio, 'load').mockReturnValue(cheerioApiMock as unknown as CheerioAPI);

    const buildMockFromDivSpy = jest.spyOn(productMarkupService, 'buildProductFromDiv');
    buildMockFromDivSpy.mockReturnValueOnce(product_2);
    buildMockFromDivSpy.mockReturnValue(product_1);

    const products = productMarkupService.markupData2Products('a data');

    expect(products[0]).toEqual(product_2);
    expect(products[1]).toEqual(product_1);
  })
})

describe('#buildProductFromDiv', () => {
  it('should scrape div element and return a single product', ()=>{

    jest.spyOn(productMarkupService, 'getTitleFromDiv').mockReturnValue(product_1.title);
    jest.spyOn(productMarkupService, 'getDescriptionFromDiv').mockReturnValue(product_1.description);
    jest.spyOn(productMarkupService, 'getPriceFromDiv').mockReturnValue(product_1.price);
    jest.spyOn(productMarkupService, 'getDiscountFromDiv').mockReturnValue(product_1.discount);

    const product = productMarkupService.buildProductFromDiv(jest.fn(), 'div element');

    expect(product).toEqual(product_1);
  })
})

describe('#getDiscountFromDiv', () => {
  it('should scrape discount from div element', ()=>{

    const discountInText = 18.97;

    const cheerioApiMock = jest.fn().mockReturnValue({
      find: jest.fn().mockReturnValue({
        text: jest.fn().mockReturnValue(`Save £${discountInText} on the monthly price`)
      })
    });

    const discount = productMarkupService.getDiscountFromDiv(cheerioApiMock, 'div element');

    expect(discount).toEqual(discountInText);
  })

  it('should return 0 if it can not find a discount in div element', ()=>{

    const cheerioApiMock = jest.fn().mockReturnValue({
      find: jest.fn().mockReturnValue({
        text: jest.fn().mockReturnValue(``)
      })
    });

    const discount = productMarkupService.getDiscountFromDiv(cheerioApiMock, 'div element');

    expect(discount).toEqual(0);
  })
})

describe('#getPriceFromDiv', () => {
  it('should scrape price from div element', ()=>{

    const priceInText = 18.97;

    const cheerioApiMock = jest.fn().mockReturnValue({
      find: jest.fn().mockReturnValue({
        text: jest.fn().mockReturnValue(`£${priceInText}`)
      })
    });

    const price = productMarkupService.getPriceFromDiv(cheerioApiMock, 'div element');

    expect(price).toEqual(priceInText);
  })

  it('should return -1 if it can not find a price in div element', ()=>{

    const cheerioApiMock = jest.fn().mockReturnValue({
      find: jest.fn().mockReturnValue({
        text: jest.fn().mockReturnValue(``)
      })
    });

    const price = productMarkupService.getPriceFromDiv(cheerioApiMock, 'div element');

    expect(price).toEqual(-1);
  })
})

describe('#getDescriptionFromDiv', () => {
  it('should scrape description from div element', ()=>{

    const descriptionInText = 'a description';

    const cheerioApiMock = jest.fn().mockReturnValue({
      find: jest.fn().mockReturnValue({
        text: jest.fn().mockReturnValue(descriptionInText)
      })
    });

    const description = productMarkupService.getDescriptionFromDiv(cheerioApiMock, 'div element');

    expect(description).toEqual(descriptionInText);
  })
})

describe('#getTitleFromDiv', () => {
  it('should scrape title from div element', ()=>{

    const titleInText = 'a title';

    const cheerioApiMock = jest.fn().mockReturnValue({
      find: jest.fn().mockReturnValue({
        text: jest.fn().mockReturnValue(titleInText)
      })
    });

    const title = productMarkupService.getTitleFromDiv(cheerioApiMock, 'div element');

    expect(title).toEqual(titleInText);
  })
})
