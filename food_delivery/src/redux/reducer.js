import {fetch_primary_data, fetch_primary_data_succ, fetch_primary_data_fail, selected_hotel, fetch_res_dish, fetch_res_dish_succ, fetch_res_dish_fail, 
    fetch_reg, fetch_reg_fail, fetch_reg_succ, change_reg, fetch_log, fetch_log_succ, fetch_log_fail, change_log, insert_order, insert_order_succ, insert_order_fail, 
    fetch_orders, fetch_orders_succ, fetch_orders_fail, log_out, fetch_cart, fetch_cart_succ, fetch_cart_fail, fetch_onway, fetch_onway_succ, fetch_onway_fail,
    fetch_rest, fetch_rest_succ, fetch_rest_fail, fetch_track_order, fetch_track_order_fail, fetch_track_order_succ, fetch_complete,
    fetch_complete_succ, fetch_complete_fail, fetch_add_restaurant, fetch_add_restaurant_succ, fetch_add_restaurant_fail, change_add_restaurant} from "./actionType"

const initState = {
    primaryData: [],
    selHotel: "",
    searched: false,
    resData: [],
    regProgress: "",
    loginProgress: "",
    loginData: [],
    userOrders: [],
    cartRemove: "",
    onWayProgress: "",
    loginKind: "",
    restData: [],
    orderTrackData: [],
    completeMessage: "",
    addRest: "",
}

export default(state = initState, {type, payload}) => {

    switch(type){
        
        case fetch_primary_data:
            return{
                ...state
            } 

        case fetch_primary_data_succ:
            return{
                ...state,
                primaryData: payload
            } 

        case fetch_primary_data_fail:
            return{
                ...state
            }

        case selected_hotel:
            return{
                ...state,
                selHotel: payload,
                searched: !state.searched
            }

        case fetch_res_dish:
            return{
                ...state
            }

        case fetch_res_dish_succ:
            return{
                ...state,
                resData: payload
            }

        case fetch_res_dish_fail:
            return{
                ...state
            }

        case fetch_reg:
            return{
                ...state
            }

        case fetch_reg_succ:
            // console.log(payload)
            return{
                ...state,
                regProgress: "done"
            }

        case change_reg:
            return{
                ...state,
                regProgress: ""
            }

        case fetch_log:
            return{
                ...state
            }

        case fetch_log_succ:
            // console.log(payload)
            return{
                ...state,
                loginProgress: payload["message"],
                loginData: payload["data"],
                loginKind: payload["kind"]
            }

        case change_log:
            // console.log("ola")
            return{
                ...state,
                loginProgress: ""
            }

        case insert_order:
            // console.log(payload)
            return{
                ...state,
            }

        case insert_order_succ:
            // console.log(payload)
            return{
                ...state,
            }

        case fetch_orders:
            return{
                ...state
            }

        case fetch_orders_succ:
            console.log(payload)
            return{
                ...state,
                userOrders: payload.data
            }

        case log_out:
            return{
                ...state,
                loginProgress: ""
            }

        case fetch_cart:
            return{
                ...state
            }

        case fetch_cart_succ:
            console.log(payload)
            return{
                ...state,
                cartRemove: payload
            }

        case fetch_onway:
            return{
                ...state
            }

        case fetch_onway_succ:
            return{
                ...state,
                onWayProgress: payload
            }

        case fetch_rest:
            return{
                ...state
            }

        case fetch_rest_succ:
            return{
                ...state,
                restData: payload
            }

        case fetch_track_order:
            return{
                ...state
            }

        case fetch_track_order_succ:
            // console.log(payload)
            return{
                ...state,
                orderTrackData: payload
            }

        case fetch_complete:
            return{
                ...state
            }

        case fetch_complete_succ:
            console.log(payload)
            return{
                ...state,
                completeMessage: payload
            }

        case fetch_add_restaurant:
            return{
                ...state
            }

        case fetch_add_restaurant_succ:
            return{
                ...state,
                addRest: payload
            }

        case change_add_restaurant:
            return{
                ...state,
                addRest: ""
            }

        default:
            return state
    }
}