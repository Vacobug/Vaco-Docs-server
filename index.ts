import express, {
  Application,
  Request,
  Response,
  NextFunction
} from "express";
import createError from "http-errors";

import indexRouter from "./routes/index";

interface ServerError extends Error {
  status: number;
}

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (error: ServerError, req: Request, res: Response, next: NextFunction) {
  res.locals.message = error.message;
  res.locals.error = req.app.get("env") === "development" ? error: {};

  res.status(error.status || 500);
  res.json({ errorMessage: error.message });
});

export default app;

