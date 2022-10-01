import React from 'react'
import { Link } from 'react-router-dom'
import './Get.css'
import { useHistory } from "react-router-dom";
 const GetInstitute = props => {
    const {instituteData, role, onDeleteInstitute, i} = props
    const history = useHistory();

    const {id, instituteName, instituteDescription, instituteAddress, mobile, email, imgUrl, } = instituteData

    const deleteInstitute = (event) => {
        event.stopPropagation();
        onDeleteInstitute(id, i);
    }

    const getCourse = (id) => {
        history.push(`/course/${id}`);

    }

    const addToCart = () => {
        alert("Added Successfully")

    }

    return (
        <div>
            <div className='item-container' >
                <div className="child-div">
                    <div className="img-div">
                        <img src={imgUrl} alt={id} className = "blog-image" onClick={()=>{getCourse(id)}}/>
                    </div>
                    <div className="ins-details">
                        <h1 className="institute-name"> Institute Name: {instituteName}</h1>
                        <p class="ins-des"> Des: {instituteDescription}</p>
                        <p class="ins-des"> Email: {mobile}</p>
                        <p class="ins-des"> Mobile: {email}</p>
                        <p class="ins-des"> Address: {instituteAddress}</p>
                    </div>
                </div>
                {(role !== 'student') ? <div className='button-container'>
                <Link to="/edit/institute"> <button className='edit-button' > Edit institute </button></Link>
                    <button className='delete-button' onClick={deleteInstitute}>Delete institute</button>
            </div> : 
                false
            }
        </div>
        </div>
    )
 }
 
export default GetInstitute