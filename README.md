# 👁️ AI-Powered Eye Health Monitoring System

A complete telemedicine platform for eye health screening using smartphone cameras and AI analysis. This project provides real-time eye health monitoring, automated condition detection, and intelligent triage prioritization.

## 🚀 Features

### ✨ Core Features
- **Real-time Eye Screening**: Capture high-quality eye images using smartphone cameras
- **AI-Powered Analysis**: Multi-model AI analysis for condition detection
- **Intelligent Triage**: Priority-based scheduling and urgent care alerts
- **Biometric Authentication**: Eye scan-based secure login
- **Comprehensive Dashboard**: Patient and doctor portals with health insights
- **Appointment Management**: Smart scheduling with priority-based queuing
- **Progress Tracking**: Long-term health monitoring and trend analysis

### 🎯 Key Capabilities
- **External Eye Condition Detection**: Conjunctivitis, stye, ptosis, swelling
- **Color Analysis**: Anemia signs, jaundice indicators, inflammation detection
- **Structural Analysis**: Symmetry, alignment, and shape assessment
- **Risk Assessment**: Multi-factor risk scoring with personalized recommendations
- **Real-time Guidance**: Camera positioning and quality optimization
- **Quality Assurance**: Automated image quality assessment and retry logic

## 🏗️ Architecture

### Frontend (Your Territory)
- **React 18** with modern hooks and context API
- **Tailwind CSS** with custom glass morphism design
- **Framer Motion** for smooth animations and transitions
- **React Router** for navigation and protected routes
- **React Query** for efficient data fetching and caching
- **Socket.io** for real-time communication

### Backend (Your Territory)
- **Node.js/Express** RESTful API
- **MongoDB** with Mongoose ODM
- **JWT Authentication** with biometric support
- **Socket.io** for real-time features
- **Multer** for file uploads
- **Cloudinary** for image storage

### AI Pipeline (OOT - Out of Your Territory)
- **Python Flask** server for AI models
- **TensorFlow/PyTorch** for deep learning models
- **OpenCV** for image preprocessing
- **Multiple AI Models**:
  - External eye condition detector
  - Color analysis model
  - Structural analysis model
  - Risk assessment model

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- npm or yarn
- Modern web browser with camera access

### 1. Clone and Install Dependencies
```bash
git clone <repository-url>
cd hackathon
npm run install-all
```

### 2. Environment Setup

#### Client Environment (client/.env)
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SOCKET_URL=http://localhost:5000
REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloudinary_name
REACT_APP_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

#### Server Environment (server/.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/eye-health-system
JWT_SECRET=your_jwt_secret_key_here
CLIENT_URL=http://localhost:3000

# Cloud Storage
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Email Service
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_password

# SMS Service (Twilio)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number

# AI Service (OOT - Out of Your Territory)
AI_SERVICE_URL=http://localhost:8000
AI_MODEL_ENDPOINT=/api/analyze
```

### 3. Start Development Servers
```bash
# Start both frontend and backend
npm run dev

# Or start individually
npm run server  # Backend on port 5000
npm run client  # Frontend on port 3000
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## 📱 User Flows

### Patient Journey
1. **Onboarding**: Account creation with medical history collection
2. **Biometric Setup**: Eye scan registration for secure login
3. **Eye Test**: Real-time camera guidance and auto-capture
4. **AI Analysis**: Multi-model analysis with detailed results
5. **Results Review**: Comprehensive health insights and recommendations
6. **Appointment Booking**: Priority-based scheduling system
7. **Progress Tracking**: Long-term health monitoring

### Doctor Journey
1. **Authentication**: Medical license verification and 2FA
2. **Patient Queue**: Priority-sorted patient list
3. **Review Process**: AI analysis review and diagnosis
4. **Treatment Actions**: Prescription and specialist referral
5. **Patient Communication**: Secure messaging and updates

## 🎨 UI/UX Features

