<template>
    <v-app>
        <v-main>
            <v-container class="h-screen fill-height">
                <v-row class="justify-center">
                    <v-col cols="12">
                        <slot/>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>

export default {
    name: "AuthLayout",
}
</script>
