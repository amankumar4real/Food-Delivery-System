import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {findFetchOrder, findRest, findTrackOrder} from "../redux/action"
import styles from "../css/DashOwner.module.css"

class DashboardOwner extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        if(this.props.loginProgress == "logged in!"){
            var temp = {
            owner_id: this.props.loginData[0][3]
        }
        this.props.findRest(temp)
        }
    }

    handleOrders = (items) => {
        var datas = {
            res_id: items[0],
            owner_id:items[1]
        }
        this.props.findTrackOrder(datas)
        this.props.history.push("/track_order")
    }
    handleAddRes = () => {
        this.props.history.push("/add_res")
    }

    render(){
        const {loginProgress, loginData, restData} = this.props

        if (loginProgress == "logged in!"){
            return(
            <>
                 <div className="container-fluid">
                    <div className="row bg-light justify-content-end">
                        <ul class="nav justify-content-end">
                            <li class="nav-item">
                                <Link className="nav-link mr-3" to="/contact">Contact</Link>
                            </li>
                        </ul>
                    </div>
                    <div style={{
                    backgroundImage: "url('https://wallpaperaccess.com/full/7285.jpg')", backgroundRepeat: "no-repeat",
                    backgroundSize: "cover", padding:"120px 0px 400px 0px"}}>
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

                    <div className="row text-center">
                        <div className="col-12 col-md-6 mt-3">
                            <button onClick={this.handleAddRes} className="btn btn-sm btn-primary">ADD NEW HOTEL</button>
                        </div>
                        <div className="col-12 col-md-6 mt-3">
                            <button className="btn btn-sm btn-primary">ADD NEW DISH</button>
                        </div>
                    </div>

                    <div className="row mt-5">
                        <div className="offset-2 col-8">
                                <h5 class="card-header bg-dark text-light ">Restaurant Owned!</h5>
                                <div className="table-responsive">
                                <table class="card-body table table-hover table-dark table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Contact</th>
                                            <th scope="col">Rating</th>
                                            <th scope="col">See Orders</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            restData && restData.map(a=>(
                                                <tr>
                                                    <td>{a[2]}</td>
                                                    <td>{a[3]}</td>
                                                    <td>{a[4]}</td>
                                                    <td><button onClick={()=>this.handleOrders(a)} className="btn btn-sm btn-outline-danger">Orders</button></td>
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
            </>
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
        restData: state.restData
}
}

const mapDispatchToProps = dispatch => {
    return{
        findFetchOrder: payload => dispatch(findFetchOrder(payload)),
        findRest: payload => dispatch(findRest(payload)),
        findTrackOrder: payload => dispatch(findTrackOrder(payload))
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardOwner)