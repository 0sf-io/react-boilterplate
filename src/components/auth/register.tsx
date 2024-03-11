/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/3wyzDFX67dA
 */
import {Checkbox} from 'components/ui/checkbox';
import {Label} from 'components/ui/label';
import {Input} from 'components/ui/input';
import {Button} from 'components/ui/button';
import {ErrorMessage} from '@hookform/error-message';
import {Separator} from 'components/ui/separator';
import {WorkingIndicator} from 'components/common/working-indicator';
import {useState} from 'react';
import {Title} from 'react-head';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Trans, useTranslation} from 'react-i18next';
import {NavLink} from 'react-router-dom';
import {SocialIcon} from 'react-social-icons';


interface IFormInput {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirm_password: string;
    terms: boolean;
}

const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;


export function Register() {
    const {t} = useTranslation();
    const [working, setWorking] = useState(false);
    const {register, formState: {errors}, handleSubmit} = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        console.log(data);
        setWorking(true);
        try {
            await new Promise((_, reject) => setTimeout(reject, 1000));

        } catch (e) {
            console.log(e);
        } finally {
            setWorking(false);
        }
    };

    return (
        <>
            <Title>
                <Trans>Register</Trans>
            </Title>
            <div className="mx-auto max-w-md space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">
                        <Trans>Register</Trans>
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        <Trans>Enter your details to create an account</Trans>
                    </p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="first-name">
                                    <Trans>First name</Trans>
                                </Label>
                                <Input id="first-name" placeholder="John" {...register('first_name', {
                                    required: t('This field is required'),
                                    maxLength: {value: 60, message: t('This field must be less than 60 characters')},
                                })} />
                                <ErrorMessage name="first_name"
                                              errors={errors}
                                              render={({message}) => <p className="text-red-500 text-xs">{message}</p>}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="last-name">
                                    <Trans>Last name</Trans>
                                </Label>
                                <Input id="last-name" placeholder="Doe" {...register('last_name', {
                                    required: t('This field is required'),
                                    maxLength: {value: 60, message: t('This field must be less than 60 characters')},
                                })} />
                                <ErrorMessage name="last_name"
                                              errors={errors}
                                              render={({message}) => <p className="text-red-500 text-xs">{message}</p>}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">
                                <Trans>Email</Trans>
                            </Label>
                            <Input id="email" placeholder="m@example.com" type="email" {...register('email', {
                                required: t('This field is required'),
                                pattern: {
                                    value: re,
                                    message: t('This field must be a valid email'),
                                },
                                maxLength: {
                                    value: 60,
                                    message: t('This field must be less than 60 characters'),
                                },
                            })} />
                            <ErrorMessage name="email"
                                          errors={errors}
                                          render={({message}) => <p className="text-red-500 text-xs">{message}</p>}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">
                                <Trans>Password</Trans>
                            </Label>
                            <Input id="password" type="password" {...register('password', {
                                required: 'This field is required',
                                maxLength: {
                                    value: 60,
                                    message: t('This field must be less than 60 characters'),
                                },
                                minLength: {
                                    value: 8,
                                    message: t('This field must be more than 8 characters'),
                                },
                            })} />
                            <ErrorMessage name="password"
                                          errors={errors}
                                          render={({message}) => <p className="text-red-500 text-xs">{message}</p>}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirm-password">
                                <Trans>Confirm Password</Trans>
                            </Label>
                            <Input id="confirm-password" type="password" {...register('confirm_password', {
                                required: t('This field is required'),
                                maxLength: {
                                    value: 60,
                                    message: t('This field must be less than 60 characters'),
                                },
                                minLength: {
                                    value: 8,
                                    message: t('This field must be more than 8 characters'),
                                },
                            })} />
                            <ErrorMessage name="confirm_password"
                                          errors={errors}
                                          render={({message}) => <p className="text-red-500 text-xs">{message}</p>}
                            />
                        </div>
                        <div className="space-y-2 flex items-center">
                            <Checkbox id="terms"
                                      className="mt-2"
                                      {...register('terms', {
                                          required: t('This field is required'),
                                      })}
                            />
                            <Label className="ml-2" htmlFor="terms">
                                I agree to the
                                <NavLink className="underline" to="#">
                                    Terms & Conditions
                                </NavLink>
                            </Label>
                            <ErrorMessage name="terms"
                                          errors={errors}
                                          render={({message}) => <p className="text-red-500 text-xs">{message}</p>}
                            />
                        </div>
                        <Button className="w-full mt-4" type="submit" disabled={working}>
                            Register {working && <>&nbsp;<WorkingIndicator className="ml-2" /></>}
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
                        <span className="sr-only"><Trans>Signup with Google</Trans></span>
                    </Button>
                    <Button className="w-fit h-fit p-0 m-0 rounded-full" variant="outline">
                        <SocialIcon network="github" />
                        <span className="sr-only"><Trans>Signup with GitHub</Trans></span>
                    </Button>
                    <Button className="w-fit h-fit p-0 m-0 rounded-full" variant="outline">
                        <SocialIcon network="gitlab" />
                        <span className="sr-only"><Trans>Signup with GitLab</Trans></span>
                    </Button>
                    <Button className="w-fit h-fit p-0 m-0 rounded-full" variant="outline">
                        <SocialIcon network="linkedin" />
                        <span className="sr-only"><Trans>Signup with LinkedIn</Trans></span>
                    </Button>
                    <Button className="w-fit h-fit p-0 m-0 rounded-full" variant="outline">
                        <SocialIcon network="twitter" />
                        <span className="sr-only"><Trans>Signup with Twitter</Trans></span>
                    </Button>
                </div>

                <Separator className="mt-5 mb-5" />

                <p className="text-center text-sm text-gray-500">
                    <Trans>Already a member?</Trans> {' '}
                    <NavLink to="/login" className="text-sm underline">
                        <Trans>Sign in instead</Trans>
                    </NavLink>
                </p>
            </div>
        </>
    );
}
