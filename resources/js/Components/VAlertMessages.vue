<template>
    <v-alert
        variant="outlined"
        :type="type"
        closable
    >
        <slot/>
    </v-alert>
</template>

<script>
export default {
    name: "VAlertMessages",
    props: {
        type: {
            type: String,
            required: true,
            validator(value) {
                return ['info', 'success', 'error', 'warning'].includes(value)
            }
        }
    },
}
</script>
