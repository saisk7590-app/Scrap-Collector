const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const pickupController = require('../controllers/pickup.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Health Check
router.get('/health', (req, res) => res.json({ status: 'Backend is healthy', timestamp: new Date() }));

// Auth Routes (Public)
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/recover', authController.recoverPassword);

// Pickup Routes (Protected)
router.post('/pickups', authMiddleware, pickupController.createPickup);
router.get('/pickups', authMiddleware, pickupController.getPickups);
router.patch('/pickups/:id/status', authMiddleware, pickupController.updatePickupStatus);

module.exports = router;
