<template>
    <div class="infinite-spinner">
        <mt-spinner type="fading-circle"></mt-spinner>
    </div>
</template>

<script>
    import Vue from 'vue';
    import { Spinner } from 'mint-ui';

    Vue.component(Spinner.name,Spinner);

    export default {

    }
</script>