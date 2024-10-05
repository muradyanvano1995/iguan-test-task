<template>
    <Head title="Log in"/>

    <v-card :disabled="form.processing" width="450" class="ma-auto pa-10 rounded-lg border-sm elevation-0">
        <template #loader>
            <v-progress-linear
                v-if="form?.processing"
                height="3"
                color="primary"
                indeterminate
            />
        </template>
        <v-form ref="form" :disabled="form.processing" @submit.prevent="login">
            <v-card-text class="pa-0">
                <v-img
                    :width="75"
                    aspect-ratio="16/9"
                    cover
                    :src="Logo"
                    class="ma-auto"
                />
                <div class="mt-4 mb-8">
                    <p class="text-center font-weight-regular text-h5">Sign in</p>
                    <p class="text-center mt-1 text-caption">to continue to {{ appName }}</p>
                </div>

                <div class="mt-2">
                    <v-text-field
                        v-model.trim="form.email"
                        label="Email"
                        name="email"
                        variant="outlined"
                        color="primary"
                        :rules="[rules.required('email'), rules.email()]"
                        :error-messages="errorMessages?.email"
                        @input="clearErrorMessage('email')"
                    />
                    <v-password-field
                        v-model="form.password"
                        label="Password"
                        name="password"
                        variant="outlined"
                        color="primary"
                        :rules="[rules.required('password')]"
                        :error-messages="errorMessages?.password"
                        @input="clearErrorMessage('email')"
                        class="mt-3"
                    />
                </div>
                <v-checkbox
                    v-model="form.remember"
                    color="primary"
                    label="Remember me"
                />
            </v-card-text>

            <v-card-actions class="pa-0 justify-space-between">
                <v-btn
                    class="text-none text-subtitle-2 text-white font-weight-bold w-100"
                    color="primary"
                    rounded="2"
                    variant="flat"
                    type="submit"
                    :loading="form.processing"
                >
                    Login
                </v-btn>
            </v-card-actions>
            <div v-if="canResetPassword" class="mt-4">
                <div class="text-subtitle-2">
                    <a class="float-left mr-2">
                        Don’t remember your password?
                    </a>
                    <v-on-hover v-slot:default="{isHovering}">
                        <Link
                            class="text-decoration-none font-weight-bold"
                            :class="[isHovering? 'text-primaryHover' : 'text-primary']"
                            :href="route('password.request')"
                        >
                            Reset it here
                        </Link>
                    </v-on-hover>
                </div>
            </div>
        </v-form>
    </v-card>
</template>

<script>
import validation from "@/Mixins/validation";
import VPasswordField from "@/Components/VPasswordField.vue";
import errorMessages from "@/Mixins/errorMessages.js";
import AuthLayout from "@/Components/Layouts/AuthLayout.vue";
import {Link, Head} from '@inertiajs/vue3'
import VOnHover from "@/Components/VOnHover.vue";
import Logo from "@/Assets/Logo.svg"
import {useToast} from "vue-toastification";

export default {
    name: "Login",
    layout: AuthLayout,
    components: {VOnHover, VPasswordField, Link, Head},
    mixins: [validation, errorMessages],
    props: {
        canResetPassword: Boolean,
        status: String,
    },
    data() {
        return {
            appName: import.meta.env.VITE_APP_NAME,
            form: this.$inertia.form({
                email: '',
                password: '',
                remember: false,
            }),
            Logo,
        }
    },
    methods: {
        async login() {
            const {valid} = await this.$refs.form.validate()

            if (valid) {
                this.form.transform(data => ({
                    ...data,
                    remember: this.form.remember ? 'on' : '',
                })).post(route('login'), {
                    onError: (errors) => this.setErrorMessages(errors),
                });
            }
        }
    },
    watch: {
        status: function (newVal) {
            if (newVal) {
                useToast().success(newVal, {
                    timeout: 2000
                });
            }
        }
    },
    mounted() {
        if (this.status){
            useToast().success(this.status, {
                timeout: 2000
            });
        }
    }
}
</script>
