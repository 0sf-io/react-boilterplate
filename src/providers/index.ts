import { AuthContext } from "providers/AuthProvider";
import HttpClientContext from "providers/HttpClientProvider";
import {useContext} from "react";

export * from "providers/AuthProvider";

export function useAuth() {
    return useContext(AuthContext);
}

export function useHttpClient() {
    return useContext(HttpClientContext);
}
