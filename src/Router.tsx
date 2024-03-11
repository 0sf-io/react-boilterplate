import {AccountActivated} from 'components/auth/account-activated';
import {ActivateAccount} from 'components/auth/activate-account';
import {Dashboard} from 'components/dashboard';
import {MessagePage} from 'components/common/message-page';
import {ForgotPassword} from 'components/auth/forgot-password';
import {MagicLinkAuth} from 'components/auth/magic-link-auth';
import {Register} from 'components/auth/register';
import {ResetPassword} from 'components/auth/reset-password';
import {CenteredLayout} from 'layouts/CenteredLayout';
import {Layout} from "layouts/Layout";
import {RedirectIfAuthenticated} from "middlewares/RedirectIfAuthenticated";
import {RequiresAuth} from "middlewares/RequiresAuth";
import {Login} from "components/auth/login";
import {ApiProvider} from "providers/api-providers";
import {createRoutesFromElements, Route} from "react-router";
import {createBrowserRouter} from "react-router-dom";

const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout/>}>
            <Route path="/" element={<RequiresAuth element={<Dashboard/>}/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>

            <Route path="/auth">

            </Route>
            <Route path="/login" element={<RedirectIfAuthenticated>
                <ApiProvider providers={["auth"]}>
                    <CenteredLayout title={"Login"}>
                        <Login/>
                    </CenteredLayout>
                </ApiProvider>
            </RedirectIfAuthenticated>}/>

            <Route path="/signup" element={<RedirectIfAuthenticated>
                <ApiProvider providers={["auth"]}>
                    <CenteredLayout title={"Register"}>
                        <Register />
                    </CenteredLayout>
                </ApiProvider>
            </RedirectIfAuthenticated>}/>

            <Route path="/forgot-password" element={<RedirectIfAuthenticated>
                <ApiProvider providers={["auth"]}>
                    <CenteredLayout title={"Forgot Password"}>
                        <ForgotPassword/>
                    </CenteredLayout>
                </ApiProvider>
            </RedirectIfAuthenticated>}/>

            <Route path="/reset-password" element={<RedirectIfAuthenticated>
                <ApiProvider providers={["auth"]}>
                    <CenteredLayout title={"Reset Password"}>
                        <ResetPassword/>
                    </CenteredLayout>
                </ApiProvider>
            </RedirectIfAuthenticated>}/>

            <Route path="/account/activate" element={<ApiProvider providers={["auth"]}>
                    <CenteredLayout title={"Activate Your Account"}>
                        <ActivateAccount/>
                    </CenteredLayout>
                </ApiProvider>}/>

            <Route path="/account/activated" element={<ApiProvider providers={["auth"]}>
                    <CenteredLayout title={"Account Activated"}>
                        <AccountActivated/>
                    </CenteredLayout>
                </ApiProvider>}/>

            <Route path="/auth/magic" element={<ApiProvider providers={["auth"]}>
                    <CenteredLayout title={"Magic Link Auth"}>
                        <MagicLinkAuth/>
                    </CenteredLayout>
                </ApiProvider>}/>

            <Route path="/error/404" element={<ApiProvider providers={["auth"]}>
                    <CenteredLayout title={"404"}>
                        <MessagePage code={404} message="Page not found" description="Oops! The page you're looking for doesn't exist."/>
                    </CenteredLayout>
                </ApiProvider>}/>
        </Route>,
    ),
);

export default Router;
