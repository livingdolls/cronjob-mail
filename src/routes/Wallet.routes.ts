import express from "express";
import {
	CreateWalletController,
	GetWalletController,
} from "../controllers/Wallet.controllers";
import { verivyToken } from "../middleware/VerifyToken";

const route = express.Router();

route.post("/", verivyToken, CreateWalletController);
route.get("/", verivyToken, GetWalletController);

export default route;
