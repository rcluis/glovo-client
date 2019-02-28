<template>
    <el-container class="categories">
        <el-header>
            <h1>Categories</h1>
        </el-header>
        <el-main>
            <el-row type="flex" justify="center">
                <el-col :span="20">
                    <el-row :gutter="50">
                        <el-col class="categories__items" v-for="category in categories" :key="category.id" :xs="12" :sm="12" :md="8" :lg="6">
                            <category :category="category"/>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
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

<style scoped lang="scss">
    .categories {
        &__items {
            margin-bottom: 30px;
        }
    }
</style>
