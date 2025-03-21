export interface Configuration {
  giphy: {
    origin: string;
    key: string;
  };
  api: {
    port: number;
  };
}

export const configuration: Configuration = {
  giphy: {
    origin: process.env["GIPHY_ORIGIN"]!,
    key: process.env["GIPHY_KEY"]!,
  },
  api: {
    port: parseInt(process.env["PORT"]!, 10),
  },
};
