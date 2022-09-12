import axiox from 'axios';
import { toast } from 'react-toastify';

export const signup = async (user: any) => {
    const url = "http://localhost:3139/register";
    try{
        const registeredUser = await axiox.post(url, user, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        return registeredUser;
    } catch(error: any) {
        if(error.status === 500) {
            toast.error('No internet connectivity');
        } 
        toast.error(error.response.data);
    }
}

export const signin = async (user: any) => {
    
    try{
        const url = "http://localhost:3139/login";
        const response = await axiox.post(url, user, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        return response;
    }catch(error: any) {
        if(error.status === 500) {
            toast.error('No internet connectivity');
        } 
        toast.error(error.response.data);
    }
}

export const userDetail = async (token: string) => {
    try{
        const url = "http://localhost:3139/me";
        const response = await axiox.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return response;
    }catch(error: any) {
        if(error.status === 500) {
            toast.error('No internet connectivity');
        } 
        toast.error(error.response.data);
    }
}


