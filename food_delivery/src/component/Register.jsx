import React from "react";
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import {findReg, changeReg} from "../redux/action"
import styles from "../css/Register.module.css"


class Register extends React.Component{
    state = {
        f_name: "",
        l_name: "",
        email: "",
        password: "",
        city: "",
        typ: "user"
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){
        const {findReg, regProgress, changeReg} = this.props
        console.log(regProgress)

        if(regProgress == "done"){
            alert(`${this.state.f_name} you are registered. Try Logging in!`)
            changeReg()
        }

        return(
            <div>
                <div>
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
                        <h1 className="mb-5 font-italic text-dark offset-3 col-6 offset-sm-4 col-sm-4 offset-lg-4 col-lg-4">Register!</h1>
                        <input name="f_name" value={this.state.f_name} onChange={this.handleChange} className="mt-1 form-control offset-3 col-6 offset-sm-4 col-sm-4 offset-lg-4 col-lg-4" placeholder="Enter First Name" /><br/>
                        <input name="l_name" value={this.state.l_name} onChange={this.handleChange} className="mt-1 form-control offset-3 col-6 offset-sm-4 col-sm-4 offset-lg-4 col-lg-4" placeholder="Enter Last Name" /><br/>
                        <input name="email" value={this.state.email} onChange={this.handleChange} className="mt-1 form-control offset-3 col-6 offset-sm-4 col-sm-4 offset-lg-4 col-lg-46" placeholder="Enter Email" /><br/>
                        <input name="password" type="password" value={this.state.password} onChange={this.handleChange} className="mt-1 form-control offset-3 col-6 offset-sm-4 col-sm-4 offset-lg-4 col-lg-4" placeholder="Enter Password" /><br/>
                        <input name="city" value={this.state.city} onChange={this.handleChange} className="mt-1 form-control offset-3 col-6 offset-sm-4 col-sm-4 offset-lg-4 col-lg-4" placeholder="Enter City" /><br/>
                        <select value={this.state.typ} onChange={(event)=>this.setState({typ: event.target.value})} id="inputState" class="mt-1 form-control offset-3 col-6 offset-sm-4 col-sm-4 offset-lg-4 col-lg-4">
                            <option value="user">Customer</option>
                            <option value="owner">Owner</option>
                        </select><br/>
                        <button onClick={()=>findReg(this.state)} className="offset-4 col-4 offset-sm-5 col-sm-2 offset-lg-5 col-lg-2 btn btn-success">Register</button>
                    </div>  
                    </div>
                    
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        regProgress: state.regProgress
        
    }
}

const mapDispatchToProps = dispatch => {
    return{
        findReg: payload => dispatch(findReg(payload)),
        changeReg: payload => dispatch(changeReg(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)