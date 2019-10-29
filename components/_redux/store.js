import { createStore, combineReducers, applyMiddleware } from 'redux';
import { logger, promise } from './middleware'

import room from '../_reducers/room'
import customer from '../_reducers/customer'
import order from '../_reducers/checkin'

const reducers = combineReducers({
    room,
    customer,
    order
})

const store = createStore(
    reducers,
    applyMiddleware(logger, promise)

)
export default store
