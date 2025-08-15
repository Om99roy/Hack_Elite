import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  User, 
  MapPin, 
  Phone,
  Mail,
  CheckCircle,
  AlertTriangle,
  Star,
  Video,
  Building,
  CreditCard,
  Shield
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const AppointmentBooking = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentType, setAppointmentType] = useState('consultation');
  const [notes, setNotes] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Mock data
  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialization: 'Ophthalmologist',
      rating: 4.9,
      experience: '15 years',
      image: 'https://via.placeholder.com/100x100/3b82f6/ffffff?text=Dr.+SJ',
      availableSlots: ['09:00', '10:00', '14:00', '15:00'],
      location: 'Eye Care Center, Downtown',
      consultationFee: 150,
      languages: ['English', 'Spanish'],
      telemedicine: true
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialization: 'Optometrist',
      rating: 4.8,
      experience: '12 years',
      image: 'https://via.placeholder.com/100x100/10b981/ffffff?text=Dr.+MC',
      availableSlots: ['11:00', '13:00', '16:00', '17:00'],
      location: 'Vision Clinic, Midtown',
      consultationFee: 120,
      languages: ['English', 'Mandarin'],
      telemedicine: true
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialization: 'Retina Specialist',
      rating: 4.9,
      experience: '18 years',
      image: 'https://via.placeholder.com/100x100/f59e0b/ffffff?text=Dr.+ER',
      availableSlots: ['08:00', '12:00', '15:00'],
      location: 'Advanced Eye Institute',
      consultationFee: 200,
      languages: ['English', 'Spanish'],
      telemedicine: false
    }
  ];

  const appointmentTypes = [
    {
      id: 'consultation',
      name: 'General Consultation',
      description: 'Routine eye examination and consultation',
      duration: '30 minutes',
      icon: <User className="w-6 h-6" />
    },
    {
      id: 'followup',
      name: 'Follow-up Visit',
      description: 'Follow-up after previous treatment or test',
      duration: '20 minutes',
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      id: 'emergency',
      name: 'Emergency Consultation',
      description: 'Urgent eye care for immediate concerns',
      duration: '45 minutes',
      icon: <AlertTriangle className="w-6 h-6" />
    },
    {
      id: 'telemedicine',
      name: 'Telemedicine',
      description: 'Remote consultation via video call',
      duration: '25 minutes',
      icon: <Video className="w-6 h-6" />
    }
  ];

  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const availableDates = [
    { date: '2024-01-22', day: 'Monday', available: true },
    { date: '2024-01-23', day: 'Tuesday', available: true },
    { date: '2024-01-24', day: 'Wednesday', available: true },
    { date: '2024-01-25', day: 'Thursday', available: true },
    { date: '2024-01-26', day: 'Friday', available: true },
    { date: '2024-01-27', day: 'Saturday', available: false },
    { date: '2024-01-28', day: 'Sunday', available: false }
  ];

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setCurrentStep(2);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setCurrentStep(3);
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setCurrentStep(4);
  };

  const handleBooking = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Appointment booked successfully!', {
        icon: '✅',
        duration: 4000,
      });
      
      // Navigate to confirmation or dashboard
      setTimeout(() => {
        navigate('/patient/dashboard');
      }, 2000);
    } catch (error) {
      toast.error('Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = () => {
    // Mock priority based on user's health status
    const priority = 'moderate'; // This would come from user's health data
    switch (priority) {
      case 'critical': return 'text-red-400';
      case 'urgent': return 'text-orange-400';
      case 'moderate': return 'text-yellow-400';
      default: return 'text-green-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <button
            onClick={() => navigate('/patient/dashboard')}
            className="glass-button flex items-center space-x-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white">Book Appointment</h1>
            <p className="text-blue-200">Schedule your eye care consultation</p>
          </div>
          
          <div className="w-32"></div> {/* Spacer for centering */}
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= step ? 'bg-blue-500 text-white' : 'bg-white/20 text-blue-200'
                }`}>
                  {step}
                </div>
                {step < 4 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step ? 'bg-blue-500' : 'bg-white/20'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-2">
            <p className="text-blue-200 text-sm">
              Step {currentStep} of 4: {
                currentStep === 1 ? 'Select Date' :
                currentStep === 2 ? 'Select Time' :
                currentStep === 3 ? 'Choose Doctor' :
                'Confirm Booking'
              }
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Date Selection */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card p-6"
              >
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
                  <Calendar className="w-6 h-6" />
                  <span>Select Appointment Date</span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableDates.map((dateInfo) => (
                    <button
                      key={dateInfo.date}
                      onClick={() => handleDateSelect(dateInfo.date)}
                      disabled={!dateInfo.available}
                      className={`p-4 rounded-lg text-center transition-all ${
                        dateInfo.available
                          ? 'glass-card hover:scale-105 cursor-pointer'
                          : 'bg-white/10 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <div className="text-lg font-semibold text-white">
                        {new Date(dateInfo.date).getDate()}
                      </div>
                      <div className="text-sm text-blue-200">{dateInfo.day}</div>
                      <div className="text-xs text-blue-300">
                        {new Date(dateInfo.date).toLocaleDateString()}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Time Selection */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card p-6"
              >
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
                  <Clock className="w-6 h-6" />
                  <span>Select Time Slot</span>
                </h2>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => handleTimeSelect(time)}
                      className="glass-card p-4 text-center hover:scale-105 transition-all"
                    >
                      <div className="text-lg font-semibold text-white">{time}</div>
                      <div className="text-sm text-blue-200">Available</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Doctor Selection */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card p-6"
              >
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
                  <User className="w-6 h-6" />
                  <span>Choose Your Doctor</span>
                </h2>
                
                <div className="space-y-4">
                  {doctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      onClick={() => handleDoctorSelect(doctor)}
                      className="glass-card p-6 cursor-pointer hover:scale-105 transition-all"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          className="w-16 h-16 rounded-full"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white">{doctor.name}</h3>
                          <p className="text-blue-200">{doctor.specialization}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-white text-sm">{doctor.rating}</span>
                            </div>
                            <span className="text-blue-200 text-sm">{doctor.experience} experience</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-semibold">${doctor.consultationFee}</div>
                          <div className="text-blue-200 text-sm">Consultation</div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center space-x-2 text-blue-200 text-sm">
                          <MapPin className="w-4 h-4" />
                          <span>{doctor.location}</span>
                        </div>
                        {doctor.telemedicine && (
                          <div className="flex items-center space-x-2 text-green-400 text-sm">
                            <Video className="w-4 h-4" />
                            <span>Telemedicine Available</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-card p-6"
              >
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center space-x-2">
                  <CheckCircle className="w-6 h-6" />
                  <span>Confirm Your Appointment</span>
                </h2>
                
                <div className="space-y-6">
                  {/* Appointment Type Selection */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Appointment Type</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {appointmentTypes.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setAppointmentType(type.id)}
                          className={`p-4 rounded-lg text-left transition-all ${
                            appointmentType === type.id
                              ? 'glass-card border-2 border-blue-400'
                              : 'glass-card hover:scale-105'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="text-blue-400">{type.icon}</div>
                            <div>
                              <div className="text-white font-semibold">{type.name}</div>
                              <div className="text-blue-200 text-sm">{type.description}</div>
                              <div className="text-blue-300 text-xs">{type.duration}</div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Additional Notes</h3>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Describe your symptoms or any specific concerns..."
                      className="w-full p-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 resize-none"
                      rows="4"
                    />
                  </div>

                  {/* Booking Summary */}
                  <div className="glass-card p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Booking Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-blue-200">Date:</span>
                        <span className="text-white">{selectedDate && new Date(selectedDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-200">Time:</span>
                        <span className="text-white">{selectedTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-200">Doctor:</span>
                        <span className="text-white">{selectedDoctor?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-200">Type:</span>
                        <span className="text-white capitalize">{appointmentType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-200">Fee:</span>
                        <span className="text-white">${selectedDoctor?.consultationFee}</span>
                      </div>
                    </div>
                  </div>

                  {/* Book Button */}
                  <button
                    onClick={handleBooking}
                    disabled={loading}
                    className="w-full glass-button text-lg py-4 flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        <span>Booking Appointment...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-6 h-6" />
                        <span>Confirm Booking</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Priority Alert */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                <span>Your Priority Level</span>
              </h3>
              <div className={`text-center p-4 rounded-lg bg-yellow-500/20 border border-yellow-400/30`}>
                <div className={`text-2xl font-bold ${getPriorityColor()}`}>MODERATE</div>
                <p className="text-blue-200 text-sm mt-2">
                  Recommended to book within 1-2 weeks
                </p>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full glass-button text-sm">
                  <Phone className="w-4 h-4 mr-2" />
                  Call for Emergency
                </button>
                <button className="w-full glass-button text-sm">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Message
                </button>
                <button className="w-full glass-button text-sm">
                  <Building className="w-4 h-4 mr-2" />
                  Find Nearby Clinics
                </button>
              </div>
            </motion.div>

            {/* Insurance Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Insurance</span>
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-200">Provider:</span>
                  <span className="text-white">Blue Cross</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-200">Coverage:</span>
                  <span className="text-white">80%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-200">Copay:</span>
                  <span className="text-white">$30</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;
