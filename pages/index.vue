<template>
    <div id="categories">
        <h1>Categories</h1>
        <el-row>
            <el-col v-for="category in categories" :key="category.id" :span="4" :offset="1">
                <category :category="category"/>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import Category from '~/components/Category.vue'
    import { isStoreOpen } from '~/utils'

    export default {
        name: 'categories',
        components: {
            Category
        },
        computed: {
            categories() {
                return this.$store.state.categories.all
            },
        },
        async fetch({ store }) {
            if (store.state.categories.all.length === 0) {
                await store.dispatch('categories/fetchCategories')
                    let categories = store.state.categories.all;
                    for (const { name } of categories) {
                        if (!store.getters['stores/existsCategoryInStores'](name)) {
                            await store.dispatch('stores/fetchStores', name)
                        }
                        const stores = store.getters['stores/getStores'](name)
                        const categoryOpened = stores.some(store => isStoreOpen(store))
                        store.commit('categories/addCategoryIsOpen', { name, opened: categoryOpened })
                    }
            }
        }
    }
</script>
