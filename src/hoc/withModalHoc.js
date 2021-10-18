import React from 'react'

const withModalHoc = WrappedComponenet => {
    class NewComponent extends React.Component {
        constructor(props) {
            super(props)
        
            this.state = {
                 
            }
        }
        render(){
            return <WrappedComponenet/>
        }
        
    }
    return NewComponent
}

export default withModalHoc