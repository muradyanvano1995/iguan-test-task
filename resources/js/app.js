import './bootstrap';
import '../css/app.css';

import {createApp, h} from 'vue';
import {createInertiaApp} from '@inertiajs/vue3';
import {resolvePageComponent} from 'laravel-vite-plugin/inertia-helpers';
import {ZiggyVue} from '../../vendor/tightenco/ziggy';
import vuetify from "@/Plugins/vuetify.js";
import vuetifyInertiaRouter from "@/Plugins/vuetifyInertiaRouter.js";
import "vue-toastification/dist/index.css";
import Toast from "vue-toastification";


const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({el, App, props, plugin}) {
        return createApp({render: () => h(App, props)})
            .use(plugin)
            .use(vuetify)
            .use(vuetifyInertiaRouter)
            .use(Toast)
            .use(ZiggyVue)
            .mount(el);
    },
    progress: {
        color: '#6EBD44',
    },
});
