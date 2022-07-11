import { createStore } from 'vuex';

import snp500 from './modules/snp500';
import apeWisdom from './modules/apeWisdom';

export default createStore({
  modules: { snp500, apeWisdom }
});
