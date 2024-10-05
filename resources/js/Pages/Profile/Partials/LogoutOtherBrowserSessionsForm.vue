<template>
    <v-card
        title="Browser Sessions"
        subtitle="Manage and log out your active sessions on other browsers and devices."
        text="If necessary, you may log out of all of your other browser sessions across all of your devices. Some of your recent sessions are listed below; however, this list may not be exhaustive. If you feel your account has been compromised, you should also update your password."
        class="mx-4"
    >
        <v-container v-if="sessions.length > 0" class="mt-5">
            <div v-for="(session, i) in sessions" :key="i" class="d-flex align-center mb-6">
                <div>
                    <v-icon v-if="session.agent.is_desktop" color="grey lighten-1" size="42">
                        mdi-monitor
                    </v-icon>

                    <v-icon v-else color="grey lighten-1" size="42">
                        mdi-cellphone
                    </v-icon>
                </div>

                <div class="ms-3">
                    <div class="text-sm text-grey text-subtitle-2">
                        {{ session.agent.platform || 'Unknown' }} - {{ session.agent.browser || 'Unknown' }}
                    </div>
                    <div class="text-xs text-grey text-subtitle-2">
                        {{ session.ip_address }},
                        <span v-if="session.is_current_device" class="text-green font-weight-bold">
                            This device
                        </span>
                        <span v-else>Last active {{ session.last_active }}</span>
                    </div>
                </div>
            </div>
        </v-container>
        <v-card-actions>
            <v-btn
                class="text-none text-subtitle-2 text-white font-weight-bold ma-2"
                color="primary"
                rounded="2"
                variant="flat"
                type="submit"
            >
                <div class="text-none font-weight-regular">
                    Log Out Other Browser Sessions
                </div>
                <v-dialog activator="parent" max-width="500" v-model="displayConfirmationModal" :persistent="form.processing">
                    <template v-slot:default="{ isActive }">
                        <v-card rounded="lg">
                            <v-card-title class="d-flex justify-space-between align-center">
                                <div class="text-h5 text-medium-emphasis ps-2">
                                    Log Out Other Browser Sessions
                                </div>

                                <v-btn
                                    icon="mdi-close"
                                    variant="text"
                                    :disabled="form.processing"
                                    @click="isActive.value = false"
                                ></v-btn>
                            </v-card-title>

                            <v-divider class="mb-4"></v-divider>

                            <v-card-text>
                                <div class="text-medium-emphasis mb-4">
                                    Please enter your password to confirm you would like to log out of your other
                                    browser sessions across all of your devices.
                                </div>
                            </v-card-text>
                            <v-form ref="form" @submit.prevent="submit">
                                <div class="px-4">
                                    <v-password-field
                                        v-model="form.password"
                                        label="Password"
                                        name="password"
                                        variant="outlined"
                                        color="primary"
                                        :rules="[rules.required('password')]"
                                        :error-messages="errorMessages?.password"
                                        @input="clearErrorMessage('password')"
                                    />
                                </div>

                                <v-card-actions class="my-2 d-flex justify-end">
                                    <v-btn
                                        class="text-none"
                                        rounded="1"
                                        text="Cancel"
                                        :disabled="form.processing"
                                        @click="isActive.value = false"
                                    />

                                    <v-btn
                                        class="text-none text-subtitle-2 text-white font-weight-medium"
                                        color="primary"
                                        rounded="1"
                                        variant="flat"
                                        type="submit"
                                        text="Log Out Other Browser Sessions"
                                        :loading="form.processing"
                                    />
                                </v-card-actions>
                            </v-form>
                        </v-card>
                    </template>
                </v-dialog>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import VPasswordField from "@/Components/VPasswordField.vue";
import validation from "@/Mixins/validation.js";
import errorMessages from "@/Mixins/errorMessages.js";

export default {
    components: {VPasswordField},
    props: {sessions: Array},
    mixins: [validation, errorMessages],
    data() {
        return {
            form: this.$inertia.form({
                password: '',
            }),
            displayConfirmationModal: false
        }
    },
    methods: {
        closeConfirmationModal() {
            this.$refs.form.reset();
            this.form.clearErrors();
            this.displayConfirmationModal = false;
        },
        async submit() {
            const {valid} = await this.$refs.form.validate()

            if (valid) {
                this.form.delete(route('other-browser-sessions.destroy'), {
                    preserveScroll: true,
                    onSuccess: () => this.closeConfirmationModal(),
                    onError: (errors) => this.setErrorMessages(errors),
                });
            }
        }
    }
}
</script>
