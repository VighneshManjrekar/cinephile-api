const router = require("express").Router();
const multer = require('multer');

const {
    postMovie, updateMovie, deleteMovie
} = require("../controllers/admin.controllers");

const { protect, admin } = require("../middleware/authHandler");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

router.post("/movie", protect, admin, upload.fields([
    { name: 'poster', maxCount: 1 },
    { name: 'movie', maxCount: 1 }
]), postMovie);
router.put("/movie/:id", protect, admin, upload.fields([
    { name: 'poster', maxCount: 1 },
    { name: 'movie', maxCount: 1 }
]), updateMovie);
router.delete("/movie/:id", protect, admin, deleteMovie);

module.exports = router;
