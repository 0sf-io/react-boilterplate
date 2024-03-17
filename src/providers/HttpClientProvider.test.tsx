import {fireEvent, render, screen} from "@testing-library/react";
import {useContext} from "react";
import {wait} from "@/lib/helpers";
import AxiosHttpClient from "@/lib/http-client";
import MockHttpClient from "@/lib/mock-http-client";
import {vi} from "vitest";
import MockServer from "../../plugins/mock-server/server";
import {HttpClientContext, HttpClientProvider} from "./HttpClientProvider";

let server: MockServer;
const fn = vi.fn();

beforeAll(async () => {
    server = new MockServer({
        mockDir: "mocks",
        path: "/api",
        port: 8082,
    });
    await server.addRoute("get", "/api/test", () => {
        fn();

        return {
            status: 200,
            body: "OK",
        };
    });
    await server.start();
});

afterAll(async () => {
    await server.stop();
});

const useHttpClient = () => useContext(HttpClientContext);

function TestComponent() {
    const httpClient = useHttpClient();
    const fetchData = () => httpClient.get("/test")
        .catch((error) => {
            console.log("Error");
            console.error(error);
        });

    return (
        <button onClick={fetchData}
                data-testid="test">Click me</button>
    );
}

const setupAxios = () => {
    const httpClient = AxiosHttpClient.Instance();
    httpClient.setBaseUrl(server.getUrl());

    render(
        <HttpClientProvider value={httpClient}>
            <TestComponent/>
        </HttpClientProvider>,
    );
};

const setupMock = async () => {
    const httpClient = new MockHttpClient("mocks");
    httpClient.setBaseUrl("http://localhost/api");
    await httpClient.addRoute("get", "/api/test", () => {
        return {
            status: 200,
            body: "OK",
        };
    });

    render(
        <HttpClientProvider value={httpClient}>
            <TestComponent/>
        </HttpClientProvider>,
    );
};

describe("<HttpClientProvider mock />", function() {
    beforeEach(setupAxios);

    it("should handle http requests as expected", async function() {
        fireEvent.click(await screen.findByTestId("test"));
        await wait(50);
        expect(fn).toHaveBeenCalled();
    });
});

describe("<HttpClientProvider axios />", function() {
    beforeEach(setupMock);

    it("should handle http requests as expected", async function() {
        fireEvent.click(await screen.findByTestId("test"));
        await wait(50);
        expect(fn).toHaveBeenCalled();
    });
});
