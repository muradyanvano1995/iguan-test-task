<template>
    <Head title="Dashboard"/>
    <v-container class="pa-md-12">
        <div class="d-flex flex-column justify-space-between w-100">
            <h1 class="w-100 text-center font-weight-bold text-h2">
                Welcome to
            </h1>
            <h1 class="w-100 mt-4 text-center font-weight-bold text-h4 text-primary">
                {{appName}}
            </h1>
        </div>
    </v-container>
</template>
<script>
import DashboardLayout from "@/Components/Layouts/DashboardLayout.vue";
import {Head} from "@inertiajs/vue3";

export default {
    components: {Head},
    layout: DashboardLayout,
    data() {
        return {
            appName: import.meta.env.VITE_APP_NAME || 'Laravel'
        }
    }
}
</script>
