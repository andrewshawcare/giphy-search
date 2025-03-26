import test from "node:test";
import assert from "node:assert";
import { GiphyImageService } from "./giphy-image-service.js";
import http from "node:http";
import net from "node:net";

interface TestServer {
  server: http.Server;
  port: number;
}

async function createTestServer(mockResponse: unknown): Promise<TestServer> {
  const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(mockResponse));
  });

  await new Promise<void>((resolve) => server.listen(0, () => resolve()));
  const port = (server.address() as net.AddressInfo).port;

  return { server, port };
}

async function withTestServer<T>(mockResponse: unknown, testFn: (port: number) => Promise<T>): Promise<T> {
  const { server, port } = await createTestServer(mockResponse);
  try {
    return await testFn(port);
  } finally {
    server.close();
  }
}

test("GiphyImageService groups images by year", async () => {
  const mockResponse = {
    data: [
      {
        import_datetime: "2025-01-01 12:00:00",
        images: {
          fixed_width: {
            url: "https://media.giphy.com/media/test1.gif"
          }
        }
      },
      {
        import_datetime: "2024-06-15 15:30:00",
        images: {
          fixed_width: {
            url: "https://media.giphy.com/media/test2.gif"
          }
        }
      }
    ]
  };

  await withTestServer(mockResponse, async (port) => {
    const imageService = new GiphyImageService({
      key: "test_api_key",
      origin: `http://localhost:${port}`
    });

    const result = await imageService.search({ query: "test" });

    assert.deepStrictEqual(result, {
      2025: ["https://media.giphy.com/media/test1.gif"],
      2024: ["https://media.giphy.com/media/test2.gif"]
    });
  });
});

test("GiphyImageService handles empty response", async () => {
  await withTestServer({ data: [] }, async (port) => {
    const imageService = new GiphyImageService({
      key: "test_api_key",
      origin: `http://localhost:${port}`
    });

    const result = await imageService.search({ query: "nonexistent" });
    assert.deepStrictEqual(result, {});
  });
});
