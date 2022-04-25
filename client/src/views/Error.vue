<template>

    <div class="alert">
        {{error}}
    </div>

</template>

<script>

    export default {
        name: 'Error',
        props: ['error']
    }

</script>

<style>
.alert{
    color: #940d28;
}
</style>
