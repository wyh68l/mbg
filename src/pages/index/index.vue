<template>
    <div class="content">
        <ToolsList></ToolsList>
    </div>
</template>

<script>
    import ToolsList from '@component/ToolsList'
    export default {
        components:{ToolsList},
        name: "Tools",
        data(){
            return {

            }
        },
        created(){

        },
        methods:{

        }
    }
</script>

<style>
    page{
        /*height: 100%;*/

    }
</style>
<style lang="scss" scoped>
    .content {
        background: linear-gradient(to bottom, rgb(35, 37, 38), rgb(65, 67, 69));
        padding: 80upx 0;
        /*padding-bottom: 100upx;*/
    }
</style>
