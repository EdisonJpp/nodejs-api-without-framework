import { router } from "../../../middleware/router.js";
import * as userServices from "./user.service.js";

router.get("/users", userServices.getUsers);

export default router;
