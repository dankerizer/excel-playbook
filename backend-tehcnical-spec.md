# 🚀 Backend Technical Specification - ExcelMaster Learning Platform

## 📋 Overview

Backend API untuk platform pembelajaran Excel interaktif **ExcelMaster** yang mendukung sistem pembelajaran gamifikasi, progress tracking, dan evaluasi formula Excel real-time.

### Tech Stack
- **Language:** Go 1.21+
- **Framework:** Go Fiber v2
- **Database:** MySQL 8.0+
- **ORM:** GORM v2
- **HTTP Client:** Go-Resty
- **JSON Parser:** Sonic (ByteDance)
- **Authentication:** Firebase Auth (Frontend) + JWT Verification (Backend)
- **Cache:** Redis 7.0+
- **Message Queue:** Redis Pub/Sub
- **File Storage:** Firebase Storage / AWS S3

---

## 🏗️ System Architecture

### High-Level Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   Database      │
│   (Next.js)     │◄──►│   (Go Fiber)    │◄──►│   (MySQL)       │
│                 │    │                 │    │                 │
│ Firebase Auth   │    │ JWT Validation  │    │ User Data       │
│ State Mgmt      │    │ Business Logic  │    │ Progress Data   │
│ UI Components   │    │ Formula Engine  │    │ Content Data    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │     Redis       │
                       │   (Cache +      │
                       │   Sessions)     │
                       └─────────────────┘
```

### Service Layer Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                        API Gateway                         │
│                     (Rate Limiting)                        │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                    Middleware Layer                        │
│  Auth │ CORS │ Logging │ Recovery │ Compression │ Metrics  │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                     Handler Layer                          │
│   User │ Course │ Progress │ Formula │ Leaderboard │ Cert   │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                    Service Layer                           │
│  UserService │ CourseService │ ProgressService │ etc.       │
└─────────────────────────────────────────────────────────────┘
                              │
┌─────────────────────────────────────────────────────────────┐
│                   Repository Layer                         │
│  UserRepo │ CourseRepo │ ProgressRepo │ FormulaRepo        │
└─────────────────────────────────────────────────────────────┘
```

---

## 🗄️ Database Schema

### Core Tables

#### Users Table
```sql
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    firebase_uid VARCHAR(128) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    display_name VARCHAR(100),
    avatar_url TEXT,
    total_points INT DEFAULT 0,
    current_streak INT DEFAULT 0,
    longest_streak INT DEFAULT 0,
    level_id INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_firebase_uid (firebase_uid),
    INDEX idx_email (email),
    INDEX idx_total_points (total_points)
);
```

#### Courses Table
```sql
CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    thumbnail_url TEXT,
    difficulty_level ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'beginner',
    estimated_duration INT, -- in minutes
    total_lessons INT DEFAULT 0,
    total_challenges INT DEFAULT 0,
    is_published BOOLEAN DEFAULT FALSE,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_slug (slug),
    INDEX idx_difficulty (difficulty_level),
    INDEX idx_published (is_published)
);
```

#### Chapters Table
```sql
CREATE TABLE chapters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    slug VARCHAR(100) NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    sort_order INT DEFAULT 0,
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE KEY unique_course_chapter_slug (course_id, slug),
    INDEX idx_course_id (course_id),
    INDEX idx_sort_order (sort_order)
);
```

#### Lessons Table
```sql
CREATE TABLE lessons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    chapter_id INT NOT NULL,
    slug VARCHAR(100) NOT NULL,
    title VARCHAR(200) NOT NULL,
    content LONGTEXT, -- JSON content
    lesson_type ENUM('theory', 'practice', 'challenge') DEFAULT 'theory',
    points_reward INT DEFAULT 10,
    sort_order INT DEFAULT 0,
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (chapter_id) REFERENCES chapters(id) ON DELETE CASCADE,
    UNIQUE KEY unique_chapter_lesson_slug (chapter_id, slug),
    INDEX idx_chapter_id (chapter_id),
    INDEX idx_lesson_type (lesson_type),
    INDEX idx_sort_order (sort_order)
);
```

