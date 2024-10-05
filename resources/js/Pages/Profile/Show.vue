<template>
    <Head title="Settings"/>
    <div>
        <div class="d-flex flex-column flex-md-row justify-space-between mb-6">
            <UpdateProfileInformationForm/>
            <UpdatePasswordForm/>
        </div>
        <div class="d-flex flex-column mb-6">
            <LogoutOtherBrowserSessionsForm :sessions="sessions" />
        </div>
    </div>
</template>

<script>
import DashboardLayout from "@/Components/Layouts/DashboardLayout.vue";
import {Head} from "@inertiajs/vue3";
import UpdatePasswordForm from "@/Pages/Profile/Partials/UpdatePasswordForm.vue";
import UpdateProfileInformationForm from "@/Pages/Profile/Partials/UpdateProfileInformationForm.vue";
import LogoutOtherBrowserSessionsForm from "@/Pages/Profile/Partials/LogoutOtherBrowserSessionsForm.vue";

export default {
    components: {LogoutOtherBrowserSessionsForm, UpdateProfileInformationForm, UpdatePasswordForm, Head},
    layout: DashboardLayout,
    props: {sessions: Array}
}
</script>
