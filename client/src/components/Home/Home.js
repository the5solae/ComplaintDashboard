 
import React from 'react';
import { withRouter } from "react-router-dom";

function Home(props) {

    const redirectToComplaint = () =>  {
        props.updateTitle('Complaint')
        props.history.push('/complaint');
    }

    const redirectToGetComplaint = () =>  {
        props.updateTitle('Get Complaint')
        props.history.push('/getcomplaints');
    }

    const redirectToRegister = () => {
        props.history.push('/register'); 
        props.updateTitle('Register');
    }

    return(
        <div className="mt-2">
            <button type="button" className="btn btn-primary btn-lg btn-block" onClick={() => redirectToComplaint()}>Send a new complaint</button>
            <button type="button" className="btn btn-primary btn-lg btn-block" onClick={()=> redirectToGetComplaint()}>Retrieve previous complaint</button> 

        </div>
    )
}

export default withRouter(Home);