import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import './HomeStore.scss'
import YourPro from "./ComponentMygame/YourPro"
import { getAllQuiz } from '../../../ConnectBE/axios'
class HomeStore extends Component {
    constructor(props) {
        super(props)
        this.state = {
            componentRender: <></>,

        }
    }


    async componentDidMount() {
        let creatorId = this.props.match.params.creatorId
        this.setState({ componentRender: <YourPro creatorId={creatorId} /> })
    }
    async componentDidUpdate(prevProps) {

    }

    handleChangeMain = (type) => {
        let creatorId = this.props.match.params.creatorId

        if (type === "my_project") {
            this.setState({ componentRender: <YourPro creatorId={creatorId} /> })
        }
        if (type === "play_the_game") {
            this.setState({ componentRender: <></> })
        }

    }
    render() {

        return (
            <Fragment>

                <div className="container container_home-store">
                    <div className="row wrapper-item">
                        <div className="col-3 side_navigation">
                            <h3>Navigation</h3>
                            <h4 onClick={() => this.handleChangeMain("my_project")}>My Project</h4>
                            <Link to="/user/play_game/validate_pin">
                                <h4 onClick={() => this.handleChangeMain("play_the_game")}>Play the game</h4>
                            </Link>
                        </div>

                        <>
                            {this.state.componentRender}
                        </>
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
export default connect(mapStateToProps, mapDispatchToProps)(HomeStore)


