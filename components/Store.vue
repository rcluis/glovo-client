<template>
    <div>
        <ul>
            <li>
                <span v-html="store.name"></span>
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
    }
</script>

<style scoped lang="scss">

</style>
