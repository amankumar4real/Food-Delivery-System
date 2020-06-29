import {fetch_primary_data, fetch_primary_data_succ, fetch_primary_data_fail, selected_hotel, fetch_res_dish, fetch_res_dish_succ, fetch_res_dish_fail, 
    fetch_reg, fetch_reg_succ, fetch_reg_fail, change_reg, fetch_log, fetch_log_succ, fetch_log_fail, change_log, insert_order, insert_order_succ, insert_order_fail, 
    fetch_orders, fetch_orders_succ, fetch_orders_fail, log_out, fetch_cart, fetch_cart_succ, fetch_cart_fail, fetch_onway, fetch_onway_succ, fetch_onway_fail, 
    fetch_rest, fetch_rest_succ, fetch_rest_fail, fetch_track_order, fetch_track_order_succ, fetch_track_order_fail, 
    fetch_complete, fetch_complete_succ, fetch_complete_fail, fetch_add_restaurant_fail, fetch_add_restaurant, fetch_add_restaurant_succ, change_add_restaurant} from "./actionType"
import axios from "axios"

export const fetchPrimaryData = payload => ({
    type: fetch_primary_data,
    payload
})

export const fetchPrimaryDataFail = payload => ({
    type: fetch_primary_data_fail,
    payload
})

export const fetchPrimaryDataSucc = payload => ({
    type: fetch_primary_data_succ,
    payload
})

export const selectedHotel = payload => ({
    type: selected_hotel,
    payload
})

export const fetchResDish = payload => ({
    type: fetch_res_dish,
    payload
})

export const fetchResDishSucc = payload => ({
    type: fetch_res_dish_succ,
    payload
})

export const fetchResDishFail = payload => ({
    type: fetch_res_dish_fail,
    payload
})

export const fetchReg = payload => ({
    type: fetch_reg,
    payload
})

export const fetchRegSucc = payload => ({
    type: fetch_reg_succ,
    payload
})

export const fetchRegFail = payload => ({
    type: fetch_reg_fail,
    payload
})

export const changeReg = payload => ({
    type: change_reg,
    payload
})

export const fetchLog = payload => ({
    type: fetch_log,
    payload
})

export const fetchLogSucc = payload => ({
    type: fetch_log_succ,
    payload
})

export const fetchLogFail = payload => ({
    type: fetch_log_fail,
    payload
})

export const changeLog = payload => ({
    type: change_log,
    payload
})

export const insertOrder = payload => ({
    type: insert_order,
    payload
})

export const insertOrderSucc = payload => ({
    type: insert_order_succ,
    payload
})

export const insertOrderFail = payload => ({
    type: insert_order_fail,
    payload
})

export const fetchOrder = payload => ({
    type: fetch_orders,
    payload
})

export const fetchOrderSucc = payload => ({
    type: fetch_orders_succ,
    payload
})

export const fetchOrderFail = payload => ({
    type: fetch_orders_fail,
    payload
})

export const logOut = payload => ({
    type: log_out,
    payload
})

export const fetchCart = payload => ({
    type: fetch_cart,
    payload
})

export const fetchCartSucc = payload => ({
    type: fetch_cart_succ,
    payload
})

export const fetchCartFail = payload => ({
    type: fetch_cart_fail,
    payload
})

export const fetchOnway = payload => ({
    type: fetch_onway,
    payload
})

export const fetchOnwaySucc = payload => ({
    type: fetch_onway_succ,
    payload
})

export const fetchOnwayFail = payload => ({
    type: fetch_onway_fail,
    payload
})

export const fetchRest = payload => ({
    type: fetch_rest,
    payload
})

export const fetchRestSucc = payload => ({
    type: fetch_rest_succ,
    payload
})

export const fetchRestFail = payload => ({
    type: fetch_rest_fail,
    payload
})

export const fetchTrackOrder = payload => ({
    type: fetch_track_order,
    payload
})

export const fetchTrackOrderSucc = payload => ({
    type: fetch_track_order_succ,
    payload
})

export const fetchTrackOrderFail = payload => ({
    type: fetch_track_order_fail,
    payload
})

export const fetchComplete = payload => ({
    type: fetch_complete,
    payload
})

export const fetchCompleteSucc = payload => ({
    type: fetch_complete_succ,
    payload
})

export const fetchCompleteFail = payload => ({
    type: fetch_complete_fail,
    payload
})

export const fetchAddRestaurant = payload => ({
    type: fetch_add_restaurant,
    payload
})

export const fetchAddRestaurantSucc = payload => ({
    type: fetch_add_restaurant_succ,
    payload
})

