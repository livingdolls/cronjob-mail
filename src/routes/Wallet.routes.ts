import express from "express";
import {
	CreateWalletController,
	GetWalletController,
} from "../controllers/Wallet.controllers";

const route = express.Router();

route.post("/", CreateWalletController);
route.get("/", GetWalletController);

export default route;
