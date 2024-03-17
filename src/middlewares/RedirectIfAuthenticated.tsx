import {useAuth} from 'providers';
import {PropsWithChildren, ReactNode} from 'react';
import {Navigate, Outlet} from 'react-router';

type Props = {
    element?: ReactNode;
    to?: string;
} & PropsWithChildren;

export function RedirectIfAuthenticated(props: Props) {
    const {state: authState} = useAuth();

    if (authState.isAuthenticated) {
        return <Navigate to={props.to || '/'} />;
    }

    return <>
        {props.element}
        {props.children}
        <Outlet />
    </>;
}
