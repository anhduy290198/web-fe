import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import router from './routes';

const app = createApp(App);
app.use(router);
app.use(Antd);

router.isReady().then(() => {
    app.mount('#app');
});
