import { isStoreOpen } from '~/utils'
// I putted all the store in a singles file because of the extension. For bigger stores, I would have ordered in modules
export const state = () => ({
    categories: [],
    stores: {},
    storesList: []
})

export const getters = {
    getStoresByCategory: (state) => (categoryName) => {
        return state.stores[categoryName] || []
    },
    existsCategoryInStores: (state) => (categoryName) => {
        return state.storesList.some((name) => name === categoryName)
    }
}

export const mutations = {
    addStores (state, { categoryName, stores }) {
        state.storesList.push(categoryName)
        state.stores[categoryName] = stores
    },

    setCategories (state, categories) {
        state.categories = categories
    },
}

export const actions = {
    async fetchCategories({ commit }) {
        const { categories } = await this.$axios.$get('categories')
        commit('setCategories', categories)
    },

    updateCategories({ state, commit, getters }) {
        let categories = [...state.categories]
        categories.map((category) => {
            const stores = getters['getStoresByCategory'](state)(category.name)
            category.isOpen = stores.some(store => isStoreOpen(store))
        })
        commit('setCategories', categories)
    },

    async fetchStores({ commit }, categoryName) {
        const { stores } = await this.$axios.$get('stores', {
            params: {
                category: categoryName
            }}).catch(() => {
            error({ statusCode: 404, message: 'Post not found' })
        })
        stores.sort((store) => isStoreOpen(store))
        commit('addStores', { categoryName, stores })
    },
}
