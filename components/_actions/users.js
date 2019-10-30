import axios from 'axios'
import { ip } from '../ip'

export const getUser = (id, token) => {
    return {
        type: 'GET_USER',
        payload: axios({
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            url: `${ip}/user/${id}`
        })
    }
}