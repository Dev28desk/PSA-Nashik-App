

# Parmanand Sports Academy - Backend

## Authentication System

### Features Implemented
- Phone number + OTP verification
- JWT token generation
- Redis session management
- Role-based middleware (scaffolding)

### Environment Variables
See `.env.example` for required configuration

### API Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/send-otp` | POST | Send OTP to phone number |
| `/api/auth/verify-otp` | POST | Verify OTP and return JWT |

### Development Setup
1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Build production: `npm run build`

### Testing
```bash
npm test
```

Test Environment Requirements:
- Redis server running locally
- `.env` file with test configurations

Test Coverage:
- OTP sending validation
- OTP verification
- Error cases

