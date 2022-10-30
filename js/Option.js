
const Option = {
    template: `
    <div class="rounded-lg border shadow-lg border-gray-100 bg-white p-3">
     <div class="p-4 bg-gray-100 rounded-lg shadow-lg border">
     <div class="flex items-center justify-between">
      <h1 class="mb-5 font-semibold text-lg">Add New</h1>
      <span>
        <h3 class="font-semibold text-lg">{{ group.name }}</h3>
      </span>
    </div>
         <form class="space-y-6" @submit.prevent="save">
             <div>
                  <label for="name" class="block text-sm font-medium text-gray-700">Subject/Title</label>
                  <div class="mt-1 border-b border-gray-300 focus-within:border-indigo-600">
                    <input  v-model="form.title"
                            type="text" 
                            name="name" 
                            id="name" 
                            required
                            dir="rtl"
                            class="font-thaana block p-3 w-full border-0 border-b border-transparent bg-gray-50 focus:border-indigo-600 focus:ring-0 sm:text-sm" 
                            placeholder="Subject / title">
                  </div>
                </div>
              <div>
                <label for="description" class="block text-sm font-medium text-gray-700 text-right">Descriptions</label>
                <div class="mt-1">
                  <textarea id="description" 
                  v-model="form.description" dir="rtl" required rows="20" class="font-arabic block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-2xl leading-relaxed tracking-wider placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                  placeholder="Descriptions"
                  ></textarea>
                </div>
              </div>
              <div class="flex space-x-3">
                  <button class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Save</button>
                  <button type="button" @click="resetForm" class="flex w-full justify-center rounded-md border border-transparent bg-gray-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Reset</button>
            </div>
         </form>
     </div>
     <div class="mt-3">
     <h1 class="text-lg font-semibold">List</h1>
     <ul role="list" class="divide-y divide-gray-200 space-y-1">
          <li v-if="items.length === 0" class="text-gray-400">No item available</li>
          <li v-for="(item, i) in optionItems" :key="item.id" 
          class="relative py-5 px-4 rounded-lg bg-white bg-opacity-50 hover:bg-gray-50 hover:bg-opacity-40">
            <div class="flex justify-between space-x-3">
              <div class="min-w-0 flex-1">
                <div class="block focus:outline-none">
                  <p class="truncate text-sm font-medium text-gray-900">{{ i+1 }} - {{ item.title }}</p>
                </div>
              </div>
              <div class="flex-shrink-0 whitespace-nowrap text-sm text-gray-500 space-x-2">
              <button
                @click="edit(item)"
                class="rounded-md border border-transparent bg-blue-600 py-1 px-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Edit</button>
              <button @click="deleteOption(item.id)" class="rounded-md border border-transparent bg-red-600 py-1 px-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Delete</button>
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
                description: '',
                title: '',
                id: null,
                group_id: this.$route.params.id
            },
            quill: null
        }
    },

    pinia: Pinia.createPinia(),
    computed: {
        ...Pinia.mapState(useOptionsStore, ['options']),
        ...Pinia.mapState(useGroupsStore, ['items']),
        optionItems() {
            if (Array.isArray(this.options)) {
                return this.options.filter(itm => itm.group_id === this.form.group_id)
            }

            return []
        },
        group() {
            return this.items.find(itm => itm.id === this.$route.params.id)
        }
    },
    methods: {
        ...Pinia.mapActions(useOptionsStore, ['saveOption', 'updateOption', 'deleteOption']),
        save() {

            if (this.form.id && this.form.title && this.form.description) {
                this.update(this.form)
            } else if (this.form.title && this.form.description) {
                this.saveOption(this.form)
            } else {
                alert('Fill the required fields')
                return;
            }

            this.resetForm()
        },
        edit(item) {
            this.form.id = item.id
            this.form.title = item.title
            this.form.description = item.description
        },

        update(item) {
            this.updateOption(item)
        },

        resetForm() {
            this.form.id = null
            this.form.title = null
            this.form.description = null
        }
    }
}
