const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require('multer');
const controller = require('../controllers/groupsController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/avatars');
    },
    filename: function(req, file, cb) {
        cb(null,`${Date.now()}_img_${path.extname(file.originalname)}`)
    }
});

const uploadFile = multer({ storage });


// Todos los grupos
router.get('/', controller.index);

// Formulario de creación
router.get('/create', controller.create);

// Procesamiento del formulario de creación
router.post('/', uploadFile.single('avatar'), controller.store);

// Detalle de un grupo
router.get('/:id', controller.show);

module.exports = router;