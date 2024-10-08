/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/FT9FzMwr5gM
 */
import {yupResolver} from '@hookform/resolvers/yup';
import {CardTitle, CardDescription, CardHeader, CardContent, Card} from 'components/ui/card';
import {Label} from 'components/ui/label';
import {Input} from 'components/ui/input';
import {Button} from 'components/ui/button';
import {ErrorMessage} from '@hookform/error-message';
import {WorkingIndicator} from 'components/common/working-indicator';
import {useState} from 'react';
import {SubmitHandler, useForm} from 'react-hook-form';
import {Trans, useTranslation} from 'react-i18next';
import * as yup from 'yup';

interface IFormProps {
    email: string;
}

const schema = yup.object({
    email: yup.string().email('This field must be a valid email').required('This field is required'),
}).required();

export function MagicLinkAuth() {
    const [working, setWorking] = useState(false);
    const {t} = useTranslation();
    const {register, formState: {errors}, handleSubmit} = useForm<IFormProps>({
        resolver: yupResolver(schema),
    });
    const onSubmit: SubmitHandler<IFormProps> = async (data) => {
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
        <Card className="mx-auto max-w-md">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">
                    <Trans>Magic Link Authentication</Trans>
                </CardTitle>
                <CardDescription>
                    <Trans>Enter your email below and we'll send you a magic link to login to your account</Trans>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">
                                <Trans>Email</Trans>
                            </Label>
                            <Input id="email" placeholder="m@example.com" type="email" {...register('email')} />
                            <ErrorMessage errors={errors}
                                          name="email"
                                          render={({message}) => <p className="text-red-500 text-xs">{t(message)}</p>}
                            />
                        </div>
                        <Button className="w-full" type="submit" disabled={working}>
                            <Trans>Send Magic Link</Trans> {working && <WorkingIndicator className="ml-2" />}
                        </Button>
                    </div>
                </form>
                <div className="mt-4 text-center text-sm">
                    <Trans>Check your email for the magic link to login to your account.</Trans>
                </div>
            </CardContent>
        </Card>
    );
}
