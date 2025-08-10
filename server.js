import app from "./app.js";
import { port } from "./src/lib/utils/app.env.js";

app.listen(port, () => {
  console.log(` Server running on http://localhost:${port}`);
});
