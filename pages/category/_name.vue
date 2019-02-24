<template>
    <div id="stores">
        <h1>Stores</h1>
        <store v-for="store in stores" :key="store.id" :store="store"/>
    </div>
</template>

<script>
    import Store from '~/components/Store.vue'

    export default {
        name: 'stores',
        components: {
            Store
        },
        data() {
            return {
                categoryName: this.$route.params.name
            }
        },
        computed: {
            stores: function () {
                return this.$store.getters['getStoresByCategory'](this.categoryName)
            },
        },
        validate ({ params }) {
            return /^\w+$/.test(params.name) // to avoid special characters
        },
        async fetch({ store, params, error }) {
            const categoryName = params.name
            if (!store.getters['existsCategoryInStores'](categoryName)) {
                await store.dispatch('fetchStores', categoryName).catch(() => {
                    error({ statusCode: 404, message: 'Category not found' })
                })
            }
        }
    }
</script>

<style lang="scss">

</style>
