import axios from 'axios';

export const getProductsPageData = async () => {
    const { data } = await axios.get('https://wltest.dns-systems.net');
    return data;
}
