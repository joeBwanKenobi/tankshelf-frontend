import { Route, Redirect, RouteProps } from 'react-router-dom';

interface ProtectedRouteProps extends RouteProps {
    isLoggedIn: boolean;
}

const ProtectedRoute = ({ children, ...rest }: ProtectedRouteProps) => {
    console.log(rest);
    return (
        <Route
            {...rest} render={({ location }) => {
                return rest.isLoggedIn ? children
                : <Redirect to={{
                    pathname: '/signup',
                    state: { from: location }
                }} />
            }}
        />
    )
}

export default ProtectedRoute;