import {AccountActivated} from 'components/auth/account-activated';
import {ActivateAccount} from 'components/auth/activate-account';
import {Dashboard} from 'components/dashboard';
import {MessagePage} from 'components/common/message-page';
import {ForgotPassword} from 'components/auth/forgot-password';
import {MagicLinkAuth} from 'components/auth/magic-link-auth';
import {Register} from 'components/auth/register';
import {ResetPassword} from 'components/auth/reset-password';
import {CenteredLayout} from 'components/layouts/CenteredLayout';
import {Layout} from 'components/layouts/Layout';
import {Login} from 'components/auth/login';
import {RedirectIfAuthenticated} from 'components/middlewares/RedirectIfAuthenticated';
import {RequiresAuth} from 'components/middlewares/RequiresAuth';
import {createRoutesFromElements, Route} from 'react-router';
import {createBrowserRouter} from 'react-router-dom';

const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" errorElement={<CenteredLayout>
            <MessagePage message="Error" description="Oops! Something went wrong. Please try again later." />
        </CenteredLayout>}>
            <Route path="/auth" element={<RedirectIfAuthenticated to='/dashoard' element={<Layout />} /> }>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Register />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="reset-password" element={<ResetPassword />} />
                <Route path="magic" element={<MagicLinkAuth />} />
            </Route>

            <Route path="/" element={<RequiresAuth element={<Layout />} />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />

                <Route path="account/activate" element={<ActivateAccount />} />
                <Route path="account/activated" element={<AccountActivated />} />
            </Route>

            <Route path="*" element={<CenteredLayout>
                <MessagePage code={404}
                             message="Page not found"
                             description="Oops! The page you are looking for does not exist" />
            </CenteredLayout>} />
        </Route>,
    ),
);

export default Router;
