const Storage = {
    template: `
    <div class="max-w-3xl mx-auto space-y-5 rounded-lg border bg-white shadow-lg border-gray-100 p-3">
     <div class="p-4 bg-gray-100 rounded-lg shadow-lg border">
      <h1 class="mb-3">Upload</h1>
         <form class="space-y-6" @submit.prevent="upload">
              <div>
                  <label for="file" class="block text-sm font-medium text-gray-700">File</label>
                  <div class="mt-1 border-b border-gray-300 focus-within:border-indigo-600">
                    <input  v-model="file"
                            type="file"
                            name="file"
                            id="file"
                            ref="file"
                            accept=".json,application/json"
                            class="block p-3 w-full border-0 border-b border-transparent bg-gray-50 focus:border-indigo-600 focus:ring-0 sm:text-sm"
                            placeholder="UNDER 10 etc.">
                  </div>
              </div>
              <div>
                <button class="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Upload</button>
              </div>
            <div class="pt-10">
            <div class="mb-2">Download Groups/Options</div>
            <div class="flex space-x-3">
              <button @click="downloadGroups" type="button" class="flex w-full justify-center rounded-md border border-transparent bg-blue-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Download Groups</button>
              <button @click="downloadOptions" type="button" class="flex w-full justify-center rounded-md border border-transparent bg-blue-400 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Download Options</button>
            </div>
            </div>
         </form>
     </div>
     </div>
    `,

    data() {
        return {
            file: null
        }
    },
    methods: {
        ...Pinia.mapActions(useGroupsStore, ['uploadGroups']),
        ...Pinia.mapActions(useOptionsStore, ['uploadOptions']),
        downloadGroups() {
            let storage = localStorage.getItem('groups')
            let groups = JSON.parse(storage)

            let obj = {
                key: 'groups',
                items: [...groups.items]
            }

            this.downloadFile('groups.json', JSON.stringify(obj))
        },

        downloadOptions() {
            let storage = localStorage.getItem('options')
            let options = JSON.parse(storage)

            let obj = {
                key: 'options',
                items: [...options.options]
            }

            this.downloadFile('options.json', JSON.stringify(obj))
        },

        upload() {
            let input = this.$refs.file
            if (input.files[0]) {
                let file = input.files[0]
                let reader = new FileReader()
                reader.onload = this.onloadOnLoadFileHandler;
                reader.readAsText(file)
            } else {
                alert('select a valid json backup file')
            }
        },

        onloadOnLoadFileHandler(event) {
            let obj = event.target.result
            let data = JSON.parse(obj)
            if (data.key === 'groups') {
                this.uploadGroups(data.items)
            }

            if (data.key === 'options') {
                this.uploadOptions(data.items)
            }

        },

        downloadFile(filename, text) {
            let element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', filename);

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
        }
    }
}
