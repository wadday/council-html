const useHomeStore = Pinia.defineStore({
    id: 'home',
    state: () => ({
        group: null,
    }),

    actions: {
        selectGroup(e) {
            this.group = e.target.value
        },
        deselectGroup() {
            this.group = null
        }
    }
})
