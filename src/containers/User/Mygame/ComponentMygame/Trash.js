import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import './Trash.scss'
class Trash extends Component {
    constructor(props) {
        super(props)
        this.toggle = this.toggle.bind(this);
        this.state = {
            copySuccess: "",
            isOpen: false,
        }
    }
    toggle = () => {
        this.setState({
            isOpen: false
        });
    }

    handleClick = () => {
        this.setState({
            isOpen: true
        }, () => {
            const myTimeout = setTimeout(() => {
                this.setState({
                    isOpen: false
                })
            }, 1500);

        });
    }


    copyToClipboard = (e) => {
        this.textArea.select();
        document.execCommand('copy');
        // This is just personal preference.
        // I prefer to not show the the whole text area selected.
        e.target.focus();
        this.setState({ copySuccess: 'Copied!' });
    };


    render() {

        return (
            <Fragment>


                <div className="col-9 row popover_wrapper">
                  
                


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
export default connect(mapStateToProps, mapDispatchToProps)(Trash)


