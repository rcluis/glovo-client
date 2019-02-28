import { isStoreOpen } from '~/utils'

// I putted all the store in a singles file because of the extension. For bigger stores, I would have ordered in modules
export const state = () => ({
    all: [],
    byIsOpen: {},
    categoriesByTags: {},
})

export const getters = {
    isCategoryOpen: (state) => (categoryName) => {
        return state.byIsOpen[categoryName] || false
    },

    getCategoryTags: (state) => (categoryName) => {
        return state.categoriesByTags[categoryName] || []
    },
}

export const mutations = {
    setCategories (state, categories) {
        state.all = categories
    },

    addCategoryIsOpen (state, { name, opened}) {
        state.byIsOpen[name] = opened
    },

    setCategoriesByTag (state, { categoryName, tags }) {
        state.categoriesByTags[categoryName] = tags
    }
}

 export const actions = {
      async fetchCategories ({ commit }) {
          const { categories } = await this.$axios.$get('categories')
          commit('setCategories', categories)
  },
}
