import axios from 'axios';
import { mutations, actions, getters } from './index'

let mockAxiosResult;
jest.mock('axios', () => ({
    $get: jest.fn(() => Promise.resolve(mockAxiosResult)),
}));

const allCategories = [
    { id: 3, name: 'snacks' },
    { id: 2, name: 'gifts' }
]

const byIsOpen = {
    snacks: false,
    gifts: true
}

const byTags = {
    snacks: ['healthy', 'med']
}

describe('Store categories', () => {
    describe('Mutations', () => {
        it('set categories', () => {
            const state = {
                all: []
            }
            mutations.setCategories(state, allCategories)
            expect(state.all).toEqual(allCategories)
        })

        it('add open status to categoriesByIsOpen', () => {
            const state = {
                byIsOpen: {}
            }
            const expected = { snacks: false }
            const categoryName = 'snacks'
            mutations.addCategoryIsOpen(state, { name: categoryName, opened: false})
            expect(state.byIsOpen).toEqual(expected)
        })

        it('set category tags', () => {
            const state = {
              byTags: {}
            }
            const categoryName = 'snacks'
            const tags = ['healthy', 'med']
            mutations.setCategoriesByTag(state, { categoryName,  tags})
            expect(state.byTags).toEqual(byTags)
        })
    })

    describe('Actions', () => {
        const commit = jest.fn()

        it('fetch categories', async (done) => {
            mockAxiosResult = { categories: allCategories }
            await actions['fetchCategories'].bind({ $axios: axios })({ commit })
            expect(commit).toHaveBeenCalledWith('setCategories', allCategories)
            done()
        })
    })

    describe('Getters', () => {
        const state = {
            byIsOpen,
            byTags,
            filteredTag: false
        }

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
            expect(getters.getCategoryTags(state)(categoryName)).toEqual(byTags[categoryName])
        })
    })
})
