const useHomeStore = Pinia.defineStore({
    id: 'home',
    state: () => ({
        group: null,
    }),

    actions: {
        selectGroup(groupId) {
            this.group = groupId
        },
        deselectGroup() {
            this.group = null
        }
    }
})
