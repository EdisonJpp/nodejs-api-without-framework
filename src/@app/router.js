import { useRouter } from "../framework/lib/router.js";
import userController from "./modules/user/user.controller.js";

const router = useRouter();
router.compose(userController);

export { router };
