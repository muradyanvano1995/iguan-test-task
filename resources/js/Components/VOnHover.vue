<template>
    <div v-element-hover="onHover">
        <slot  :isHovering="isHovering" />
    </div>
</template>

<script>
import { vElementHover as ElementHover } from '@vueuse/components'
export default {
    name:"VOnHover",
    directives:{
        ElementHover,
    },
    data() {
        return {
            isHovering: false
        };
    },
    methods:{
        onHover(state) {
            this.isHovering = state
        }
    }
};
</script>
