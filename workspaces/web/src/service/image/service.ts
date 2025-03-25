export interface ImageService {
  search({ query }: { query: string }): Promise<string[]>;
}

export class SimpleImageService implements ImageService {
  async search(): Promise<string[]> {
    return [];
  }
}

export class GiphyImageService implements ImageService {
  private readonly origin: string;

  constructor({ origin }: { origin: string }) {
    this.origin = origin;
  }

  async search({ query }: { query: string }): Promise<string[]> {
    const imageSearchResponse = await fetch(
      `${this.origin}/api/image/search/${query}`
    );
    const imageSearchJson = await imageSearchResponse.json();
    return typeof imageSearchJson === "object"
      ? Object.values(imageSearchJson)
          .flat()
          .filter((imageUrl) => typeof imageUrl === "string")
      : [];
  }
}
