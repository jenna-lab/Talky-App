import express, { NextFunction, Request, Response, json } from "express";
import cors from "cors";
import user_router from "./routes/userRoutes";


const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", user_router);
;

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: error.message,
  });
});


app.listen(4700, () => {
  console.log("Server active on port 4700");
});