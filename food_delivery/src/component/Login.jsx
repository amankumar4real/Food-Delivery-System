import React from "react";
import {connect} from "react-redux";
import {findLog, changeLog} from "../redux/action"
import {Link} from "react-router-dom"
import styles from "../css/Login.module.css"

class Login extends React.Component{
    state={
        email:"",
        password: "",
        typ:"user"
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){
        const {findLog, loginProgress, changeLog, loginKind} = this.props
        if(loginProgress == "logged in!"){
            if(loginKind == "user"){
                this.props.history.push("/dashboard")
            }
            else{
                this.props.history.push("/dashboard_owner")
            }
        }
        else if(loginProgress == "Wrong details!"){
            alert("Check your details")
            changeLog()
        }
        return(
            <div >
                <div className="row bg-light justify-content-end">
                    <ul class="nav justify-content-end">
                        <li class="nav-item">
                            <Link className="nav-link mr-2" to="/">Home</Link>
                        </li>
                        <li class="nav-item">
                            <Link className="nav-link mr-3" to="/contact">Contact</Link>
                        </li>
                    </ul>
                </div>
                <div className={styles.bck} style={{padding:"90px 0px 190px 0px"}}>
                    <div className="mt-5 container-fluid">
                        <h1 className="font-italic text-dark text-center">Login!</h1>
                        <div class="card bg-danger mt-5 mx-auto" style={{width: "26rem"}}>
                                <img class="card-img-top mx-auto mt-4" style={{width:"40%"}} src="login.png" alt="Card image cap"/>
                                <div class="card-body">
                                <div class="form-group">
                                    <label>Email</label>
                                    <input name="email" value={this.state.name} onChange={this.handleChange} className="mt-1 form-control offset-3 col-6 offset-sm-4 col-sm-4 offset-lg-4 col-lg-4" placeholder="Email id" class="form-control"/>
                                </div>
                                <div class="form-group">
                                    <label>Password</label>
                                    <input type="password" name="password" value={this.state.name} onChange={this.handleChange} className="mt-1 form-control offset-3 col-6 offset-sm-4 col-sm-4 offset-lg-4 col-lg-4" placeholder="Password" class="form-control"/>
                                </div>
                                <div class="form-group">
                                    <label>User Type</label>
                                    <select value={this.state.typ} onChange={(event)=>this.setState({typ: event.target.value})} id="inputState" class="form-control">
                                        <option value="user">Customer</option>
                                        <option value="owner">Owner</option>
                                    </select>
                                </div>
                                    <button onClick={()=>findLog(this.state)} className=" btn btn-primary">Login</button>
                                </div>
                            </div>
                        </div> 
                    </div>
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        loginProgress: state.loginProgress,
        loginKind: state.loginKind
    }
}

const mapDispatchToProps = dispatch => {
    return{
        findLog: payload => dispatch(findLog(payload)),
        changeLog: payload => dispatch(changeLog(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)