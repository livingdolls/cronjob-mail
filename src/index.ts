import bodyParser from "body-parser";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();

import AuthRoute from "./routes/Auth.routes";
import WalletRoute from "./routes/Wallet.routes";
import { CheckUserCron } from "./utils/CronCheckUser";

const app = express();

app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(cookieParser());

// midleware
// CheckUserCron();

app.use("/api/auth", AuthRoute);
app.use("/api/wallet", WalletRoute);

app.listen(3001, () => {
	console.log("connect backend!");
});
