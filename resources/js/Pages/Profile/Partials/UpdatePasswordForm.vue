<template>
    <v-sheet
        class="ma-2 pa-2 w-100"
    >
        <v-card
            title="Update Password"
            subtitle="Ensure your account is using a long, random password to stay secure."
        >
            <v-form ref="passwordForm" @submit.prevent="updatePassword">
                <div class="pa-4">
                    <v-password-field
                        v-model="passwordForm.current_password"
                        label="Current Password"
                        name="current_password"
                        variant="outlined"
                        color="primary"
                        :rules="[rules.required('current password')]"
                        :error-messages="errorMessages?.current_password"
                        @input="clearErrorMessage('current_password')"
                    />
                    <v-password-field
                        v-model="passwordForm.password"
                        label="New Password"
                        name="password"
                        variant="outlined"
                        color="primary"
                        :rules="[rules.required('password'), rules.password()]"
                        :error-messages="errorMessages?.password"
                        @input="clearErrorMessage('password')"
                        class="mt-3"
                    />
                    <v-password-field
                        v-model="passwordForm.password_confirmation"
                        label="Confirm Password"
                        name="password_confirmation"
                        variant="outlined"
                        color="primary"
                        :rules="[rules.required('password confirmation'), rules.match(passwordForm.password,passwordForm.password_confirmation,'Passwords')]"
                        :error-messages="errorMessages?.password_confirmation"
                        @input="clearErrorMessage('password_confirmation')"
                        class="mt-3"
                    />
                </div>
                <v-card-actions>
                    <v-col class="text-right">
                        <v-btn
                            class="text-none text-subtitle-2 text-white font-weight-bold right-0"
                            color="primary"
                            rounded="2"
                            variant="flat"
                            type="submit"
                            :loading="passwordForm.processing"
                        >
                            Save
                        </v-btn>
                    </v-col>
                </v-card-actions>
            </v-form>
        </v-card>
    </v-sheet>
</template>
<script>
import validation from "@/Mixins/validation";
import errorMessages from "@/Mixins/errorMessages.js";
import {useToast} from "vue-toastification";
import VPasswordField from "@/Components/VPasswordField.vue";
export default {
    components: {VPasswordField},
    mixins: [validation, errorMessages],
    data() {
        return {
            passwordForm: this.$inertia.form({
                current_password: '',
                password: '',
                password_confirmation: '',
            }),
        }
    },
    methods: {
        async updatePassword() {
            const {valid} = await this.$refs.passwordForm.validate()

            if (valid) {
                this.passwordForm.put(route('user-password.update'), {
                    errorBag: 'updatePassword',
                    preserveScroll: true,
                    onError: (errors) => this.setErrorMessages(errors),
                    onSuccess: () => {
                        this.passwordForm.reset();
                        this.$refs.passwordForm.reset();
                        this.clearErrorMessages();
                        useToast().success('Password updated successfully', {
                            timeout: 2000
                        });
                    }
                });
            }
        }
    }
}
</script>
