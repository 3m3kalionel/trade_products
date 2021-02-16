import controllers from "../controllers";

const userController = controllers.user;

const router = app => {
  app.post("/api/v1/user/signup", userController.signup);
  app.post("/api/v1/user/signin", userController.signin);
  app.post("/api/v1/user/notify", userController.notifyUser);
};

export default router;
