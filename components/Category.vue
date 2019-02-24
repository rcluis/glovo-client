<template>
    <div>
        <ul>
            <li @click.capture="navigate(category.name)">
                <span v-html="category.label"></span>
                <img  v-if="isOpen" :src="category.openIcon"/>
                <img v-else :src="category.sleepIcon"/>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'Category',
        props: {
            category: Object,
        },
        computed: {
            isOpen() {
                return this.category.isOpen
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
