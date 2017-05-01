<style lang="scss" src="./style.scss" scoped></style>

<template>
    <div class="page">
        <div class="scroll-window">
            <div id="scroll-body">
                <p class="item" v-for="item of items">{{item.name}}</p>
            </div>
        </div>
    </div>
</template>

<script src="./vm.js"></script>