#### User Progress Table
```sql
CREATE TABLE user_progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    lesson_id INT NOT NULL,
    status ENUM('not_started', 'in_progress', 'completed') DEFAULT 'not_started',
    score INT DEFAULT 0,
    attempts INT DEFAULT 0,
    time_spent INT DEFAULT 0, -- in seconds
    completed_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_lesson (user_id, lesson_id),
    INDEX idx_user_id (user_id),
    INDEX idx_lesson_id (lesson_id),
    INDEX idx_status (status)
);
```

#### Formula Submissions Table
```sql
CREATE TABLE formula_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    lesson_id INT NOT NULL,
    formula_input TEXT NOT NULL,
    expected_result TEXT,
    actual_result TEXT,
    is_correct BOOLEAN DEFAULT FALSE,
    execution_time_ms INT,
    error_message TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE,
    INDEX idx_user_lesson (user_id, lesson_id),
    INDEX idx_submitted_at (submitted_at)
);
```

#### Achievements Table
```sql
CREATE TABLE achievements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    icon_url TEXT,
    badge_color VARCHAR(7), -- hex color
    points_reward INT DEFAULT 0,
    achievement_type ENUM('progress', 'streak', 'score', 'special') DEFAULT 'progress',
    criteria JSON, -- achievement criteria
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_slug (slug),
    INDEX idx_type (achievement_type)
);
```

#### User Achievements Table
```sql
CREATE TABLE user_achievements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    achievement_id INT NOT NULL,
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (achievement_id) REFERENCES achievements(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_achievement (user_id, achievement_id),
    INDEX idx_user_id (user_id),
    INDEX idx_earned_at (earned_at)
);
```

#### Certificates Table
```sql
CREATE TABLE certificates (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    course_id INT NOT NULL,
    certificate_number VARCHAR(50) UNIQUE NOT NULL,
    issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    certificate_data JSON, -- certificate details
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_course_cert (user_id, course_id),
    INDEX idx_certificate_number (certificate_number),
    INDEX idx_issued_at (issued_at)
);
```

---

## 🔧 API Endpoints

### Authentication Endpoints
```
POST   /api/v1/auth/verify          # Verify Firebase token
POST   /api/v1/auth/refresh         # Refresh JWT token
DELETE /api/v1/auth/logout          # Logout user
```

### User Management
```
GET    /api/v1/users/profile        # Get user profile
PUT    /api/v1/users/profile        # Update user profile
GET    /api/v1/users/stats          # Get user statistics
GET    /api/v1/users/achievements   # Get user achievements
```

### Course Management
```
GET    /api/v1/courses              # List all courses
GET    /api/v1/courses/:slug        # Get course details
GET    /api/v1/courses/:slug/chapters # Get course chapters
GET    /api/v1/courses/:slug/progress # Get user progress in course
```

### Learning Endpoints
```
GET    /api/v1/chapters/:id/lessons # Get chapter lessons
GET    /api/v1/lessons/:id          # Get lesson details
POST   /api/v1/lessons/:id/start    # Start lesson
PUT    /api/v1/lessons/:id/progress # Update lesson progress
POST   /api/v1/lessons/:id/complete # Complete lesson
```

### Formula Engine
```
POST   /api/v1/formulas/evaluate    # Evaluate Excel formula
POST   /api/v1/formulas/validate    # Validate formula syntax
GET    /api/v1/formulas/functions   # Get available functions
POST   /api/v1/formulas/submit      # Submit formula answer
```

### Progress & Analytics
```
GET    /api/v1/progress/dashboard   # Get dashboard data
GET    /api/v1/progress/courses     # Get courses progress
GET    /api/v1/progress/streak      # Get streak information
POST   /api/v1/progress/sync        # Sync progress data
```

