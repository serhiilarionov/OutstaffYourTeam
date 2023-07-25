import express, { Express, Request, Response, NextFunction } from "express";
import { getFromFile } from "./services/storage";
import { unique } from "./services/unique";
import { Item } from "./types";

const app: Express = express();
const port = 3000;

app.use(express.json());

app.get("/", async function (req: Request, res: Response, next: NextFunction) {
  const result = await getFromFile().catch(function () {
    next("Storage error");
  });
  res.send(result);

  for (const key in result) {
    const uniqueData = unique<Item>(result[key], "name", "id");
    console.log(uniqueData);
  }
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    return res.status(500).send({ errors: [{ message: "Server Error" }] });
  }
  next();
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
