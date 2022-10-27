const Readers = {
    template: `
    <div class="fixed bg-black bg-opacity-80 h-screen w-screen top-0 left-0" v-if="dark"></div>
    <div class="relative z-40 bg-white p-6 rounded-lg" :class="darkClass">
    <div class="mb-3 flex w-full items-center justify-between">
      <router-link to="/" class="inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" />
          </svg>
    </router-link>
    <div class="flex items-center space-x-3">
      <button
              class="rounded-full border border-transparent bg-gray-300 py-1 px-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-500 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
              @click="toggle"
              >Dark/Light</button>
              <div class="flex justify-between items-center">
                  <span class="mr-5">Font Size</span>
                  <div class="flex space-x-3 items-center">
                  <button
                  class="rounded-full border border-transparent bg-gray-300 py-1 px-3 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-500 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
                  @click="fontSizeDecrease"
                  >-</button><span>{{ fontSize }}</span>
                  <button
                  class="rounded-full border border-transparent bg-gray-300 py-1 px-3 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-500 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
                  @click="fontSizeIncrease"
                  >+</button>
                  </div>
              </div>
    </div>
    </div>
    <div class="mb-2">
    <h2 dir="rtl" class="text-2xl">{{ item.title }}</h2>
    </div>
    <div class="rounded-lg shadow-lg shadow-white/20 border border-gray-200 border-opacity-40 p-3" :class="{'!border-gray-500': dark}">
     <div class="p-4">
        <div>
          <p v-html="replace(item.description)" class="text-right leading-loose" :class="fontClass" />
        </div>
     </div>
     <div class="flex items-center justify-end space-x-3">
     <div v-if="item.completed" class="flex space-x-3 text-green-500 font-semibold text-lg">
      Completed
     <span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>

      </span>
     </div>
     <button
     v-else
      @click="completed(item.id)"
      :disabled="item.completed" 
      type="button" 
      class="flex justify-center rounded-full border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400"
      >Done</button>
      </div>
    </div>
    </div>
`,
    data() {
        return {
            form: {
                option_id: this.$route.params.id,
                group_id: this.$route.params.group_id
            },
        }
    },

    pinia: Pinia.createPinia(),

    computed: {
        ...Pinia.mapState(useOptionsStore, ['options']),
        ...Pinia.mapState(useThemeStore, ['dark', 'fontSize']),
        item() {
            return this.form.option_id ? this.options.find(itm => itm.id === this.form.option_id) : null
        },

        fontClass() {
            return {
                'text-sm': this.fontSize === 0,
                'text-md': this.fontSize === 1,
                'text-lg': this.fontSize === 2,
                'text-xl': this.fontSize === 3,
                'text-2xl': this.fontSize === 4,
                'text-3xl': this.fontSize === 5,
                'text-4xl': this.fontSize === 6,
                'text-5xl': this.fontSize === 7,
                'text-6xl': this.fontSize === 8,
                'text-7xl': this.fontSize === 9,
                'text-8xl': this.fontSize === 10,
            }
        },

        darkClass() {
            return {
                'dark:bg-gray-900/10 dark:text-gray-300': this.dark
            }
        }
    },

    methods: {
        ...Pinia.mapActions(useOptionsStore, ['completed']),
        ...Pinia.mapActions(useThemeStore, ['toggle', 'fontSizeIncrease', 'fontSizeDecrease']),

        replace(value) {
            if (value) {
                return value.split('130').join('<br /><br />')
            }
        },

    }
}
