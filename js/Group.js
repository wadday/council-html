
const Group = {
    template: `
    <div class="max-w-3xl mx-auto space-y-5 rounded-lg border bg-white shadow-lg border-gray-100 p-3">
     <div class="p-4 bg-gray-100 rounded-lg shadow-lg border">
      <h1 class="mb-3">Age Groups</h1>
         <form class="space-y-6" @submit.prevent="save">
              <div>
                  <label for="name" class="block text-sm font-medium text-gray-700">Group</label>
                  <div class="mt-1 border-b border-gray-300 focus-within:border-indigo-600">
                    <input  v-model="form.name"
                            type="text"
                            name="name"
                            id="name"
                            class="block p-3 w-full border-0 border-b border-transparent bg-gray-50 focus:border-indigo-600 focus:ring-0 sm:text-sm"
                            placeholder="UNDER 10 etc.">
                  </div>
              </div>
            <div class="flex space-x-3">
              <button class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
              <button type="button" @click="resetForm" class="flex w-full justify-center rounded-md border border-transparent bg-gray-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Reset</button>
            </div>
         </form>
     </div>
     <div class="">
     <ul role="list" class="divide-y divide-gray-200 space-y-1">
          <li v-for="item in items" :key="item.id" 
          class="relative py-5 px-4 rounded-lg bg-white bg-opacity-50 hover:bg-gray-50 hover:bg-opacity-40 group">
            <div class="flex justify-between space-x-3">
              <div class="min-w-0 flex-1">
                <div class="block focus:outline-none">
                  <router-link :to="{ name: 'config-options', params: { id: item.id }}" class="truncate text-sm font-medium text-blue-500 group-hover:text-blue-800">{{ item.name }}</router-link>
                </div>
              </div>
              <div class="flex-shrink-0 whitespace-nowrap text-sm text-gray-500 space-x-2">
              <button
                @click="edit(item)"
                class="rounded-md border border-transparent bg-blue-600 py-1 px-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Edit</button>
              <button @click="deleteGroupItem(item.id)" class="rounded-md border border-transparent bg-red-600 py-1 px-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Delete</button>
              </div>
            </div>
          </li>
        </ul>
    </div>
   
    </div>
  `,
    data() {
        return {
            form: {
                name: '',
                id: null
            }
        }
    },

    pinia: Pinia.createPinia(),
    computed: {
        ...Pinia.mapState(useGroupsStore, ['items']),
    },
    methods: {
        ...Pinia.mapActions(useGroupsStore, ['saveGroup', 'updateGroup', 'deleteGroup']),
        ...Pinia.mapActions(useHomeStore, ['deselectGroup']),
        ...Pinia.mapActions(useOptionsStore, ['deleteOptionsByGroup']),
        save() {
            if (this.form.id && this.form.name) {
                this.update(this.form)
            } else {
                if (this.form.name) {
                    this.saveGroup(this.form.name)
                }
            }
            this.resetForm()
        },
        deleteGroupItem(id) {
            this.deleteGroup(id)
            this.deselectGroup()
            this.deleteOptionsByGroup(id)
        },
        edit(item) {
            this.form.id = item.id
            this.form.name = item.name
        },

        update(item) {
            this.updateGroup(item)
        },
        resetForm() {
            this.form.id = null
            this.form.name = null
        }
    }
}
