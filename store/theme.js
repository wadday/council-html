const useThemeStore = Pinia.defineStore({
    id: 'theme',
    state: () => ({
        dark: false,
        fontSize: 2,
    }),

    actions: {
        toggle() {
            this.dark = !this.dark
        },

        fontSizeIncrease() {
            if (this.fontSize === 10) return

            if (this.fontSize >= 0 && this.fontSize < 10) {
                this.fontSize++
            }
        },

        fontSizeDecrease() {
            if (this.fontSize === 0) return

            if (this.fontSize > 0) {
                this.fontSize--
            }
        },
    }
})
