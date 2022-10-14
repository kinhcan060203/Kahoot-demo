import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import './CopyLink.scss'
class CopyLink extends Component {
    constructor(props) {
        super(props)
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
        }
    }
    toggle = () => {
        this.setState({
            isOpen: false
        });
    }

    handleClick = (e) => {
        this.copyToClipboard(e)

    }
    NotifySuccess = () => {

    }

    copyToClipboard = (value) => {


        var text = value;
        navigator.clipboard.writeText(text).then(() => {
            this.setState({
                isOpen: true
            }, () => {
                const myTimeout = setTimeout(() => {
                    this.setState({
                        isOpen: false
                    })
                }, 2000);

            });
        }, function (err) {
            console.log("Don't copy text!!!")
        });
    };


    render() {
        let { value, notify_success } = this.props
        return (
            <Fragment>


                <div className="row popover_wrapper">
                    <div className="field">
                        ID:
                    </div>
                    <textarea
                        disabled
                        ref={(textarea) => this.textArea = textarea}
                        className="form-control form_link"
                        value={value}
                    />
                    <span
                        id="_textarea"
                        class="wrapper_btn_copy_link"
                        onClick={() => this.copyToClipboard(value)}
                    >
                        <i
                            className="fas fa-copy btn_copy_link">
                        </i>
                    </span>
                    <Popover className="popover" placement="bottom" target="_textarea" isOpen={this.state.isOpen} onClick={this.toggle} >
                        <PopoverBody>
                            {notify_success}
                        </PopoverBody>
                    </Popover>

                </div>
            </Fragment >
        )
    }

}
const mapDispatchToProps = dispatch => {
    return {

    }
}
const mapStateToProps = (state) => {
    return {
        info: state.user.info
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CopyLink)


