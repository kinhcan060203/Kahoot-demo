import React, { Component } from "react";
import autosize from "autosize";
import './TextareaAutoSize.scss'


export default class TextareaAutoSize extends Component {

    componentDidMount() {
        if (this.multilineTextarea) {
            this.multilineTextarea.style.height = 'auto';
        }
    }

    changeTextarea = (e) => {
        this.multilineTextarea.style.height = 'auto';
        this.multilineTextarea.style.height = this.multilineTextarea.scrollHeight + 'px';
        if (this.props.handleOnchangeTexarea) {
            this.props.handleOnchangeTexarea(e.target.value);
        }
    }

    render() {
        return (
            <textarea
                value={this.props.value}
                className='textarea-auto-size'
                placeholder={this.props.placeholder || "Title"}
                onChange={this.changeTextarea}
                ref={ref => this.multilineTextarea = ref}
            />
        );
    }
}