const express = require('express');
const router = express.Router();
const { auth, authorizeAdmin } = require('../middleware/auth');
const User = require('../models/User');
const Doctor = require('../models/Doctor');

// List all doctors
router.get('/doctors', auth, authorizeAdmin, async (req, res) => {
  try {
    const doctors = await Doctor.find().lean();
    res.json({ doctors });
  } catch (err) {
    console.error('Admin list doctors error:', err);
    res.status(500).json({ message: 'Failed to list doctors' });
  }
});

// Create doctor (admin)
router.post('/doctors', auth, authorizeAdmin, async (req, res) => {
  try {
    const { email, fullName, phone, specialty, clinic, imageUrl } = req.body;
    // Create or find user
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, phone, password: 'ChangeMe123!', role: 'doctor' });
      await user.save();
    } else {
      user.role = 'doctor';
      await user.save();
    }

    // Create doctor doc
    const doc = new Doctor({
      userId: user._id,
      fullName,
      phone,
      email,
      specialty,
      clinic,
      imageUrl: imageUrl || null
    });
    await doc.save();

    res.status(201).json({ message: 'Doctor created', doctor: doc });
  } catch (err) {
    console.error('Admin create doctor error:', err);
    res.status(500).json({ message: 'Failed to create doctor' });
  }
});

// Delete doctor by id
router.delete('/doctors/:id', auth, authorizeAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    await Doctor.findByIdAndDelete(id);
    res.json({ message: 'Doctor removed' });
  } catch (err) {
    console.error('Admin delete doctor error:', err);
    res.status(500).json({ message: 'Failed to remove doctor' });
  }
});

module.exports = router;
