import {useState, createContext, useMemo} from 'react';

const UserContext = createContext({name: "", roles: []});

const UserProvider = ({children}) => {

    const [user, setUser] = useState({name: "", roles: []});

    const value = useMemo(() => ({user, setUser}), [user])

    return <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
}
export {UserContext, UserProvider};