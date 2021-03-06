import React from "react";
import {Link, Route} from "react-router-dom";
import {connect} from "react-redux";
import {findData} from "../redux/action";
import Search from "./Search"
import styles from "../css/Home.module.css"

class Home extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.findData()
    }

    render(){
        const {primaryData, findData, searched} = this.props
        
        if(searched == true){
            this.props.history.push("/restaurant")
        }

        return(
            <div className="container-fluid" key="searchhere">
                <div className="row bg-light justify-content-end">
                    <ul class="nav justify-content-end">
                        <li class="nav-item">
                            <Link className="nav-link mr-2" to="/">Contact</Link>
                        </li>
                        <li class="nav-item">
                            <Link className="nav-link mr-3" to="/">About Us</Link>
                        </li>
                    </ul>
                </div>
                <div style={{
                    backgroundImage: "url('https://libreshot.com/wp-content/uploads/2017/12/winter-forest.jpg')", backgroundRepeat: "no-repeat",
                    backgroundSize: "cover", padding:"120px 0px 400px 0px"}}>
                    <div className="row mt-5" >
                        <div className="offset-3 col-6 offset-md-4 col-md-4">
                            <h2 style={{fontSize:"3vw"}} className="font-italic text-dark">CRAVINGS? Go On!</h2>
                        </div>
                    </div>
                    <div className="row mb-5 mx-auto"  key = "home's here">
                        <Search/>
                    </div>
                    {/* <div className="row ml-5 mt-5"  >
                        <img className="img-fluid " src="cheesea.png" style={{width:"40%"}} alt="cheese"/>
                    </div> */}
                </div>
                <div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        primaryData: state.primaryData,
        searched: state.searched
    }
}

const mapDispatchToProps = dispatch => {
    return{
        findData: payload => dispatch(findData(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)