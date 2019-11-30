import {useState, useEffect} from 'react';

export default httpClient => {
    const [error, setError] = useState(null);

    // was in componentWillMount, that is called before render method
    const reqInterceptor = httpClient.interceptors.request.use(req => {
        setError(null);
        return req;
    });
    // was in componentWillMount, that is called before render method
    const resInterceptor = httpClient.interceptors.response.use(res => res, err => {
        setError(err);
    });


    useEffect(() => {
        return () => {
            // was in componentWillUnmount
            httpClient.interceptors.request.eject(reqInterceptor);
            httpClient.interceptors.response.eject(resInterceptor);
        };
    }, [reqInterceptor, resInterceptor]);

    const errorConfirmedHandler = () => {
        setError(null);
    };

    return [error, errorConfirmedHandler];
}
