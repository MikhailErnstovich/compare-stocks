import instance from '@api/core/apeWisdom.js';

export const apeWisdom = {
  async getApeStocks(page) {
    try {
      const data = await instance({ url: `/all-stocks/page/${page}` });
      return data;
    }
    catch (err) {
      throw err;
    }
  },
  async getApePages() {
    try {
      const data = await instance({ url: `/all-stocks/page/0` });
      return data.pages;
    }
    catch (err) {
      throw err;
    }
  },
}