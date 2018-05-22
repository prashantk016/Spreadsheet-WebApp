const path = require('path');

module.exports = {
  entry: {
	  main: './src/index.js'
  },
   devtool: 'inline-source-map',
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'dist')
  },
 module: {	
     rules: [
       {
         test: /\.css$/,
         use: [
           'style-loader',
           'css-loader'
         ]
       },
	    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }
    }
     ]
   }
};