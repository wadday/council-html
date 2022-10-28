const {createApp} = Vue

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/reader/group/:group_id/:id',
        name: 'reader',
        component: Readers,
    },
    {
        path: '/config',
        name: 'config',
        component: Group,
    },
    {
        path: '/config/:id',
        name: 'config-options',
        component: Option,
    },
    {
        path: '/storage',
        name: 'storage-db',
        component: Storage,
    },
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes, // short for `routes: routes`
    linkActiveClass: 'text-blue-500 ',
    linkExactActiveClass: 'text-blue-500 ',
})

const pinia = Pinia.createPinia()
pinia.use((context) => {
    const storeId = context.store.$id
    const serializer = {
        serialize: JSON.stringify,
        deserialize: JSON.parse
    }

    const fromStorage = serializer.deserialize(window.localStorage.getItem(storeId))

    if (fromStorage) {
        context.store.$patch(fromStorage)
    }
    context.store.$subscribe((mutation, state) => {
        window.localStorage.setItem(storeId, serializer.serialize(state))
    })
})

const app = createApp()
app.use(router)
app.use(pinia)
app.mount('#app')
