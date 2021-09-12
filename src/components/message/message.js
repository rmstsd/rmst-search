import React from "react";
import ReactDom from "react-dom";
import MessageWrapper from "./MessageWrapper";

export const tmessage = (() => {
    let el = document.querySelector('.msg-container')

    if (!el) {
        el = document.createElement('div')
        el.className = 'msg-container'
        document.body.append(el)
    }

    const wrapper = ReactDom.render(
        <MessageWrapper />,
        el
    )

    return {
        info: () => {
            console.log(wrapper)
            wrapper.add()
        }
    }
})()