### Leaderboard
```
GET    /api/v1/leaderboard/global   # Global leaderboard
GET    /api/v1/leaderboard/course/:id # Course leaderboard
GET    /api/v1/leaderboard/weekly   # Weekly leaderboard
```

### Certificates
```
GET    /api/v1/certificates         # Get user certificates
POST   /api/v1/certificates/generate # Generate certificate
GET    /api/v1/certificates/:id/verify # Verify certificate
GET    /api/v1/certificates/:id/download # Download certificate
```

---

## 🔐 Authentication & Authorization

### Firebase Integration
```go
// Firebase token verification
type FirebaseAuth struct {
    client *auth.Client
}

func (f *FirebaseAuth) VerifyToken(ctx context.Context, idToken string) (*auth.Token, error) {
    token, err := f.client.VerifyIDToken(ctx, idToken)
    if err != nil {
        return nil, err
    }
    return token, nil
}
```

### JWT Implementation
```go
type JWTClaims struct {
    UserID      string `json:"user_id"`
    FirebaseUID string `json:"firebase_uid"`
    Email       string `json:"email"`
    jwt.RegisteredClaims
}

func GenerateJWT(user *models.User) (string, error) {
    claims := JWTClaims{
        UserID:      user.ID,
        FirebaseUID: user.FirebaseUID,
        Email:       user.Email,
        RegisteredClaims: jwt.RegisteredClaims{
            ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
            IssuedAt:  jwt.NewNumericDate(time.Now()),
            Issuer:    "excelmaster-api",
        },
    }
    
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    return token.SignedString([]byte(os.Getenv("JWT_SECRET")))
}
```

### Middleware
```go
func AuthMiddleware() fiber.Handler {
    return func(c *fiber.Ctx) error {
        authHeader := c.Get("Authorization")
        if authHeader == "" {
            return c.Status(401).JSON(fiber.Map{
                "error": "Authorization header required",
            })
        }
        
        tokenString := strings.Replace(authHeader, "Bearer ", "", 1)
        claims, err := ValidateJWT(tokenString)
        if err != nil {
            return c.Status(401).JSON(fiber.Map{
                "error": "Invalid token",
            })
        }
        
        c.Locals("user_id", claims.UserID)
        c.Locals("firebase_uid", claims.FirebaseUID)
        return c.Next()
    }
}
```

---

## ⚡ Formula Engine Implementation

### Core Formula Evaluator
```go
type FormulaEngine struct {
    functions map[string]FormulaFunction
    cache     *redis.Client
}

type FormulaResult struct {
    Value       interface{} `json:"value"`
    Error       string      `json:"error,omitempty"`
    ExecutionMS int64       `json:"execution_ms"`
    CellRefs    []string    `json:"cell_refs,omitempty"`
}

func (fe *FormulaEngine) Evaluate(formula string, context map[string]interface{}) *FormulaResult {
    start := time.Now()
    
    // Parse formula
    ast, err := fe.parseFormula(formula)
    if err != nil {
        return &FormulaResult{
            Error:       err.Error(),
            ExecutionMS: time.Since(start).Milliseconds(),
        }
    }
    
    // Evaluate AST
    result, err := fe.evaluateAST(ast, context)
    if err != nil {
        return &FormulaResult{
            Error:       err.Error(),
            ExecutionMS: time.Since(start).Milliseconds(),
        }
    }
    
    return &FormulaResult{
        Value:       result,
        ExecutionMS: time.Since(start).Milliseconds(),
        CellRefs:    fe.extractCellRefs(ast),
    }
}
```

