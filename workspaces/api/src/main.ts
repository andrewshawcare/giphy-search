import { configuration } from "./configuration.js";
import { app } from "./app.js";

app.listen(configuration.api.port);
