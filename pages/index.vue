<template>
    <div id="categories">
        <h1>Categories</h1>
        <category v-for="category in categories" :key="category.id" :category="category"/>
    </div>
</template>

<script>
    import Category from '~/components/Category.vue'
    import { mapState } from 'vuex'

    export default {
        name: 'categories',
        components: {
            Category
        },
        computed: {
            ...mapState(['categories'])
        },
        async fetch({ store }) {
            if (store.state.categories.length === 0) {
                await store.dispatch('fetchCategories')
                let categories = store.state.categories;
                for (const { name } of categories) {
                    if (!store.getters['existsCategoryInStores'](name)) {
                        await store.dispatch('fetchStores', name)
                    }
                }
                store.dispatch('updateCategories');
            }
        }
    }
</script>
