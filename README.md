# Fullstack Next.js + Appwrite Template

A modern, production-ready fullstack application template built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Appwrite** as the backend platform.

## ✨ Features

- 🚀 **Next.js 15** with App Router and TypeScript
- 🎨 **Tailwind CSS** for styling
- 🔐 **Appwrite** for backend services (Authentication, Database, Storage)
- 🛡️ **Protected Routes** with authentication middleware
- 🎣 **Reusable Hooks** (`useAuth` for authentication)
- 📦 **Modular Architecture** (components, services, hooks, lib)
- 🌐 **Environment Configuration** with `.env` support
- 📱 **Responsive Design** mobile-first approach
- 🔒 **Type-Safe** with TypeScript throughout

## 📋 Requirements

- Node.js 18+ 
- npm or yarn
- Appwrite account (Free tier available at [cloud.appwrite.io](https://cloud.appwrite.io))

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/npsg02/template-fullstack-appwrite.git
cd template-fullstack-appwrite
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Appwrite

#### Option A: Use Appwrite Cloud (Recommended for beginners)

1. Sign up for a free account at [cloud.appwrite.io](https://cloud.appwrite.io)
2. Create a new project
3. Go to your project settings and note down:
   - **API Endpoint**: `https://cloud.appwrite.io/v1`
   - **Project ID**: Found in project settings

#### Option B: Self-host Appwrite with Docker

```bash
docker run -d \
  --name appwrite \
  --label "traefik.enable=true" \
  --label "traefik.http.routers.appwrite.rule=Host(`localhost`)" \
  -p 80:80 \
  -p 443:443 \
  -v appwrite:/storage \
  appwrite/appwrite:latest
```

Visit `http://localhost` and complete the setup wizard.

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Update the values in `.env.local`:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_actual_project_id
```

### 5. Configure Appwrite Project

1. **Enable Email/Password Authentication**:
   - In your Appwrite Console, go to **Auth** → **Settings**
   - Enable **Email/Password** authentication method

2. **Add Platform (Optional but recommended)**:
   - Go to **Settings** → **Platforms**
   - Add a new **Web App** platform
   - Set hostname to `localhost` for development
   - Add your production domain when deploying

3. **(Optional) Create Database and Collection**:
   - Go to **Databases** → Create a new database
   - Create a "users" collection with fields:
     - `name` (String)
     - `bio` (String)
     - `avatar` (URL)
   - Set appropriate permissions

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
template-fullstack-appwrite/
├── app/                      # Next.js App Router
│   ├── dashboard/           # Protected dashboard page
│   ├── login/               # Login page
│   ├── register/            # Registration page
│   ├── layout.tsx           # Root layout with AuthProvider
│   └── page.tsx             # Home page
├── components/              # Reusable React components
│   ├── Button.tsx          # Button component
│   ├── Input.tsx           # Input component
│   ├── Loading.tsx         # Loading spinner
│   ├── Navbar.tsx          # Navigation bar
│   └── ProtectedRoute.tsx  # Route protection wrapper
├── hooks/                   # Custom React hooks
│   └── useAuth.tsx         # Authentication hook
├── lib/                     # Library configurations
│   └── appwrite.ts         # Appwrite client setup
├── services/                # Business logic services
│   └── auth.ts             # Authentication service
├── public/                  # Static assets
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore file
├── next.config.ts          # Next.js configuration
├── package.json            # Dependencies and scripts
├── tailwind.config.ts      # Tailwind CSS configuration
└── tsconfig.json           # TypeScript configuration
```

## 🔑 Key Components

### Authentication Hook (`useAuth`)

The `useAuth` hook provides authentication functionality throughout the app:

```tsx
const { user, loading, login, register, logout } = useAuth();
```

- `user`: Current authenticated user or null
- `loading`: Authentication state loading status
- `login(email, password)`: Login function
- `register(email, password, name)`: Registration function
- `logout()`: Logout function

### Protected Routes

Use the `ProtectedRoute` component to protect pages:

```tsx
import ProtectedRoute from '@/components/ProtectedRoute';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      {/* Your protected content */}
    </ProtectedRoute>
  );
}
```

### Appwrite Service

The `authService` provides authentication methods:

```typescript
import { authService } from '@/services/auth';

// Login
await authService.login(email, password);

// Register
await authService.register(email, password, name);

// Get current user
const user = await authService.getCurrentUser();

// Logout
await authService.logout();
```

## 🎨 Available Pages

- **`/`** - Home page with feature overview
- **`/login`** - User login
- **`/register`** - User registration
- **`/dashboard`** - Protected dashboard (requires authentication)

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🐳 Docker Support (Optional)

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_APPWRITE_ENDPOINT=${NEXT_PUBLIC_APPWRITE_ENDPOINT}
      - NEXT_PUBLIC_APPWRITE_PROJECT_ID=${NEXT_PUBLIC_APPWRITE_PROJECT_ID}
    env_file:
      - .env.local
```

Run with:

```bash
docker-compose up
```

## 🔒 Security Best Practices

1. **Never commit `.env.local`** - It's already in `.gitignore`
2. **Use environment variables** for all sensitive data
3. **Set appropriate permissions** in Appwrite Console
4. **Enable rate limiting** in Appwrite for authentication endpoints
5. **Use HTTPS** in production
6. **Validate user input** on both client and server

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

This app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render
- DigitalOcean App Platform

Remember to:
1. Set environment variables
2. Add your production domain to Appwrite Console platforms
3. Update CORS settings in Appwrite if needed

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Appwrite Documentation](https://appwrite.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🐛 Troubleshooting

### "Network request failed" error

- Check if Appwrite endpoint is correct in `.env.local`
- Verify your internet connection
- If using self-hosted Appwrite, ensure the server is running

### "Project not found" error

- Verify the Project ID in `.env.local`
- Make sure the project exists in your Appwrite Console

### Authentication not working

- Ensure Email/Password auth is enabled in Appwrite Console
- Check browser console for detailed error messages
- Verify the platform (hostname) is added in Appwrite settings

### Build errors

```bash
# Clear Next.js cache and rebuild
rm -rf .next
npm run build
```

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check [Appwrite Discord](https://appwrite.io/discord)
- Review [Next.js Discussions](https://github.com/vercel/next.js/discussions)

---

Made with ❤️ using Next.js and Appwrite
