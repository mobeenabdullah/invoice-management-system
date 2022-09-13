import axiox from 'axios';

export const signup = async (user: any) => {
    const url = "http://localhost:3139/register";
    const registeredUser = await axiox.post(url, user, {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    return registeredUser;
}

export const signin = async (user: any) => {
    const url = "http://localhost:3139/login";
    const response = await axiox.post(url, user, {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    return response;
}

export const userDetail = async (token: string) => {
        const url = "http://localhost:3139/me";
        const response = await axiox.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return response;
}

export const updateUser = async (data: any, token: string) => {

    const userDetails : any = await userDetail(token);

    let userHascompanyDetail =  (userDetails && userDetails.data.companyDetails) ? true : false;

        const url = "http://localhost:3139/me/company";
        const response = await axiox.put(url, data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        if(userHascompanyDetail) {
            return {response: response, type: 'updated'};
        }
        return {response: response, type: 'added'};
}