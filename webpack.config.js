const path = require ('path');
const VueLoaderPlugin = require ('vue-loader/lib/plugin');
const HTMLPlugin=require('html-webpack-plugin');
const webpack=require('webpack');
const ExtractPlugin=require('extract-text-webpack-plugin')

const isDev=process.env.NODE_ENV==="development";

//通过node模块操作，向外面暴露一个配置对象
const config = {
    target:'web',
    entry:path.join(__dirname,'src/index.js'),//打包入口  __dirname绝对路径
    output:{ //打包后的文件
        filename:'bundle.[hash:8].js', //打包好文件的文件名
        path:path.join(__dirname,'dist')
    },
    module:{  //这个节点用于配置所有的第三方模块加载器
        rules:[
            {
                test:/\.vue$/,
                use:'vue-loader'
            },
            {
                test:/\.jsx$/,
                use:['babel-loader']
            },
            {
                test:/\.(jpg|png|gif|jpeg|svg)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            limit:1024,
                            name:'[name]-aaa.[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // make sure to include the plugin for the magic
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV:isDev?'"development"':'"production"'
            }
        }),
        new HTMLPlugin()
    ],
    //mode:'development'   //设置mode

}

if(isDev){
    config.module.rules.push({  
        //css预处理器  stylus
        test:/\.styl/,
        use:[
            'style-loader',
            'css-loader',
            {
                loader:'postcss-loader',
                options:{
                    sourceMap:true
                }
            },
            'stylus-loader'
        ]
    })
    config.devtool='#cheap-module-eval-source-map'
    config.devServer={
        port:8010,
        host:'0.0.0.0',
        overlay:{//显示webpack编译过程中的错误
            errors:true,  
        },
        hot:true,   //热加载
        //open:true,   //自动打开浏览器
    }
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}else{
     config.output.filename='[name].[chunkhash:8].js'
     config.module.rules.push(
         {
            test:/\.styl/,
            use:ExtractPlugin.extract({
                fallback:'style-loader',
                use:[
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options:{
                            sourceMap:true
                        }
                    },
                    'stylus-loader'
                ]
            })
        },
    )
    config.plugins.push(
        new ExtractPlugin('styles.[md5:contentHash:hex:8].css')
    )
}

module.exports=config;
