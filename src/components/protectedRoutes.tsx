import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { RootState } from '../store/store';
import { useCookies } from 'react-cookie';
import { userDetail } from '../features/user/userThunks'
import { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";

type propstype = {
    component: JSX.Element,
};

const Protected = ({ component } : propstype) => {
    const [cookies] = useCookies(['token']);
    if(cookies.token) {
        try{
            const decodedToken : any = jwt_decode(cookies.token);
            const dateNow = new Date();
            if(decodedToken.exp < dateNow.getTime()) {
                return component;
            } else {
                return <Navigate to='/login' />
            }
        } catch (error) {
            return <Navigate to='/login' />
        }
    } else {
        return <Navigate to='/login' />
    }
}

export default Protected