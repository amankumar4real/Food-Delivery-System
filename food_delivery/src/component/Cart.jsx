import React from "react";
import {connect} from "react-redux"
import { findFetchOrder, findCartDel, findOnWay} from "../redux/action";
import {Link} from "react-router-dom"

class Cart extends React.Component{
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
        this.props.findFetchOrder(temp)
    }

    handleOwnWay = (items) => {

        var obj = {
            ids: items
        }

        this.props.findOnWay(obj)
        
        var temp = {
            user_id: this.props.loginData[0][3]
        }

        this.props.findFetchOrder(temp)
    }

    render(){
        const {userOrders, loginProgress, findOnWay} = this.props

        var cart_data = userOrders.filter(a=>{
                return a[4] == 0
        })

        var onway_arr = []

        for(var k = 0; k < cart_data.length; k++ ){
            onway_arr.push(cart_data[k][3])
        }

        var total_money = 0

        userOrders && userOrders.map(a=>{
            if(a[4] == 0){
                total_money += a[2]
            }
            
        })

        if(loginProgress == "logged in!"){
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

                <div className="row mt-4 text-center">
                    <div className="col">
                        <h1>ORDERS</h1>
                    </div>
                </div>
                
                <div className="row ">
                    <div className="offset-2 mt-5 col-8 ">
                    <div class="card mx-auto bg-light" style={{width: "26rem"}}>
                            <img class="card-img-top" src="billing.jpg" alt="Card image cap"/>
                            <div class="card-body">
                                <h5 class="card-title text-danger">Total</h5>
                                <h6>Rs. {total_money}</h6>
                            </div>
                            <h6 className="ml-2">BREAKDOWN</h6>
                            <table class="table table-striped table-hover text-center table-dark">
                                <thead>
                                    <tr>
                                    <th scope="col">ITEM</th>
                                    <th scope="col">PRICE</th>
                                    <th scope="col">REMOVE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {cart_data && cart_data.map(a=>(
                                    <tr>
                                        <td className="text-danger">{a[1]}</td>
                                        <td>{a[2]}</td>
                                        <td><button onClick={()=>this.handleCartRemove(a)} className="btn btn-warning btn-sm">Remove</button></td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <div class="card-body">
                                <button onClick={()=>this.handleOwnWay(onway_arr)} className="btn btn-lg btn-success m-1">Checkout</button>
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
                    <div className="col-12 text-center mt-5">
                        <h1>You need to login!</h1>
                        <Link to="/login"><button className="mr-1 mb-1 btn btn-warning">Sign In</button></Link>
                    </div>
                </div>
            )
        }

        
    }
}

const mapStateToProps = state => {
    return{
        loginData: state.loginData,
        loginProgress: state.loginProgress,
        userOrders: state.userOrders
    }
}

const mapDispatchToProps = dispatch => {
    return{
        findFetchOrder: payload => dispatch(findFetchOrder(payload)),
        findCartDel: payload => dispatch(findCartDel(payload)),
        findOnWay: payload => dispatch(findOnWay(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)