<style lang="scss" src="./style.scss" scoped></style>

<template>
    <div class="page">
        <div class="scroll-window">
            <div id="scroll-body">
                <msg title="測試" description="vux真是个垃圾"></msg>
                <p class="item" v-for="city of items">{{city.name}}</p>
            </div>
        </div>
    </div>
</template>

<script src="./vm.js"></script>