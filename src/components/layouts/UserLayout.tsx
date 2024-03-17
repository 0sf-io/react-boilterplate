import {RequiresAuth} from 'components/middlewares/RequiresAuth';
import {Title} from 'react-head';
import {Trans} from 'react-i18next';
import {Outlet} from "react-router";

interface UserLayoutProps {
    title?: string;
}

export function UserLayout(props: UserLayoutProps) {
    return (<>
        <Title>
            <Trans>{props.title || ''}</Trans>
        </Title>
        <RequiresAuth>
            <Outlet />
        </RequiresAuth>
    </>);
}
