import React, { Component, Fragment } from "react"
import DatePickerComponent from './prevProject/DatePicker'
import './Login.scss'
import Select from 'react-select';
import { handleLogin } from '../ConnectBE/axios'
import { toast } from 'react-toastify';
import HomeHeader from '../components/prevProject/HomeHeader'
import { connect } from "react-redux";
import * as actions from '../store/actions'
const options = [
    { value: 'Female', label: 'Female' },
    { value: 'Male', label: 'Male' },
    { value: 'Other', label: 'Other' },
];



class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
        }
    }

    componentDidMount() {
    }

    handleOnchangeInput = (event, name) => {
        if (event && name) {
            this.setState({
                [name]: event.target.value
            })
        }
    }
    handleCheckValid = () => {
        let isCheck = ['email', 'password']
        let isValid = isCheck.find(item => !this.state[item])
        if (isValid) {
            alert(isValid)
        }
        return isValid
    }


    handleSubmitForm = async (e) => {
        e.preventDefault()
        let isValid = !this.handleCheckValid()
        
        if (isValid) {
            let res = await handleLogin(this.state)
            if (res && res.errCode === 0) {
                toast.success("Login success!!!")

                this.props.history.push('/');
                this.props.login(res.info)
                this.setState({
                    email: '',
                    password: '',
                })
            } else {
                toast.error(res.errMessage)

            }
        }
    }

    render() {
        return (


            <>
                <HomeHeader
                    banner={false}
                    isShowButtonExtra={false}
                />
                <div className="page-wrapper bg-red p-t-80 p-b-50 font-robo">
                    <div className="wrapper wrapper--w960">
                        <div className="card card-2">
                            <div className="card-heading"></div>
                            <div className="card-body">
                                <h2 className="title">Login</h2>
                                <form >
                                    <div className="input-group">
                                        <div className="rs-select2 js-select-simple select--no-search">
                                            <input
                                                onChange={(event) => this.handleOnchangeInput(event, "email")}
                                                value={this.state.email}
                                                className="input--style-2 input-login" type="text" placeholder="Email" name="email" />
                                        </div>

                                    </div>
                                    <div className="input-group">
                                        <div className="rs-select2 js-select-simple select--no-search">
                                            <input
                                                onChange={(event) => this.handleOnchangeInput(event, "password")}
                                                value={this.state.password}
                                                className="input--style-2 input-login" type="text" placeholder="Password" name="password" />
                                        </div>
                                    </div>

                                    <div className="input-group">
                                        <button
                                            onClick={(e) => this.handleSubmitForm(e)}
                                            className="btn btn--radius btn--green" type="submit">Login
                                        </button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>

        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
        login: (info) => dispatch(actions.login(info))
    }
}
const mapStateToProps = (state) => {
    return {
        info: state.user.info
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)

