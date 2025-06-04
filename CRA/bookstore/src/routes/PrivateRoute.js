import { useContext } from "react";
import { AuthContext } from "../components/context/auth.context";
import { Navigate } from 'react-router-dom';
function PrivateRoute({children}) {
            const {auth,setAuth} =useContext(AuthContext)
             console.log("Auth status:", auth);
             let isUser=false;
             if(auth.user.role === 'user' )
             {
                isUser=true;
             }
             else{
                isUser=false
             }
             console.log(isUser);
            if(!auth.isAuthenticated&&!auth.loading)
            {
                return (
                <Navigate to="/login" replace />)
            }   
    return children;
}

export default PrivateRoute;