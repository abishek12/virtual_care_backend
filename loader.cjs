import { port } from "./src/lib/utils/app.env.js";

import("./server.js")
  .then(({ default: app }) => {
    const PORT = port;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to load app.js:", err);
  });
