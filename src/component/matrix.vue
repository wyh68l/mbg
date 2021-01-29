<template>
	<view class="page">
		<canvas id="matrix" class='matrix' canvas-id="matrix"></canvas>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fontSize: 10,
				// w: window.innerWidth||wx.getSystemInfoSync().windowHeight,
				// h: window.innerHeight||wx.getSystemInfoSync().windowHeight,
				// interval: window.innerWidth/10,
				w: 0,
				h: 0,
				interval: 0,
				arr:[],
				devtoolsArr:[],
			};
		},
		onLoad(){
			console.log('onLoad')
		},
		onReady(){
			this.init();
		},
		methods:{
			init(){
				
				let _this = this;
				uni.getSystemInfo({
					success(res){
						console.log('getSystemInfo',res)
						_this.w = res.screenWidth
						_this.h = res.screenHeight
						_this.interval = +_this.w/_this.fontSize
						// console.log('111',_this.w,_this.h,_this.interval)
					}					
				})
				for(let i=0;i<this.interval;i++){
					this.arr[i] = 1
					this.devtoolsArr[i] = []
					
				}
				let state = uni.getSystemInfoSync().platform;
				console.log('state',state)
				
				if(state=='devtools'){
					this.devtoolsInit();
				}else{
					this.uniInit()
				}
				
			},
			devtoolsInit(){
				const ctx = wx.createCanvasContext('matrix')
				setInterval(()=>{
					this.devtoolsCanvas(ctx,this.fontSize)
				},30)
			},
			devtoolsCanvas(ctx,fs){
				for(let i=0;i<this.interval;i++){
					if(Math.random()>0.95){
						this.arr[i] = 0
						this.devtoolsArr[i] = []
					}else{
						this.arr[i] ++
					}
					let str = Math.floor(Math.random()*10)
					let x = i*fs;
					let l = this.devtoolsArr[i].length;
					this.devtoolsArr[i].push(str)
					this.devtoolsArr[i].forEach((v,index)=>[
						this.drawNormalText(ctx,v,x,fs*index,fs,`rgba(256,256,256,${1-0.05*(l-index)})`)
					])
				}
				ctx.draw()
			},
			uniInit(){
				let canvas = document.querySelector('#matrix > canvas')
				let ctx = canvas.getContext('2d')
				setInterval(()=>{
					this.uniCanvas(ctx)
				},30)
			},
			uniCanvas(ctx){
				ctx.fillStyle = "rgba(0,0,0,.1)"
				ctx.fillRect(0,0,this.w,this.h)
				ctx.fillStyle = "pink"
				ctx.font = `${this.fontSize}px`
				for(let i=0;i<this.interval;i++){
					if(Math.random()>0.95){
						this.arr[i] = 1
					}else{
						this.arr[i] ++
					}
					let str = Math.floor(Math.random()*10)
					ctx.fillText(str,i*this.fontSize,this.arr[i]*this.fontSize)
				}
			},
			
			// 绘制只有一行的文字
			drawNormalText(ctx, str, x, y, font, style, align, baseLine) {
				// ctx.setFontSize(font * scale);
				// console.log('drawNormalText',ctx, str, x, y, font, style)
				ctx.setFontSize(font);
				ctx.setFillStyle(style);
				ctx.setTextAlign(align||'center');
				ctx.setTextBaseline(baseLine||'middle');
				ctx.fillText(str, x, y);
			},
		}
	}
</script>

<style lang="scss">
	.page{
		width: 100%;
		height: 100%;
		.matrix{
			width: 100%;
			height: 100vh;
			background-color: #000;
		}
	}
</style>
