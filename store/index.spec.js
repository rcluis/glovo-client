import axios from 'axios';
import * as utils  from '~/utils'
import { mutations, actions, getters } from './index'

let mockAxiosResult;
jest.mock('axios', () => ({
    $get: jest.fn(() => Promise.resolve(mockAxiosResult)),
}));
const mockGetters = {
  getStoresByCategory: jest.fn(() => [])
}

const categories = [
    { id: 3, name: 'snacks' },
    { id: 2, name: 'gifts' }
]

const stores = {
    snacks : [
        { id: 1, name: 'store1', tags: ['healthy'] },
        { id: 2, name: 'store2', tags: ['med'] }
    ]
}

const categoriesByIsOpen = {
    snacks: false,
    gifts: true
}

const storesByIsOpen = {
  store1: true,
  store2: false
}

const storesList = ['snacks', 'gifts']

const categoriesByTags = {
    snacks: ['healthy', 'med']
}

describe('Store', () => {
    describe('Mutations', () => {
        it('set categories', () => {
            const state = {
                categories: []
            }
            mutations.setCategories(state, categories)
            expect(state.categories).toEqual(categories)
        })

        it('add stores', () => {
            const state = {
                storesList: [],
                stores: {},
                categoriesByTags: {},
                storesByIsOpen: {}
            }
            const categoryName = 'snacks'
            mutations.addStores(state, { categoryName, stores: stores[categoryName]})
            expect(state.storesList).toEqual([categoryName])
            expect(state.stores).toEqual(stores)
            expect(state.categoriesByTags).toEqual(categoriesByTags)
        })

        it('add open status to categoriesByIsOpen', () => {
            const state = {
                categoriesByIsOpen: {}
            }
            const expected = { snacks: false }
            const categoryName = 'snacks'
            mutations.addCategoryIsOpen(state, { name: categoryName, stores: stores[categoryName]})
            expect(state.categoriesByIsOpen).toEqual(expected)
        })

        it('clear filter tag', () => {
            const state = {
                filteredTag: 'snacks'
            }
            mutations.clearFilterTags(state)
            expect(state.filteredTag).toBeFalsy()
        })

        it('set filtered tag', () => {
            const state = {
                filteredTag: false
            }
            mutations.setFilteredTag(state, 'med')
            expect(state.filteredTag).toBe('med')
        })
    })

    describe('Actions', () => {
        utils.isStoreOpen = jest.fn()
        const commit = jest.fn()

        it('fetch categories', async (done) => {
            mockAxiosResult = { categories }
            await actions['fetchCategories'].bind({ $axios: axios })({ commit })
            expect(commit).toHaveBeenCalledWith('setCategories', categories)
            done()
        })

        it('fetch stores', async (done) => {
            const categoryName = 'snacks'
            const categoryStores = stores[categoryName]
            mockAxiosResult = { stores: categoryStores }
            await actions['fetchStores'].bind({ $axios: axios })({ commit, mockGetters }, categoryName)
            expect(commit).toHaveBeenCalledWith('addStores', { categoryName, stores: categoryStores })
            done()
        })
    })

    describe('Getters', () => {
        const state = {
            stores,
            storesList,
            categoriesByIsOpen,
            categoriesByTags,
            storesByIsOpen,
            filteredTag: false
        }

        it('returns empty stores by category name', () => {
            expect(getters.getStores(state)('restaurants')).toEqual([])
        })

        it('returns stores by category name', () => {
            expect(getters.getStores(state)('snacks')).toEqual(stores['snacks'])
        })

        it('return empty filtered stores by tag', () => {
            state.filteredTag = 'fastFood'
            expect(getters.getStores(state)('snacks')).toEqual([])
        })

        it('return filtered stores by tag', () => {
            state.filteredTag = 'healthy'
            const expected = [{ id: 1, name: 'store1', tags: ['healthy'] }]
            expect(getters.getStores(state)('snacks')).toEqual(expected)
        })

        it('exists category in stores list', () => {
            expect(getters.existsCategoryInStores(state)('gifts')).toBeTruthy()
        })

        it('no exists category in stores list', () => {
            expect(getters.existsCategoryInStores(state)('restaurants')).toBeFalsy()
        })

        it('returns category is open', () => {
            expect(getters.isCategoryOpen(state)('gifts')).toBeTruthy()
        })

        it('returns category is close', () => {
            expect(getters.isCategoryOpen(state)('snacks')).toBeFalsy()
        })

        it('returns close when category does not exists', () => {
            expect(getters.isCategoryOpen(state)('restaurants')).toBeFalsy()
        })

        it('return empty tags from category', () => {
            expect(getters.getCategoryTags(state)('gifts')).toEqual([])
        })

        it('return tags from category', () => {
            const categoryName = 'snacks'
            expect(getters.getCategoryTags(state)(categoryName)).toEqual(categoriesByTags[categoryName])
        })

        it('returns store is open', () => {
            expect(getters.isStoreOpen(state)('store1')).toBeTruthy()
        })

        it('returns store is close', () => {
            expect(getters.isStoreOpen(state)('store2')).toBeFalsy()
        })

        it('returns close when store does not exists', () => {
            expect(getters.isStoreOpen(state)('store3')).toBeFalsy()
        })
    })
})
