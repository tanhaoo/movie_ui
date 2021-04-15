<template>
    <div>
        <h2>名字</h2>
        <a-input style="width: 800px" size="large" placeholder="输入列表名称" allow-clear v-model="name"/>
    </div>
</template>

<script>
export default {
    name: "step1",
    data() {
        return {
            name: ''
        }
    },
    methods: {
        onChange(e) {
            console.log(e)
        },
        getName() {
            return this.name
        },
    }
}
</script>

<style scoped>

</style>