import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { confirmPIN } from '../../../../ConnectBE/axios'
import './ConfirmPlayGame.scss'
import { toast } from 'react-toastify';
class ConfirmPlayGame extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pin: ''
        }
    }
    handleOnChange = (e) => {
        let pin = e.target.value

        this.setState({ pin: pin })
    }
    handleSubmitPIN = async () => {
        let pin = this.state.pin
        let res = await confirmPIN(pin)
        console.log("res", res)
        if (res && res.errCode === 0) {

            toast.success("Access Quiz Success!!!")
            this.props.history.push(`/user/play_game/${pin}`);
        } else {
            toast.error(res.errMessage)
        }
    }
    render() {
        let { pin } = this.state
        return (
            <Fragment>
                <div className="wrapper_main">
                    <div className="logo_kahoot">

                    </div>
                    <div className="confirm_wrapper">


                        <div className="form_confirm_pin">
                            <input
                                type="text"
                                className="confirm_id"
                                placeholder="Code PIN du jeu..."
                                name="PIN"
                                required
                                onChange={(e) => this.handleOnChange(e)}
                            />
                            <input onClick={() => this.handleSubmitPIN()} type="submit" value="Valider" className="btn_confirm_id" />


                        </div>


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
export default connect(mapStateToProps, mapDispatchToProps)(ConfirmPlayGame)


