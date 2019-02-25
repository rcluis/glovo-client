<template>
    <div>
        <ul>
            <li>
                <span v-html="store.name"></span>
                <span v-html="isOpen"></span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'Stores',
        props: {
            store: Object,
        },
        computed: {
            isOpen() {
                return this.$store.getters['isStoreOpen'](this.store.name)
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
