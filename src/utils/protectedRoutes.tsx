import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { RootState } from '../store/store';
import { useCookies } from 'react-cookie';
import { userDetail } from '../features/user/userThunks'
import { useState, useEffect } from 'react';

type propstype = {
    component: JSX.Element,
};

const Protected = ({ component } : propstype) => {
    const [cookies] = useCookies(['token']);

    try{
        const userReponse = userDetail(cookies.token);
        return component
    } catch (error) {
        return <Navigate to='/login' />
    }
}

export default Protected
