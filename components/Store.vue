<template>
        <el-card class="store" :body-style="{ padding: '0px' }" shadow="hover">
            <div slot="header" class="clearfix">
                <h3 v-html="store.name"/>
                <el-tag type="success" v-if="isOpen">Open right now</el-tag>
                <el-tag type="info" v-else-if="!nextOpeningTime">Cloase until new update</el-tag>
                <el-tag type="warning" v-else>Next open day on {{ nextOpeningTime.day }} at {{ nextOpeningTime.time }}</el-tag>
            </div>
            <img src="/store.png" class="store__image"/>
            <div style="padding: 14px;">
                <span v-html="store.description"/>
            </div>
        </el-card>

</template>

<script>
    import { getNextOpeningTime } from "~/utils";

    export default {
        name: 'store',
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
    .store {
        margin-bottom: 50px;
        border-radius: 20px;

        &__image {
            width: 100%;
            display: block;
        }
    }
</style>
