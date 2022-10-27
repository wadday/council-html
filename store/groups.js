const useGroupsStore = Pinia.defineStore({
    id: 'groups',
    state: () => ({
        items: []
    }),

    actions: {
        saveGroup(name) {
            let uid = new ShortUniqueId();
            this.items.push({
                id: uid(),
                name: name,
            })
        },

        updateGroup(item) {
            let index = this.items.findIndex(itm => itm.id === item.id)
            this.items[index].name = item.name
        },

        deleteGroup(id) {
            let index = this.items.findIndex(itm => itm.id === id)
            this.items.splice(index, 1)
        }
    }
})
