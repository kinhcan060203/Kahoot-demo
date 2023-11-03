import React, { Component, Fragment } from "react"
import './HomeHeader.scss'
import Register from '../Register'
import DatePickerComponent from './DatePicker'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
class HomeHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dateSelected: '',
            info_user: {},
        }
    }

    OnchangeDateFromParent = (date) => {
        this.setState({
            dateSelected: date
        })
    }
    handleReturnHome = () => {
    }

    componentDidUpdate(prevProps) {
        let info_user = this.props.info_user
        if (prevProps.info_user !== info_user) {

            this.setState({ info_user: info_user })

        }
    }
    render() {
        let info_user = this.props.info ? this.props.info.id : ''
        // console.log(info_user)
        return (
            <Fragment>
                <div className="header">
                    <div className='container'>
                        <div className="up">
                            <div className="wishlist nav-item">
                                <i className="far fa-heart"></i>
                                Wishlist
                            </div>

                            <div className="my_booking nav-item">
                                <i className="fas fa-user-alt"></i>
                                <Link to={`/user/mygame/home-store/${info_user}`}>my game</Link>
                            </div>
                            <div className="my_phone-number nav-item">
                                <i className="fas fa-phone-alt"></i>
                                +0347 264 625
                            </div>
                            <div className="Log-in nav-item">
                                <span
                                    className='Register-Log-in'
                                >
                                    <Link
                                        style={{ color: "red", padding: '0 4px' }}
                                        to="/user/login">Log-in</Link>
                                </span>

                            </div>
                            <div className="Register nav-item">
                                <span
                                    className='Register-text'
                                >
                                    <Link to="/user/register">Register</Link>

                                </span>
                            </div>

                            {info_user && info_user.lastName && info_user.firstName ?
                                <div className="Register nav-item">
                                    <p> {`welcome ${info_user.firstName} ${info_user.lastName}`}   </p>
                                </div> : ''}
                        </div>
                        <div className="down">

                            <div
                                onClick={() => this.handleReturnHome()}
                                className="logo-img">
                            </div>
                            <div className="destination_opion nav-item">
                                destination
                            </div>
                            <div className="ways-to-travel_opion nav-item">
                                ways to travel
                            </div>
                            <div className="deal_opion nav-item">
                                deal
                            </div>
                            <div className="purpose_opion nav-item">
                                purpose
                            </div>

                            {this.props.isShowButtonExtra &&
                                <button className="create-new-game nav-item">
                                    <Link to='/user/mygame/host-creator'>Create your game</Link>
                                </button>}

                        </div>
                    </div>
                </div>

                {this.props.banner &&
                    <div className="banner">
                        <div className="banner-wrap-content">
                            <div className="banner-content">
                                <div className="title">
                                    It's time for new journey
                                </div>
                                <div className="input-search-user">
                                    <input className='search-for-destination' type="text" placeholder="Anywhere..." />
                                    <DatePickerComponent
                                        OnchangeDateFromParent={this.OnchangeDateFromParent}
                                    />
                                    <button type="button" className="btn btn-search">

                                        search
                                        <i className="fas fa-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='banner-decorate-bottom'>

                        </div>
                    </div>
                }

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
export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader)


