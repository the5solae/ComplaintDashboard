import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {API_BASE_URL} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";

function RetrieveComplaint(props) {
    const [state , setState] = useState({
        data: {}
        })

    const redirectToHome = () => {
        props.updateTitle('Home')
        props.history.push('/home');
    }
    const user = props.userLoggedIn

    useEffect(() => {
        const payload={
            "email": user
        }
        axios.post(API_BASE_URL+'getcomplaints', payload)
        .then(function (response) {
            if(response.data.code === 200){
                console.log(response.data.success)
                props.showError(null)
                setState({data: response.data.success})
                console.log(state)                
            }else{
                props.showError("Could not Get Complaint");
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    },[])

    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
        <button type="button" className="btn btn-primary btn-lg btn-block" onClick={() => redirectToHome()}>Back</button>
          <ul className="list-group list-group-flush">
            <li className="list-group-item text-left" ><b>Title:</b> {state.data.title}</li>
            <li className="list-group-item text-left"><b>Business Unit:</b> {state.data.businessUnit}</li>
            <li className="list-group-item text-left"><b>Location:</b> {state.data.location}</li>
            <li className="list-group-item text-left"><b>Complaint Description:</b> {state.data.description}</li>
            <li className="list-group-item text-left"><b>Complaint Status:</b> {state.data.status}</li>
        </ul>
        </div>
    )
}

export default withRouter(RetrieveComplaint);