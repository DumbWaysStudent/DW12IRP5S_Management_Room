import axios from 'axios'
import { ip } from '../ip'

export const getRoom = (id, token) => {
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

export const getCustomer = (id, token) => {
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

export const getOrder = (id, token) => {
    return {
        type: 'GET_ORDERS',
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
