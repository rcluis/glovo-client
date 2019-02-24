import * as utils  from '~/utils'

import { mutations, actions, getters } from './index'

const categories = [
    { "id": 3, "name": "snacks" },
    { "id": 2, "name": "gifts" },
]
const stores = {
    "snacks" : [
        { "id": 1, "name": "store1" },
        { "id": 2, "name": "store2" }
    ],
}
const storesList = ['snacks', 'gifts']

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
                stores: {}
            }
            const categoryName = 'snacks'
            mutations.addStores(state, { categoryName, stores: stores[categoryName]})
            expect(state.storesList).toEqual([categoryName])
            expect(state.stores).toEqual(stores)
        })
    })

    describe('Actions', () => {
        /*it('"fetchCategories"', () => {
            const commit = jest.fn()

            actions.fetchCategories({ commit }).then(() => {
                expect(commit).toHaveBeenCalledWith(
                    "setCategories", true)
            })
        })*/
        it('update categories', () => {
            utils.isStoreOpen = jest.fn()
            const commit = jest.fn()
            const state = {
                categories,
                stores
            }
            const updatedCategories = categories.map((category) => ({ isOpen: false, ...category }))
            actions.updateCategories({ commit, state, getters })
            expect(commit).toHaveBeenCalledWith("setCategories", updatedCategories)
        })
        it('update empty categories', () => {
            const commit = jest.fn()
            const state = {
                categories:[],
                stores: {}
            }
            actions.updateCategories({ commit, state, getters })
            expect(commit).toHaveBeenCalledWith("setCategories", [])
        })
    })

    describe('Getters', () => {
        const state = {
            stores,
            storesList
        }
        it('returns empty stores by category name', () => {
            const storesInCategory = getters.getStoresByCategory(state)('restaurants')
            expect(storesInCategory).toEqual([])
        })
        it('returns stores by category name', () => {
            const storesInCategory = getters.getStoresByCategory(state)('snacks')
            expect(storesInCategory).toEqual(stores['snacks'])
        })
        it('exists category in stores list', () => {
            const existCategory = getters.existsCategoryInStores(state)('gifts')
            expect(existCategory).toBeTruthy()
        })
        it('no exists category in stores list', () => {
            const existCategory = getters.existsCategoryInStores(state)('restaurants')
            expect(existCategory).toBeFalsy()
        })
    })

})
