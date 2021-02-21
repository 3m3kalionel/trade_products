import controllers from "../controllers";
import { authenticate } from "../utils";

const userController = controllers.user;
const productController = controllers.product;

const router = app => {
  app.post("/api/v1/user/signup", userController.signup);
  app.post("/api/v1/user/signin", userController.signin);
  app.post("/api/v1/user/notify", userController.notifyUser);
  app.post("/api/v1/product", authenticate, productController.createProduct);
  app.get("/api/v1/products", authenticate, productController.fetchProducts);
  app.get(
    "/api/v1/products/search",
    authenticate,
    productController.fetchProductsByLocation
  );
};

export default router;
