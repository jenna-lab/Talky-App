import express, { NextFunction, Request, Response, json } from "express";
import cors from "cors";
import user_router from "./routes/userRoutes";
<<<<<<< HEAD

=======
import post_router from "./routes/postRoutes";
>>>>>>> 514f8a7c61d4b05843e91c36d3f14e19db0d452e


const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", user_router);
<<<<<<< HEAD
;
=======
app.use("/post", post_router);

>>>>>>> 514f8a7c61d4b05843e91c36d3f14e19db0d452e

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: error.message,
  });
});


app.listen(4700, () => {
  console.log("Server active on port 4700");
});