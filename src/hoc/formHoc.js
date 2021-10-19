import React, { useState} from 'react';
import { Input, Radio, Form, TextArea, Dropdown} from 'semantic-ui-react';

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
const dropdown = (props) => {
    return (
        <Dropdown
        label={props.label}
        value={props.value}
        onChange={props.onChange}
        name={props.name}   
        placeholder={props.placeholder}
        options={props.options} 
        selection
        />)
}

const formTextArea = (props) => {
    return (
        <Form.TextArea
        name={props.name}  
        label={props.label}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.onChange}
      />)
}
function Validation(email, password) {
    console.log("password", password)
    let error = {};
    console.log("email", email)
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!email || regex.test(email) === false) {
        error["email"] = "Please enter valid username.";
    } 
    if(password.length < 6){
        error["password"] = "Please add at least 6 charachter.";
    }
   return error
}
const formData = {
    formInput : formInput,
    radioButton:radioButton,
    dropdown:dropdown,
    formTextArea:formTextArea,
    validation:Validation
}



export default (WrappedComponent) => {
    return function hocComponent() {
        return <WrappedComponent {...formData} />
    }
}