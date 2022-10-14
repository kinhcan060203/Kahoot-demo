import React, { Component, Fragment } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ConfirmPlayGame from "../PlayGame/ComponentPlayGame/ConfirmPlayGame"
import PlayGameInterface from "../PlayGame/ComponentPlayGame/PlayGameInterface"
import HomeHeader from "../../../components/prevProject/HomeHeader"
import { connect } from "react-redux";
import _ from "lodash"



class PlayGame extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidUpdate(prevProps) {

    }
    componentDidMount() {
    }
    render() {
        return (
            <Fragment>
                <HomeHeader
                    banner={false}
                    isShowButtonExtra={true}
                />
                <Switch>
                    <Route path="/user/play_game/validate_pin" component={ConfirmPlayGame} />
                    <Route path="/user/play_game/:token" component={PlayGameInterface} />


                </Switch>
            </Fragment>
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
export default connect(mapStateToProps, mapDispatchToProps)(PlayGame)


