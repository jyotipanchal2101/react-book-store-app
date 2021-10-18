import React from 'react'

const validationHoc = WrappedComponenet => {
    class ValidationHoc extends React.Component {
        constructor(props) {
            super(props)
        
            this.state = {
                error: null,  
            }
        }
        emailValidation() {
            console.log("emailValidation")
            const regex =
              /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if (!this.state.email || regex.test(this.state.email) === false) {
              this.setState({
                error: "Email is not valid",
              });
              return false;
            }
            this.setState({
              error: "",
            });
            return true;
          }

        render(){
            return <WrappedComponenet error={this.state.error}
                         emailValidation={this.emailValidation}
            />
        }
        
    }
    return ValidationHoc
}

export default validationHoc