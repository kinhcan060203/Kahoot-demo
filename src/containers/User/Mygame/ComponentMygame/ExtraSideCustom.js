import React from 'react';
import Select from 'react-select';
import './ExtraSideCustom.scss'

const backgroundQuiz = {

}


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






class ExtraSideCustom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            typeQuiz: options1[0],
            timeLimit: options2[0],
            pointType: options3[0],
            selectType: options4[0],
            isClose: false,
        };

    }
    componentDidMount() {


    }
    handleChange = (object, event) => {

        let { slideId, type, onChange, setStateData } = this.props

        if (event.name === 'typeQuiz') {
            this.setState({ typeQuiz: object })
            onChange(object, "typeQuiz")
        }

        if (event.name === 'timeLimit') {
            this.setState({ timeLimit: object })
            onChange(object, "timeLimit")
        }

        if (event.name === 'pointType') {
            onChange(object, "pointType")
        }

        if (event.name === 'selectType') {
            this.setState({ selectType: object })
            onChange(object, "selectType")
        }

    };
    handleOnclickControl = () => {
        this.setState({ isClose: !this.state.isClose })
    }

    componentDidUpdate(prevProps) {
        let { slideId, type, onChange, timeLimit,
            pointType,
            selectType } = this.props
        if (prevProps.type !== type) {
            this.setState({ typeQuiz: type })
        }
        if (prevProps.timeLimit !== timeLimit) {
            this.setState({ timeLimit: timeLimit })
        }
        if (prevProps.pointType !== pointType) {
            this.setState({ pointType: pointType })
        }
        if (prevProps.selectType !== selectType) {
            this.setState({ selectType: selectType })
        }
    }

    handleSubmit = (type) => {
        this.props.handleSubmitQuiz()
    }
    render() {

        let { typeQuiz, timeLimit, pointType, selectType, isClose } = this.state

        let { slideId, type, onChange, text_btn } = this.props
        return (

            <>
                <div class="beside-container" style={isClose ? { width: "0" } : { width: "292px" }}>
                    <div onClick={() => this.handleOnclickControl()} class='control-beside-container'>
                        <i className={isClose ? "fas fa-arrow-right" : "fas fa-arrow-left"}></i>
                    </div>
                    <div class="beside-content">
                        <div class="custom-type-slide custom-item">
                            <div className="select-beside-custom">
                                <div className="select-name">

                                    <i class="fas fa-question-circle"></i>
                                    <h3>Question type</h3>

                                </div>

                                <div className="rs-select2 js-select-simple select--no-search">


                                    <Select
                                        name="typeQuiz"
                                        value={typeQuiz}
                                        onChange={this.handleChange}
                                        options={options1}
                                        placeholder={
                                            <span class='placehoderQuiz'>
                                                <div class='backgroundQuiz' style={backgroundQuiz}></div>
                                                <span >Quiz</span>
                                            </span>
                                        }
                                    />


                                    <div className="select-dropdown"></div>
                                </div>
                            </div>
                        </div>
                        <div class="custom-time-limit custom-item">
                            <div className="select-beside-custom">
                                <div className="select-name">
                                    <i class="fas fa-clock"></i>
                                    <h3>Time limit</h3>

                                </div>
                                <div className="rs-select2 js-select-simple select--no-search">
                                    <Select
                                        name="timeLimit"
                                        value={timeLimit}
                                        onChange={this.handleChange}
                                        options={options2}
                                    />
                                    <div className="select-dropdown"></div>
                                </div>
                            </div>
                        </div>

                        <div class="custom-point-type custom-item">
                            <div className="select-beside-custom">
                                <div className="select-name">
                                    <i class="fas fa-medal"></i>
                                    <h3>Points</h3>

                                </div>
                                <div className="rs-select2 js-select-simple select--no-search">


                                    <Select
                                        name="pointType"
                                        value={pointType}
                                        onChange={this.handleChange}
                                        options={options3}
                                    />


                                    <div className="select-dropdown"></div>




                                </div>
                            </div>
                        </div>
                        <div class="custom-select-type custom-item">
                            <div className="select-beside-custom">
                                <div className="select-name">
                                    <i class="fab fa-atlassian"></i>
                                    <h3>Answer options</h3>
                                </div>
                                <div className="rs-select2 js-select-simple select--no-search">
                                    <Select
                                        name="selectType"
                                        value={selectType}
                                        onChange={this.handleChange}
                                        options={options4}
                                    />
                                    <div className="select-dropdown"></div>
                                </div>
                            </div>
                        </div>
                        <div class="btn-finish">
                            <button onClick={() => this.handleSubmit()} className='btn-finish-quiz'>
                                {text_btn}
                            </button>
                        </div>
                    </div>
                </div>
            </>


        );
    }
}

export default ExtraSideCustom;