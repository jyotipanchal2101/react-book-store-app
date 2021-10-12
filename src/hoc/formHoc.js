import React from 'react';
import { Input, Radio, Form, TextArea} from 'semantic-ui-react';

const formInput = (props) => {
    return (
        <Form.Input
        type={props.type}
        label={props.label}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        name={props.name}    
        />
    )
}
const radioButton = (props) => {
    return (
        <Radio
        label={props.label}
        value={props.value}
        onChange={props.onChange}
        checked={props.checked}
        name={props.name}   
        usertype={props.usertype} 
        />)
}

const formData = {
    formInput : formInput,
    radioButton:radioButton
}


export default (WrappedComponent) => {
    return function hocComponent() {
        return <WrappedComponent {...formData} />
    }
}