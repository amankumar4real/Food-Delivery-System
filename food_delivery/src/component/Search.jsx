import React from "react";
import {Link, Route} from "react-router-dom";
import {connect} from "react-redux";
import {findData} from "../redux/action";
import {selectedHotel} from "../redux/action"
import styles from '../css/Search.module.css';

class Search extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            inp: "",
            check: []
        }
    }
    

    handleChange = (event) => {
        this.setState({
            inp: event.target.value,
            check: this.props.primaryData && this.props.primaryData.filter(a=>{
                return a[0].toLowerCase().includes(event.target.value)
            })
        })
    }

    getData = (data) => {
        this.props.selectedHotel(data)
    }

    render(){

        var count = 0

        if(this.state.inp == ""){
            return(
            <div className="container-fluid" key="searchhere">

                <div className="row mt-2">

                    <div className="offset-3 col-6 offset-md-4 col-md-4">

                        <input className="form-control mb-2" onChange={
                            this.handleChange
                        } />

                    </div>

                    <div className="col-3 col-md-4">
                        <img className="img-fluid img-card" style={{width:"10%", minWidth:"30px"}} onClick = {()=>this.getData(this.state.inp)} src="search.png"/>
                    </div>

                    
                </div>

            </div>
        )
        }
        else{
            return(
                // <div className={styles.box}>
                <div className="container-fluid" key="searchhere">
    
                    <div className="row mt-2 ">
    
                        <div className="offset-3 col-6 offset-md-4 col-md-4">

                            <input className="form-control mb-2" onChange={
                                this.handleChange
                            } />

                        </div>

                        <div className="col-3 col-md-4">
                            <img className="img-fluid img-card" style={{width:"10%"}} onClick = {()=>this.getData(this.state.inp)} src="search.png"/>
                        </div>
    
                        <div className="offset-3 col-6 offset-md-4 col-md-4">
                            <table class="table table-sm table-hover">
                                <tbody>
                            {this.state.check && this.state.check.map(a=>(
                                <tr className="table-dark text-dark">
                                    <td onClick={()=>this.getData(a[0])}>{a}</td>
                                </tr>
                                    
                            )) }
                                </tbody>
                            </table>
                        </div>
                        
                    </div>
    
                </div>
                // </div>
            )
        }
        
    }
}

const mapStateToProps = state => {
    return{
        primaryData: state.primaryData
    }
}

const mapDispatchToProps = dispatch => {
    return{
        selectedHotel: payload => dispatch(selectedHotel(payload)),
        findData: payload => dispatch(findData(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)