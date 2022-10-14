import React, { Component, Fragment } from "react"
import './Edit.scss'
import SlidePreview from './SlidePreview'
import { convertBase64 } from '../../../../utils/CommonUtils'
import TextareaAutoSize from './TextareaAutoSize'
import { Button, Popover, PopoverHeader, PopoverBody, Modal } from 'reactstrap';
import autosize from "autosize";
import { connect } from "react-redux";
import { getOneQuiz, editQuiz } from '../../../../ConnectBE/axios'
import PopoverOfType from './PopoverOfType'
import PreviewFileUpLoad from './PreviewFileUpLoad'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import _ from "lodash";
import { multipleChoiceType, trueFalseType, multipleChoiceIcon, trueFalseIcon } from '../../../../utils/constant'
import ExtraSideCustom from './ExtraSideCustom'
import { toast } from 'react-toastify';
import CopyLink from "./CopyLink"
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


class Edit extends Component {
    constructor(props) {
        super(props)

        this.toggle = this.toggle.bind(this)

        this.state = {
            totalSlide: 0,
            id: 1,
            slideList: [],
            isOpen: false,
            iconClass: [],
            orderID: 1,
            token: '',
        }
    }
    async componentDidMount() {
        if (this.multilineTextarea) {
            this.multilineTextarea.style.height = 'auto';
        }
        let res = await getOneQuiz(+this.props.info.id, +this.props.id)
        console.log("conmeo", res)
        // this.setState({slideList: data});
        let data = res.response
        let token = data.token
        let conmeo = JSON.parse(data.conmeo)
        let { iconClass } = this.handleFilterType(conmeo[0].type)
        this.setState({
            token: token,
            slideList: conmeo,
            totalSlide: conmeo.length,
            orderID: conmeo.length,
            iconClass: iconClass,
            id: conmeo[0].id
        })

        // console.log(conmeo[0])
        // console.log("state", this.state)
    }
    handleFilterType = (type = { 'value': '1', "label": "Quiz" }) => {

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
        return { questions, iconClass }
    }
    CreateNewSlide = (type = { 'value': '1', "label": "Quiz" }) => {
        let totalSlide = this.state.totalSlide + 1
        let orderID = this.state.orderID + 1
        let slideList = [...this.state.slideList]
        let { questions, iconClass } = this.handleFilterType(type)
        let info = {
            id: orderID,
            title: '',
            type: type,
            ansCorrect: '',
            previewImage: '',
            questions: questions,
            timeLimit: options2[0],
            pointType: options3[0],
            selectType: options4[0],
        }
        slideList.push(info)


        this.setState({
            orderID: orderID,
            id: orderID,
            totalSlide: totalSlide,
            slideList: slideList,
            isOpen: false,
            iconClass: iconClass
        })
    }
    changeTextarea = () => {
        this.multilineTextarea.style.height = 'auto';
        this.multilineTextarea.style.height = this.multilineTextarea.scrollHeight + 'px';

    }



    handleOnchangeTexarea = (text) => {
        this.handleUpdateSlideList(text, 'title')
    }
    handleUpdateSlideList = (event, name) => {

        let slideId = this.state.id

        let slideList = [...this.state.slideList]

        let slideItem = slideList.find((item, index) => {
            return item.id === slideId
        })

        slideItem[name] = event
        this.setState({ slideList: slideList })

    }

    handleResetType = (value, name) => {
        let id = this.state.id
        let slideList = [...this.state.slideList]

        if (name === "typeQuiz") {
            let { questions, iconClass } = this.handleFilterType(value)
            let info = {
                id: id,
                title: '',
                type: value,
                ansCorrect: '',
                previewImage: '',
                questions: questions,
                timeLimit: options2[0],
                pointType: options3[0],
                selectType: options4[0]
            }

            let indexNew = -1
            let slideItem = slideList.find((item, index) => {
                indexNew = index
                return item.id === id
            })
            slideList[indexNew] = info

            this.setState({
                iconClass: iconClass,
                slideList: slideList

            })
        } else {
            this.handleUpdateSlideList(value, name)
        }





    }

