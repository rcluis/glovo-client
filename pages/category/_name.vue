<template>
    <el-container class="stores">
        <el-header>
            <h1>Stores</h1>
        </el-header>
        <el-main>
            <el-row class="stores__filters" type="flex" justify="center" :gutter="10">
                <el-col :span="16">
                    <el-row type="flex" :gutter="20" align="middle">
                        <el-col v-for="(tag, index) in tags" :key="index" v-if="index < numFilters" :lg="3" :md="4" :sm="5" :xs="12">
                            <tag-filter :tag="tag" @onTagSelected="onTagSelected"/>
                        </el-col>
                        <el-col v-if="isTagSelected" :lg="1" :md="2" :sm="2" :xs="4">
                            <el-button class="stores__filters-clear" icon="el-icon-circle-close-outline" circle @click="clearFilters"></el-button>
                        </el-col>
                        <el-col :lg="1" :md="2" :sm="2" :xs="4">
                            <el-dropdown v-if="showMoreFilters" trigger="click" class="stores__filters-select" @command="onTagSelected">
                                    <i class="el-icon-more stores__filters-"></i>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item v-for="(tag, index) in tags" v-if="index >= numFilters" :key="index" :command="tag">
                                        {{ tag }}
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
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
                categoryName: this.$route.params.name,
            }
        },
        computed: {
            stores: function () {
                return this.$store.getters['stores/getStores'](this.categoryName)
            },
            tags: function () {
                return this.$store.getters['categories/getCategoryTags'](this.categoryName)
            },
            numFilters: function () {
                switch (this.$mq) {
                    case 'xs':
                        return 2
                        break
                    case 'sm':
                        return 3
                        break
                    case 'md':
                        return 4
                        break
                    case 'lg':
                        return 5
                        break
                }
            },
            isTagSelected: function () {
                return this.$store.state.stores.filters.tag
            },
            showMoreFilters: function () {
                return this.tags.length > this.numFilters
            }
        },
        methods: {
            onTagSelected (tag) {
                this.$store.commit('stores/setFilteredTag', tag)
            },
            clearFilters () {
                this.$store.commit('stores/clearFilterTags')
            }
        },
        validate ({ params }) {
            return /^\w+$/.test(params.name) // to avoid special characters
        },
        async fetch({ store, params, error }) {
            store.commit('stores/clearFilterTags')
            const categoryName = params.name
            if (!store.getters['stores/existsCategoryInStores'](categoryName)) {
                await store.dispatch('stores/fetchStores', categoryName).catch(() => {
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

            &-select {
                cursor: pointer;
                font-size: 30px;
                &:focus {
                    outline: none;
                }
            }

            &-clear {
                border: 0;
                font-size: 30px;
                padding: 0;
            }
        }
    }
</style>
