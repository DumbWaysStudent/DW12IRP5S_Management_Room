import axios from 'axios'
import { ip } from '../ip'

export const getRoom = (token) => {
    return {
        type: 'GET_ROOMS',
        payload: axios({
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            url: `${ip}/rooms`
        })
    }
}

export const getCustomer = (token) => {
    return {
        type: 'GET_CUSTOMERS',
        payload: axios({
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            url: `${ip}/customers`
        })
    }
}

export const getOrder = (token) => {
    return {
        type: 'GET_CHECKIN',
        payload: axios({
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            url: `${ip}/checkin`
        })
    }
}

export const checkin = (token, roomID, customerId, duration) => {
    return {
        type: 'CHECKIN',
        payload: axios({
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            url: `${ip}/orders`,
            data: {
                room_id: roomID,
                customer_id: customerId,
                duration: duration
            }
        })
    }
}
