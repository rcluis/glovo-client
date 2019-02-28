<template>
        <el-card class="category" shadow="hover">
            <el-button type="text" class="button" @click.capture="navigate(category.name)">
                <div class="category__title" v-html="category.label"/>
                <img v-if="isOpen" :src="category.openIcon" class="category__image"/>
                <img v-else :src="category.sleepIcon" class="category__image"/>
            </el-button>
        </el-card>
</template>

<script>
    export default {
        name: 'category',
        props: {
            category: Object,
        },
        computed: {
            isOpen() {
                return this.$store.getters['categories/isCategoryOpen'](this.category.name)
            }
        },
        methods: {
            navigate: function (name) {
                if (!this.isOpen) {
                    return
                }
                this.$router.push(
                    {
                        name:'category-name',
                        params: { name }
                    }
                )
            }
        }
    }
</script>

<style scoped lang="scss">
    .category {
        text-align: center;
        border-radius: 75px;
        height: 150px;
        width: 150px;

        &__title {
            color: #2abb9b;
        }

        &__image {
            width: 80px;
        }
    }
</style>
