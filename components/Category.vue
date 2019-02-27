<template>
        <el-card :body-style="{ padding: '0px' }">
            <img v-if="isOpen" :src="category.openIcon" class="image"/>
            <img v-else :src="category.sleepIcon" class="image"/>
            <div style="padding: 14px;">
                <span v-html="category.label"/>
                <div class="bottom clearfix">
                    <el-button type="text" class="button" @click.capture="navigate(category.name)">Operating button</el-button>
                </div>
            </div>
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
                return this.$store.getters['isCategoryOpen'](this.category.name)
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

</style>
