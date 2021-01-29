<template>
    <view class="page">

        <!--#ifdef MP-WEIXIN || H5-->
        <view class="tip animated fadeInUp">
            <image src="../../static/logo.jpg" v-if="!hasUserInfo"></image>
            <image :src="userInfo.avatarUrl" v-else></image>
            <text>关注我！你就是最靓的崽！</text>
        </view>
        <!--#endif-->

        <view class="about animated fadeInUp">
            <!--#ifdef MP-WEIXIN-->
            <view class="box">
                <button class="share" open-type="getUserInfo" @getuserinfo="login" v-if="!hasUserInfo">登录</button>
                <button class="share" open-type="share">转发小程序</button>
            </view>
            <div v-html="aboutInfo"></div>
            <!--#endif-->
        </view>


        <view class="money animated fadeInUp">
            <view style="text-align: center;">
                <image :src="imgList[0]" @tap="imgView" :data-src="imgList[0]"></image>
                <text>更多功能小程序</text>
            </view>
            <view style="text-align: center;">
                <image :src="imgList[1]" @tap="imgView" :data-src="imgList[1]"></image>
                <text>更有趣的公众号</text>
            </view>
        </view>

        <official-account class="gzh"></official-account>
    </view>
</template>

<script>
    import {getApkUrl,getVersion,getAboutInfo} from 'serves/main'
    export default {
        name: "more",
        components:{
        },
        data(){
            return {
                imgList: [
                    `${this.$baseUrl}/api/download/images?name=wechat&type=jpg`,
                    `${this.$baseUrl}/api/download/images?name=wechat_gzh&type=jpg`,
                ],
                appImgList:[this.$baseUrl+'api/download/wechat'],
                apkUrl:'https://wws.lanzous.com/ihU7Dh0b3ta',
                version: 103,
                updateAppUrl:'',
                isUpdate:false,
                aboutInfo:'',
                hasUserInfo: false,
                userInfo:null,
            }
        },
        onLoad(){
            //#ifdef MP-WEIXIN
            wx.showShareMenu({
                withShareTicket: true
            })
            //#endif
        },
        created(){
            this.getAboutInfo();
        },
        methods:{
            imgView(event){
                let currentUrl = event.currentTarget.dataset.src;
                console.log(currentUrl);
                let that = this;
                wx.previewImage({
                    current: currentUrl, // 当前显示图片的http链接
                    urls: that.imgList // 需要预览的图片http链接列表
                })
            },
            login(e){
                let that = this;
                wx.getStorage({
                    key: 'userInfo',
                    success(res) {
                        if (res) {
                            //this.setData想data里面存入数据
                            console.log(res.data);
                            that.userInfo = res.data;
                            that.hasUserInfo = true;
                        }
                    },
                    fail(res) {
                        if (e.detail.userInfo) {
                            wx.setStorage({
                                key: "userInfo",
                                data: e.detail.userInfo
                            })
                            that.userInfo = e.detail.userInfo;
                            that.hasUserInfo = true;
                        } else {
                            that.hasUserInfo = true;
                        }
                    }
                })
            },
            getAboutInfo(){
                getAboutInfo({type:'MBG'}).then(res=>{
                    let result = res.data.data;
                    if(res.data.status === 200 && result.flag){
                        this.aboutInfo = result.aboutInfo2;
                    }else {
                        wx.showToast({
                            title: result.msg,
                            icon: 'none',
                            duration: 2000
                        })
                    }
                })
            },
            copy(){
                //#ifdef MP-WEIXIN
                let that = this;
                /*wx.setClipboardData设置剪贴板*/
                wx.setClipboardData({
                    data: this.apkUrl,
                    success (res) {
                    },
                    fail(res) {
                        that.tips = '诶呀,再试下吧'
                        wx.showToast({
                            title: that.tips,
                            icon: 'none',
                            duration: 2000
                        })
                    }
                })
                //#endif

                //#ifdef APP-PLUS
                uni.setClipboardData({
                    data:this.apkUrl,//要被复制的内容
                    success:()=>{//复制成功的回调函数
                        uni.showToast({//提示
                            title:'复制成功'
                        })
                    },
                    fail:()=>{
                        uni.showToast({//提示
                            title:'诶呀 再试下吧'
                        })
                    }
                });
                //#endif

                //#ifdef H5
                /*使用插件复制*/
                this.$copyText(this.apkUrl).then((e)=>{
                    this.tips = '复制成功咯'
                    wx.showToast({
                        title: this.tips,
                        icon: 'success',
                        duration: 2000
                    })
                    console.log(e)
                }, (e)=> {
                    this.tips = '诶呀,再试下吧'
                    wx.showToast({
                        title: this.tips,
                        icon: 'none',
                        duration: 2000
                    })
                    console.log(e)
                })
                //#endif
            }
        }
    }
</script>

<style>
    page {
        /* linear-gradient(to right, rgb(131, 164, 212), rgb(182, 251, 255)); 渐变蓝*/
        /*rgb(242, 112, 156), rgb(255, 148, 114)渐变红*/
        background: linear-gradient(to bottom, rgb(131, 164, 212), rgb(182, 191, 195));
        /*background-size: cover;*/
        height: 100%;
    }
</style>
<style scoped lang="scss">
    .page{
        padding-top: 20upx;

        .tip{
            width: 500upx;
            height: 150px;
            text-align: center;
            margin: 0 auto;
            border: 1px solid #fff;
            border-radius: 8px;
            padding-top: 20px;


            image{
                width: 120upx;
                height: 120upx;
                border-radius: 50%;
            }

            text{
                margin-top: 10px;
                display: block;
                color: #fff;
                font-size: 36upx;
            }
        }

        .about{
            text-align: center;
            margin-top: 30upx;
            ::v-deep p{
                color: #fff;
                font-size: 30upx;
                display: block;
                margin-bottom: 5px;
            }
            .box{
                display: flex;
                justify-content: space-between;
                width: 70%;
                align-items: center;
                margin: 0 auto;
                margin-bottom: 30upx;

                .share{
                    color: #fff;
                    font-size: 28upx;
                    z-index: 2;
                    padding: 0;
                    border: 1px solid #fff;
                    border-radius: 8px;
                    background:initial;
                    outline: none;
                    text-align: center;
                    height: 35px;
                    line-height: 35px;
                    margin-bottom: 5px;
                    width: 200upx;

                    &:after{
                        border: none;
                    }
                }
            }

        }

        .money{
            width: 70%;
            display: flex;
            margin: 0 auto;
            margin-top: 40px;
            justify-content: space-between;

            image{
                width: 200upx;
                height: 200upx;
            }
            text{
                display: block;
                text-align: center;
                color: #fff;
                font-size: 28upx;
            }
        }
        .gzh{
            position: absolute;
            left: 0;
            bottom: 0;
        }
    }

</style>
