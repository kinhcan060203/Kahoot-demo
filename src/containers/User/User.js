import React, { Component, Fragment } from "react"
import './User.scss'
import HomeHeader from '../../components/prevProject/HomeHeader'
import Register from '../../components/Register'
import Login from '../../components/Login'
import PlayGame from './PlayGame/PlayGame'
import Mygame from '../../containers/User/Mygame/Mygame'

import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

class User extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <>

                <Switch>
                    <Route path="/user/register" component={Register} />
                    <Route path="/user/login" component={Login} />
                    <Route path="/user/mygame" component={Mygame} />
                    <Route path="/user/play_game" component={PlayGame} />


                </Switch>
            </>
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
export default connect(mapStateToProps, mapDispatchToProps)(User)


