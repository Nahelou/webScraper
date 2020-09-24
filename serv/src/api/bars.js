const express = require('express');
const monk = require('monk');
const Joi = require('@hapi/joi');

const db = monk(process.env.MONGO_URI);
const bars = db.get('bars');

const router = express.Router();
const beer = Joi.object().keys({
    name: Joi.string(),
    price: Joi.number(),
});
const geom = Joi.object().keys({
    lat: Joi.number(),
    lng: Joi.number(),
});

const schema = Joi.object({
    name: Joi.string().trim().required(),
    beers: Joi.array().items(beer),
    happyHour: Joi.string(),
    position: Joi.array().items(geom),
});

// Read All
router.get('/', async (req, res, next) => {
    try {
        const items = await bars.find({});
        res.json(items)
    } catch (error) {
        next(error);
    }
});

// READ One
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const item = await bars.findOne({
            _id: id,
        });
        if (!item) return next();
        return res.json(item);
    } catch (error) {
        
    }
});

// Create
router.post('/', async (req, res, next) => {
    try {
        const value = await schema.validateAsync(req.body);
        const inserted = await bars.insert(value);
        res.json(inserted);
    } catch (error) {
        next(error);
}
});

// Update
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const value = await schema.validateAsync(req.body);
        const item = await bars.findOne({
            _id: id,
        });
        if (!item) return next();
        const updated = await bars.update({
            _id:id,
        },{
            $set:value,
        });
        res.json(updated);
    } catch (error) {
        next(error);
    }
});

// Delete
router.delete('/:id', (req, res, next) => {
    res.json({
        message: 'Hello DELETE',
    });
});

module.exports = router;