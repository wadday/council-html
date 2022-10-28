const useOptionsStore = Pinia.defineStore({
    id: 'options',
    state: () => ({
        options: []
    }),

    actions: {
        saveOption(form) {
            let uid = new ShortUniqueId();
            this.options.push({
                id: uid(),
                title: form.title,
                description: form.description,
                completed: false,
                group_id: form.group_id,
            })
        },

        updateOption(item) {
            this.options[this.getIndex(item.id)].title = item.title
            this.options[this.getIndex(item.id)].description = item.description
        },

        deleteOption(id) {
            this.options.splice(this.getIndex(id), 1)
        },

        completed(id) {
            this.options[this.getIndex(id)].completed = true
        },

        getIndex(id) {
            return this.options.findIndex(itm => itm.id === id)
        },

        deleteOptionsByGroup(groupId) {
            _.remove(this.options, function(item) {
                return item.group_id === groupId
            });
        },

        uploadOptions(options) {
            this.options = options
        }
    },

})
