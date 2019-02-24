import axios from 'axios';
import * as utils  from '~/utils'
import { mutations, actions, getters } from './index'

let mockAxiosResult;
jest.mock('axios', () => ({
    $get: jest.fn(() => Promise.resolve(mockAxiosResult)),
}));

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

const storesList = ['snacks', 'gifts']

const categoriesByTags = {
    snacks : ['healthy', 'med']
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
                categoriesByTags: {}
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
            mutations.addCategoryisOpen(state, { name: categoryName, stores: stores[categoryName]})
            expect(state.categoriesByIsOpen).toEqual(expected)
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
            await actions['fetchStores'].bind({ $axios: axios })({ commit }, categoryName)
            expect(commit).toHaveBeenCalledWith('addStores', { categoryName, stores: categoryStores })
            done()
        })
    })

    describe('Getters', () => {
        const state = {
            stores,
            storesList,
            categoriesByIsOpen
        }

        it('returns empty stores by category name', () => {
            expect(getters.getStoresByCategory(state)('restaurants')).toEqual([])
        })

        it('returns stores by category name', () => {
            expect(getters.getStoresByCategory(state)('snacks')).toEqual(stores['snacks'])
        })

        it('exists category in stores list', () => {
            expect(getters.existsCategoryInStores(state)('gifts')).toBeTruthy()
        })

        it('no exists category in stores list', () => {
            expect(getters.existsCategoryInStores(state)('restaurants')).toBeFalsy()
        })

        it('category is open', () => {
            expect(getters.isCategoryOpen(state)('gifts')).toBeTruthy()
        })

        it('category is close', () => {
            expect(getters.isCategoryOpen(state)('snacks')).toBeFalsy()
        })

        it('return empty filtered stores by tag', () => {
            const payload = { categoryName: 'snacks', filterTag: 'healthy' }
            const expected = [{ id: 1, name: 'store1', tags: ['healthy'] }]
            expect(getters.getStoresByTag(state)(payload)).toEqual(expected)
        })

        it('return filtered stores by tag', () => {
            const payload = { categoryName: 'snacks', filterTag: 'fastFood' }
            expect(getters.getStoresByTag(state)(payload)).toEqual([])
        })

        it('return empty tags from category', () => {

        })

        it('return tags from category', () => {

        })
    })
})
