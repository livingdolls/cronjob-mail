import express from "express";
import {
	SignUpControllers,
	UpdateStatusControllers,
	UtilSDeleteMany,
} from "../controllers/Auth.controllers";
import { RegisterUserSchema } from "../Type/Auth.type";

import {
	ChangeMailConfirmController,
	ChangeMailVerifyController,
} from "../controllers/ChangeMail.controller";
import { SchemaValidator } from "../middleware/SchemaValidasi";
import { SignUserControllers } from "../controllers/Sign.controllers";
import { verivyToken } from "../middleware/VerifyToken";

const route = express.Router();

route.post("/signUp", SchemaValidator(RegisterUserSchema), SignUpControllers);
route.post("/sign", SchemaValidator(RegisterUserSchema), SignUserControllers);

// Mail helper route
route.put("/:id_user/verify/:pin", UpdateStatusControllers);
route.put("/change-email/:id_user", ChangeMailConfirmController);
route.put("/change-email/verivy/:token", ChangeMailVerifyController);

// helper
route.delete("/del", verivyToken, UtilSDeleteMany);

export default route;
