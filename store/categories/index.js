export const state = () => ({
    all: [],
    byIsOpen: {},
    byTags: {},
})

export const getters = {
    isCategoryOpen: (state) => (categoryName) => {
        return state.byIsOpen[categoryName] || false
    },
    getCategoryTags: (state) => (categoryName) => {
        return state.byTags[categoryName] || []
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
        state.byTags[categoryName] = tags
    }
}

 export const actions = {
      async fetchCategories ({ commit }) {
          const { categories } = await this.$axios.$get('categories')
          commit('setCategories', categories)
  },
}
