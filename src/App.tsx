import {Toaster} from 'components/ui/toaster';
import {AuthProvider} from "providers/AuthProvider";
import {HttpClientProvider} from "providers/HttpClientProvider";
import {ThemeProvider} from 'providers/ThemeProvider';
import React from "react";
import {RouterProvider} from "react-router";
import HttpClient from "@/lib/http-client";
import router from "./Router";

export function App() {
    const httpClient = HttpClient.Instance();
    const DEV = import.meta.env.DEV;
    const DEV_URL = import.meta.env.VITE_DEV_URL;
    const PROD_URL = import.meta.env.VITE_PROD_URL;

    httpClient.setBaseUrl(DEV ? DEV_URL : PROD_URL);

    return <React.StrictMode>
        <ThemeProvider defaultTheme="system" storageKey="theme">
            <HttpClientProvider value={httpClient}>
                <AuthProvider>
                    <RouterProvider router={router}/>
                    <Toaster />
                </AuthProvider>
            </HttpClientProvider>
        </ThemeProvider>
    </React.StrictMode>;
}
