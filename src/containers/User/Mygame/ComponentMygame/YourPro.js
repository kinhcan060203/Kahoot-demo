import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import './YourPro.scss'
import CopyLink from "./CopyLink"
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { getAllQuiz } from '../../../../ConnectBE/axios'
class YourPro extends Component {
    constructor(props) {
        super(props)
        this.state = {
            slideList: [],

            isOpen: false,
        }
    }


    async componentDidMount() {
        let creatorId = this.props.creatorId
        let data = await getAllQuiz(+creatorId)

        this.setState({ slideList: data.response })
    }
    async componentDidUpdate(prevProps) {


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

    };


    formatTime = (time) => {
        let date = time.slice(1, time.indexOf("T"))
        date = date.split('-')
        date.reverse()
        date = date.join('-')
        let clock = time.split('T')[1].slice(0, 8)
        return (
            <div className="wrapp_time_formated">
                <p className="date_formated">{date}</p>
                <p className="time_formated">{clock}</p>
            </div>
        )
    }

    render() {
        let slideList = [...this.state.slideList]
        return (
            <Fragment>


                <div className="col-9 row">
                    {slideList.map((item, index) => {
                        return (
                            <div className="col-4 slide_item">
                                <Link key={index} to={`/user/mygame/host-creator/edit/${item.id}`}>

                                    <div className="slide_content">
                                        Id: {JSON.stringify(item.id)}
                                        {this.formatTime(JSON.stringify(item.createdAt))}

                                    </div>

                                </Link>


                            </div>


                        )
                    })}
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
export default connect(mapStateToProps, mapDispatchToProps)(YourPro)


