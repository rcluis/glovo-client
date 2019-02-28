import { isStoreOpen } from '~/utils'

export const state = () => ({
    filteredTag: false,
    stores: {},
    storesByIsOpen: {},
    storesList: [],
    filters: {
        tag: false
    }
})

export const getters = {
    existsCategoryInStores: (state) => (categoryName) => {
        return state.storesList.some((name) => name === categoryName)
    },

    getStores: (state) => (categoryName) => {
        const { tag: filteredTag } = state.filters
        const stores = state.stores[categoryName] || []
        return filteredTag ? stores.filter(({ tags }) => tags.some((tag) => tag === filteredTag)) : stores
    },

    isStoreOpen: (state) => (storeName) => {
        return state.storesByIsOpen[storeName] || false
    },
}

export const mutations = {
  addStores (state, { categoryName, stores }) {
      state.stores[categoryName] = stores
  },

  addStoresList (state, categoryName) {
      state.storesList.push(categoryName)
  },

  addStoresByIsOpen (state, { name, opened }) {
      state.storesByIsOpen[name] = opened
  },

  clearFilterTags (state) {
      state.filters.tag = false
  },

  setFilteredTag (state, tag) {
      state.filters.tag = tag
  }
}

export const actions = {
    async fetchStores ({ commit, getters }, categoryName) {
        const { stores } = await this.$axios
            .$get(`stores/?category=${categoryName}`)
            .catch(() => {
                error({ statusCode: 404, message: 'Category not found' })
            })
        const allTags = []
        commit('addStoresList', categoryName )
        stores.forEach((store) => {
            const opened = isStoreOpen(store)
            commit('addStoresByIsOpen', { name: store.name, opened})
            allTags.push(...store.tags)
        })
        const sortedStores = stores.sort((store) => !getters.isStoreOpen(store.name))
        commit('addStores', { categoryName, stores: sortedStores})
        const tags = new Set([...allTags])
        commit('categories/setCategoriesByTag', { categoryName, tags: [...tags]}, { root: true })
    },
}
