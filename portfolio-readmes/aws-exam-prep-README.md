# AWS Exam Prep - Full-Stack Web Application

![AWS Exam Prep](https://img.shields.io/badge/AWS-SAA--C03-orange) ![Laravel](https://img.shields.io/badge/Laravel-8.x-red) ![Vue.js](https://img.shields.io/badge/Vue.js-3.x-green) ![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green) ![Docker](https://img.shields.io/badge/Docker-Compose-blue)

A comprehensive full-stack web application designed for AWS Solutions Architect Associate (SAA-C03) exam preparation. Built with modern technologies and containerized for easy deployment.

## 🚀 Project Status

**🚀 LIVE** - This project is now live and accessible.

[Live Application](https://aws-exam-prep-frontend.fly.dev/) | [Frontend Demo](#) | [Backend API](#)

## ☁️ Deployment

-   **Frontend**: Deployed on [fly.io](https://fly.io/)
-   **Backend**: Deployed on [fly.io](https://fly.io/)

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Key Highlights](#key-highlights)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

**AWS Exam Prep** is a sophisticated learning management system specifically tailored for AWS certification preparation. The application provides an interactive platform for students to practice with real AWS exam questions, track their progress, and enhance their knowledge through comprehensive study materials.

### Problem Solved
- **Fragmented Study Resources**: Consolidates AWS exam preparation materials in one platform
- **Lack of Progress Tracking**: Provides detailed analytics and performance metrics
- **Inefficient Study Methods**: Offers targeted quizzes and topic-based learning paths
- **Poor User Experience**: Modern, responsive interface optimized for learning

## 🛠 Tech Stack

### Backend
- **PHP 8.0+** - Server-side programming language
- **Laravel 8.x** - Robust PHP framework with Eloquent ORM
- **MongoDB 7.0** - NoSQL database for flexible data storage
- **Laravel Sanctum** - API authentication system
- **Nginx** - High-performance web server

### Frontend  
- **Vue.js 3.4** - Progressive JavaScript framework
- **Vue Router 4.x** - Client-side routing
- **Pinia 2.x** - State management
- **Tailwind CSS 3.x** - Utility-first CSS framework
- **Headless UI** - Accessible UI components
- **Heroicons** - Beautiful SVG icons
- **Vite 5.x** - Fast build tool and dev server

### DevOps & Tools
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Reverse proxy and static file serving
- **Git** - Version control
- **Artisan Commands** - Custom CLI tools for data management

## ✨ Features

### 🎓 Learning Management
- **Comprehensive Question Bank**: 1000+ AWS SAA-C03 practice questions
- **Topic-Based Organization**: Questions categorized by AWS services and concepts
- **Multiple Quiz Types**: 
  - Mock Exams (simulating real AWS exam conditions)
  - Topic-Specific Quizzes
  - Random Practice Sessions
- **Difficulty Levels**: Easy, Medium, Hard question classification
- **Detailed Explanations**: Comprehensive explanations for all answers

### 📊 Progress Tracking
- **Performance Analytics**: Detailed statistics on quiz performance
- **Progress Dashboard**: Visual representation of learning progress
- **Historical Data**: Track improvement over time
- **Weak Areas Identification**: Highlight topics needing more practice

### 📝 Study Tools
- **Personal Notes**: Create and manage study notes by topic
- **Bookmarking**: Save important questions for later review
- **Search Functionality**: Quick search across questions and topics
- **Mobile Responsive**: Study anywhere on any device

### 🔐 User Management
- **Secure Authentication**: JWT-based authentication with Laravel Sanctum
- **User Profiles**: Personalized learning experience
- **Session Management**: Persistent login sessions
- **Data Privacy**: Secure handling of user data

## 🏗 Architecture

### System Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (Vue.js)      │◄──►│   (Laravel)     │◄──►│   (MongoDB)     │
│   Port: 3000    │    │   Port: 8000    │    │   Port: 27017   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                        │                        │
         └──────────Docker Compose Network──────────────────┘
```

### API Architecture
- **RESTful API Design**: Clean, predictable endpoints
- **Authentication Layer**: Sanctum middleware protection  
- **Data Validation**: Comprehensive request validation
- **Error Handling**: Structured error responses
- **Resource Controllers**: Organized controller structure

### Database Schema
- **Topics Collection**: AWS service categories and topics
- **Questions Collection**: Exam questions with metadata
- **Quizzes Collection**: Quiz sessions and results
- **Users Collection**: User accounts and profiles
- **Notes Collection**: User-generated study notes

## 🚀 Installation

### Prerequisites
- Docker & Docker Compose
- Git
- Node.js 16+ (for local development)
- PHP 8.0+ (for local development)

### Quick Start with Docker

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/aws-exam-prep.git
cd aws-exam-prep
```

2. **Start the application**
```bash
docker-compose up -d
```

3. **Set up the backend**
```bash
# Install PHP dependencies
docker exec aws_exam_laravel composer install

# Generate application key
docker exec aws_exam_laravel php artisan key:generate

# Import sample data
docker exec aws_exam_laravel php artisan import:aws-questions
```

4. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- MongoDB: localhost:27017

### Manual Installation

<details>
<summary>Click to expand manual installation steps</summary>

#### Backend Setup
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan serve --port=8000
```

#### Frontend Setup  
```bash
cd frontend
npm install
npm run dev
```

#### Database Setup
```bash
# Start MongoDB
mongod

# Import data
php artisan import:aws-questions
```
</details>

## 📱 Usage

### For Students
1. **Sign Up/Login**: Create an account or log in
2. **Choose Study Mode**: Select from mock exams, topic quizzes, or random practice
3. **Take Quizzes**: Answer questions with real-time feedback
4. **Review Results**: Analyze performance and identify weak areas
5. **Study Notes**: Create personal notes for difficult topics
6. **Track Progress**: Monitor improvement over time

### For Developers
1. **API Integration**: Use the REST API for custom integrations
2. **Data Import**: Import custom question sets using Artisan commands
3. **Customization**: Modify topics, questions, and UI components
4. **Analytics**: Access user data through the admin interface

## 📚 API Documentation

### Authentication
```http
POST /api/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password"
}
```

### Quiz Management
```http
# Get random quiz
GET /api/quiz/random
Authorization: Bearer {token}

# Submit quiz results
POST /api/quiz
Authorization: Bearer {token}
Content-Type: application/json

{
  "type": "random",
  "questions": [...],
  "user_answers": {...},
  "time_taken": 1800
}
```

### Topics and Questions
```http
# Get all topics
GET /api/topics
Authorization: Bearer {token}

# Get questions by topic
GET /api/topics/{slug}/questions
Authorization: Bearer {token}
```

## 📁 Project Structure

```
aws-exam-prep-frontend/
└── src/
    ├── components/       # Reusable Vue components
    ├── views/           # Page-level components
    ├── stores/          # Pinia state management
    ├── services/        # API communication
    └── router/          # Vue Router configuration

aws-exam-prep-backend/
└── app/
    ├── Console/Commands/   # Artisan commands for data import
    ├── Http/Controllers/   # API controllers
    ├── Models/            # Eloquent models for MongoDB
    └── Services/          # Business logic services
```

## 🎨 Key Highlights

### Technical Excellence
- **Scalable Architecture**: Microservices-ready containerized design
- **Modern Stack**: Latest versions of Vue.js, Laravel, and MongoDB
- **Security First**: JWT authentication, input validation, and XSS protection
- **Performance Optimized**: Efficient database queries and caching strategies
- **Developer Experience**: Hot reloading, type safety, and comprehensive tooling

### Business Value
- **User-Centric Design**: Intuitive interface optimized for learning
- **Data-Driven Insights**: Comprehensive analytics for performance tracking
- **Scalable Infrastructure**: Handles concurrent users and large datasets
- **Maintainable Codebase**: Clean architecture with separation of concerns

### Innovation
- **Intelligent Question Classification**: Automated categorization system
- **Adaptive Learning Paths**: Personalized study recommendations
- **Real-Time Analytics**: Live performance tracking and feedback
- **Mobile-First Design**: Responsive design for all devices

## 🖼 Screenshots

*Note: Add screenshots of your application here*

| Dashboard | Quiz Interface | Results Analysis |
|-----------|---------------|------------------|
| ![Dashboard](link) | ![Quiz](link) | ![Results](link) |

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Your Name** - [your.email@example.com](mailto:your.email@example.com)

Live Demo: [https://aws-exam-prep-frontend.fly.dev/](https://aws-exam-prep-frontend.fly.dev/) • Project Link: [https://github.com/imranctg16/aws-exam-prep](https://github.com/imranctg16/aws-exam-prep)

---

⭐ **Star this repository if you found it helpful!**

## 🙏 Acknowledgments

- AWS for providing comprehensive documentation and exam guides
- Laravel community for excellent framework support
- Vue.js team for the amazing frontend framework
- MongoDB for flexible document storage
- Open source community for various libraries and tools used

---

*Built with ❤️ for the AWS certification community*