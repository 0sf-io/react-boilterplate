import {yupResolver} from '@hookform/resolvers/yup';
import { Label } from "components/ui/label"
import { Input } from "components/ui/input"
import { Checkbox } from "components/ui/checkbox"
import { Button } from "components/ui/button"
import { Separator } from "components/ui/separator"
import {ErrorMessage} from '@hookform/error-message';
import {WorkingIndicator} from 'components/common/working-indicator';
import {useToast} from 'components/ui/use-toast';
import {useAuth, useHttpClient} from 'providers';
import {useState} from 'react';
import {Title} from 'react-head';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Trans, useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router';
import {Link, NavLink} from 'react-router-dom';
import {SocialIcon} from 'react-social-icons';
import * as yup from 'yup';

interface IFormInput {
    email: string;
    password: string;
    remember_me?: boolean;
}

const schema = yup.object({
  email: yup.string().email('This field must be a valid email').required('This field is required'),
  password: yup.string().min(8, 'This field must be more than 8 characters').max(60, 'This field must be less than 60 characters').required('This field is required'),
  remember_me: yup.boolean(),
}).required();

export function Login() {
  const {api: authApi, state: authState, actions: authActions, dispatch} = useAuth();
  const httpClient = useHttpClient();
  const navigate = useNavigate();
  const {t} = useTranslation();
  const {toast} = useToast();
  const {register, formState: {errors}, handleSubmit} = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const [working, setWorking] = useState(false);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setWorking(true);
    try {
      const {data: {token}} = await authApi.login(data);
      httpClient.setAuthorizationHeader(`Bearer ${token}`);

      const user = await authApi.getUser();

      dispatch(authActions.login(user.data, token));

      navigate(authState.nextRoute || "/");
    } catch (e) {
      toast({
        title: t('Error'),
        description: t('Something went wrong. Please try again.'),
      });
      console.log(e);
    } finally {
      setWorking(false);
    }
  };

  return (
      <>
        <Title><Trans>Login</Trans></Title>
        <div key="1" className="mx-auto max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold"><Trans>Login</Trans></h1>
            <p className="text-gray-500 dark:text-gray-400">
              <Trans>Enter your email and password to login to your account</Trans>
            </p>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email"><Trans>Email</Trans></Label>
                  <Input id="email" placeholder="m@example.com" type="email" {...register('email')} />
                  <ErrorMessage errors={errors}
                                name="email"
                                render={({message}) => <p className="text-red-500 text-xs">{t(message)}</p>}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password"><Trans>Password</Trans></Label>
                  <Input id="password" type="password" {...register('password')} />
                  <ErrorMessage errors={errors}
                                name="password"
                                render={({message}) => <p className="text-red-500 text-xs">{t(message)}</p>}
                  />
                </div>
                <div className="flex items-center mt-2 mb-2 justify-between">
                  <div className="flex items-center justify-between">
                    <Checkbox id="remember-me" {...register('remember_me', {
                      setValueAs: (value) => value === 'on',
                    })} />
                    &nbsp;
                    <Label className="text-sm" htmlFor="remember-me">
                      <Trans>Remember Me</Trans>
                    </Label>
                  </div>
                  <Link className="text-sm underline" to="/auth/forgot-password">
                    <Trans>Forgot your password?</Trans>
                  </Link>
                </div>
                <Button className="w-full" type="submit" disabled={working}>
                  <Trans>Login</Trans>
                  {working && <>&nbsp;<WorkingIndicator className="ml-2" /></>}
                </Button>
              </div>
            </form>
            <Separator className="my-8 flex items-center">
              <div className="flex-1 border-t border-gray-200 dark:border-gray-800" />
              <span className="px-3 bg-gray-50 text-gray-500 dark:text-gray-400"><Trans>OR</Trans></span>
              <div className="flex-1 border-t border-gray-200 dark:border-gray-800" />
            </Separator>
            <div className="flex space-x-4 justify-center">
              <Button className="w-fit h-fit p-0 m-0 rounded-full" variant="outline">
                <SocialIcon network="google" />
                <span className="sr-only"><Trans>Login with Google</Trans></span>
              </Button>
              <Button className="w-fit h-fit p-0 m-0 rounded-full" variant="outline">
                <SocialIcon network="github" />
                <span className="sr-only"><Trans>Login with GitHub</Trans></span>
              </Button>
              <Button className="w-fit h-fit p-0 m-0 rounded-full" variant="outline">
                <SocialIcon network="gitlab" />
                <span className="sr-only"><Trans>Login with GitLab</Trans></span>
              </Button>
              <Button className="w-fit h-fit p-0 m-0 rounded-full" variant="outline">
                <SocialIcon network="linkedin" />
                <span className="sr-only"><Trans>Login with LinkedIn</Trans></span>
              </Button>
              <Button className="w-fit h-fit p-0 m-0 rounded-full" variant="outline">
                <SocialIcon network="twitter" />
                <span className="sr-only"><Trans>Login with Twitter</Trans></span>
              </Button>
            </div>

            <Separator className="mt-5 mb-5" />

            <p className="text-center text-sm text-gray-500">
              <Trans>Not a member?</Trans> {" "}
              <NavLink to="/auth/signup" className="text-sm underline">
                <Trans>Sign up for a new account</Trans>
              </NavLink>
            </p>
          </div>
        </div>
      </>
  )
}
