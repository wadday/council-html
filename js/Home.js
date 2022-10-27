const Home = {
    template: `
    <div class="rounded-lg bg-white border shadow-lg border-gray-50 p-3">
     <div class="p-4">
         <div class="max-w-sm">
              <label for="group" class="block text-sm font-medium text-gray-700">Group</label>
              <select v-model="form.group_id" @change="selectGroup" id="group" class="select2 mt-1 block px-2 w-full rounded-md border border-gray-200 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm">
                <option :value="null" :key="'none'">---</option>
                <option v-for="item in items" :key="item.id" :value="item.id">{{ item.name }}</option>
              </select>
        </div>
        <div class="mt-4">
        <ul role="list" class="grid grid-cols-1 gap-4 sm:grid-cols-6">
          <li v-for="(item, i) in groupOptions" :key="item.id" 
            class="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow-md transition hover:scale-105 hover:shadow-lg"
            :class="{'bg-gray-300': item.completed}"
            >
            <router-link :to="{name: 'reader', params: {group_id: group,id: item.id }}"
              class="relative group overflow-hidden flex w-full items-center justify-center p-6 rounded-lg hover:bg-blue-200 hover:shadow-md"
              :class="{'text-green-600': item.completed, 'text-gray-700': !item.completed}"
              >
              <h3 class="text-5xl font-bold">{{ i+1 }}</h3>
              <span v-if="item.completed" class="absolute -top-6 -right-6 text-gray-100 transition group-hover:text-blue-300"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
            </span>
            </router-link>
          </li>
        </ul>
        </div>
     </div>
    </div>
`,
    data() {
        return {
            form: {
                group_id: this.group
            },
        }
    },

    pinia: Pinia.createPinia(),
    computed: {
        ...Pinia.mapState(useGroupsStore, ['items']),
        ...Pinia.mapState(useOptionsStore, ['options']),
        ...Pinia.mapState(useHomeStore, ['group']),

        groupOptions() {
            if (this.group && Array.isArray(this.options)) {
                return this.options.filter(itm => itm.group_id === this.group)
            }
            return []
        }
    },

    created() {
        $('document').ready(function() {
            $('.select2').select2();
        })
    },
    mounted() {
        this.form.group_id = this.group
    },

    methods: {
        ...Pinia.mapActions(useHomeStore, ['selectGroup']),
    }
}
