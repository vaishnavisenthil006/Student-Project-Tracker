const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const c = require("../controllers/projectController");

router.use(auth);
router.route("/").get(c.getProjects).post(c.createProject);
router.route("/:id").get(c.getProject).delete(c.deleteProject);
router.post("/:id/members", c.addMember);
router.post("/:id/comments", c.addComment);

module.exports = router;