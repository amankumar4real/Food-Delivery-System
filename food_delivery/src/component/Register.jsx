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
                        <h1 className="mb-5 font-italic text-dark text-center">Register!</h1>
                        <div class="card bg-success mt-5 mx-auto col-10 col-sm-8 col-md-6 col-lg-4 col-xl-3">
                                <img class="card-img-top mx-auto mt-4" style={{width:"40%"}} src="register.png" alt="Card image cap"/>
                                <div class="card-body">
                                <div class="form-group">
                                    <label>Enter First Name</label>
                                    <input name="f_name" value={this.state.f_name} onChange={this.handleChange} className="form-control" placeholder="" />
                                </div>
                                <div class="form-group">
                                    <label>Enter Last Name</label>
                                    <input name="l_name" value={this.state.l_name} onChange={this.handleChange} className="form-control" placeholder="" />
                                </div>
                                <div class="form-group">
                                    <label>Enter Email</label>
                                    <input name="email" value={this.state.email} onChange={this.handleChange} className="form-control" placeholder="" />
                                </div>
                                <div class="form-group">
                                    <label>Enter Password</label>
                                    <input name="password" type="password" value={this.state.password} onChange={this.handleChange} className="form-control" placeholder="" />
                                </div>
                                <div class="form-group">
                                    <label>Enter City</label>
                                    <input name="city" value={this.state.city} onChange={this.handleChange} className="form-control" placeholder="" />
                                </div>
                                <div class="form-group">
                                    <label>User Type</label>
                                    <select value={this.state.typ} onChange={(event)=>this.setState({typ: event.target.value})} id="inputState" class="form-control">
                                        <option value="user">Customer</option>
                                        <option value="owner">Owner</option>
                                    </select>
                                </div>
                                    <button onClick={()=>findReg(this.state)} className="btn mt-2 btn-warning">Register</button>
                                </div>
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