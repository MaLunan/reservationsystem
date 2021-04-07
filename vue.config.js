module.exports = {
    //  基本路径
    publicPath: "./",
    //  构建时的输出目录
    outputDir: "dist",
    //  放置静态资源的目录
    assetsDir: "static",
    //  html 的输出路径
    indexPath: "index.html",


    productionSourceMap: false,

    configureWebpack: () => {}, //(Object | Function)

    chainWebpack: () => {},


    devServer: {

        open: true,

        host: '0.0.0.0',

        port: 8090,

        https: false,

        // proxy: {

            // '/api': {

            //     target: "http://app.rmsdmedia.com",

            //     changeOrigin: true,//开启代理  在本地创造一个虚拟服务端
            //      ws:true//是否启用Websockets

            //     secure: false,

            //     pathRewrite: {

            //         "^/api": ""

            //     }

            // },

            // '/foo': {

            //     target: '<other_url>'

            // }

        // }, // string | Object

        // before: app => {}

    },

}