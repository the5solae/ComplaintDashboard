import React, {useState} from 'react';
import axios from 'axios';
import {API_BASE_URL} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";


function Complaint(props) {
    const [state , setState] = useState({
        title : "",
        business_unit : "",
        location : "",
        complaint : "",
        status: "Pending Resolution"
        })
    
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        const payload={
            "email": props.userLoggedIn,
            "title" : state.title,
            "businessUnit" : state.business_unit,
            "location" : state.location,
            "description" : state.complaint,
            "status" : state.status
        }
        axios.post(API_BASE_URL+'complaint', payload)
        .then(function (response) {
            if(response.data.code === 200){
                redirectToHome();
                props.showError(null)
            }else{
                console.log(props.userLoggedIn)
                console.log(state)
                props.showError("Could not Submit Complaint");
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    const redirectToHome = () => {
        props.updateTitle('Home')
        props.history.push('/home');
    }

    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                <label htmlFor="exampleFormControlInput1">Title</label>
                <input 
                    type="text"
                    className="form-control" 
                    value={state.title} 
                    id="title" 
                    placeholder="Title" 
                    onChange={handleChange}
                    required 
                />
                </div>
                <br />
                <div className="form-group text-left">
                    <label htmlFor="exampleFormControlSelect1">Business Unit</label>
                    <select className="form-control" id="business_unit" value={state.business_unit} onChange={handleChange}>
                        <option>--Select Business Unit--</option>
                        <option>Food</option>
                        <option>Electronics</option>
                        <option>Clothing</option>
                    </select>
                </div>
                <br />
                <div className="form-check text-left">
                    <input className="form-check-input" type="radio" name="exampleRadios" id="location" value="Dubai" 
                    onChange={handleChange} checked = {state.location === "Dubai"}/>
                    <label className="form-check-label" htmlFor="location">
                        Dubai
                    </label>
                </div>
                <div className="form-check text-left">
                    <input className="form-check-input" type="radio" name="exampleRadios" id="location" value="Abu Dhabi" 
                    onChange={handleChange} checked ={state.location === "Abu Dhabi"}/>
                    <label className="form-check-label" htmlFor="location">
                        Abu Dhabi
                    </label>
                </div>
                <br />
                <div className="form-group text-left">
                    <label htmlFor="exampleFormControlTextarea1">Complaint Description</label>
                    <textarea
                        className ="form-control"
                        value={state.complaint}
                        id="complaint" 
                        placeholder="Enter Complaint Here"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-check">
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >Submit</button>

            </form>
        </div>
    )
}

export default withRouter(Complaint);