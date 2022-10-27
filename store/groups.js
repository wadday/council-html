const useGroupsStore = Pinia.defineStore({
    id: 'groups',
    state: () => ({
        items: []
    }),

    actions: {
        saveGroup(form) {
            let uid = new ShortUniqueId();
            this.items.push({
                id: uid(),
                name: form.name,
                start: form.start,
                end: form.end,
                seen: form.seen,
            })
        },

        updateGroup(item) {
            let index = this.items.findIndex(itm => itm.id === item.id)
            this.items[index].name = item.name
            this.items[index].seen = item.seen
            this.items[index].start = item.start
            this.items[index].end = item.end
        },

        deleteGroup(id) {
            let index = this.items.findIndex(itm => itm.id === id)
            this.items.splice(index, 1)
        }
    }
})
