import { createStore } from 'vuex';

import snp500 from './modules/snp500';
import apeWisdom from './modules/apeWisdom';
import home from './modules/home';
import treeMap from './modules/treeMap';
import stock from './modules/stock';

export default createStore({
  modules: { snp500, apeWisdom, home, treeMap, stock }
});