### Supported Excel Functions
```go
var ExcelFunctions = map[string]FormulaFunction{
    "SUM":     SumFunction,
    "AVERAGE": AverageFunction,
    "COUNT":   CountFunction,
    "MAX":     MaxFunction,
    "MIN":     MinFunction,
    "IF":      IfFunction,
    "VLOOKUP": VlookupFunction,
    "CONCATENATE": ConcatenateFunction,
    "LEFT":    LeftFunction,
    "RIGHT":   RightFunction,
    "MID":     MidFunction,
    "LEN":     LenFunction,
    "UPPER":   UpperFunction,
    "LOWER":   LowerFunction,
    "ROUND":   RoundFunction,
    "ABS":     AbsFunction,
    "TODAY":   TodayFunction,
    "NOW":     NowFunction,
}
```

---

## 📊 Caching Strategy

### Redis Cache Implementation
```go
type CacheService struct {
    client *redis.Client
}

// Cache user progress for 5 minutes
func (c *CacheService) CacheUserProgress(userID string, progress *UserProgressData) error {
    key := fmt.Sprintf("user:progress:%s", userID)
    data, _ := sonic.Marshal(progress)
    return c.client.Set(context.Background(), key, data, 5*time.Minute).Err()
}

// Cache course data for 1 hour
func (c *CacheService) CacheCourseData(courseSlug string, course *CourseData) error {
    key := fmt.Sprintf("course:%s", courseSlug)
    data, _ := sonic.Marshal(course)
    return c.client.Set(context.Background(), key, data, time.Hour).Err()
}

// Cache leaderboard for 10 minutes
func (c *CacheService) CacheLeaderboard(leaderboard *LeaderboardData) error {
    key := "leaderboard:global"
    data, _ := sonic.Marshal(leaderboard)
    return c.client.Set(context.Background(), key, data, 10*time.Minute).Err()
}
```

---

## 🚀 Performance Optimizations

### Database Optimizations
```sql
-- Composite indexes for common queries
CREATE INDEX idx_user_progress_status ON user_progress(user_id, status);
CREATE INDEX idx_lesson_chapter_order ON lessons(chapter_id, sort_order);
CREATE INDEX idx_user_points_level ON users(total_points, level_id);

-- Partitioning for large tables
ALTER TABLE formula_submissions 
PARTITION BY RANGE (YEAR(submitted_at)) (
    PARTITION p2024 VALUES LESS THAN (2025),
    PARTITION p2025 VALUES LESS THAN (2026),
    PARTITION p_future VALUES LESS THAN MAXVALUE
);
```

### Connection Pooling
```go
func InitDB() *gorm.DB {
    dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
        os.Getenv("DB_USER"),
        os.Getenv("DB_PASSWORD"),
        os.Getenv("DB_HOST"),
        os.Getenv("DB_PORT"),
        os.Getenv("DB_NAME"),
    )
    
    db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
        Logger: logger.Default.LogMode(logger.Info),
    })
    if err != nil {
        log.Fatal("Failed to connect to database:", err)
    }
    
    sqlDB, _ := db.DB()
    sqlDB.SetMaxIdleConns(10)
    sqlDB.SetMaxOpenConns(100)
    sqlDB.SetConnMaxLifetime(time.Hour)
    
    return db
}
```

---

## 📈 Monitoring & Logging

### Structured Logging
```go
type Logger struct {
    *logrus.Logger
}

func (l *Logger) LogAPIRequest(c *fiber.Ctx, duration time.Duration) {
    l.WithFields(logrus.Fields{
        "method":      c.Method(),
        "path":        c.Path(),
        "status_code": c.Response().StatusCode(),
        "duration_ms": duration.Milliseconds(),
        "user_id":     c.Locals("user_id"),
        "ip":          c.IP(),
        "user_agent":  c.Get("User-Agent"),
    }).Info("API Request")
}

func (l *Logger) LogFormulaEvaluation(userID, formula string, result *FormulaResult) {
    l.WithFields(logrus.Fields{
        "user_id":      userID,
        "formula":      formula,
        "execution_ms": result.ExecutionMS,
        "has_error":    result.Error != "",
        "error":        result.Error,
    }).Info("Formula Evaluation")
}
```

