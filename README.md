# Munshi Frontend

Modern, production-ready frontend for the Munshi accounting system built with Next.js 16, React 19, TypeScript, and Tailwind CSS.

## 🚀 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + SCSS
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)

## 📁 Project Structure

```
munshi-frontend/
├── app/                      # Next.js App Router pages
│   ├── dashboard/           # Dashboard page
│   ├── ledger/              # Ledger management
│   ├── invoices/            # Invoice management
│   ├── customers/           # Customer management
│   ├── inventory/           # Inventory management
│   ├── banking/             # Banking features
│   ├── gst/                 # GST management
│   ├── login/               # Authentication pages
│   ├── signup/
│   ├── settings/            # User settings
│   └── ...                  # Other pages
│
├── components/              # Reusable React components
│   ├── ui/                  # UI components (Button, Card, etc.)
│   ├── layout/              # Layout components (AppLayout, Sidebar)
│   ├── charts/              # Chart components
│   ├── sections/            # Page sections
│   └── providers/           # Context providers
│
├── lib/                     # Core library code
│   ├── api/                 # API client & configuration
│   │   ├── client.ts        # Axios client with interceptors
│   │   ├── config.ts        # API endpoints & configuration
│   │   ├── types.ts         # TypeScript types
│   │   └── storage.ts       # Token storage utilities
│   │
│   ├── services/            # API service layer
│   │   ├── auth.service.ts
│   │   ├── user.service.ts
│   │   ├── ledger.service.ts
│   │   ├── invoices.service.ts
│   │   ├── customers.service.ts
│   │   └── index.ts
│   │
│   ├── stores/              # Zustand state management
│   │   ├── auth.store.ts
│   │   ├── user.store.ts
│   │   ├── ledger.store.ts
│   │   ├── invoices.store.ts
│   │   ├── customers.store.ts
│   │   └── index.ts
│   │
│   └── STATE_MANAGEMENT.md  # State management documentation
│
├── public/                  # Static assets
├── middleware.ts            # Next.js middleware (auth, etc.)
└── tailwind.config.ts       # Tailwind configuration
```

## 🏗️ Architecture

### Container/Scene Pattern

The application uses a **Container/Scene architecture** for better separation of concerns:

- **Container** (Server Component): Handles data fetching on the server
- **Scene** (Client Component): Handles UI rendering and interactivity
- **Page** (Entry Point): Simple wrapper that delegates to Container

Example:
```typescript
// page.tsx (Entry Point)
import DashboardContainer from './DashboardContainer';
export default function DashboardPage() {
  return <DashboardContainer />;
}

// DashboardContainer.tsx (Server Component)
import DashboardScene from './DashboardScene';
async function getData() {
  // Fetch data on server
  return data;
}
export default async function DashboardContainer() {
  const data = await getData();
  return <DashboardScene initialData={data} />;
}

// DashboardScene.tsx (Client Component)
'use client';
export default function DashboardScene({ initialData }) {
  // Handle UI and interactivity
  return <div>...</div>;
}
```

### State Management with Zustand

All API data is managed through **Zustand stores** for centralized state:

```typescript
import { useLedgerStore } from '@/lib/stores';

function LedgerPage() {
  const { ledgers, isLoading, fetchLedgers } = useLedgerStore();
  
  useEffect(() => {
    fetchLedgers();
  }, []);
  
  return <LedgerList ledgers={ledgers} loading={isLoading} />;
}
```

See [`lib/STATE_MANAGEMENT.md`](./lib/STATE_MANAGEMENT.md) for detailed documentation.

### API Service Layer

Reusable API functions organized by domain:

```typescript
import { ledgerService } from '@/lib/services';

// Direct service call
const ledgers = await ledgerService.list();

// Or use through Zustand store (recommended)
const { fetchLedgers } = useLedgerStore();
await fetchLedgers();
```

## 🚦 Getting Started

### Prerequisites

- Node.js 20+ and npm 10+
- Backend API running (see `munshi-backend/README.md`)

### Installation

