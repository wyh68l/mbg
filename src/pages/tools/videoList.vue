<template>
    <view class="page">
        <swiper vertical duration="200" @change="slide" style='width:100%;background:#000' :style="{'height':screenheight+'px'}">
            <block v-for="(item,index) in videoList" :key="index">
                <swiper-item style="height:100%; width:100%">
                    <video v-if="index==changeIndex" style="height:100%; width:100%" :src="item.url" autoplay="true" v-show="!isAD" />
                    <ad-custom unit-id="adunit-a4fe1ef63f8a0b13" class="AD" v-show="isAD"></ad-custom>
                </swiper-item>
            </block>
        </swiper>
    </view>
</template>

<script>
    import {getRandomVideoMy,getVersion,getRandomVideoMBG} from '@serves/main'
    export default {
        name: "videoList",
        data(){
            return {
                changeIndex: 0,
                screenheight:0,
                videoList: [],
                typeMY:'',//视频的参数
                videoType:0,//0为普通视频，1为刺激视频
                videoNum:0,
                isAD:false,
                sum:0
            }
        },
        onShow(){
            this.getVersion();
            this.screenheight = this.screenHeight;
        },
        methods:{
            //划动切换
            slide(e) {
                console.log('sas');
                this.changeIndex = e.detail.current
                this.sum+=1;
                this.videoNum = 1;
                if(parseInt(this.sum%4) == 0){
                    this.isAD = true;
                }else {
                    this.isAD = false;
                }
                if(this.videoType){
                    this.getRandomVideoMy();//获取视频
                }else {
                    this.getRandomVideoMBG();
                }
            },
            getRandomVideoMy(){
                if(this.videoNum >= 2){return false;}
                getRandomVideoMy({type:this.type}).then(res=>{
                    let result = res.data;
                    console.log(result);
                    if (result.status === 200) {
                        let obj = {};
                        obj.url = result.data.url;
                        this.videoList.push(obj);
                        this.videoNum+=1;
                        this.getRandomVideoMy();
                    }
                })
            },
            getRandomVideoMBG(){
                if(this.videoNum >= 2){return false;}
                let arr = ['网红','明星','热舞','风景','游戏','动物']
                let num = parseInt(Math.random()*5);
                getRandomVideoMBG({type:arr[num]}).then(res=>{
                    let result = res.data;
                    if(result.indexOf('播放链接') !== -1){
                        let obj = {};
                        obj.url = result.slice(result.indexOf('播放链接')+5);
                        console.log(obj.url);
                        this.videoList.push(obj);
                        this.videoNum+=1;
                        this.getRandomVideoMBG();
                    }
                })
            },
            getVersion() {
                let options = {
                    appName: 'version_MBG'
                }
                getVersion(options).then(res => {
                    let result = res.data.data;
                    if (res.data.status === 200) {
                        this.typeMY = decodeURI(decodeURI(result.type))//解密编码
                        this.videoType = result.videoType;
                    }
                    if(this.videoType){
                        this.getRandomVideoMy();//获取视频
                    }else {
                        this.getRandomVideoMBG();
                    }
                })
            },
        },
        components:{

        }
    }
</script>

<style scoped lang="scss">
.page{
    .AD{
        width: 100%;
        height: 100%;
    }
}
</style>
