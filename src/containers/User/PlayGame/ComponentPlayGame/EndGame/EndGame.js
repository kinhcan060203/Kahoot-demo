import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import './EndGame.scss'


class EndGame extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount() {
    }



    render() {

        return (
            <Fragment>
                <div className="wrapper_end_game">
                    <div className="context_end_game">
                        <h1 className="heading_text">End Game</h1>
                        <h1 className="side_text">Thanks for all of Your Effort!!!!</h1>
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
export default connect(mapStateToProps, mapDispatchToProps)(EndGame)


