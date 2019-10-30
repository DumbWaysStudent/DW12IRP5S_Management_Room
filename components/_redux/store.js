import { createStore, combineReducers, applyMiddleware } from 'redux';
import { logger, promise } from './middleware'

import room from '../_reducers/room'
import customer from '../_reducers/customer'
import order from '../_reducers/checkin'
import user from '../_reducers/users'

const reducers = combineReducers({
    room,
    customer,
    order,
    user
})

const store = createStore(
    reducers,
    applyMiddleware(logger, promise)

)
export default store