1. **Clone the repository** (if not already done)
   ```bash
   cd munshi-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file:
   ```env
   # API Configuration
   NEXT_PUBLIC_API_URL=http://localhost:3001
   NEXT_PUBLIC_API_TIMEOUT=30000
   
   # Environment
   NODE_ENV=development
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

```bash
# Development
npm run dev          # Start development server (port 3000)

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🎨 Features

### ✅ Authentication & Authorization
- JWT-based authentication with refresh tokens
- Automatic token refresh on expiry
- Device fingerprinting for security
- Role-based access control (RBAC)
- Protected routes with middleware

### ✅ Dashboard
- Real-time financial metrics
- Interactive charts (Revenue, Expenses, Cash Flow)
- Recent transactions
- Quick actions

### ✅ Ledger Management
- Chart of accounts
- Account hierarchy
- Account types (Asset, Liability, Equity, Revenue, Expense)
- Balance tracking

### ✅ Invoice Management
- Create, edit, delete invoices
- Invoice status tracking (Draft, Sent, Paid, Overdue)
- PDF generation (planned)
- Email sending (planned)

### ✅ Customer Management
- Customer database
- Contact information
- Transaction history

### ✅ Inventory Management
- Product catalog
- Stock tracking
- Low stock alerts

### ✅ GST Management
- GST calculations
- GST reports
- Compliance tracking

### ✅ Banking Integration
- Bank account management
- Transaction reconciliation
- Payment tracking

### ✅ UI/UX Features
- Dark mode support
- Responsive design (mobile, tablet, desktop)
- Loading states
- Error handling
- Toast notifications
- Modal dialogs
- Form validation

## 🔐 Authentication Flow

1. **Login/Register** → Receive access token + refresh token
2. **Store tokens** → Secure storage with httpOnly cookies (planned)
3. **API requests** → Automatic token attachment via interceptor
4. **Token expiry** → Automatic refresh with refresh token
5. **Logout** → Clear tokens and redirect to login

## 🌐 API Integration

The frontend communicates with the backend API using a production-grade HTTP client:

### Features
- ✅ Automatic authentication (JWT tokens)
- ✅ Request/response interceptors
- ✅ Automatic token refresh
- ✅ Request deduplication
- ✅ Retry logic with exponential backoff
- ✅ Error handling & transformation
- ✅ TypeScript type safety
- ✅ Request/response logging (dev mode)

### Configuration

API endpoints are defined in `lib/api/config.ts`:

```typescript
export const API_ENDPOINTS = {
  auth: {
    login: '/api/v1/auth/login',
    register: '/api/v1/auth/register',
    // ...
  },
  user: {
    me: '/api/v1/user/me',
    list: '/api/v1/user',
  },
  // ...
};
```

## 🎯 Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow React best practices
- Use functional components with hooks
- Implement proper error boundaries
- Write meaningful component names

### Component Structure
```typescript
/**
 * Component description
 */

'use client'; // If client component

import { useState } from 'react';
import type { ComponentProps } from '@/types';

interface MyComponentProps {
  // Props definition
}

export default function MyComponent({ prop1, prop2 }: MyComponentProps) {
  // Component logic
  
  return (
    <div>
      {/* JSX */}
    </div>
  );
}
```

### State Management
- Use Zustand stores for global state
- Use React state for local component state
- Avoid prop drilling - use stores instead
- Keep stores focused on single domains

### Styling
- Use Tailwind CSS utility classes
- Use SCSS for complex custom styles
- Follow mobile-first responsive design
- Use CSS variables for theming

## 🔧 Configuration Files

- `next.config.ts` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `eslint.config.mjs` - ESLint configuration
- `postcss.config.mjs` - PostCSS configuration

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🌙 Dark Mode

Dark mode is implemented using `next-themes`:

```typescript
import { useTheme } from 'next-themes';

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      Toggle Theme
    </button>
  );
}
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy!

### Deploy to Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Digital Ocean
- Self-hosted with Docker

## 📚 Additional Documentation

- [State Management Guide](./lib/STATE_MANAGEMENT.md)
- [API Integration Guide](./lib/api/README.md) (to be created)
- [Component Library](./components/README.md) (to be created)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

For issues and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation

---

**Built with ❤️ using Next.js and React**
