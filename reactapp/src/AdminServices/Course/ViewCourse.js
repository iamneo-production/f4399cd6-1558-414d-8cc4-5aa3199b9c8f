import React, { Component } from 'react'
import GetCourse from './GetCourse';
import Header from '../../Component/Home/Nav';
import { Link, useHistory } from "react-router-dom";
import './ViewCourse.css';

export class viewCourse extends Component {
    state = { uId:"", CourseData: [], CourseDataCopy : [], role: "", isAddInst: "", search: "", instId: "",};
    componentDidMount() {
        let r = localStorage.getItem('userRole').toString();
        let uId = localStorage.getItem('userId').toString();
        this.state.role = r;
        this.state.uId = uId;
        this.state.instId = this.props.match.params.id;
        this.getCoursedata(this.props.match.params.id);
    }

    onSreach = event => {
        this.setState({ search: event.target.value })
    }

    // Get Course Details //
    getCoursedata = async (id) => {
        const { role } = this.state;
        const response = await fetch(`http://localhost:8081/${role}/course/${id}`)
        const data = await response.json();
        const displayCourse = data.map(eachItem => ({
            id: eachItem.courceId,
            courseName: eachItem.name,
            courseDescription: eachItem.description,
            Duration: eachItem.duration
        }));
        this.setState({ CourseDataCopy : displayCourse })
        this.setState({ CourseData: displayCourse });
        if(role !== 'admin'){
            this.viewCart(true);
        }
    }

    addedCart = (id)=>{
        console.log("idddd",id);
    }
    // ****  //

    // Delete Course //
    ondeleteCourse = async (id, i) => {
        const { CourseData, role } = this.state;
        console.log("dasdsadasd", i);
        const options = {
            "method": "DELETE",
        }
        
        const url = `http://localhost:8081/${role}/deleteCourse?courseId=${id}`
        const response = await fetch(url, options)
        const data = await response.json();
        if (data.status === 200) {
            CourseData.splice(i, 1);
            this.setState({ CourseData: CourseData });
            alert("Course deleted")
        }
    }
    
    viewCart = async (fromLoad = false)=> {
        const { CourseData, role } = this.state;
        const url = `http://localhost:8081/${role}/enroll/${this.state.uId}`;
        const getCartItems = await fetch(url);
        const cartItems =  await getCartItems.json();
        const map = cartItems.reduce((acc,item)=>{
            acc[item.courseId] = true;
            return acc;
        },{});
        let cartSpliced = CourseData.map((item)=>{
            if(fromLoad){
                if(map[item.id]){
                    item.addedTocart = true;
                }
                item.fromLoad = fromLoad;
                return item;
            }
            if(!fromLoad && map[item.id]){
                item.addedTocart = true;
                item.fromLoad = fromLoad;
                return item;
            }
        });
        cartSpliced = cartSpliced.filter(item => item != undefined)
        this.setState({CourseData : [...cartSpliced]})
        console.log("cartSpliced",cartSpliced);
    }

    render() {
        let { CourseData, role, isAddInst, search } = this.state;
        CourseData = CourseData.filter(eachData =>
            eachData.courseName.includes(search)
        )
        const url = `/add/course/${this.state.instId}`
        return (
            <div>
                <Header viewCartP={this.viewCart}  shouldShow={role !== 'student' ? true : false} text={"Add Institute"} />
                <div className="search-card" >
                    <input type='search'
                        onChange={this.onSreach}
                        value={search}
                        placeholder="search course"
                        className='search-bar'
                    />
                    {role !== 'student' &&  <Link to={url}> <button className='add-course-button' >Add Cource</button> </Link> }                
                    </div>

                {!isAddInst ?
                    <div className='institute-container'>
                    </div> :
                    <div >
                        <input type="search"></input>
                    </div>
                }
            </div>
        )
    }
}

export default viewCourse