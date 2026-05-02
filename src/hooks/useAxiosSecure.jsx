import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";


const instance = axios.create({
    baseURL: 'http://localhost:3000/api',
});


const useAxiosSecure = ()=>{
    const {user, signOutUser} = useAuth();
    const navigate = useNavigate();

  useEffect(()=>{
      const instanceRequest = instance.interceptors.request.use(config=>{
        config.headers.authorization = `Bearer ${user?.accessToken}`;
        return config;
    });

    const instanceResponse = instance.interceptors.response.use(res=>{
      return res;
    },err=>{ 
      const status = err.status;
      if(status === 401 || status === 403){
        signOutUser().then(() => {
          navigate('/login');
        }
        
        )
      }
    })

    return ()=>{
      instance.interceptors.request.eject(instanceRequest);
      instance.interceptors.response.eject(instanceResponse);
    }

    

   
  },[user, navigate, signOutUser])


}

export default useAxiosSecure;