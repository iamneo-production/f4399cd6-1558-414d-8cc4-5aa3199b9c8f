import React from 'react'
 import { Component } from 'react'

class ViewCart extends Component  {
    state = {CourseData : []};

    componentDidMount(){
        this.getCoursedata(this.props.match.params.id);
        // this.setState({role : localStorage.getItem("userRole")});
    }

    getCoursedata = async (id) => {
        // const { role } = this.state;
        const role = localStorage.getItem("userRole");
        const response = await fetch(`http://localhost:8081/${role}/course/${id}`)
        const data = await response.json();
        const displayCourse = data.map(eachItem => ({
            id: eachItem.courceId,
            courseName: eachItem.name,
            courseDescription: eachItem.description,
            Duration: eachItem.duration
        }));
        this.setState({ CourseData: displayCourse });
        console.log("sds",this.state.CourseData)
    }

    render(){

     return(
            // componentDidMount() {
    //     let r = localStorage.getItem('userRole').toString();
    //     this.state.role = r;
    //     this.state.instId = this.props.match.params.id;
    //     this.getCoursedata(this.props.match.params.id);
    // }
    
    <div>
        saehcernth
    </div>
     )


    }
    
    
    

}

export default ViewCart