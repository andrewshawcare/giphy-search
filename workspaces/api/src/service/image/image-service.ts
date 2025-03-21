export interface ImagesByYear {
  [year: number]: string[];
}

export interface SearchParameters {
  query: string;
}

export interface ImageService {
  search({ query }: SearchParameters): Promise<ImagesByYear>;
}

export class SimpleImageService implements ImageService {
  private readonly imagesByYear: ImagesByYear;

  constructor({ imagesByYear }: { imagesByYear: ImagesByYear }) {
    this.imagesByYear = imagesByYear;
  }
  async search() {
    return this.imagesByYear;
  }
}
