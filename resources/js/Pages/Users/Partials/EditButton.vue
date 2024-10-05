<template>
    <v-btn
        class="text-none text-subtitle-2 text-white font-weight-bold ma-2"
        color="primary"
        rounded="2"
        variant="flat"
        type="button"
        prepend-icon="mdi-pencil-ruler-outline"
    >
        <div class="text-none font-weight-regular">
            Edit
        </div>
        <v-dialog activator="parent" max-width="800" v-model="displayModal" :persistent="form.processing" @update:model-value="reset">
            <template v-slot:default="{ isActive }">
                <v-card rounded="lg">
                    <v-card-title class="d-flex justify-space-between align-center">
                        <div class="text-h5 text-medium-emphasis ps-2">
                            Edit
                        </div>

                        <v-btn
                            icon="mdi-close"
                            variant="text"
                            :disabled="form.processing"
                            @click="isActive.value = false"
                        ></v-btn>
                    </v-card-title>

                    <v-divider class="mb-4"></v-divider>

                    <v-form ref="form" class="px-4" :disabled="form.processing" @submit.prevent="submit">
                        <div>
                            <div class="d-flex flex-column flex-md-row mb-6 w-100">
                                <div class="pa-4 mb-auto w-100">
                                    <v-text-field
                                        v-model.trim="form.name"
                                        label="Name"
                                        name="name"
                                        variant="outlined"
                                        color="primary"
                                        :rules="[rules.required('name'), rules.maxLength(200)]"
                                        :error-messages="errorMessages?.name"
                                        placeholder="John Doe"
                                        @input="clearErrorMessage('name')"
                                    />
                                    <v-text-field
                                        v-model.trim="form.email"
                                        label="Email"
                                        name="email"
                                        variant="outlined"
                                        color="primary"
                                        class="mt-3"
                                        :rules="[rules.required('email'), rules.email()]"
                                        :error-messages="errorMessages?.email"
                                        placeholder="johndoe@test.test"
                                        @input="clearErrorMessage('email')"
                                    />
                                </div>
                                <div class="pa-4 mb-auto w-100">
                                    <v-text-field
                                        v-model.trim="form.address"
                                        label="Address"
                                        name="address"
                                        variant="outlined"
                                        color="primary"
                                        :rules="[rules.required('address'), rules.maxLength(200)]"
                                        :error-messages="errorMessages?.address"
                                        placeholder="123 Main St Anytown, USA"
                                        @input="clearErrorMessage('address')"
                                    />
                                    <v-text-field
                                        v-model.trim="form.phone_number"
                                        label="Phone number"
                                        name="phone_number"
                                        variant="outlined"
                                        color="primary"
                                        class="mt-3"
                                        :rules="[rules.required('phone number'), rules.maxLength(200), rules.checkRegex('^\\+?[0-9]{10,15}$')]"
                                        :error-messages="errorMessages?.phone_number"
                                        placeholder="+37494332299"
                                        @input="clearErrorMessage('phone_number')"
                                    />
                                </div>
                            </div>
                        </div>

                        <v-card-actions class="ma-2 d-flex justify-end">
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
                                text="Update"
                                :loading="form.processing"
                            />
                        </v-card-actions>
                    </v-form>
                </v-card>
            </template>
        </v-dialog>
    </v-btn>
</template>

<script>
import validation from "@/Mixins/validation.js";
import errorMessages from "@/Mixins/errorMessages.js";

export default {
    mixins: [validation, errorMessages],
    props: {
        user: Object
    },
    data() {
        return {
            form: this.$inertia.form({
                name: this.user.name,
                email: this.user.email,
                address: this.user.details?.address ?? '',
                phone_number: this.user.details?.phone_number ?? '',
            }),
            displayModal: false
        }
    },
    methods: {
        reset(){
            this.form.clearErrors();
            this.form.defaults({
                name: this.user.name,
                email: this.user.email,
                address: this.user.details?.address ?? '',
                phone_number: this.user.details?.phone_number ?? '',
            });
            this.form.reset();
            this.clearErrorMessages()
        },
        closeModal() {
            this.displayModal = false;
            this.reset();
        },
        async submit() {
            const {valid} = await this.$refs.form.validate()

            if (valid) {
                this.form.put(route('users.update',[this.user.id]), {
                    preserveScroll: true,
                    onSuccess: () => this.closeModal(),
                    onError: (errors) => this.setErrorMessages(errors),
                });
            }
        }
    }
}
</script>