    handleOnchangeData = async (event, name) => {


        let slideId = this.state.id

        if (name === "typeQuiz") {

            this.handleResetType(event, name)
        }
        if (name === "timeLimit") {

            this.handleResetType(event, name)
        }
        if (name === "pointType") {

            this.handleResetType(event, name)
        }
        if (name === "selectType") {

            this.handleResetType(event, name)
        }

        if (name === 'base64') {
            this.handleUpdateSlideList(event, "previewImage")
        }



        if (name === 'ansCorrect') {
            this.setState({
                ansCorrect: event.target.value
            })
            this.handleUpdateSlideList(event.target.value, "ansCorrect")
        }


        if (name === 'questions') {
            let slideList = [...this.state.slideList]
            let indexNew = -1
            let slideItem = slideList.find((item, index) => {
                indexNew = index
                return item.id === slideId
            })


            slideItem = { ...slideItem }
            let value = event.target.value
            let id = event.target.name



            if (slideItem && slideItem[name]) {
                let questions = { ...slideItem[name] }
                questions[id] = value
                slideItem[name] = questions
                slideList[indexNew] = slideItem
                this.setState({
                    slideList: [
                        ...slideList
                    ]
                })
            }
        }

    }
    handleDuplicateSlide = (id) => {
        let slideList = [...this.state.slideList]
        let totalSlide = this.state.totalSlide + 1
        let orderID = this.state.orderID + 1
        let indexNew = -1
        let slideItem = slideList.find((item, index) => {
            indexNew = index + 1
            return item.id === id
        })
        let slideItemNew = { ...slideItem }
        slideItemNew.id = totalSlide
        slideList.splice(indexNew, 0, slideItemNew)
        this.setState({
            slideList: slideList,
            totalSlide: totalSlide,
            orderID
        })


    }
    handleDeleteSlide = (id) => {

        let slideList = [...this.state.slideList]
        let totalSlide = this.state.totalSlide - 1
        let indexNew = -1
        let slideItem = slideList.find((item, index) => {
            indexNew = index
            return item.id === id
        })
        if (indexNew > -1) {
            slideList.splice(indexNew, 1)
        }
        this.setState({
            id: indexNew,
            slideList: slideList,
            totalSlide: totalSlide
        })
    }


    handleOnclickSlide = (data) => {
        if (data.id && data.type) {
            let { iconClass } = this.handleFilterType(data.type)
            this.setState({
                id: data.id,
                iconClass: iconClass
            })
        }
    }

