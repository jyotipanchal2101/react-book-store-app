import React from 'react';

export default function onChangeHoc(WrappedComponent, selectData) {
  // ...and returns another component...
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
                   email:"",
                   password:""
                }
    }


    handleChange(event) {
         this.setState({ [event.target.name]: event.target.value });
    }

    render() {

      return <WrappedComponent data= {this.state} handleChange={this.handleChange} {...this.props} />;
    }
  };
}