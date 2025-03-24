interface Configuration {
  api: {
    origin: string;
  };
}

export const configuration: Configuration = {
  api: {
    origin: process.env["API_ORIGIN"] || "",
  },
};
