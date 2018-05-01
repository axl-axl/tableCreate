module.exports={
    entry:{
        index:'./index.js'
    },
    output:{
        filename:'[name].min.js'
    },
    module:{
        rules:[
            {
				test:/\.js$/,
				use:[
					{
						loader:'babel-loader',
						options:{
							presets:['es2015']
						}
					}
				]
			},
			{
				test:/\.scss$/,
				use:['style-loader','css-loader','sass-loader']
			},
			{
				test:/\.(png|jpg|jpeg)$/,
				use:['url-loader?limit=50000']
			}
        ]
    }
}