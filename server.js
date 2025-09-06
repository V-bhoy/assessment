import "dotenv/config.js";
import createAppRouter from "./src/routes/index.js";
import { app } from "./index.js";

const port = process.env.PORT || 3000;
const appRoutes = createAppRouter();

app.use("/api", appRoutes);

console.log("Connected to the database.");
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
