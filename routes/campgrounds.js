if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({storage});

const Campground = require('../models/campground');

// router.route('/')
//     .get(catchAsync(campgrounds.index))
//     .post(isLoggedIn, upload.array('image', 5), validateCampground,  catchAsync(campgrounds.createCampground))

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image', 5), validateCampground, catchAsync(campgrounds.createCampground), (err, req, res, next) => {
        if (err && err.code === 'LIMIT_UNEXPECTED_FILE') {
            req.flash('error', 'You can only upload up to 5 images at a time.');
            res.redirect('/campgrounds/new');
        } else {
            next();
        }
    });


router.get('/new', isLoggedIn, campgrounds.renderNewForm)

// router.route('/:id')
//     .get(catchAsync(campgrounds.showCampground))
//     .put(isLoggedIn, isAuthor, upload.array('image', 5),  validateCampground, catchAsync(campgrounds.updateCampground))
//     .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));


router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image', 5), validateCampground, catchAsync(campgrounds.updateCampground), (err, req, res, next) => {
        if (err && err.code === 'LIMIT_UNEXPECTED_FILE') {
            req.flash('error', 'You can only upload up to 5 images at a time.');
            res.redirect(`/campgrounds/${req.params.id}/edit`);
        } else {
            next();
        }
    })
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));


router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))



module.exports = router;