<template>
    <v-sheet
        class="ma-2 pa-2 w-100"
    >
        <v-form ref="profileForm" @submit.prevent="updateProfileInformation"
                class="d-flex flex-column justify-space-between h-100">
            <v-card
                title="Profile Information"
                subtitle="Update your account's profile information and email address."
                class="h-100 d-flex flex-column"
            >
                <div class="pa-4 mb-auto">
                    <v-text-field
                        v-model.trim="profileForm.name"
                        label="Name"
                        name="name"
                        variant="outlined"
                        color="primary"
                        :rules="[rules.required('name'), rules.maxLength(200)]"
                        :error-messages="errorMessages?.name"
                        @input="clearErrorMessage('name')"
                    />
                    <v-text-field
                        v-model.trim="profileForm.email"
                        label="Email"
                        name="email"
                        variant="outlined"
                        color="primary"
                        class="mt-3"
                        :rules="[rules.required('email'), rules.email()]"
                        :error-messages="errorMessages?.email"
                        @input="clearErrorMessage('email')"
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
                            :loading="profileForm.processing"
                        >
                            Save
                        </v-btn>
                    </v-col>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-sheet>
</template>

<script>
import DashboardLayout from "@/Components/Layouts/DashboardLayout.vue";
import {Head} from "@inertiajs/vue3";
import validation from "@/Mixins/validation";
import errorMessages from "@/Mixins/errorMessages.js";
import {useToast} from "vue-toastification";

export default {
    components: {Head},
    layout: DashboardLayout,
    mixins: [validation, errorMessages],
    data() {
        return {
            profileForm: this.$inertia.form({
                name: this.$page.props.auth.user.name,
                email: this.$page.props.auth.user.email,
            }),
        }
    },
    methods: {
        async updateProfileInformation() {
            const {valid} = await this.$refs.profileForm.validate()

            if (valid) {
                this.profileForm.put(route('user-profile-information.update'), {
                    errorBag: 'updateProfileInformation',
                    preserveScroll: true,
                    onError: (errors) => this.setErrorMessages(errors),
                    onSuccess: () => {
                        this.clearErrorMessages();
                        useToast().success('Profile information updated successfully', {
                            timeout: 2000
                        })
                    }
                });
            }
        }
    }
}
</script>
