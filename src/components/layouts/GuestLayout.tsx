import {CenteredLayout} from 'components/layouts/CenteredLayout';
import {RedirectIfAuthenticated} from 'components/middlewares/RedirectIfAuthenticated';
import {PropsWithChildren} from 'react';
import {Outlet} from "react-router";

type GuestLayoutProps = PropsWithChildren<{title?: string}>;

export function GuestLayout(props: GuestLayoutProps) {
    return (<>
        <RedirectIfAuthenticated to={'/'}>
            <CenteredLayout title={props.title}>
                <Outlet />
            </CenteredLayout>
        </RedirectIfAuthenticated>
    </>);
}
