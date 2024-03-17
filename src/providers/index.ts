import {AuthContext} from 'providers/AuthProvider';
import HttpClientContext from 'providers/HttpClientProvider';
import {ThemeProviderContext} from 'providers/ThemeProvider';
import {useContext} from 'react';

function ensureContext<T>(context: T): T {
    if (context === undefined)
        throw new Error('context used outside of context scope');

    return context;
}

export function useAuth() {
    return ensureContext(useContext(AuthContext));
}

export function useHttpClient() {
    return ensureContext(useContext(HttpClientContext));
}

export const useTheme = () => {
    return ensureContext(useContext(ThemeProviderContext));
};
