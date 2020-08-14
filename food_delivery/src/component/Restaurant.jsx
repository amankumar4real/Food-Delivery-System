import React from "react";
import {connect} from "react-redux";
import {selectedHotel, findResData, findInsertOrder, findFetchOrder} from "../redux/action";
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

            var temp = {
                user_id: this.props.loginData[0][3]
            }

            const {findFetchOrder} = this.props

            setTimeout(function(){
                findFetchOrder(temp)
            }, 500)
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
                                <img src="rest.png" className="img-fluid" style={{width:"80%", minWidth:"50px"}} alt="yahoo"/>
                            </div>
                            <div className="col-10">
                                <div className="col-10 mb-2 text-danger">
                                    <h2 style={{fontSize:"2vw"}}>{resData[0][0]}</h2>
                                </div>
                                <div className="text-secondary col-10">
                                    <h4 style={{fontSize:"2vw"}}>Contact: {resData[0][2]}</h4>
                                </div>
                                <div className="text-secondary col-10">
                                    <h4 style={{fontSize:"2vw"}}>Established: {resData[0][1]}</h4>
                                </div>
                                <div className="text-secondary col-10">
                                    <h4 style={{fontSize:"2vw"}}>Rating: {resData[0][3]}/5</h4>
                                </div>
                            </div>
                            
                        </div>
                        <div className="row">
                            <div className="col-12 mt-5">
                                <h1 style={{fontSize:"3vw"}}>{resData.length} Results Found!</h1>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row p-5">
                    {resData && resData.map((a,b)=>(
                        (b%2 ==0 )?
                        <div  className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 my-4">
                            <div  class="card" style={{borderRadius : "30px 0px"}}>
                                <img class="card-img-top img-fluid" src= {a[7]} style={{height:"200px", borderRadius : "30px 0px 0px 0px"}} alt="Card image cap"/>
                                <div class="card-body table-primary">
                                    <h5 class="card-title">{a[4]}</h5>
                                    <h6 className="mb-2">Rs. {a[6]}</h6>
                                    <p class="card-text text-secondary">{a[5].split("").slice(0, 100).join("")}......</p>
                                    <button onClick={()=>this.handle_cart(a)} className="btn-sm btn btn-outline-danger">ADD TO CART</button>
                                </div>
                            </div>
                        </div>:
                        <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 my-4">
                        <div class="card" style={{borderRadius : "0px 30px"}}>
                            <img class="card-img-top img-fluid" style={{height:"200px", borderRadius : "0px 30px 0px 0px"}} src= {a[7]} alt="Card image cap"/>
                            <div class="card-body table-danger">
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
        loginData: state.loginData,
        userOrders: state.userOrders
    }
}

const mapDispatchToProps = dispatch => {
    return{
        selectedHotel: payload => dispatch(selectedHotel(payload)),
        findResData: payload => dispatch(findResData(payload)),
        findInsertOrder: payload => dispatch(findInsertOrder(payload)),
        findFetchOrder: payload => dispatch(findFetchOrder(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Restaurant)

// "https://hopecitykc.org/hcwp/wp-content/uploads/2013/05/placeholder-1200x671.png"