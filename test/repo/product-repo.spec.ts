import {describe} from "node:test";
import { getProductsPageData } from "../../src/repo/product-repo";
import axios from "axios";

describe('#getProductsPageData', () => {
  it('should return product markup data', async ()=>{
    const response = {
      data: 'some test markup data'
    };

    const getSpy = jest.spyOn(axios, 'get');
    getSpy.mockResolvedValue(response);

    const data = await getProductsPageData();

    expect(getSpy).toBeCalledWith('https://wltest.dns-systems.net');
    expect(data).toEqual(response.data);
  })
})
