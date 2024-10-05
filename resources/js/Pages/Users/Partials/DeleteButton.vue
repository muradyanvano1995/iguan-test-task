<template>
    <v-btn
        class="text-none text-subtitle-2 text-white font-weight-bold ma-2"
        color="red-darken-3"
        rounded="2"
        variant="flat"
        type="button"
        prepend-icon="mdi-trash-can-outline"
    >
        <div class="text-none font-weight-regular">
            Delete
        </div>
        <v-dialog activator="parent" max-width="500" v-model="displayModal" :persistent="form.processing">
            <template v-slot:default="{ isActive }">
                <v-card rounded="lg">
                    <v-card-title class="d-flex justify-space-between align-center">
                        <div class="text-h5 text-medium-emphasis ps-2">
                            Delete
                        </div>

                        <v-btn
                            icon="mdi-close"
                            variant="text"
                            :disabled="form.processing"
                            @click="isActive.value = false"
                        ></v-btn>
                    </v-card-title>

                    <v-divider class="mb-4"></v-divider>

                    <v-form ref="form" class="px-4" @submit.prevent="submit">
                        <v-card-text>
                            <div class="text-medium-emphasis mb-4">
                                Are you sure you would like delete this user?
                            </div>
                        </v-card-text>

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
                                color="red-darken-3"
                                rounded="1"
                                variant="flat"
                                type="submit"
                                text="Delete"
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

export default {
    props:{
        userId: Number
    },
    data() {
        return {
            form: this.$inertia.form({}),
            displayModal: false
        }
    },
    methods: {
        closeModal() {
            this.displayModal = false;
        },
        async submit() {
            const {valid} = await this.$refs.form.validate()

            if (valid) {
                this.form.delete(route('users.destroy',[this.userId]), {
                    preserveScroll: true,
                    preserveState: false,
                    onFinish: () => this.closeModal(),
                });
            }
        }
    }
}
</script>
