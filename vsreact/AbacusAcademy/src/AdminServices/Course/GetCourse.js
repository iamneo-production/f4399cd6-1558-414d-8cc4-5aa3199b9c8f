import React from 'react'
import { Link } from 'react-router-dom';

import './GetCourse.css'

 const GetCourse = props => {
    const { CourseData, role, ondeleteCourse, i, instId, addedCartC, key } = props
    const userId = localStorage.getItem("userId");
    const {id, courseName, courseDescription, Duration, addedTocart, fromLoad} = CourseData;
    const deleteCourse = () => {
        ondeleteCourse(id, i);
    }
    const addToCart = async ()=>{
        console.log("userId",CourseData);
        const url  = `http://localhost:8081/${role}/enroll`;
        const courseDetails = { studentId : userId, courseId : CourseData.id.toString(), instituteId :  instId}
        const options = {
            method: "POST",
            headers : {
              'Content-type' : 'application/json'
            },
            body: JSON.stringify(courseDetails),
        }
        const response = await fetch(url, options);
        const data = response.json;
        if(data.status === 200){
            console.log("fdssssssssssssssssss");
            addedCartC(key);
            // addedTocart = true;
        }
    }
    return (
        <div className='courseContainer'>     
            <div className='item-container'>
            <h1>{courseName}</h1>
            <p>{courseDescription}</p>
            <p>{Duration}</p>
            {(role !== 'student') ? 
            <div className='button-container'>
               <Link to="/edit/institute">
                  <button className='edit-button' > Edit Course </button>
                </Link>
                <button className='delete-button' onClick={deleteCourse}>Delete Course</button>
            </div> :
            <div className='button-container'>
                {fromLoad && addedTocart && <button className='edit-button' disabled>Added to cart</button>}
                {!addedTocart &&  <button className='edit-button' onClick={addToCart}>Add to cart</button>}
            </div>
            }
        </div>
        </div>
    )
 }
 
export default GetCourse