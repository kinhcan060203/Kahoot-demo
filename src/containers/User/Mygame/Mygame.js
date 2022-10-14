import React, { Component, Fragment } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeStore from './HomeStore'
import TabComponent from './ComponentMygame/Tab'
import HomeHeader from '../../../components/prevProject/HomeHeader'
import Edit from './ComponentMygame/Edit'
import Creator from './ComponentMygame/Creator'
import Trash from './ComponentMygame/Trash'
import TextareaAutoSize from './ComponentMygame/TextareaAutoSize'
import ModalDelete from './ComponentMygame/ModalDelete'
import ExtraSideCustom from './ComponentMygame/ExtraSideCustom'
import { connect } from "react-redux";
import _ from "lodash"


const href1 = (attr) => {
    return [
        { "label": "Creator", "href": '/', "component": <Creator /> },
        { "label": "Trash", "href": '/trash', "component": <Trash /> },
        // { "label": "Your game", "href": '/your-game', "component": <TextareaAutoSize /> },
    ]
}
const href2 = (attr) => {
    return [
        {
            "label": "Edit", "href": '/edit', "component": <Edit
                id={attr}
            />
        },
    ]
}

// Tab component navigate Mygame creator

class HostCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            href: href1()
        }
    }
     componentDidMount() {
        
        this.setState({ href: this.props.match.params.id ? href2(this.props.match.params.id) : href1() })
    }
    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.setState({ href: this.props.match.params.id ? href2(this.props.match.params.id) : href1() })
        }
    }

    render() {
        console.log("what? ", this.state.href)
        

        return (
            <TabComponent
                href={this.state.href}
                id={this.props.match.params.id}

            />
        );
    }
}

class Mygame extends Component {
    constructor(props) {
        super(props)
        this.state = {
            info: {},
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.info !== prevProps.info) {
            this.setState({ info: this.props.info })
        }
    }
    componentDidMount() {
        this.setState({ info: this.props.info })
    }
    render() {
        let info = this.state.info
        return (
            <Fragment>
                <HomeHeader
                    banner={false}
                    isShowButtonExtra={true}
                />
                <Switch>
                    <Route path="/user/mygame/host-creator/edit/:id" component={HostCreator} />
                    <Route path="/user/mygame/host-creator" component={HostCreator} />
                    {/* <Route path="/user/mygame/home-page" component={HomePage} /> */}
                    <Route path="/user/mygame/home-store/:creatorId" component={HomeStore} />

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
export default connect(mapStateToProps, mapDispatchToProps)(Mygame)


