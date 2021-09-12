import 'react-hot-loader/patch';

import React from "react";
import ReactDom from "react-dom";

import { AppContainer } from 'react-hot-loader';

import App from "./App";

import './style/app.less'

const render = () => {
    ReactDom.render(
        <AppContainer>
            <App />
        </AppContainer>,
        document.querySelector('#app')
    )
}

render()

if (module.hot) module.hot.accept('./App', render)



// 深层 文件是否监听得到???
// 如果开启了 HMR 监听文件变化 style-loader 自带 HMR

// if (module.hot) {
//     // 监听此文件变化 webpack 不会打包构建
//     module.hot.accept('@/views/testHmr', () => {
//         console.log('变')
//     })
// }