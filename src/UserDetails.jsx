import {useState, createContext, useMemo} from 'react';

const UserContext = createContext({sub: "", rol: "", accessToken: ""});

const UserProvider = ({children}) => {

    const [user, setUser] = useState({sub: "", rol: "", accessToken: ""});

    const value = useMemo(() => ({user, setUser}), [user])

    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
}
export {UserContext, UserProvider};