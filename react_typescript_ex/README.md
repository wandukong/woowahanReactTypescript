## 우아한 테크러닝 React&Typescript 6회차 (2020.09.17) - Webpack & React + Typescript


### Webpack

**webpack**은 일반적으로 `webpack.config.js`라는 이름을 갖는 설정 파일을 갖는다.  
Webpack이 config 파일을 읽어서 config 객체를 export하는데 이걸 Webpack이 받아서 처리한다.

```javascript
const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { TsconfigPathsPlugin } = require("tsconfig-paths-webpack-plugin");
```
node에서 실행되기 때문에 모듈을 import하기 위해 require를 사용해야한다.  


#### Entry

```javascript
const config = {
    // ...
    entry: {
        main: ["core-js", "./src/index.tsx"],
    },
    // ...
};
```
Webpack 설정의 entry는 실행 시 진입점을 가리키는 첫번째 파일을 기술한다.  


#### Loader

```javascript
const config = {
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                include: path.resolve('src'), 
                exclude: /node_modules/, 
                use: {
                loader: 'babel-loader', 
                },
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: 'file-loader',
                options: {                 
                name: '[name].[ext]',
                outputPath: './images/',
                },
            },
        ],
  },
};
```
어떤 파일들을 포함 시킬지(test), 포함시킬 파일들(include), 제외시킬 파일들(exclude),  
읽어들일 파일들을 어느 로더를 사용할 것인지(loader) 작성한다.  
options는 각 loader에 맞게 설정한다.  

#### Plugin

```javascript
const config = {
    // ...
    plugins: [
        new webpack.SourceMapDevToolPlugin({}),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public/index.html"),
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
        }),
    ],
    // ...
};
```
plugin은 loader가 프로세스가 다 끝난 후 실행되게 된다.  
loader의 결과물을 가지고 실행한다.  
Plugin은 loader보다 더 복잡하며 훨씬 더 많은 일을 할 수 있다.  
