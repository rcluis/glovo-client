import { isStoreOpen } from '~/utils'

// I putted all the store in a singles file because of the extension. For bigger stores, I would have ordered in modules
export const state = () => ({
    categories: [],
    categoriesByIsOpen: {},
    categoriesByTags: {},
    stores: {},
    storesList: []
})

export const getters = {
    getStoresByCategory: (state) => (categoryName) => {
        return state.stores[categoryName] || []
    },
    existsCategoryInStores: (state) => (categoryName) => {
        return state.storesList.some((name) => name === categoryName)
    },
    getStoresByTag: (state) => ({categoryName, filterTag}) => {
        const stores = state.stores[categoryName]
        return stores.filter(({ tags }) => tags.some((tag) => tag === filterTag))
    },
    isCategoryOpen: (state) => (categoryName) => {
        return state.categoriesByIsOpen[categoryName]
    },
    getCategoryTags: (state) => (categoryName) => {
        return state.categoriesByTags[categoryName] || []
    }
}

export const mutations = {
    addStores (state, { categoryName, stores }) {
        const allTags = []
        state.storesList.push(categoryName)
        state.stores[categoryName] = stores
        stores.forEach(({ tags }) => allTags.push(...tags))
        const cleanedTags = new Set([...allTags])
        state.categoriesByTags[categoryName] = [...cleanedTags]
    },

    setCategories (state, categories) {
        state.categories = categories
    },
    addCategoryisOpen (state, { name, stores}) {
        state.categoriesByIsOpen[name] = stores.some(store => isStoreOpen(store))
    },
}

export const actions = {
    async fetchCategories({ commit }) {
        const { categories } = await this.$axios.$get('categories')
        commit('setCategories', categories)
    },

    async fetchStores({ commit, getters }, categoryName) {
        const { stores } = await this.$axios.$get('stores', {
            params: {
                category: categoryName
            }}).catch(() => {
                error({ statusCode: 404, message: 'Category not found' })
            })
        stores.sort((store) => isStoreOpen(store))
        commit('addStores', { categoryName, stores })
    },
}
