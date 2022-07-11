import instance from '@api/core/snp500.js';

export const snp500 = {
  async getSnp500() {
    try {
      const data = await instance({ url: '' });
      return data;
    }
    catch (err) {
      throw err;
    }
  },
}