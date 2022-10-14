import React from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import './PopoverOfType.scss'
export default class PopoverOfType extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            popoverOpen: false
        };
    }


    render() {

        let { placement, isOpen, target, handleOnclickCreateNewSlide } = this.props
        return (

            <Popover placement={placement} isOpen={isOpen} target={target} >
                <PopoverHeader>Choose a type!!!@</PopoverHeader>
                <PopoverBody>
                    <button
                        value='1'
                        onClick={() => handleOnclickCreateNewSlide({"value":'1',"label":"Quiz"})}
                        className='btn_choose_type'
                    >
                        Mutiple choice (1)
                    </button>

                    <button
                        value='2'
                        onClick={() => handleOnclickCreateNewSlide({"value":'2',"label":"True or False"})}
                        className='btn_choose_type'
                    >
                        True False (2)
                    </button>
                </PopoverBody>
            </Popover>

        );
    }
}