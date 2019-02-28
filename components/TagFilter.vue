<template>
    <div class="tag-filter" :class="{ 'active': isSelected }" @click="onTagSelected(tag)">
        <span v-html="tag"></span>
    </div>
</template>

<script>
    export default {
        name: 'tagFilter',
        props: {
            tag: String,
        },
        computed: {
            isSelected() {
                return this.$store.state.stores.filteredTag === this.tag
            },
        },
        methods: {
            onTagSelected (tag) {
                this.$emit('onTagSelected', tag)
            }
        }
    }
</script>

<style scoped lang="scss">
    .tag-filter {
        color: #2abb9b;
        cursor: pointer;
        text-align: center;
        border-radius: 20px;
        padding: 5px 10px;
        box-shadow: 0 2px 10px 0 rgba(0,0,0,.1);
        margin-bottom: 10px;

        &.active {
            background-color: #ffc244;
        }
    }
</style>
