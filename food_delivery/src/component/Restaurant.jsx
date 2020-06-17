import React from "react";
import {connect} from "react-redux";
import {selectedHotel, findResData, findInsertOrder} from "../redux/action";
import Search from "./Search"
import {Link} from "react-router-dom"
import styles from "../css/Restaurant.module.css"

class Restaurant extends React.Component{
    constructor(props){
        super(props)
        // this.state = ({
        //     res_id: "",
        //     dish_id: ""
        // })
    }

    componentDidMount(){
        this.props.selectedHotel(this.props.selHotel)
        this.props.findResData(this.props.selHotel)
        
    }

    handle_cart = (log_datas) => {
        if(this.props.loginProgress == "logged in!"){
            var new_data = {
                user_id: this.props.loginData[0][3],
                res_id: log_datas[8],
                dish_id: log_datas[9]
            }
            this.props.findInsertOrder(new_data)
        }
        else{
            alert("You need to login!")
        }
    }
    render(){
        const {resData, searched, selHotel, findResData, loginProgress} = this.props
        console.log(loginProgress)

        if(this.props.searched == true){
            findResData(selHotel)
        }

        if(resData.length <=0){
            return(
                <div className="container-fluid" key = "hotels">
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
                    <div className="row">
                        <Search/>
                    </div>

                    <div className="row p-4 text-center">
                        <div className="offset-4 col-4">
                            <h1>Data Not Found</h1>
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return(
            <div key = "hotels" className="container_fluid">
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
                <div className="row">
                    <Search/>
                </div>

                <div className="row p-2 rounded pt-5 pb-3">
                    <div className="offset-2 col-8">
                        <div className="row">
                            <div className="col-2">
                                <img src="rest.png" className="img-fluid" style={{width:"80%"}} alt="yahoo"/>
                            </div>
                            <div className="col-10">
                                <div className="col-10 mb-2 text-danger">
                                    <h2>{resData[0][0]}</h2>
                                </div>
                                <div className="text-secondary col-10">
                                    <h4>Contact: {resData[0][2]}</h4>
                                </div>
                                <div className="text-secondary col-10">
                                    <h4>Established: {resData[0][1]}</h4>
                                </div>
                                <div className="text-secondary col-10">
                                    <h4>Rating: {resData[0][3]}/5</h4>
                                </div>
                            </div>
                            
                        </div>
                        <div className="row">
                            <div className="col-12 mt-5">
                                <h1>{resData.length} Results Found!</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row p-5">
                    {resData && resData.map(a=>(
                        <div className="col-3 my-4">
                            <div class="card ">
                                <img class="card-img-top" src= {a[7]} alt="Card image cap"/>
                                <div class="card-body bg-light">
                                    <h5 class="card-title">{a[4]}</h5>
                                    <h6 className="mb-2">Rs. {a[6]}</h6>
                                    <p class="card-text text-secondary">{a[5].split("").slice(0, 100).join("")}......</p>
                                    <button onClick={()=>this.handle_cart(a)} className="btn-sm btn btn-outline-primary">ADD TO CART</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
        }
        
    }
}

const mapStateToProps = state => {
    return{
        selHotel: state.selHotel,
        resData: state.resData,
        searched: state.searched,
        loginProgress: state.loginProgress,
        loginData: state.loginData
    }
}

const mapDispatchToProps = dispatch => {
    return{
        selectedHotel: payload => dispatch(selectedHotel(payload)),
        findResData: payload => dispatch(findResData(payload))  ,
        findInsertOrder: payload => dispatch(findInsertOrder(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Restaurant)

// "https://hopecitykc.org/hcwp/wp-content/uploads/2013/05/placeholder-1200x671.png"