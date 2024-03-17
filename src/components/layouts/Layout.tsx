import {GuestLayout} from 'components/layouts/GuestLayout';
import {UserLayout} from 'components/layouts/UserLayout';
import {useAuth} from 'providers';

export function Layout() {
    const {state: {isAuthenticated}} = useAuth();

    return isAuthenticated ? <UserLayout /> : <GuestLayout />;
}
