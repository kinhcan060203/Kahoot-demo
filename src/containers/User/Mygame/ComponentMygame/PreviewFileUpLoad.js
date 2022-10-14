import './PreviewFileUpLoad.scss'
import React, { Component, Fragment } from "react"
import { convertBase64 } from '../../../../utils/CommonUtils'
export default class PreviewFileUpLoad extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            previewImage: ''
        };
    }

    handleOnchangeUploadFile = async (event) => {
        let isChooseFile = this.props.isChooseFile
        console.log("isChooseFile", isChooseFile)

        let { handleOnchange } = this.props

        let base64 = await convertBase64(event)

        handleOnchange(base64, "base64")
    }


    handleCheck = (e) => {
        let isChooseFile = this.props.isChooseFile
        console.log("isChooseFile", isChooseFile)
        if (!isChooseFile) {
            e.preventDefault();
        }

    }
    render() {

        let { play_game, isChooseFile } = this.props
        return (
            <Fragment>

                <div className="upload-file-container">
                    <input id='upload-file-id' hidden className="form-control" onClick={(e) => this.handleCheck(e)} onChange={(e) => this.handleOnchangeUploadFile(e)} type="file" />
                    <label for='upload-file-id' class="label-preview-image">
                        <div className="preview-image"
                            style={{ backgroundImage: `url(${this.props.previewImage})` }}
                        >

                        </div>
                        <button style={{ display: play_game ? "none" : "block" }} className='btn_upload-file-preview-image'>
                            <label for='upload-file-id'>Upload a picture</label>
                        </button>
                    </label>


                </div>

            </Fragment>
        );
    }
}