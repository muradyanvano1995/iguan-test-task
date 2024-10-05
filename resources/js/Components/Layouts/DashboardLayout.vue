<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" :temporary="!mdAndUp">
            <v-list-item>
                <v-img
                    :width="150"
                    aspect-ratio="16/9"
                    :src="LogoLarge"
                    class="ma-4 mx-auto"
                ></v-img>
            </v-list-item>

            <v-divider class="ml-8 mr-8 mb-5 border-opacity-75" color="primary"/>

            <v-list density="compact" :nav="true">
                <v-list-item
                    v-for="item in items"
                    :key="item.id"
                    :prepend-icon="item.icon"
                    :title="item.title"
                    :value="item.id"
                    :to="route(item.route)"
                    :active="route().current() === item.route"
                    base-color="primary"
                    color="primary"
                />
            </v-list>
        </v-navigation-drawer>

        <v-app-bar :elevation="1">
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title></v-toolbar-title>
            <v-btn
                class="text-none text-subtitle-2 text-white font-weight-bold"
                color="primary"
                rounded="2"
                prepend-icon="mdi-logout large"
                type="button"
                :loading="form.processing"
                @click="logout"
            >
                Logout
            </v-btn>
        </v-app-bar>

        <v-main>
            <div class="pa-8">
                <slot/>
            </div>
        </v-main>
    </v-app>
</template>

<script>
import {useDisplay} from "vuetify";
import LogoLarge from "@/Assets/LogoLarge.svg"

export default {
    setup() {
        const {mdAndUp} = useDisplay()

        return {mdAndUp}
    },
    data() {
        return {
            drawer: null,
            LogoLarge,
            items: [
                {
                    id: 'dashboard',
                    title: "Dashboard",
                    route: 'dashboard',
                    icon: 'mdi-view-dashboard'
                },
                {
                    id: 'settings',
                    title: "Settings",
                    route: 'profile.show',
                    icon: 'mdi-cog large'
                },
                {
                    id: 'users',
                    title: "Users",
                    route: 'users.index',
                    icon: 'mdi-account-group'
                },
            ],
            form: this.$inertia.form({}),
        }
    },
    methods: {
        logout() {
            this.form.post(route('logout'))
        }
    }
}
</script>
