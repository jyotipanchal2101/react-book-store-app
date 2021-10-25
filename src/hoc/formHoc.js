import React from "react";
import { Radio, Form, Dropdown } from "semantic-ui-react";
import { validations } from "../utility/validation";
import { map } from "lodash";

export default function HocComponent(
  WrappedComponent,
  initialFormObj = {},
  initialFormErrors = {})
   {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        formValue: initialFormObj,
        formErrors: initialFormErrors,
        isDirty: false,
      };
    }
    onChange = (event) => {
      this.setState({
        formValue: {
          ...this.state.formValue,
          [event.target.name]: event.target.value,
        },
      });
    };
    handleChange = (e, { usertype }) => {
      console.log("usertype", usertype);
      this.setState({
        formValue: { ...this.state.formValue, ["usertype"]: usertype },
      });

      //            this.setState({ usertype });
    };
    onBlur = (event, rules) => {
      console.log("rules", rules);

      if (rules.length) {
        const valid = rules.map((r) => ({
          [r]: validations(r, event.target.value),
        }));
        console.log("valid", valid);
        this.setState({
          isDirty:true,
          formErrors: { ...this.state.formErrors, [event.target.name]: valid },
        });
      }
    };

    handleChange = (e, { value }) => {
      this.setState({ status: value });
    };
    handleChangeSeller = (e, { value }) => {
      this.setState({
        formValue: { ...this.state.formValue, ["seller"]: value },
      });
   //   this.setState({ seller: value });
    };
    handleChangeStatus = (e, { value }) => {
        console.log("handleChange", value)
        this.setState({
            formValue: { ...this.state.formValue, ["status"]: value },
          });
       // this.setState({ status:value })
      }
    formInput = (props) => {
      return (
        <Form.Input
          type={props.type}
          label={props.label}
          placeholder={props.label}
          value={props.value}
          onChange={this.onChange}
          onBlur={(e) => this.onBlur(e, props.rules || [])}
          name={props.name}
          {...props}
        />
      );
    };

    radioButton = (props) => {
      return (
        <Radio
          label={props.label}
          value={props.value}
          onChange={this.handleChange}
          checked={props.checked}
          name={props.name}
          usertype={props.usertype}
        />
      );
    };
    dropdown = (props) => {
      return (
        <Dropdown
          label={props.label}
          value={props.value}
          onChange={this.handleChangeSeller}
          name={props.name}
          placeholder={props.placeholder}
          options={props.options}
          onBlur={(e) => this.onBlur(e, props.rules || [])}
          selection
          {...props}
        />
      );
    };
    statusDropdown = (props) => {
        return (
          <Dropdown
            label={props.label}
            value={props.value}
            onChange={this.handleChangeStatus}
            name={props.name}
            placeholder={props.placeholder}
            options={props.options}
            onBlur={(e) => this.onBlur(e, props.rules || [])}
            selection
            {...props}
            selectOnBlur={true}
          />
        );
      };
  

    formTextArea = (props) => {
      return (
        <Form.TextArea
          name={props.name}
          label={props.label}
          value={props.value}
          placeholder={props.placeholder}
          onChange={this.onChange}
          onBlur={(e) => this.onBlur(e, props.rules || [])}
          {...props}
        />
      );
    };
    formValueState = (data) => {
        this.setState({formValue:{...data}})
    }
    isFormValid = () => {
      let isValid = false;

     isValid = !map(this.state.formErrors, (r) =>r.every((k) => Object.values(k)[0])).includes(false);

      return isValid;
    };
 
    // const [formValue, setFormValue] = useState(initialFormValue)
    render() {
      console.log("formValue", this.state.formValue);
      const smartElement = {
        formInput: this.formInput,
        radioButton: this.radioButton,
        dropdown: this.dropdown,
        formTextArea: this.formTextArea,
        validation: this.Validation,
        getValues: () => this.state.formValue,
        isFormValid: this.isFormValid,
        isDirty: this.state.isDirty,
        statusDropdown:this.statusDropdown,
        formValueState:this.formValueState
      };
      const formMeta = {
        smartElement,
        formErrors: this.state.formErrors,
        data: this.state.formValue,
      };
      return <WrappedComponent {...formMeta} />;
    }
  };
}