### Design System
- **Glass Morphism**: Modern translucent design with backdrop blur
- **Color Coding**: Health priority-based color system
- **Responsive Design**: Mobile-first approach with tablet/desktop optimization
- **Accessibility**: WCAG compliant with screen reader support

### Animations
- **Framer Motion**: Smooth page transitions and micro-interactions
- **Loading States**: Skeleton screens and progress indicators
- **Feedback Animations**: Success, warning, and error states
- **Camera Interface**: Real-time guidance animations

### Color System
- **Critical**: #EF4444 (Red)
- **Urgent**: #F59E0B (Orange)
- **Moderate**: #F97316 (Light Orange)
- **Routine**: #10B981 (Green)
- **Normal**: #059669 (Dark Green)

## 🔒 Security Features

### Authentication
- JWT-based authentication with refresh tokens
- Biometric eye scan authentication
- Multi-factor authentication (SMS OTP)
- Session management with automatic logout

### Data Protection
- End-to-end encryption for sensitive data
- HIPAA compliance measures
- Secure file upload with virus scanning
- Audit logging for all access

### Privacy
- GDPR-compliant data handling
- User consent management
- Data anonymization for research
- Secure data deletion

## 📊 AI Analysis Pipeline

### Image Preprocessing
- Noise reduction and enhancement
- Brightness/contrast optimization
- Sharpening and color balance correction
- Standardization and normalization

### Multi-Model Analysis
1. **External Conditions Model**: Detects conjunctivitis, stye, ptosis, swelling
2. **Color Analysis Model**: Analyzes conjunctiva and sclera regions
3. **Structural Analysis Model**: Examines symmetry, alignment, shape
4. **Risk Assessment Model**: Calculates overall risk score

### Quality Assurance
- Real-time image quality assessment
- Auto-capture with optimal conditions
- Multiple image capture for redundancy
- Quality-based retry logic

## 🚀 Deployment

### Frontend Deployment
```bash
cd client
npm run build
# Deploy to Vercel, Netlify, or AWS S3
```

### Backend Deployment
```bash
cd server
npm start
# Deploy to Railway, Render, or AWS EC2
```

### Database Setup
- **MongoDB Atlas**: Cloud database with automatic backups
- **Local MongoDB**: For development and testing

### Environment Variables
- Copy `env.example` files to `.env`
- Update with your service credentials
- Never commit `.env` files to version control

## 🧪 Testing

### Frontend Testing
```bash
cd client
npm test
```

### Backend Testing
```bash
cd server
npm test
```

### API Testing
- Use Postman or Insomnia for API testing
- Import the provided API collection
- Test all endpoints with sample data

## 📈 Performance Optimization

### Frontend
- Code splitting with React.lazy()
- Image optimization and lazy loading
- Memoization for expensive calculations
- Service worker for offline support

### Backend
- Database indexing for fast queries
- Redis caching for frequently accessed data
- Image compression and optimization
- Rate limiting and request throttling

## 🔧 Development Workflow

### Code Quality
- ESLint for code linting
- Prettier for code formatting
- Husky for pre-commit hooks
- Conventional commits for version control

### Git Workflow
1. Create feature branch from main
2. Develop and test locally
3. Create pull request with description
4. Code review and approval
5. Merge to main branch

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Standards
- Follow ESLint configuration
- Use TypeScript for new components
- Write meaningful commit messages
- Add JSDoc comments for functions

## 📞 Support

### Documentation
- API documentation in `/docs` folder
- Component documentation with Storybook
- User guides and tutorials

### Contact
- **Technical Issues**: Create GitHub issue
- **Feature Requests**: Submit enhancement proposal
- **Security Issues**: Email security@eyehealth.com

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Community**: For the amazing ecosystem
- **Tailwind CSS**: For the utility-first CSS framework
- **Framer Motion**: For smooth animations
- **Medical Professionals**: For domain expertise and validation
- **Open Source Contributors**: For various libraries and tools

---

**Note**: This is a hackathon project demonstrating modern web development practices and AI integration in healthcare. For production use, additional security, compliance, and testing measures would be required.
