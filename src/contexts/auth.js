import { createContext, useState } from "react";

export const AuthContext = createContext({});
export function AuthProvider(props){
    const [user,setuser] = useState([]);
    const [loading,setloading] = useState('')
    return (
        <AuthContext value={{user,setuser,loading,setloading}}>{props.children}</AuthContext>
    )
}