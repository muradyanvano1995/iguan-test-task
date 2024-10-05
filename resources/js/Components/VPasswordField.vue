<template>
    <v-text-field
        :append-inner-icon="icon"
        :type="type"
        @click:append-inner="changeType"
    ></v-text-field>
</template>

<script>
export default {
    name: "VCardPassword",
    computed: {
        icon() {
            return this.type === 'password' ? 'mdi-eye' : 'mdi-eye-off'
        }
    },
    data() {
        return {
            type: 'password',
        }
    },
    methods: {
        changeType() {
            this.type = this.type === 'password' ? 'text' : 'password';
        }
    }
}
</script>
