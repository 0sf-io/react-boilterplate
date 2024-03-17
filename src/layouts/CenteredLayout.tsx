import {PropsWithChildren} from "react";
import {Title} from "react-head";

type AuthLayoutProps = PropsWithChildren<{title?: string}>;

export function CenteredLayout(props: AuthLayoutProps) {
    return <>
        <Title>{props.title || ''}</Title>
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                {props.children}
            </div>
        </div>
    </>;
}
