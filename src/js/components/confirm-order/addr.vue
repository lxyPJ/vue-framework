<template>
    <div class="addr-wrap">
        <div class="addr-border-wrap">
            <div class="addr-info-box">
                <p class="addr-text">{{addr.contactPerson}} {{addr.contactPhone}}</p>
                <p class="addr-text">{{addr.address}}</p>
            </div>
            <div class="addr-btn-box">
                <a class="addr-btn">修改地址</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        props:{
            addr:{
                type:Object,
                required:true
            }
        }
    }
</script>