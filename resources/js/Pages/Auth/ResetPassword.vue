<template>
    <Head title="Reset Password" />

    <v-card :disabled="form.processing" width="450" class="ma-auto pa-10 rounded-lg border-sm elevation-0">
        <template #loader>
            <v-progress-linear
                v-if="form?.processing"
                height="3"
                color="primary"
                indeterminate
            />
        </template>
        <v-form ref="form" :disabled="form.processing" @submit.prevent="reset">
            <v-card-text class="pa-0">
                <v-img
                    :width="75"
                    aspect-ratio="16/9"
                    cover
                    src="@/admin/Assets/logo.jpg"
                    class="ma-auto"
                />
                <div class="mt-0 mb-8">
                    <p class="text-center font-weight-regular text-h5">Reset password</p>
                </div>

                <div class="mt-2">
                    <v-text-field
                        v-model.trim="form.email"
                        label="Email"
                        name="email"
                        variant="outlined"
                        color="primary"
                        :error-messages="errorMessages?.email"
                        :disabled="true"
                    />
                    <v-password-field
                        v-model="form.password"
                        label="Password"
                        name="password"
                        variant="outlined"
                        color="primary"
                        :rules="[rules.required('password'), rules.password()]"
                        :error-messages="errorMessages?.password"
                        @input="clearErrorMessage('email')"
                        class="mt-3"
                    />
                    <v-password-field
                        v-model="form.password_confirmation"
                        label="Confirm password"
                        name="password_confirmation"
                        variant="outlined"
                        color="primary"
                        :rules="[rules.required('password confirmation'), rules.match(form.password,form.password_confirmation,'Passwords')]"
                        :error-messages="errorMessages?.password_confirmation"
                        @input="clearErrorMessage('email')"
                        class="mt-3"
                    />
                </div>
            </v-card-text>

            <v-card-actions class="pa-0 justify-space-between">
                <v-btn
                    class="text-none text-subtitle-2 text-white font-weight-bold"
                    color="primary"
                    rounded="2"
                    variant="text"
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
                    Reset
                </v-btn>
            </v-card-actions>
        </v-form>
    </v-card>
</template>

<script>
import validation from "@/Mixins/validation";
import VPasswordField from "@/Components/VPasswordField.vue";
import errorMessages from "@/Mixins/errorMessages";
import AuthLayout from "@/Components/Layouts/AuthLayout.vue";
import {Head} from '@inertiajs/vue3'

export default {
    name: "ResetPassword",
    layout: AuthLayout,
    components: {VPasswordField, Head},
    mixins: [validation, errorMessages],
    props:{
        email: String,
        token: String,
    },
    data() {
        return {
            appName: import.meta.env.VITE_APP_NAME,
            form: this.$inertia.form({
                token: this.token,
                email: this.email,
                password: '',
                password_confirmation: '',
            }),
        }
    },
    methods: {
        async reset() {
            const {valid} = await this.$refs.form.validate()

            if (valid) {
                this.form.post(route('password.update'), {
                    onSuccess: () => this.clearErrorMessages(),
                    onError: (errors) => {
                        this.setErrorMessages(errors)
                    },
                })
            }
        }
    }
}
</script>