### Health Check Endpoint
```go
func HealthCheck(db *gorm.DB, redis *redis.Client) fiber.Handler {
    return func(c *fiber.Ctx) error {
        health := map[string]interface{}{
            "status":    "ok",
            "timestamp": time.Now().Unix(),
            "services":  map[string]string{},
        }
        
        // Check database
        sqlDB, _ := db.DB()
        if err := sqlDB.Ping(); err != nil {
            health["services"].(map[string]string)["database"] = "down"
            health["status"] = "degraded"
        } else {
            health["services"].(map[string]string)["database"] = "up"
        }
        
        // Check Redis
        if err := redis.Ping(context.Background()).Err(); err != nil {
            health["services"].(map[string]string)["redis"] = "down"
            health["status"] = "degraded"
        } else {
            health["services"].(map[string]string)["redis"] = "up"
        }
        
        if health["status"] == "ok" {
            return c.JSON(health)
        }
        return c.Status(503).JSON(health)
    }
}
```

---

## 🔧 Development Setup

### Environment Variables
```bash
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USER=excelmaster
DB_PASSWORD=your_password
DB_NAME=excelmaster_db

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# JWT
JWT_SECRET=your_jwt_secret_key

# Firebase
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY_ID=your_private_key_id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxx@your-project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your_client_id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token

# Server
PORT=8080
ENVIRONMENT=development

# CORS
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

### Project Structure
```
backend/
├── cmd/
│   └── server/
│       └── main.go
├── internal/
│   ├── config/
│   │   └── config.go
│   ├── handlers/
│   │   ├── auth.go
│   │   ├── courses.go
│   │   ├── formulas.go
│   │   ├── progress.go
│   │   └── users.go
│   ├── middleware/
│   │   ├── auth.go
│   │   ├── cors.go
│   │   ├── logger.go
│   │   └── rate_limit.go
│   ├── models/
│   │   ├── user.go
│   │   ├── course.go
│   │   ├── progress.go
│   │   └── formula.go
│   ├── repositories/
│   │   ├── user_repository.go
│   │   ├── course_repository.go
│   │   └── progress_repository.go
│   ├── services/
│   │   ├── auth_service.go
│   │   ├── course_service.go
│   │   ├── formula_service.go
│   │   └── progress_service.go
│   └── utils/
│       ├── response.go
│       ├── validation.go
│       └── formula_parser.go
├── pkg/
│   ├── database/
│   │   └── mysql.go
│   ├── cache/
│   │   └── redis.go
│   └── logger/
│       └── logger.go
├── migrations/
│   ├── 001_create_users_table.sql
│   ├── 002_create_courses_table.sql
│   └── ...
├── tests/
│   ├── integration/
│   └── unit/
├── docker-compose.yml
├── Dockerfile
├── go.mod
├── go.sum
└── README.md
```

### Docker Setup
```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "8080:8080"
    environment:
      - DB_HOST=mysql
      - REDIS_HOST=redis
    depends_on:
      - mysql
      - redis
    volumes:
      - .:/app
    command: air # for hot reload in development

  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: excelmaster_db
      MYSQL_USER: excelmaster
      MYSQL_PASSWORD: password
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql
      - ./migrations:/docker-entrypoint-initdb.d

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  mysql_data:
  redis_data:
