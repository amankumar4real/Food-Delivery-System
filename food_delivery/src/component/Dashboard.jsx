import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Search from "./Search"
import {findFetchOrder, findCartDel} from "../redux/action"
import styles from "../css/Dash.module.css"


class Dashboard extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        if(this.props.loginProgress == "logged in!"){
            var temp = {
            user_id: this.props.loginData[0][3]
        }
        this.props.findFetchOrder(temp)
        }
    }

    handleCartRemove = (item) => {
        var datas = {
            id: item[3]
        }
        this.props.findCartDel(datas)

        var temp = {
            user_id: this.props.loginData[0][3]
        }

        const {findFetchOrder} = this.props

        setTimeout(function(){
            findFetchOrder(temp)
        }, 500)
        
    }

    render(){
        const {loginData, loginProgress, userOrders} = this.props

        var onWay = userOrders.filter(a=>{
            return a[4] == 1
        })

        var ordComp = userOrders.filter(a=>{
            return a[4] == 2
        })

        if (loginProgress == "logged in!"){
            return(
            <div className="container-fluid">
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
                
                <div style={{
                    backgroundImage: "url('https://free4kwallpapers.com/uploads/originals/2019/05/18/firewatch-wallpaper.jpg')", backgroundRepeat: "no-repeat",
                    backgroundSize: "cover", padding:"120px 0px 300px 0px"}}>
                    
                        <div className="row">
                                <div className="offset-4 col-4 text-center mt-2">
                                    <img src="profile.png" style={{width:"40%"}} className="img-fluid mx-auto"/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="offset-4 col-4 text-center mt-2">
                                    <div className="row">
                                        <div className="col-12">
                                            <h5><mark>{loginData[0][0].toUpperCase()} {loginData[0][1].toUpperCase()}</mark></h5>
                                        </div>
                                        <div className="col-12">
                                            <h6><mark>City: {loginData[0][2].toUpperCase()}</mark></h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row p-3 text-center mx-auto mt-5">
                                <div className="offset-2 col-8">
                                        <h5 class="card-header bg-dark text-light">Order On way!</h5>
                                        <div className="table-responsive">
                                        <table class="card-body table table-hover table-striped table-dark">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Item</th>
                                                    <th scope="col">Price</th>
                                                    <th scope="col">Restaurant</th>
                                                    <th scope="col">Cancel</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    onWay && onWay.map(a=>(
                                                        <tr>
                                                            <td>{a[1]}</td>
                                                            <td>{a[2]}</td>
                                                            <td>{a[0]}</td>
                                                            <td><button onClick={()=>this.handleCartRemove(a)} className="btn btn-sm btn-outline-danger">Cancel</button></td>
                                                        </tr>
                                                    ))
                                                }
                                                
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="row p-3 text-center mx-auto">
                                <div className="offset-2 col-8">
                                        <h5 class="card-header bg-dark text-light">Completed Orders!</h5>
                                        <div className="table-responsive">
                                        <table class="card-body table table-hover table-striped table-dark">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Item</th>
                                                    <th scope="col">Price</th>
                                                    <th scope="col">Restaurant</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    ordComp && ordComp.map(a=>(
                                                        <tr>
                                                            <td>{a[1]}</td>
                                                            <td>{a[2]}</td>
                                                            <td>{a[0]}</td>
                                                        </tr>
                                                    ))
                                                }
                                                
                                            </tbody>
                                        </table>
                                        </div>
                                </div>
                            </div>
                </div>
                
            </div>
        )
        }
        else{
            return(
                <div>
                    {this.props.history.push("/login")}
                </div>
            )
        }
        
    }
}

const mapStateToProps = state => {
    return{
        loginData : state.loginData,
        loginProgress: state.loginProgress,
        userOrders: state.userOrders
    }
}

const mapDispatchToProps = dispatch => {
    return{
        findFetchOrder: payload => dispatch(findFetchOrder(payload)),
        findCartDel: payload => dispatch(findCartDel(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)