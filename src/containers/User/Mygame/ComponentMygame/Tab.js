import React, { Component, Fragment } from "react"
import './Tab.scss'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { connect } from "react-redux";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={index}
            aria-labelledby={index}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function objectProps(index) {
    return {
        id: { index },
        'aria-controls': { index },
    };
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};


// -------------------------------------------------------------------------



class TabComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: 0
        };
    }

    handleChange = (event, newValue) => {

        this.setState({ value: newValue });
    };

    render() {
        let { value } = this.state;
        let navigateArray = this.props.href
        let { token } = this.props
        console.log("dsdsds")
        return (
            <div>
               
                {navigateArray && navigateArray.length > 0 &&
                    <div className="tab-container">
                        <Box sx={{ width: '100%' }} >
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs
                                    value={value}
                                    onChange={this.handleChange}
                                    textColor="secondary"
                                    indicatorColor="secondary"
                                    aria-label="secondary tabs example"
                                >
                                    {navigateArray.map((item, index) => {
                                        return (
                                            <Tab key={index} label={item.label}  {...objectProps(index)} />
                                        )
                                    })}

                                </Tabs>
                            </Box>
                            {navigateArray.map((item, index) => {
                                return (
                                    <TabPanel key={index} value={value} index={index} >
                                        {item.component}
                                    </TabPanel>
                                )

                            })}

                        
                        </Box>
                    </div>
                }

            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(TabComponent)