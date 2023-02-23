import {Product} from "../types/product";
import * as cheerio from "cheerio";

export const getTitleFromDiv = ($, divElement): string => {
    return $(divElement).find('.header > h3').text();
}

export const getDescriptionFromDiv = ($, divElement): string => {
    return $(divElement).find('.package-name').text();
}

export const getPriceFromDiv = ($, divElement): number => {
    const priceText = $(divElement).find('.price-big').text();
    const priceMatches = priceText.match(/£(\S+)/);
    return priceMatches?.length > 0 ? Number(priceMatches[1]) : -1;
}

export const getDiscountFromDiv = ($, divElement): number => {
    const dicsountText = $(divElement).find('.package-price > p').text();
    const discountMatches = dicsountText.match(/Save £(\S+) on the monthly price/);
    return discountMatches?.length > 0 ? Number(discountMatches[1]) : 0;
}

export const buildProductFromDiv = ($, divElement): Product => {
    const title = exports.getTitleFromDiv($, divElement);
    const description = exports.getDescriptionFromDiv($, divElement);
    const price = exports.getPriceFromDiv($, divElement);
    const discount = exports.getDiscountFromDiv($, divElement);
    return {
        title,
        description,
        price,
        discount
    };
}

export const markupData2Products = (data): Product[] => {
    const $ = cheerio.load(data);

    const divs = $('.package');

    const products: Product[] = [];

    divs.each((i, el) => {
        const product = exports.buildProductFromDiv($, el);
        products.push(product);
    })

    return products;
}
