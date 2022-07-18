import { createStore } from 'vuex';

import snp500 from './modules/snp500';
import apeWisdom from './modules/apeWisdom';
import home from './modules/home';
import treeMap from './modules/treeMap';

export default createStore({
  modules: { snp500, apeWisdom, home, treeMap }
});
