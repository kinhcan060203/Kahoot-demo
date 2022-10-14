import React, { Component, Fragment } from "react"
import './PlayGameInterface.scss'
import SlidePreview from '../../Mygame/ComponentMygame/SlidePreview'
import { convertBase64 } from '../../../../utils/CommonUtils'
import TextareaAutoSize from '../../Mygame/ComponentMygame/TextareaAutoSize'
import { Button, Popover, PopoverHeader, PopoverBody, Modal } from 'reactstrap';
import autosize from "autosize";
import { connect } from "react-redux";
import { saveQuiz } from '../../../../ConnectBE/axios'
import PopoverOfType from '../../Mygame/ComponentMygame/PopoverOfType'
import PreviewFileUpLoad from '../../Mygame/ComponentMygame/PreviewFileUpLoad'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import _ from "lodash";
import { multipleChoiceType, trueFalseType, multipleChoiceIcon, trueFalseIcon } from '../../../../utils/constant'
import ExtraSideCustom from '../../Mygame/ComponentMygame/ExtraSideCustom'
import { toast } from 'react-toastify';
import { confirmPIN } from '../../../../ConnectBE/axios'
import Clock from "./Clock"
import Transpose from "./Transpose"
import EndGame from "./EndGame/EndGame"
import { configConsumerProps } from "antd/lib/config-provider"
const options1 = [
    { value: '1', label: 'Quiz' },
    { value: '2', label: 'True or False' },
];
const options2 = [
    { value: '1', label: '5 seconds' },
    { value: '2', label: '15 seconds' },
    { value: '3', label: '20 seconds' },
    { value: '4', label: '30 seconds' },

];
const options3 = [
    { value: '1', label: 'Standard' },
    { value: '2', label: 'Double points' },
    { value: '3', label: 'No points' },
];
const options4 = [
    { value: '1', label: 'Single-select' },
    { value: '2', label: 'Multi-select' },
];



class PlayGameInterface extends Component {
    constructor(props) {
        super(props)


        this.state = {

            currentId: -1,
            ansCorrect: "",
            iconClass: [],

            pointType: { value: '1', label: 'Standard' },
            questions: { 1: '', 2: '', 3: '', 4: '' },
            selectType: { value: '1', label: 'Single-select' },
            timeLimit: { value: '1', label: '5 seconds' },
            title: "",
            type: { value: '1', label: 'Quiz' },
            conmeo: [],
            previewImage: "",
            isLoading: false,
            correct: false,
            keyAns: '',
            endGame: false,

        }
    }


    ChangeIcon = (type = { 'value': '1', "label": "Quiz" }) => {

        let questions = {}
        let iconClass = []
        if (type.value === '1') {
            questions = { ...multipleChoiceType }
            iconClass = multipleChoiceIcon
        }
        if (type.value === '2') {
            questions = { ...trueFalseType }
            iconClass = trueFalseIcon
        }

        return iconClass
    }
    async componentDidMount() {

        let res = await confirmPIN(this.props.match.params.token)
        let data = res.response.conmeo
        let conmeo = JSON.parse(data)
        conmeo.push("end")
        this.setState({ conmeo }, () => {
            this.handleIncreaseCurrentId()
        })
    }
    handleIncreaseCurrentId = () => {
        let currentId = this.state.currentId + 1
        let currentSlide = this.state.conmeo[currentId]
        if (currentSlide === "end") {
            this.setState({ endGame: true })
        } else {
            let iconClass = this.ChangeIcon(currentSlide.type)
            let timeLimit = this.handleFilterTimeLimit(currentSlide.timeLimit)
            this.setState({
                currentId,
                ansCorrect: currentSlide.ansCorrect,
                pointType: currentSlide.pointType,
                questions: currentSlide.questions,
                selectType: currentSlide.selectType,
                timeLimit: timeLimit,
                title: currentSlide.title,
                type: currentSlide.type,
                previewImage: currentSlide.previewImage,
                iconClass: iconClass,
                keyAns: ""

            })
        }


    }
    handleFilterTimeLimit = (timeLimit) => {
        let time = timeLimit.label
        time = time.split("seconds")[0] + ''
        time = +time.trim()
        return time
    }
    handleCheckAns = async (key) => {
        let ansCorrect = this.state.ansCorrect
        let correct = ansCorrect === key ? true : false
        this.setState({
            isLoading: true,
            correct: correct,
            keyAns: key
        })
    }

    handleTimeOff = () => {
        this.setState({
            isTimeOff: true,
            isLoading: false
        })
    }

    handleOffTranspose = () => {
        this.setState({ isTimeOff: false, isLoading: false }, () => this.handleIncreaseCurrentId())

    }

    componentDidUpdate(prevProps) {


    }



    render() {

        let { currentId, ansCorrect, isLoading,
            pointType, questions, selectType, timeLimit,
            title, type, previewImage, iconClass, isTimeOff, keyAns, endGame } = this.state
        return (
            <Fragment>
                {
                    isLoading ? <div className="loading"></div> : <></>
                }
                {endGame ?
                    <EndGame />
                    :
                    <div className="wrapper_play_game">

                        <div className='create_slide-container'>
                            {isTimeOff ? <Transpose
                                count_down={timeLimit}
                                isShow={isTimeOff}
                                handleTimeOff={this.handleOffTranspose}
                            />
                                :
                                <></>
                            }
                            <div className='row'>

                                <div className='col-6 main-create'>
                                    <div className="input-container">
                                        <h1 className='title'>My Quiz!!!</h1>
                                        <TextareaAutoSize
                                            value={title}
                                            disabled
                                        />
                                        <Clock
                                            count_down={timeLimit}
                                            currentId={currentId}
                                            handleTimeOff={this.handleTimeOff}

                                        />


                                    </div>
                                    {/* PreviewFileUpLoad*/}
                                    <PreviewFileUpLoad
                                        play_game={"YES"}
                                        // handleOnchange={this.handleOnchangeData}
                                        previewImage={previewImage}
                                        isChooseFile={false}
                                    />


                                    <div className="QvsA">

                                        {questions && Object.entries(questions).map(([key, value], index) => {

                                            return (

                                                <div
                                                    onClick={() => this.handleCheckAns(key)}
                                                    key={index}
                                                    className={`quesItem  active ${iconClass[+key]}` + (keyAns ? (keyAns !== key ? " noChosen " : '') : "")}
                                                >

                                                    <div className='icon-content'>
                                                        <div className={`icon-ques ${iconClass[+key]}`}>
                                                        </div>
                                                    </div>

                                                    <textarea
                                                        placeholder={""}
                                                        disabled
                                                        ref={ref => this.multilineTextarea = ref}
                                                        name={key}
                                                        value={value}
                                                        className={`inputQues active  ${iconClass[+key]}`}
                                                    ></textarea>



                                                </div>
                                            )
                                        })}

                                    </div>

                                </div>


                            </div>

                        </div >


                    </div>
                }
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
        info: state.user.info,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PlayGameInterface)



