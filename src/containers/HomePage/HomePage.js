import React, { Component, Fragment } from "react"
import './HomePage.scss'
import HomeHeader from '../../components/prevProject/HomeHeader'
class HomePage extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }




    render() {

        return (
            <Fragment>
                <HomeHeader
                    banner={true}
                    isShowButtonExtra={false}
                />
                <h1>Hello World</h1>
            </Fragment>
        )
    }

}

export default HomePage;