export const fetchAddRestaurantFail = payload => ({
    type: fetch_add_restaurant_fail,
    payload
})

export const changeAddRestaurant = payload => ({
    type: change_add_restaurant,
    payload
})


// axios call for basic restaurant and dish details
export const findData = payload => dispatch => {
    dispatch(fetchPrimaryData)

    return axios.get("http://127.0.0.1:5000/")
    .then(res=> res.data.data)
    .then(res=> dispatch(fetchPrimaryDataSucc(res)))
    .catch(error=>dispatch(fetchPrimaryDataFail(error)))
}

// axios call to list all the restaurant and its menu
export const findResData = payload => dispatch => {
    dispatch(fetchResDish)

    return axios.post(`http://127.0.0.1:5000/res/${payload}`,)
    .then(res=> res.data.data)
    .then(res=> dispatch(fetchResDishSucc(res)))
    .catch(error=>dispatch(fetchResDishFail(error)))
}

//axios call to register an user/owner
export const findReg = payload => dispatch => {
    dispatch(fetchReg)

    return axios.post("http://127.0.0.1:5000/register",payload)
    .then(res=> res.data)
    .then(res=> dispatch(fetchRegSucc(res)))
    .catch(error=>dispatch(fetchRegFail(error)))
}

//axios call to login an user/owner
export const findLog = payload => dispatch => {
    // console.log(payload)
    dispatch(fetchLog)

    return axios.post("http://127.0.0.1:5000/login",payload)
    .then(res=> res.data)
    .then(res=> dispatch(fetchLogSucc(res)))
    .catch(error=>dispatch(fetchLogFail(error)))
}

// axios call to insert the orders by an user
export const findInsertOrder = payload => dispatch=> {
    dispatch(insertOrder)

    return axios.post("http://127.0.0.1:5000/insert_order",payload)
    .then(res=> res)
    .then(res=> dispatch(insertOrderSucc(res)))
    .catch(error=>dispatch(insertOrderFail(error)))
}

// axios call for the cart
export const findFetchOrder = payload => dispatch=> {
    dispatch(fetchOrder)

    return axios.post("http://127.0.0.1:5000/get_order",payload)
    .then(res=> res.data)
    .then(res=> dispatch(fetchOrderSucc(res)))
    .catch(error=>dispatch(fetchOrderFail(error)))
}

// axios for cart deletion
export const findCartDel = payload => dispatch=> {
    // console.log(payload)
    dispatch(fetchCart)

    return axios.post("http://127.0.0.1:5000/remove_item",payload)
    .then(res=> res.data.message)
    .then(res=> dispatch(fetchCartSucc(res)))
    .catch(error=>dispatch(fetchCartFail(error)))
}

//axios call to order the food
export const findOnWay = payload => dispatch=> {
    // console.log(payload)
    dispatch(fetchOnway)

    return axios.post("http://127.0.0.1:5000/onway",payload)
    .then(res=> res.data.message)
    .then(res=> dispatch(fetchOnwaySucc(res)))
    .catch(error=>dispatch(fetchOnwayFail(error)))
}

// axios call to get the name of restaurant owned by a single man
export const findRest = payload => dispatch=> {
    // console.log(payload)
    dispatch(fetchRest)

    return axios.post("http://127.0.0.1:5000/find_rest",payload)
    .then(res=> res.data.data)
    .then(res=> dispatch(fetchRestSucc(res)))
    .catch(error=>dispatch(fetchRestFail(error)))
}

//axios call to get all the orders from a restaurant
export const findTrackOrder = payload => dispatch=> {
    // console.log(payload)
    dispatch(fetchTrackOrder)

    return axios.post("http://127.0.0.1:5000/order_track",payload)
    .then(res=> res.data.data)
    .then(res=> dispatch(fetchTrackOrderSucc(res)))
    .catch(error=>dispatch(fetchTrackOrderFail(error)))
}

//axios call to complete the order
export const findComplete = payload => dispatch=> {
    // console.log(payload)
    dispatch(fetchComplete)

    return axios.post("http://127.0.0.1:5000/complete_order",payload)
    .then(res=> res.data.message)
    .then(res=> dispatch(fetchCompleteSucc(res)))
    .catch(error=>dispatch(fetchCompleteFail(error)))
}

//axios calls to add new restaurants
export const findAddRestaurant = payload => dispatch => {
    dispatch(fetchAddRestaurant)

    return axios.post("http://127.0.0.1:5000/add_rest", payload)
    .then(res=> res.data)
    .then(res=>dispatch(fetchAddRestaurantSucc(res)))
    .catch(error=>dispatch(fetchAddRestaurantFail(error)))
}