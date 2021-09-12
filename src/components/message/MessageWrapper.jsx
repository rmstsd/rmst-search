
import React from 'react'

class MessageWrapper extends React.Component {
    state = {
        list: []
    }
    add = () => {
        this.setState({ list: this.state.list.concat('哈哈') })
    }
    render() {
        return (
            <div className="item" style={{ position: 'fixed', top: 0 }}>
                {this.state.list.map((x, idx) =>
                    <div key={idx} onAnimationEnd={() => { }}>{x}</div>
                )}
            </div>
        )
    }
}

export default MessageWrapper