require("dotenv").config();
const path = require("path");
const cors = require("cors");
const express = require("express");
const clc = require("cli-color");

const connectDB = require("./configs/db");
const errorHandler = require("./middleware/errorHandler");
const authRouter = require("./routes/auth.routes");
const movieRouter = require("./routes/movie.routes");
const adminRouter = require("./routes/admin.routes");

const app = express();
const PORT = process.env.PORT || 7000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/movies", movieRouter);
app.use(errorHandler);

app.listen(PORT, () => {
  if (process.env.NODE_ENV == "production") process.stdout.write(clc.reset);
  console.log(
    clc.black.bgGreenBright(
      `Server running on http://localhost:${PORT} in ${process.env.NODE_ENV} mode.`
    )
  );
  connectDB();
});
