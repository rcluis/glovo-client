<template>
    <el-container id="stores">
        <el-header>
            <h1>Stores</h1>
        </el-header>
        <el-main>
            <el-row class="stores__filters" type="flex" justify="center" :gutter="10">
                <el-col :span="16">
                    <el-row :gutter="20">
                        <el-col v-for="(tag, id) in tags" :key="id" :xs="12" :sm="8" :md="4" :lg="3">
                            <tag-filter  :tag="tag" @onTagSelected="onTagSelected"/>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-row class="store__items" type="flex" justify="center" :gutter="10">
                <el-col :span="20">
                    <el-row :gutter="50">
                        <el-col v-for="store in stores" :key="store.id" :xs="24" :sm="12" :md="8" :lg="6">
                            <store :store="store"/>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>
<script>
    import Store from '~/components/Store.vue'
    import TagFilter from '~/components/TagFilter.vue'

    export default {
        name: 'stores',
        components: {
            Store,
            TagFilter
        },
        data() {
            return {
                categoryName: this.$route.params.name
            }
        },
        computed: {
            stores: function () {
                return this.$store.getters['getStores'](this.categoryName)
            },
            tags: function () {
                return this.$store.getters['getCategoryTags'](this.categoryName)
            }
        },
        methods: {
            onTagSelected (tag) {
                this.$store.commit('setFilteredTag', tag)
            }
        },
        validate ({ params }) {
            return /^\w+$/.test(params.name) // to avoid special characters
        },
        async fetch({ store, params, error }) {
            store.commit('clearFilterTags')
            const categoryName = params.name
            if (!store.getters['existsCategoryInStores'](categoryName)) {
                await store.dispatch('fetchStores', categoryName).catch(() => {
                    error({ statusCode: 404, message: 'Category not found' })
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .stores {
        &__filters {
            margin-bottom: 30px;
        }
    }


</style>
