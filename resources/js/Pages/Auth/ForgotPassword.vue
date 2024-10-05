<template>
    <Head title="Forgot Password"/>

    <v-card :disabled="form.processing" width="450" class="ma-auto pa-10 rounded-lg border-sm elevation-0">
        <template #loader>
            <v-progress-linear
                v-if="form?.processing"
                height="3"
                color="primary"
                indeterminate
            />
        </template>
        <v-form ref="form" :disabled="form.processing" @submit.prevent="requestPassword">
            <v-card-text class="pa-0">
                <v-img
                    :width="75"
                    aspect-ratio="16/9"
                    cover
                    :src="Logo"
                    class="ma-auto"
                />
                <p class="text-center mt-6 font-weight-regular text-h5">Forgot password</p>
                <p class="text-center mt-1 text-caption">
                    Forgot your password? No problem. Just let us know your email address and we will email you a
                    password reset link that will allow you to choose a new one.
                </p>
                <div class="mt-8">
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
                </div>
            </v-card-text>
            <v-card-actions class="pa-0 justify-space-between">
                <v-btn
                    class="text-none text-subtitle-2 font-weight-bold"
                    color="primary"
                    rounded="2"
                    variant="text"
                    type="submit"
                    :to="route('login')"
                >
                    Login instead
                </v-btn>
                <v-btn
                    class="text-none text-subtitle-2 text-white font-weight-bold"
                    color="primary"
                    rounded="2"
                    variant="flat"
                    type="submit"
                    :loading="form.processing"
                >
                    Submit
                </v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script>
import validation from "@/Mixins/validation";
import errorMessages from "@/Mixins/errorMessages";
import AuthLayout from "@/Components/Layouts/AuthLayout.vue";
import {Head} from '@inertiajs/vue3'
import Logo from "@/Assets/Logo.svg"
import {useToast} from "vue-toastification";

export default {
    name: "RequestPassword",
    layout: AuthLayout,
    components: {Head},
    mixins: [validation, errorMessages],
    props: {
        status: String,
    },
    data() {
        return {
            form: this.$inertia.form({
                email: '',
            }),
            Logo
        }
    },
    methods: {
        async requestPassword() {
            const {valid} = await this.$refs.form.validate()

            if (valid) {
                this.form.clearErrors();
                this.form.post(route('password.request'), {
                    onSuccess: () => this.clearErrorMessages(),
                    onError: (errors) => {
                        this.setErrorMessages(errors)
                    },
                })
            }
        }
    },
    watch: {
        status: function (newVal) {
            if (newVal) {
                useToast().info(newVal, {
                    timeout: 2000
                });
            }
        }
    }
}
</script>
