const express = require("express")
const router = express.Router()
const userController = require("../controllers/user-controller");
const upload = require('../middlewares/storage-images');


/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: user id
 *         username:
 *           type: string
 *           description:  username
 *         password:
 *           type: string
 *           description: password
 *         email:
 *           type: string
 *           description: email
 *         bio:
 *           type: string
 *         gender:
 *           type: string
 *         imageFilename:
 *           type: string
 *         firstname:
 *           type: string
 *         lastname:
 *           type: string 
 */

/**
 * @swagger
 * /user/:
 *   get: 
 *     summary: function get all 
 *     description: ok
 *     responses:
 *       200:
 *         description: to test methods
 *         content:
 *           json
 */
router.get("/",userController.getAll)

router.post("/register", upload.single('imageFilename'), userController.register);
router.post("/login", userController.login);
router.post("/login-with-social", userController.loginWithSocial);
router.post("/send-confirmation-email", userController.sendConfirmationEmail);
router.get("/confirmation/:token", userController.confirmation);
router.post("/forgot-password", userController.forgotPassword);
router.put("/update-profile", upload.single('imageFilename'), userController.updateProfile);
router.put("/update-password", userController.updatePassword);

router.route("/one")
    .post(userController.get)
    .delete(userController.delete);

router.route("/all").get(userController.getAll).delete(userController.deleteAll);

module.exports = router