# Laravel Blog Application

A full-featured blog application built with Laravel, React/Inertia, and PostgreSQL, fully containerized with Docker.

## 🚀 Features

### Core Features
- **User Authentication** - Registration, login, logout with Laravel Breeze
- **Blog Posts** - Create, read, update, delete posts with rich content
- **Comments System** - Add comments to posts
- **Likes/Reactions** - Like posts with real-time updates
- **Image Upload** - Support for post images with proper storage handling
- **Responsive Design** - Beautiful UI with Tailwind CSS

### Advanced Features
- **Post Scheduling** - Schedule posts for automatic future publishing
- **Statistics Dashboard** - Comprehensive post statistics and user engagement analytics
- **Role-based Access Control** - Admin and user roles with different permissions
- **Real-time Notifications** - Inertia-based real-time UI updates

## 🛠 Tech Stack

- **Backend**: Laravel 12+ with PHP 8.2
- **Frontend**: React 18 + Inertia.js + TypeScript
- **Styling**: Tailwind CSS + Lucide React icons
- **Database**: PostgreSQL
- **Containerization**: Docker & Docker Compose
- **Authentication**: Laravel Breeze
- **Scheduling**: Laravel Task Scheduler

## 📦 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js V22 (optional, for local development) (use NVM)

### Installation & Setup

1. **Clone and start the application:**
```bash
git clone git@github.com:tahamiskini/ominimo-assessment-test.git
cd blog-app
docker compose up -d --build
```

2. **Run initial setup & DB seed:**
```bash
docker compose exec app /bin/bash -c "cd /var/www && ./docker/setup.sh" 
```

3. **Build frontend assets:**
```bash
docker compose exec app npm run build
```

4. **Start the scheduler (for post scheduling):**
```bash
docker compose up -d scheduler
```

5. **Access the application:**
- **Main App**: http://localhost:8000
- **PgAdmin**: http://localhost:5052

### Default Login Credentials

- **Admin User**
  - Email: `admin@blog.com`
  - Password: `password123`

- **Regular User**
  - Email: `user@blog.com`
  - Password: `password123`

## 🗄 Database Access

**PgAdmin Console**: http://localhost:5052
- Email: `admin@example.com`
- Password: `admin`

**Database Connection**:
- Host: `db`
- Port: `5432`
- Database: `blog_db`
- Username: `blog_user`
- Password: `secret`

## 🎯 API Endpoints

### Posts
- `GET /posts` - List all posts (filtered by user role)
- `GET /posts/create` - Create post form (authenticated)
- `POST /posts` - Store new post (authenticated)
- `GET /posts/{id}` - View single post with comments
- `GET /posts/{id}/edit` - Edit post (owner only)
- `PUT /posts/{id}` - Update post (owner only)
- `DELETE /posts/{id}` - Delete post (owner or admin)

### Comments
- `POST /posts/{id}/comments` - Add comment (authenticated/guests)
- `DELETE /comments/{id}` - Delete comment (owner or post owner or admin)

### Scheduling
- `POST /posts/schedule` - Schedule post for future publishing

- `GET /posts/statistics` - Post analytics and engagement statistics (all users)

## 🐳 Docker Services

The application consists of 5 Docker services:

- **`app`** - Laravel application
- **`webserver`** - Nginx web server
- **`db`** - PostgreSQL database
- **`scheduler`** - Laravel task scheduler (for post scheduling)
- **`pgadmin`** - Database administration interface



## 📝 License

This project is for demonstration purposes as part of a coding assessment.

## 👤 Author

Developed as a technical assessment task.

---

**🎉 Laravel blog is now running at http://localhost:8000!**