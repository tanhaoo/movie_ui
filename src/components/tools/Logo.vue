<template>
    <div class="logo">
        <a @click="toDashBoard()" target="_blank">
            <img src="~@/assets/movie.png" alt/>
        </a>
    </div>
</template>

<script>

export default {
    name: 'Logo',
    components: {},
    methods: {
        toDashBoard() {
            this.$router.push({path: '/'})
        }
    },
    props: {
        title: {
            type: String,
            default: 'Ant Pro',
            required: false
        },
        showTitle: {
            type: Boolean,
            default: true,
            required: false
        }
    }
}
</script>
