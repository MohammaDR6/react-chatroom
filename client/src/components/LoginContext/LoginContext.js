import React, {useState} from 'react';
const LoginContext = React.createContext({})

export const LoginContextProvider = ({ children }) => {
  const [loginData, setLoginData] = useState({userName:"", roomId:""})

    return ( 
        <LoginContext.Provider value={[loginData, setLoginData]}>
            {children}
        </LoginContext.Provider>
    );
}
 
export default LoginContext;