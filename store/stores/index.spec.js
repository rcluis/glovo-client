import axios from 'axios';
import * as utils  from '~/utils'
import { mutations, actions, getters } from './index'

let mockAxiosResult;
jest.mock('axios', () => ({
    $get: jest.fn(() => Promise.resolve(mockAxiosResult)),
}));
const mockGetters = {
    isStoreOpen: jest.fn(() => true)
}
const stores = {
    snacks : [
        { id: 1, name: 'store1', tags: ['healthy'] },
        { id: 2, name: 'store2', tags: ['med'] }
    ]
}

const storesByIsOpen = {
  store1: true,
  store2: false
}

const storesList = ['snacks', 'gifts']

describe('Store stores', () => {
    describe('Mutations', () => {
        it('add stores', () => {
            const state = {
                stores: {},
            }
            const categoryName = 'snacks'
            mutations.addStores(state, { categoryName, stores: stores[categoryName]})
            expect(state.stores).toEqual(stores)
        })

        it('add stores list', () => {
            const state = {
                storesList: [],
            }
            const categoryName = 'snacks'
            mutations.addStoresList(state, categoryName)
            expect(state.storesList).toEqual([categoryName])
        })

        it('add stores by is open', () => {
            const state = {
                storesByIsOpen: {},
            }
            const name = 'store1'
            const opened = true
            const expected = { 'store1': opened}
            mutations.addStoresByIsOpen(state, { name, opened})
            expect(state.storesByIsOpen).toEqual(expected)
        })

        it('clear filter tag', () => {
            const state = {
                filters: {
                    tag: 'snacks'
                }
            }
            mutations.clearFilterTags(state)
            expect(state.filters.tag).toBeFalsy()
        })

        it('set filtered tag', () => {
            const state = {
                filters: {
                    tag: false
                }
            }
            mutations.setFilteredTag(state, 'med')
            expect(state.filters.tag).toBe('med')
        })
    })

    describe('Actions', () => {
        utils.isStoreOpen = jest.fn(() => true)
        const commit = jest.fn()

        it('fetch stores', async (done) => {
            const categoryName = 'snacks'
            const categoryStores = stores[categoryName]
            mockAxiosResult = { stores: categoryStores }
            await actions['fetchStores'].bind({ $axios: axios })({ commit, getters: mockGetters }, categoryName)
            expect(commit).toHaveBeenCalledWith('addStoresList', categoryName)
            expect(commit).toHaveBeenCalledWith('addStoresByIsOpen', { name: 'store2', opened: true })
            expect(commit).toHaveBeenCalledWith('addStores', { categoryName, stores: categoryStores })
            expect(commit).toHaveBeenCalledWith('categories/setCategoriesByTag', { categoryName, tags: ['healthy', 'med']}, { root: true })
            done()
        })
    })

    describe('Getters', () => {
        const state = {
            stores,
            storesList,
            storesByIsOpen,
            filters: {
                tag: false
            }
        }

        it('returns empty stores by category name', () => {
            expect(getters.getStores(state)('restaurants')).toEqual([])
        })

        it('returns stores by category name', () => {
            expect(getters.getStores(state)('snacks')).toEqual(stores['snacks'])
        })

        it('return empty filtered stores by tag', () => {
            state.filters.tag = 'fastFood'
            expect(getters.getStores(state)('snacks')).toEqual([])
        })

        it('return filtered stores by tag', () => {
            state.filters.tag = 'healthy'
            const expected = [{ id: 1, name: 'store1', tags: ['healthy'] }]
            expect(getters.getStores(state)('snacks')).toEqual(expected)
        })

        it('exists category in stores list', () => {
            expect(getters.existsCategoryInStores(state)('gifts')).toBeTruthy()
        })

        it('no exists category in stores list', () => {
            expect(getters.existsCategoryInStores(state)('restaurants')).toBeFalsy()
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
