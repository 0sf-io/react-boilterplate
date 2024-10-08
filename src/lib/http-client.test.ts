import ApiError from "contracts/api-error";
import ApiResponse from "contracts/api-response";
import {HttpClient} from "providers/HttpClientProvider";
import AxiosHttpClient from "@/lib/http-client";
import MockServer from "../../plugins/mock-server/server";

let server: MockServer;

beforeAll(async () => {
    server = new MockServer({
        path: "/api",
        port: 8081,
    });
    await server.start();
});

afterAll(async () => {
    await server.stop();
});

const params = {hello: "world"};
const body = {goodbye: "world"};
const combined = {...params, ...body};

const setupHttp = () => {
    const httpClient = AxiosHttpClient.Instance();
    httpClient.setBaseUrl(server.getUrl());

    return httpClient;
};

describe("http-client", () => {
    let httpClient: HttpClient;

    beforeEach(() => {
        httpClient = setupHttp();
    });

    it("should be able to get an instance of the http client", () => {
        expect(httpClient).toBeInstanceOf(AxiosHttpClient);
    });

    it("should be able to set the base url", () => {
        httpClient.setBaseUrl("/api");

        expect(httpClient.getBaseUrl()).toBe("/api");
    });

    it("should be able to set the authorization header", () => {
        httpClient.setAuthorizationHeader("xxx");

        expect(httpClient.getAuthorizationHeader()).toBe("xxx");
    });

    it("should handle GET requests", async function() {
        const response = await httpClient.get<typeof params>("/verbs/get", {params});
        expect(response).toBeInstanceOf(ApiResponse);
        expect(response.data).toStrictEqual(params);
    });

    it("should handle POST requests", async function() {
        const response = await httpClient.post<typeof params>("/verbs/post", body, {params});
        expect(response).toBeInstanceOf(ApiResponse);
        expect(response.data).toStrictEqual(combined);
    });

    it("should handle PUT requests", async function() {
        const response = await httpClient.put<typeof combined>("/verbs/put", body, {params});
        expect(response).toBeInstanceOf(ApiResponse);
        expect(response.data).toStrictEqual(combined);
    });

    it("should handle PATCH requests", async function() {
        const response = await httpClient.patch<typeof combined>("/verbs/patch", body, {params});
        expect(response).toBeInstanceOf(ApiResponse);
        expect(response.data).toStrictEqual(combined);
    });

    it("should handle DELETE requests", async function() {
        const response = await httpClient.delete<typeof params>("/verbs/delete", {params});
        expect(response).toBeInstanceOf(ApiResponse);
        expect(response.data).toStrictEqual(params);
    });

    it("should handle 404 responses", async function() {
        await httpClient.get("/verbs/404")
                        .catch((err: unknown) => {
                            expect(err).toBeInstanceOf(ApiError);
                        });
    });
});
