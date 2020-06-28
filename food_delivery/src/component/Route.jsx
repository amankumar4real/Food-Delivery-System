import React from "react";
import {Route} from "react-router-dom";
import Home from "./Home";
import Restaurant from "./Restaurant";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard"
import Cart from "./Cart"
import DashboardOwner from "./DashboardOwner"
import TrackOrder from "./TrackOrder"
import AdsRes from "./Add_rest"

const Routers = () => {
    return(
        <div>
            <Route path="/" exact component={Home}/>
            <Route path="/restaurant" component={Restaurant}/>
            <Route path="/register" component = {Register}/>
            <Route path="/login" component={Login}/>
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/cart" component={Cart}/>
            <Route path="/dashboard_owner" component={DashboardOwner}/>
            <Route path="/track_order" component={TrackOrder}/>
            <Route path="/add_res" component={AdsRes}/>
        </div>
    )
}

export default Routers