```

---

## 🧪 Testing Strategy

### Unit Tests
```go
func TestFormulaEvaluation(t *testing.T) {
    engine := NewFormulaEngine()
    
    tests := []struct {
        name     string
        formula  string
        context  map[string]interface{}
        expected interface{}
        hasError bool
    }{
        {
            name:     "Simple SUM",
            formula:  "=SUM(A1:A3)",
            context:  map[string]interface{}{"A1": 1, "A2": 2, "A3": 3},
            expected: 6,
            hasError: false,
        },
        {
            name:     "Division by zero",
            formula:  "=A1/A2",
            context:  map[string]interface{}{"A1": 10, "A2": 0},
            expected: nil,
            hasError: true,
        },
    }
    
    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            result := engine.Evaluate(tt.formula, tt.context)
            
            if tt.hasError {
                assert.NotEmpty(t, result.Error)
            } else {
                assert.Empty(t, result.Error)
                assert.Equal(t, tt.expected, result.Value)
            }
        })
    }
}
```

### Integration Tests
```go
func TestUserProgressAPI(t *testing.T) {
    app := setupTestApp()
    
    // Create test user
    user := createTestUser()
    token := generateTestJWT(user)
    
    // Test getting user progress
    req := httptest.NewRequest("GET", "/api/v1/progress/dashboard", nil)
    req.Header.Set("Authorization", "Bearer "+token)
    
    resp, err := app.Test(req)
    assert.NoError(t, err)
    assert.Equal(t, 200, resp.StatusCode)
    
    var progress ProgressResponse
    json.NewDecoder(resp.Body).Decode(&progress)
    assert.NotNil(t, progress.Data)
}
```

---

## 🚀 Deployment

### Production Dockerfile
```dockerfile
# Build stage
FROM golang:1.21-alpine AS builder

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download

COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main cmd/server/main.go

# Production stage
FROM alpine:latest

RUN apk --no-cache add ca-certificates
WORKDIR /root/

COPY --from=builder /app/main .
COPY --from=builder /app/migrations ./migrations

EXPOSE 8080

CMD ["./main"]
```

### Kubernetes Deployment
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: excelmaster-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: excelmaster-api
  template:
    metadata:
      labels:
        app: excelmaster-api
    spec:
      containers:
      - name: api
        image: excelmaster/api:latest
        ports:
        - containerPort: 8080
        env:
        - name: DB_HOST
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: host
        - name: DB_PASSWORD
          valueFrom:
            secretKeyRef:
              name: db-secret
              key: password
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
```

---

## 📋 Implementation Checklist

### Phase 1: Core Infrastructure
- [ ] Setup Go Fiber application
- [ ] Configure MySQL database with GORM
- [ ] Setup Redis for caching
- [ ] Implement Firebase Auth integration
- [ ] Create basic middleware (CORS, Auth, Logging)
- [ ] Setup project structure

### Phase 2: User Management
- [ ] User registration/login endpoints
- [ ] User profile management
- [ ] JWT token handling
- [ ] User preferences

### Phase 3: Course System
- [ ] Course CRUD operations
- [ ] Chapter and lesson management
- [ ] Content delivery API
- [ ] Course enrollment system

### Phase 4: Formula Engine
- [ ] Basic formula parser
- [ ] Excel function implementations
- [ ] Formula evaluation API
- [ ] Error handling for formulas

### Phase 5: Progress Tracking
- [ ] User progress tracking
- [ ] Achievement system
- [ ] Leaderboard implementation
- [ ] Statistics and analytics

### Phase 6: Advanced Features
- [ ] Certificate generation
- [ ] Real-time notifications
- [ ] Advanced caching strategies
- [ ] Performance optimizations

### Phase 7: Production Ready
- [ ] Comprehensive testing
- [ ] Documentation
- [ ] Monitoring and logging
- [ ] Deployment configuration
- [ ] Security audit

---

## 🔗 External Integrations

### Firebase Services
- **Authentication:** User login/register
- **Storage:** File uploads (certificates, avatars)
- **Analytics:** User behavior tracking

### Third-party APIs
- **Email Service:** SendGrid/AWS SES for notifications
- **File Storage:** AWS S3 for static assets
- **Monitoring:** DataDog/New Relic for APM

---

Dokumentasi ini menyediakan blueprint lengkap untuk implementasi backend ExcelMaster Learning Platform dengan fokus pada performa, skalabilitas, dan maintainability.