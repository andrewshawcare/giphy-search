interface Configuration {
  api: {
    port: number;
  };
}

export const configuration: Configuration = {
  api: {
    port: parseInt(process.env["PORT"]!, 10),
  },
};
