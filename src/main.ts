import Vue from 'vue';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './registerServiceWorker';

import MemberList from './models/MemberList';

Vue.use(BootstrapVue);
Vue.config.productionTip = false;

const members: MemberList = MemberList.getInstance();

new Vue({
  render: (h) => h(App),
}).$mount('#app');
