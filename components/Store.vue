<template>
    <div>
        <ul>
            <li>
                <span v-html="store.name"></span>
                <span v-if="isOpen">Open</span>
                <span v-else-if="!nextOpeningTime">Cloase until new update</span>
                <span v-else>Next open day on {{ nextOpeningTime.day }} at {{ nextOpeningTime.time }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    import { getNextOpeningTime } from "~/utils";

    export default {
        name: 'Stores',
        props: {
            store: Object,
        },
        computed: {
            isOpen() {
                return this.$store.getters['isStoreOpen'](this.store.name)
            },
            nextOpeningTime() {
                return getNextOpeningTime(this.store)
            }
        }
    }
</script>

<style scoped lang="scss">

</style>
