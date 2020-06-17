import React from "react";
import {Link} from "react-router-dom"
import {connect} from "react-redux";
import {findFetchOrder, logOut} from "../redux/action"

class Top extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        const {loginProgress, loginData, logOut, loginKind} = this.props
        if(loginProgress != "logged in!"){
            return(
                <div className="container-fluid">
                    <div className="row bg-dark rounded">
                        <div  className="col-6 my-auto">
                            <table>
                                <tr>
                                    <td rowSpan="2">
                                        <img className="img-fluid mr-3" style={{maxWidth: "5rem"}} src="icon2.png" alt="logo"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h2 style={{fontWeight:"bolder", fontSize:"25px", fontFamily:"italic", color:"white"}}>EAT 24</h2>
                                    </td>
                                </tr>
                            </table>
                        </div>
    
                        <div className="col-6 my-auto text-right">
                            <Link to="/register"><button className="mr-1 mb-1 btn btn-sm btn-outline-success">Sign Up</button></Link>
                            <Link to="/login"><button className="mr-1 mb-1 btn btn-sm btn-primary">Sign In</button></Link>
                            <Link to="/cart"><img src="cart4.png" className="mr-2 mb-1 img-fluid img-card" style={{width:"6%", background:""}} alt="cart"/></Link>
                        </div>
                    </div>
                        
                </div>
            )
        }
        else{
            if(loginKind == "user"){
                return(
                        <div className="container-fluid">
                            <div className="row bg-dark rounded">
                                <div  className="col-6 my-auto">
                                    <table>
                                        <tr>
                                            <td rowSpan="2">
                                                <img className="img-fluid mr-3" style={{maxWidth: "5rem"}} src="icon2.png" alt="logo"/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h2 style={{fontWeight:"bolder", fontSize:"25px", fontFamily:"italic", color:"white"}}>EAT 24</h2>
                                            </td>
                                        </tr>
                                    </table>
                                </div>

                                <div className="col-6 my-auto text-right">
                                <Link to="/cart"><img src="cart4.png" className="mr-2 mb-1 img-fluid img-card" style={{width:"6%", background:""}} alt="cart"/></Link>
                                    <button onClick={logOut} className="btn btn-sm btn-danger mr-2">Logout</button>
                                    <button className="btn btn-sm btn-outline-warning"><Link to="/dashboard">Hi {loginData[0][0]}!</Link></button>
                                </div>
                            </div>
                                
                        </div>
        )
            }
            else{
                return(
                    <div className="container-fluid">
                        <div className="row bg-dark rounded">
                            <div  className="col-6 my-auto">
                                <table>
                                    <tr>
                                        <td rowSpan="2">
                                            <img className="img-fluid mr-3" style={{maxWidth: "5rem"}} src="icon2.png" alt="logo"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h2 style={{fontWeight:"bolder", fontSize:"25px", fontFamily:"italic", color:"white"}}>EAT 24</h2>
                                        </td>
                                    </tr>
                                </table>
                            </div>
        
                            <div className="col-6 my-auto text-right">
                                <button onClick={logOut} className="btn btn-sm btn-danger mr-2">Logout</button>
                                <button className="btn btn-sm btn-outline-warning"><Link to="/dashboard_owner">Hi {loginData[0][0]}!</Link></button>
                            </div>
                        </div>
                            
                    </div>
                )
            }
            
        }
        
    }
}

const mapStateToProps = state => {
    return{
        userOrders: state.userOrders,
        loginData: state.loginData,
        loginProgress: state.loginProgress,
        loginKind: state.loginKind
    }
}

const mapDispatchToProps = dispatch => {
    return{
        findFetchOrder: payload => dispatch(findFetchOrder(payload)),
        logOut: payload => dispatch(logOut(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Top)