import {AccountActivated} from 'components/auth/account-activated';
import {ActivateAccount} from 'components/auth/activate-account';
import {Dashboard} from 'components/dashboard';
import {MessagePage} from 'components/common/message-page';
import {ForgotPassword} from 'components/auth/forgot-password';
import {MagicLinkAuth} from 'components/auth/magic-link-auth';
import {Register} from 'components/auth/register';
import {ResetPassword} from 'components/auth/reset-password';
import {CenteredLayout} from 'layouts/CenteredLayout';
import {Layout} from 'layouts/Layout';
import {RedirectIfAuthenticated} from 'middlewares/RedirectIfAuthenticated';
import {RequiresAuth} from 'middlewares/RequiresAuth';
import {Login} from 'components/auth/login';
import {ApiProvider} from 'providers/api-providers';
import {createRoutesFromElements, Route} from 'react-router';
import {createBrowserRouter} from 'react-router-dom';

const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />} errorElement={<CenteredLayout>
            <MessagePage message='Error' description='Oops! Something went wrong. Please try again later.' />
        </CenteredLayout>}>
            <Route path="/" element={<RequiresAuth element={<Dashboard />} />} />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/auth" element={<RedirectIfAuthenticated to="/dashboard" />}>
                <Route path="login" element={<RedirectIfAuthenticated to="/dashboard">
                    <ApiProvider providers={['auth']}>
                        <CenteredLayout title={'Login'}>
                            <Login />
                        </CenteredLayout>
                    </ApiProvider>
                </RedirectIfAuthenticated>} />
                <Route path="signup" element={<RedirectIfAuthenticated to="/dashboard">
                    <ApiProvider providers={['auth']}>
                        <CenteredLayout title={'Register'}>
                            <Register />
                        </CenteredLayout>
                    </ApiProvider>
                </RedirectIfAuthenticated>} />
                <Route path="forgot-password" element={<RedirectIfAuthenticated to="/dashboard">
                    <ApiProvider providers={['auth']}>
                        <CenteredLayout title={'Forgot Password'}>
                            <ForgotPassword />
                        </CenteredLayout>
                    </ApiProvider>
                </RedirectIfAuthenticated>} />
                <Route path="reset-password" element={<RedirectIfAuthenticated to="/dashboard">
                    <ApiProvider providers={['auth']}>
                        <CenteredLayout title={'Reset Password'}>
                            <ResetPassword />
                        </CenteredLayout>
                    </ApiProvider>
                </RedirectIfAuthenticated>} />
                <Route path="magic" element={<RedirectIfAuthenticated to="/dashboard">
                    <ApiProvider providers={['auth']}>
                        <CenteredLayout title={'Magic Link Auth'}>
                            <MagicLinkAuth />
                        </CenteredLayout>
                    </ApiProvider>
                </RedirectIfAuthenticated>} />
            </Route>

            <Route path="/account/activate" element={<ApiProvider providers={['auth']}>
                <CenteredLayout title={'Activate Your Account'}>
                    <ActivateAccount />
                </CenteredLayout>
            </ApiProvider>} />

            <Route path="/account/activated" element={<ApiProvider providers={['auth']}>
                <CenteredLayout title={'Account Activated'}>
                    <AccountActivated />
                </CenteredLayout>
            </ApiProvider>} />

            <Route path='*' element={<CenteredLayout>
                <MessagePage code={404} message='Page not found' description='Oops! The page you are looking for does not exist' />
            </CenteredLayout> } />
        </Route>,
    ),
);

export default Router;
