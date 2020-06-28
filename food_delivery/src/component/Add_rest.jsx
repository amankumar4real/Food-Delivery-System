import React from "react"
import {connect} from "react-redux"

class AdsRes extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className="container-fluid">
                <div className="row mt-5">
                    <div className="offset-3 col-6">
                        <div class="form-group">
                            <label>Name</label>
                            <input class="form-control"/>
                        </div>
                        <div class="form-group">
                            <label>Established</label>
                            <input class="form-control"/>
                        </div>
                        <div class="form-group">
                            <label>Contact</label>
                            <input class="form-control"/>
                        </div>
                        <div class="form-group">
                            <label>Rating</label>
                            <input class="form-control"/>
                        </div>
                        <button className="btn btn-warning">ADD</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default AdsRes