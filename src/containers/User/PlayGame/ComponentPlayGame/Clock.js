import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import './Clock.scss'

const styleInline = {
    transitionProperty: "all",
    transitionDuration: "0.8s",
    transform: "scale(2)",
    color: "red"

}
class Clock extends Component {
    constructor(props) {
        super(props)
        this.state = {
            count_down: 5,
            animateTime: true,
        }
    }
    componentDidMount() {
    }
    componentDidUpdate(prevProps) {
        if (this.props.currentId !== prevProps.currentId) {
            this.setState({ count_down: this.props.count_down }, () => {
                this.setTimeCountDown()
                this.setAnimateTime()
            })
        }
    }

    setAnimateTime = () => {
        let currentTime = this.state.count_down

        if (currentTime < 4) {
            this.setState({ animateTime: !this.state.animateTime }, () => {
                let myTimeOut = setTimeout(() => {
                    this.setState({ animateTime: !this.state.animateTime })
                    clearTimeout(myTimeOut)

                }, 500)
            })

        }
    }
    setTimeCountDown = () => {
        let myTimeOut;
        if (this.state.count_down !== -1) {

            myTimeOut = setTimeout(() => {
                this.setState({
                    count_down: this.state.count_down - 1,
                }, () => {
                    this.setTimeCountDown()
                    this.setAnimateTime()
                    clearTimeout(myTimeOut)
                })
            }, 1000)
        }
        else {
            clearTimeout(myTimeOut)
            this.props.handleTimeOff()
        }
    }



    render() {
        let { animateTime, count_down } = this.state
        count_down = count_down > -1 ? count_down : 0
        console.log(animateTime)
        return (
            <Fragment>
                <div className="clock_count_down">

                    <p style={(!animateTime ? styleInline : {})}>
                        {count_down}
                    </p>
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
export default connect(mapStateToProps, mapDispatchToProps)(Clock)


