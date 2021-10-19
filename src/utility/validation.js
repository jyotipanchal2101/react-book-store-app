
export function validation(email) {
    console.log("email", email)
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!email || regex.test(email) === false) {
    //   this.setState({
    //     error: "Email is not valid",
    //   });
      return false;
    }
    // this.setState({
    //   error: "",
    // });
    return true;
}

