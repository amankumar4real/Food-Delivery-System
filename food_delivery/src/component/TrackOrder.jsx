import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {findTrackOrder, findComplete} from "../redux/action"

class TrackOrder extends React.Component{
    constructor(props){
        super(props)
    }

    handleComplete = (items) => {
        var datas = {
            order_id: items[0]
        }
        this.props.findComplete(datas)

        var datas_b = {
            res_id: items[4],
            owner_id:items[5]
        }

        const {findTrackOrder} = this.props

        setTimeout(function(){
            findTrackOrder(datas_b)
        }, 500)
    }


    render(){
        const {orderTrackData, loginProgress} = this.props
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

                <div className="row mt-4 text-center">
                    <div className="col">
                        <h1>New Orders!</h1>
                    </div>
                </div>


                <div className="row mt-5">
                        <div className="offset-2 col-8">
                                <h5 class="card-header bg-dark text-light">Current Orders!</h5>
                                <table class="card-body table table-hover table-striped table-success">
                                    <thead>
                                        <tr>
                                            <th scope="col">Dish name</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">User Name</th>
                                            <th scope="col">Complete Order</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            orderTrackData && orderTrackData.map(a=>(
                                                <tr>
                                                    <td>{a[1]}</td>
                                                    <td>{a[2]}</td>
                                                    <td>{a[3]}</td>
                                                    <td><button onClick={()=>this.handleComplete(a)} className="btn btn-sm btn-outline-danger">Done</button></td>
                                                </tr>
                                            ))
                                        }
                                        
                                    </tbody>
                                </table>
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
        loginProgress: state.loginProgress,
        orderTrackData: state.orderTrackData
}
}

const mapDispatchToProps = dispatch => {
    return{
        findTrackOrder: payload => dispatch(findTrackOrder(payload)),
        findComplete: payload => dispatch(findComplete(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackOrder)