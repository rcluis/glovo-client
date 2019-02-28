import Vue from 'vue'
import VueMq from 'vue-mq'

export default () => {
    Vue.use(VueMq, {
        breakpoints: {
            xs: 768,
            sm: 992,
            md: 1200,
            lg: Infinity
        }
    })
}
