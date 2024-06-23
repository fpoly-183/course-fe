import { combineReducers } from 'redux';
import container from './components/containers/reducer';
import account from './components/modules/account/account.reducer';
import authentication from './components/modules/auth/auth.reducer';

const rootReducer = combineReducers({ container, authentication, account });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