    componentDidUpdate(prevProps) {
        // if (this.state.id !== prevProps.id) {



        // }

    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    handleOnDragEnd = (result) => {

        let slideList = [...this.state.slideList]

        if (result) {
            const items = Array.from(slideList);
            const [reorderedItem] = items.splice(result.source.index, 1);
            items.splice(result.destination.index, 0, reorderedItem);
            this.setState({ slideList: items });
        } else {
            this.setState({ slideList: slideList });
        }

    }
    handleEditQuiz = async () => {
        let { slideId } = this.props
        // console.log(this.props.info)
        let res = await editQuiz({
            creatorId: this.props.info.id,
            arrQuiz: this.state.slideList,
            id: +this.props.id,
            length: this.state.orderID

        })
        if (res && res.errCode === 0) {
            toast.success("Save Quiz Success!!!")
            console.log("this.props", this.props)
            this.props.history.push('/user/mygame/home-store');
        } else {
            toast.error(res.errMessage)
        }
    }
    render() {
        let { slideList, iconClass, id, totalSlide, token } = this.state
        let slideItem = slideList.find((item, index) => {
            return item.id === id
        })
        let { questions, title, ansCorrect, previewImage, type,
            timeLimit, pointType, selectType } = slideItem ?
                slideItem
                :
                { questions: [], title: '', ansCorrect: '', previewImage: '', type: { 'value': '1', "label": "Quiz" } }

        return (

            <Fragment>
                {/* modal and popover of type  */}
                < Modal isOpen={this.state.isOpen} toggle={this.toggle}>
                    <PopoverOfType
                        placement="right"
                        isOpen={this.state.isOpen}
                        target="PopoverOfType"
                        handleOnclickCreateNewSlide={this.CreateNewSlide}
                    />
                </Modal>


                {/* Body of /user/mygame/Edit page */}
                <div className='create_slide-container'>
                    <div className='copy_link_wrapper'>
                        <CopyLink
                            value={token}
                            notify_success={"Copy link successfully!!!"}
                        />
                    </div>
                    <div className='row'>
                        <DragDropContext
                            onDragEnd={this.handleOnDragEnd}
                        >
                            <Droppable droppableId="previewList">
                                {(provided) => (
                                    <div className='col-3 previewList' {...provided.droppableProps} ref={provided.innerRef}>
                                        {slideList && slideList.length > 0 && slideList.map((item, index) => {
                                            return (
                                                <Draggable key={'' + item.id} draggableId={'' + item.id} index={index}>

                                                    {(provided) => (
                                                        <span ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}>
                                                            <SlidePreview
                                                                handleDuplicateSlide={this.handleDuplicateSlide}
                                                                handleDeleteSlide={this.handleDeleteSlide}
                                                                isActive={id}
                                                                key={index}

                                                                handleOnclickSlide={this.handleOnclickSlide}
                                                                dataFromParent={item}
                                                                index={index + 1}
                                                            />
                                                        </span>

                                                    )}

                                                </Draggable>
                                            )
                                        })}
                                        {provided.placeholder}
                                        <Button
                                            color="primary" id="PopoverOfType" onClick={this.toggle}>
                                            Add question @
                                        </Button>

                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                        <div className='col-6 main-create'>
                            <div className="input-container">
                                <h1 className='title'>My Quiz!!!</h1>
                                <TextareaAutoSize
                                    value={title}
                                    handleOnchangeTexarea={this.handleOnchangeTexarea}
                                />
                            </div>
                            {/* PreviewFileUpLoad*/}
                            <PreviewFileUpLoad
                                handleOnchange={this.handleOnchangeData}
                                previewImage={previewImage}
                                isChooseFile={true}
                            />


                            <div className="QvsA">

                                {questions && Object.entries(questions).map(([key, value], index) => {

                                    return (

                                        <div key={index} className={value ? `quesItem active ${iconClass[+key]}` : `quesItem ${iconClass[+key]}`}>

                                            <div className='icon-content'>
                                                <div className={`icon-ques ${iconClass[+key]}`}>
                                                </div>
                                            </div>

                                            <textarea
                                                placeholder={"Type your quiz!!!"}
                                                onChange={this.changeTextarea}
                                                ref={ref => this.multilineTextarea = ref}
                                                name={key}
                                                value={value}
                                                className={value ? `inputQues active ${iconClass[+key]}` : `inputQues ${iconClass[+key]}`}
                                                onChange={(e) => this.handleOnchangeData(e, "questions")}
                                            ></textarea>


                                            <input value={key} type="radio" className='checboxQues' checked={ansCorrect === '' + key}
                                                onClick={(e) => this.handleOnchangeData(e, "ansCorrect")}
                                                name='checboxQues'
                                            />
                                        </div>
                                    )
                                })}

                            </div>

                        </div>

                        <ExtraSideCustom
                            slideId={id}
                            type={type}
                            onChange={this.handleOnchangeData}
                            timeLimit={timeLimit}
                            pointType={pointType}
                            selectType={selectType}
                            handleSubmitQuiz={this.handleEditQuiz}
                            text_btn={"Hoàn Thành"}
                        />
                    </div>

                </div >



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
        data: { ...state }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Edit)


