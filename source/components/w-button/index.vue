<template>
    <div class="w-button">
        <button
            :class="[buttonClasses, classes]"
            @click="showMessage"
        >
            <slot />
        </button>
        <transition :name="transitionName">
            <div
                v-if="showing"
                class="w-button__popup"
                v-text="message"
            />
        </transition>
    </div>
</template>

<script>
export default {
    name: 'WButton',
    props: {
        colored: { type: Boolean, default: false },
        classes: { type: String, default: '' },
        message: { type: String, default: '' },
        timeout: { type: Number, default: 2 },
        transitionName: { type: String, default: 'fade' },
    },
    data: () => ({
        showing: false,
    }),
    computed: {
        buttonClasses() {
            return {
                button: true,
                'colored-button': this.colored,
            };
        },
    },
    methods: {
        /**
         * Show message box
         */
        showMessage() {
            this.$emit('click');
            this.showing = true;

            setTimeout(() => {
                this.showing = false;
            }, this.timeout * 1000);
        },
    },
};
</script>
