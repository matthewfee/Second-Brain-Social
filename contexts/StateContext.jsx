import { createContext, useContext, useReducer } from 'react';
import { reducer } from './reducer';

const initialState = {
  user: { name: 'Anonymous', isAuthenticated: false },
  modal: { show: false, content: '' },
  alert: { show: false, header: '', message: '', success: false },
};
const Context = createContext(initialState, () => initialState);

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const exposed = {
    state,
    dispatch,
  };
  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useStateValue = () => useContext(Context);

export default UserProvider;
