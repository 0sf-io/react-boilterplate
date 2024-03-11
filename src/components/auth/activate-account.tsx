/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/yGb9bdU4Fg1
 */
import {Label} from 'components/ui/label';
import {Input} from 'components/ui/input';
import {Button} from 'components/ui/button';
import {ErrorMessage} from '@hookform/error-message';
import {WorkingIndicator} from 'components/common/working-indicator';
import {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Trans, useTranslation} from 'react-i18next';
import {NavLink} from 'react-router-dom';

interface IFormInput {
    activationCode: string;
}

export function ActivateAccount() {
    const {t} = useTranslation();
    const [working, setWorking] = useState(false);
    const {register, formState: {errors}, handleSubmit} = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        setWorking(true);
        try {
            console.log(data);
            await new Promise((_, reject) => setTimeout(reject, 5000));
        } catch (e) {
            console.log(e);
        } finally {
            setWorking(false);
        }
    };

    return (
        <div className="mx-auto max-w-md space-y-6">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">
                    <Trans>Activate Your Account</Trans>
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                    <Trans>Enter your activation code below</Trans>
                </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="activation-code">
                            <Trans>Activation Code</Trans>
                        </Label>
                        <Input id="activation-code"
                               placeholder="Enter activation code"
                               type="text"
                               {...register('activationCode', {
                                   required: t('This field is required'),
                               })}
                        />
                        <ErrorMessage errors={errors}
                                      name="activationCode"
                                      render={({message}) => <p className="text-red-500">{message}</p>}
                        />
                    </div>
                    <Button className="w-full" type="submit" disabled={working}>
                        <Trans>Activate Account</Trans> {working && <WorkingIndicator className="ml-2" />}
                    </Button>
                </div>
            </form>
            <div className="mt-4 text-center text-sm">
                <Trans>Didn't receive an activation code?</Trans>
                <NavLink className="underline ml-2" to="#">
                    <Trans>Resend Activation Code</Trans>
                </NavLink>
            </div>
        </div>
    );
}
