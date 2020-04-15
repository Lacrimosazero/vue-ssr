const path = require ('path');
const VueLoaderPlugin = require ('vue-loader/lib/plugin');

//通过node模块操作，向外面暴露一个配置对象
module.exports = {
    entry:path.join(__dirname,'src/index.js'),//打包入口  __dirname绝对路径
    output:{ //打包后的文件
        filename:'bundle.js', //打包好文件的文件名     不能指定为绝对路径
        path:path.join(__dirname,'dist')
    },
    module:{  //这个节点用于配置所有的第三方模块加载器
        rules:[
            {
                test:/\.vue$/,
                use:'vue-loader'
            },
            {  //vue-loader@15.*之后必须带有VueLoaderPlugin 并单独配置css-loader
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {  //css预处理器
                test:/\.styl/,
                use:['style-loader','css-loader','stylus-loader']
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
        new VueLoaderPlugin()
    ],
    //mode:'development'   //设置mode

}
