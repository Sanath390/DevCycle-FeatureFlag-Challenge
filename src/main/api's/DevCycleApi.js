import axios from "axios";

export const getOauthToken = async () => {
    const data = new URLSearchParams({
        grant_type: 'client_credentials',
        audience: 'https://api.devcycle.com/',
        client_id: process.env.REACT_APP_DEVCYCLE_CLIENT_ID,
        client_secret: process.env.REACT_APP_DEVCYCLE_CLIENT_SECRET
    });

    try {
        const response = await axios({
            method: 'post',
            url: 'http://localhost:8080/oauth/token',
            // withCredentials: false,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        });
        
        return response.data;
    } catch (error) {
        console.error('Error getting OAuth token:', error);
        throw error;
    }
};

export const getAudience = async (token, project, key) => {
    try {
        const response = await axios({
            method: 'get',
            url: `https://api.devcycle.com/v1/projects/${project}/audiences/${key}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        return response.data;
    } catch (error) {
        console.error('Error fetching audience:', error);
        throw error;
    }
};

export const updateAudience = async (token, project, name, key, description, values) => {
    try {
        const payload = {
            name: `${name}`,
            key: `${key}`,
            description: `${description}`,
            filters: {
                filters: [
                    {
                        subType: "user_id",
                        comparator: "=",
                        values: values,
                        type: "user"
                    }
                ],
                operator: "or"
            }
        };

        const response = await axios({
            method: 'patch',
            url: `https://api.devcycle.com/v1/projects/${project}/audiences/${key}`,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: payload
        });

        return response.data;
    } catch (error) {
        console.error('Error updating audience:', error);
        throw error;
    }
};


