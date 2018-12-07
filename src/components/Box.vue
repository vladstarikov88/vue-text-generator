<template>
    <div class="box">
        <div class="box__header">
            <h2 class="box__header_title">{{title}}</h2>
        </div>
        <div class="box__body">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: 'Title'
        }
    }
}
</script>

<style scoped lang="scss">
    .box{
        position: relative;
        padding: 1em;
        margin: 1em 0;
        min-height: 3em;
        box-shadow:  2px 2px 3px 1px rgba(0, 0, 0, .3);
        transition: box-shadow .2s;
        &:hover{
            box-shadow:  4px 4px 3px 1px rgba(0, 0, 0, .3);
        }
    }
</style>
