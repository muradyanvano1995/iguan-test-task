import {computed} from 'vue';
import {router} from '@inertiajs/vue3';
import {useBrowserLocation} from '@vueuse/core';

export default {
    install(app, options) {
        app.component('RouterLink', {
            useLink(props) {
                const browserLocation = useBrowserLocation();
                const currentUrl = computed(() => `${browserLocation.value.origin}${browserLocation.value.pathname}`);

                return {
                    route: computed(() => ({href: props.to.value})),
                    isExactActive: computed(() => currentUrl.value === props.to.value),
                    isActive: computed(() => currentUrl.value.startsWith(props.to.value)),
                    navigate(e) {
                        if (e.shiftKey || e.metaKey || e.ctrlKey) return;

                        e.preventDefault();

                        router.visit(props.to.value, {
                            method: e.currentTarget.getAttribute('method') || 'get'
                        });
                    }
                }
            },
        });
    },
};
