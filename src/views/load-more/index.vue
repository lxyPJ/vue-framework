<style lang="scss" src="./style.scss" scoped></style>

<template>
    <div style="position: absolute; top:0; bottom:0; left:0; right:0;">
        <mt-header title="下拉刷新"></mt-header>
        <div class="mt-scroll-body">
            <mt-loadmore ref="loadmore" :auto-fill="false" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded">
                <div>
                    <p class="item" v-for="item of items">{{item.name}}</p>
                </div>
            </mt-loadmore>
        </div>
    </div>
</template>

<script src="./vm.js"></script>