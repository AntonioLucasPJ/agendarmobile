import { createContext, useContext, useState } from "react";

export const ServiceContext = createContext({})
export const ServiceProvider = ({ children }) => {
    const [id_service, setid_service ] = useState('')
    const [serviceicon,setserviceicon] = useState('')
    const [ servicename, setservicename] = useState('')
    const [ servicedescription, setservicedescription ] = useState('')
    const [serviceprice, setserviceprice ] = useState('') 
    return (
        <ServiceContext.Provider value={{ id_service, setid_service, servicename, setservicename,serviceicon,setserviceicon, servicedescription, setservicedescription,serviceprice,setserviceprice }}>{children}</ServiceContext.Provider>
    )
}