let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let OptimizeCss = require('optimize-css-assets-webpack-plugin');
let UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    optimization: { //优化项
        minimizer: [
            new UglifyjsWebpackPlugin({
                cache: true, //是否用缓存
                parallel: true, //是否是并发打包的，可以一下打包多个
                sourceMap: true
            }),
            new OptimizeCss()
        ]
    },
    devServer: { //本地server环境
        progress: true,
        contentBase: './public',
        compress: true,
        open: true //自动打开浏览器
    },
    mode: 'production', //模式  默认有两种模式 production development
    entry: './app/main.js', //已多次提及的唯一入口文件
    output: {
        path: path.resolve(__dirname, 'public'), //打包后的文件存放的地方
        filename: 'bundle.js' //打包后输出文件的文件名
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './app/index.html',
            filename: 'index.html',
            minify: {
                // removeAttributeQuotes: true,
                // collapseWhitespace: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'all.css'
        })
    ],
    module: { //模块
        rules: [ //规则    使用css-loder  解析 @import 这种语法的；
            //style-loader 它是把css样式插入的head的标签中；
            //loader 的特点，希望单一
            //loader 的用法：字符串 只用一个 loaders
            //              多个 loader 使用数组
            //loader 的顺序，默认是从右向左执行  从下到上执行
            //loader 还可以写成对象的方式
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: { //用 babel-loader 需要把es6转换成es5
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties'
                        ]
                    }
                }]
            }
        ]
    }
}