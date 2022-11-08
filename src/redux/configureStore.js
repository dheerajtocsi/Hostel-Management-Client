import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Students } from './students';
import { Employees } from './employees';
import { Notices } from './notices';
import { Architecture } from './architecture';
import { SeatAllocation } from './seatallocation';
import { Auth } from './auth';
import thunk from 'redux-thunk';
import { Complaints } from './complaints';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            students: Students,
            notices: Notices,
            employees: Employees,
            architectures: Architecture,
            seatAllocation: SeatAllocation,
            complaints: Complaints,
            auth: Auth,
        }, +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),
        applyMiddleware(thunk)
    );

    return store;
}