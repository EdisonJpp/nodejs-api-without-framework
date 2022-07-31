import { router } from "../../../framework/lib/router.js";
import * as userServices from "./user.service.js";

router.post("/users/create", userServices.createUsers);
router.get("/users/:id", userServices.getUser);
router.get("/users", userServices.getUsers);

export default router;
