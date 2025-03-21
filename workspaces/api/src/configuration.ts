export interface Configuration {
  giphy: {
    origin: string;
    key: string;
  };
  web: {
    origin: string;
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
  web: {
    origin: process.env["WEB_ORIGIN"]!,
  },
  api: {
    port: parseInt(process.env["PORT"]!, 10),
  },
};
