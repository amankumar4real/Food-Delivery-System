import React from "react"
import {connect} from "react-redux"
import {findAddRestaurant, changeAddRestaurant} from "../redux/action"

class AdsRes extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            name:"",
            est:"",
            contact:"",
            rating:""
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleHotel = (data) =>{
        const {loginData, findAddRestaurant} = this.props

        data["owner_id"] = loginData[0][3]
        console.log(data)

        findAddRestaurant(data)
    }

    render(){

        const {loginProgress, findAddRestaurant, addRest, changeAddRestaurant} = this.props

        if(addRest == "Data added!"){
            alert(`New restaurant ${this.state.name} added!`)
            changeAddRestaurant()
        }

        if(loginProgress == "logged in!"){
            return(
                    <div className="container-fluid">
                        <div className="row mt-5 text-center">
                            <div className="col">
                                <h2>ADD RESTAURANT</h2>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div class="card bg-light mt-5 mx-auto" style={{width: "26rem"}}>
                                <img class="card-img-top" src="hotel.jpg" alt="Card image cap"/>
                                <div class="card-body">
                                <div class="form-group">
                                    <label>Name</label>
                                    <input name="name" value={this.state.name} onChange={this.handleChange} class="form-control"/>
                                </div>
                                <div class="form-group">
                                    <label>Established</label>
                                    <input name="est" value={this.state.est} onChange={this.handleChange} class="form-control"/>
                                </div>
                                <div class="form-group">
                                    <label>Contact</label>
                                    <input name="contact" value={this.state.contact} onChange={this.handleChange} class="form-control"/>
                                </div>
                                <div class="form-group">
                                    <label>Rating</label>
                                    <input name="rating" value={this.state.rating} onChange={this.handleChange} class="form-control"/>
                                </div>
                                <button onClick={()=>this.handleHotel(this.state)} className="btn btn-warning">ADD</button>
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
        loginData: state.loginData,
        loginProgress: state.loginProgress,
        addRest: state.addRest
    }
}

const mapDispatchToProps = dispatch => {
    return{
        findAddRestaurant: payload => dispatch(findAddRestaurant(payload)),
        changeAddRestaurant: payload => dispatch(changeAddRestaurant(payload))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AdsRes)