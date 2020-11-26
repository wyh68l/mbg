const target4 = 'https://wyh68l.cn/';
const target5 = 'http://www.dbbqb.com';
module.exports = {
    configureWebpack: {
        resolve: {
            //创建别名，可以方便写路径，@为src
            alias: {
                '@assets': 'assets',
                '@common': 'common',
                '@components': 'component',
                '@serves': 'serves',
                '@pages': 'pages',
                '@static': 'static',
                '@tools': 'tools'
            }
        }
    },
    // devServer: {
    //     port: 8080,
    //     // 设置代理
    //     proxy: {
    //         // 如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求代理到 API 服务器。这个问题可以通过 vue.config.js 中的 devServer.proxy 选项来配置。
    //         "/api": {
    //             //你要跨域的域名(包含host、端口号,切记：一定要带上http头);
    //             //同一个域名只能设置一次跨域，否则重复报错！
    //             target: target4,
    //             ws: true,
    //             changOrigin: true, //是否跨域，设置为true;(必须)
    //             // pathRewrite:{
    //             //     '^/api':''
    //             // }
    //         },
    //         "/bqb": {
    //             //你要跨域的域名(包含host、端口号,切记：一定要带上http头);
    //             //同一个域名只能设置一次跨域，否则重复报错！
    //             target: target5,
    //             ws: true,
    //             changOrigin: true, //是否跨域，设置为true;(必须)
    //             pathRewrite:{
    //                 '^/bqb':'api'
    //             }
    //         },
    //     },
    // }
}
