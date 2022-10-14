import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import './Transpose.scss'
class Transpose extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count_down: 3,

        }
    }
    componentDidMount() {
        this.setTimeCountDown()
    }
    componentDidUpdate(prevProps) {


    }


    setTimeCountDown = () => {
        let myTimeOut;
        if (this.state.count_down !== -1) {
            myTimeOut = setTimeout(() => {
                this.setState({
                    count_down: this.state.count_down - 1
                }, () => {
                    clearTimeout(myTimeOut)
                    this.setTimeCountDown()
                })
            }, 1000)
        }
        
        else {
            clearTimeout(myTimeOut)
            this.props.handleTimeOff()
        }
    }



    render() {
        let count_down = this.state.count_down
        count_down = count_down > -1 ? count_down : 0
        return (
            <Fragment>
                <div className="Transpose_count_down">
                    <div className="Transpose_clock">
                        {count_down}
                    </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Transpose)


