/**
 * https://webpack.js.org/contribute/writers-guide/
 */
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

const config = {
  context: path.resolve(__dirname, '.'),

  entry: { // 첫번째 파일을 기술한다.
    main: ['core-js', `./src/index.tsx`],
  },

  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].js',
  },

  devtool: 'source-map',

  devServer: {
    contentBase: path.resolve('./build'),
    hot: true,
    port: 9000,
  },

  resolve: {
    modules: [
      path.resolve(__dirname, './src'),
      path.resolve(__dirname, './node_modules'),
    ],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      react: require.resolve('react'),
    },
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, './tsconfig.json'),
      }),
    ],
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/, // 어떤 파일들을 포함 시킬지
        include: path.resolve('src'), // 포함시킬 파일들
        exclude: /node_modules/, // 제외시킬 파일들
        use: {
          loader: 'babel-loader', // 읽어들일 파일들을 어느 로더를 사용할 것인지
        },
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
        options: {                  // 옵션은 각 로더에 맞게 설정.
          name: '[name].[ext]',
          outputPath: './images/',
        },
      },
    ],
  },

  plugins: [
    new webpack.SourceMapDevToolPlugin({}),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],

  optimization: {
    minimize: false,
  },
};

module.exports = config;


// webpack.config.js 파일은 javascript 파일이다.
// 노드의 실행파일이다. 그래서 require을 사용하여 모듈을 임포트한다.
// Webpack이 config 파일을 읽어서 config 객체를 export하는데 이걸 웹팩이 받아서 
// 여기 안에 있는 내용대로, 애플리케이션 셋팅이 대다수
// 이대로 실행시킨다.

// 첫번째 실행되는 파일들을 읽은 애들을 loadr에 던져준다
// loader는 그것을 받아서 처리한후, return한다.
// 그 다음 loader가 다시 받아서, 처리한다. (middleware랑 비슷)
// 각 loader들도  설정파일이 있다.

// plugin들은 loader의 프로세스가 다 끝난 상태에서 실행된다.
// loader의 결과물을 가지고 실행한다.




webpack 