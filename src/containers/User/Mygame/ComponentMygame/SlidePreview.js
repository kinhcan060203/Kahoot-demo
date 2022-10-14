import React, { Component, Fragment } from "react"
import './SlidePreview.scss'
import TextareaAutoSize from './TextareaAutoSize'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class SlidePreview extends Component {


    constructor(props) {
        super(props)
        // this.changeBackdrop = this.changeBackdrop.bind(this);

        this.state = {
            isOpen: false,
            // backdrop: true
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {
        let { dataFromParent } = this.props
    }



    handleDuplicateSlide = () => {
        let handleDuplicateSlide = this.props.handleDuplicateSlide
        let { id } = this.props.dataFromParent
        if (handleDuplicateSlide) {
            handleDuplicateSlide(id)
        }

    }
    handleDeleteSlide = () => {
        let handleDeleteSlide = this.props.handleDeleteSlide
        let { id } = this.props.dataFromParent
        if (handleDeleteSlide) {
            handleDeleteSlide(id)
        }
        this.setState({ isOpen: false })
    }
    handleShowModal = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    // changeBackdrop(e) {
    //     let value = e.target.value;
    //     if (value !== 'static') {
    //         value = JSON.parse(value);
    //     }
    //     this.setState({ backdrop: value });
    // }
    render() {

        let { previewImage, ansCorrect, title, id, type, questions } = this.props.dataFromParent ? this.props.dataFromParent : { previewImage: '', ansCorrect: '', title: '', id: -1, type: '' }
        let isActive = this.props.isActive
        let index = this.props.index

        return (
            <Fragment>
                <Modal
                    // backdrop={true}
                    centered size='sm'
                    isOpen={this.state.isOpen}
                    toggle={() => this.toggle()}
                    className="modal-delete"
                >
                    <ModalHeader toggle={() => this.toggle()}>Do you sure to delete this slide???</ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete this question? This action can't be undone.
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.handleDeleteSlide(id)}>Delete</Button>
                        <Button color="secondary" onClick={() => this.toggle()}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <div className={isActive === id ? 'previewItem active' : 'previewItem unactive'}>
                    <div onClick={() => this.props.handleOnclickSlide({ id, type })} className='previewItem-wrap'>
                        <div className='duplicate-delete'>
                            <span onClick={() => this.handleDuplicateSlide()} className='duplicate'><i className="fas fa-copy"></i></span>
                            <span onClick={() => this.handleShowModal()} className='delete'>
                                <i className="fas fa-trash-alt"></i>
                            </span>
                        </div>
                        <div>
                            <h4>{index + '.'} {type.label}</h4>
                            <div
                                className={isActive === id ? 'previewItem-container active' : 'previewItem-container'}
                            >

                                <div className='previewInput-container' >
                                    <input className='previewInput' value={title} />
                                </div>

                                <div className="slide-preview-image"
                                    style={{ backgroundImage: `url(${previewImage})` }}
                                >

                                </div>


                                <div className="QvsA">
                                    {questions && Object.entries(questions).map(([key, value], index) => {
                                        return (
                                            <div className="slide-preview-ans">
                                                <input hidden={+ansCorrect !== +key} checked type="radio" className='ansCorrectItem' />
                                            </div>


                                        )
                                    })}


                                </div>

                            </div>
                        </div>
                    </div>
                </div>


            </Fragment >
        )
    }

}

export default SlidePreview;


