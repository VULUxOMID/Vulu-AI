# 🤖 Vulu.ai - Commercial AI Assistant Platform

> Transform your personal AI assistant into a profitable SaaS business

## 🌟 **What is Vulu.ai?**

Vulu.ai is a **commercial-grade AI assistant platform** that combines:
- **🎯 Real-time voice conversations** with Google Neural TTS
- **👁️ Live vision capabilities** (camera + screen sharing)
- **🧠 Persistent memory** across sessions
- **⚡ Instant interruption detection**
- **💳 Subscription billing** with Stripe
- **📊 Advanced analytics** and admin dashboard

Built with Next.js, TypeScript, Prisma, and powered entirely by Google AI services.

---

## 🚀 **Key Features**

### 🎯 **For Users**
- **Voice Intelligence**: Natural conversations with ultra-realistic TTS
- **Live Vision**: Real-time camera and screen sharing analysis
- **Persistent Memory**: Remembers preferences and context
- **Multi-Platform**: Works on desktop, mobile, and tablets
- **Credit System**: Transparent usage tracking
- **Flexible Plans**: Weekly and monthly subscriptions

### 📊 **For Business Owners**
- **Admin Dashboard**: Real-time analytics and monitoring
- **Revenue Tracking**: Subscription management and profit analysis
- **Usage Analytics**: Detailed insights into user behavior
- **Cost Monitoring**: Track Google AI API expenses
- **User Management**: Complete customer lifecycle management
- **Stripe Integration**: Secure payment processing

---

## 🏗️ **Technology Stack**

### **Frontend**
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Heroicons** for UI icons

### **Backend**
- **Next.js API Routes**
- **Prisma** ORM with PostgreSQL
- **NextAuth.js** for authentication
- **Stripe** for payments

### **AI Services**
- **Google Gemini Vision** for multimodal AI
- **Google Cloud TTS** for voice synthesis
- **Web Speech API** for voice recognition

### **Infrastructure**
- **Vercel** for deployment (recommended)
- **Supabase** for PostgreSQL database
- **Stripe** for payment processing

---

## 🎯 **Quick Start**

### 1. **Installation**
```bash
git clone <your-repo-url>
cd vulu-ai
npm install
```

### 2. **Environment Setup**
Create `.env.local`:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/vulu_ai"

# Google AI
GOOGLE_AI_API_KEY="your_google_ai_api_key"

# NextAuth
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Google OAuth (optional)
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
```

### 3. **Database Setup**
```bash
npx prisma generate
npx prisma db push
```

### 4. **Start Development**
```bash
npm run dev
```

Visit `http://localhost:3000` to see your Vulu.ai platform!

---

## 💰 **Business Model**

### **Pricing Structure**
- **Weekly Plan**: $9.99/week (1,000 credits)
- **Monthly Plan**: $29.99/month (5,000 credits)

### **Credit Usage**
- **Text Messages**: 1 credit per message
- **Vision Analysis**: 3 credits per analysis
- **Voice Responses**: 1 credit per TTS generation

### **Revenue Projections**
With 1,000 active users at 70% monthly conversion:
- **Monthly Revenue**: ~$20,993
- **Google AI Costs**: ~$2,500
- **Net Profit**: ~$18,493/month

---

## 📊 **Admin Dashboard**

Access the admin dashboard at `/admin` to monitor:

- **📈 Real-time Analytics**: User growth, revenue, usage stats
- **💰 Revenue Tracking**: Subscription analytics and profit margins
- **🔧 System Health**: API latency, uptime, error rates
- **👥 User Management**: Customer insights and support tools
- **💳 Payment Analytics**: Stripe integration and billing reports

---

## 🚀 **Deployment**

### **Recommended: Vercel + Supabase**

1. **Deploy to Vercel**:
   ```bash
   npm install -g vercel
   vercel --prod
   ```

2. **Set up Supabase**:
   - Create account at [supabase.com](https://supabase.com)
   - Create new project
   - Copy connection string to `DATABASE_URL`

3. **Configure Domain**:
   - Point `vulu.ai` to your Vercel deployment
   - Update `NEXTAUTH_URL` to your domain

4. **Set up Stripe Webhooks**:
   - Configure webhook endpoint: `https://vulu.ai/api/webhooks/stripe`
   - Update `STRIPE_WEBHOOK_SECRET`

---

## 🔧 **Configuration**

### **Subscription Plans**
Edit plans in `src/app/pricing/page.tsx`:
```typescript
const plans = [
  {
    name: 'Weekly Plan',
    price: 9.99,
    credits: 1000,
    stripePriceId: 'price_weekly'
  },
  // Add more plans...
]
```

### **Credit Costs**
Adjust credit usage in `src/app/app/page.tsx`:
```typescript
// Text message: 1 credit
setCurrentCredits(prev => Math.max(0, prev - 1))

// Vision analysis: 3 credits  
setCurrentCredits(prev => Math.max(0, prev - 3))
```

---

## 📱 **API Endpoints**

### **User Management**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

### **Subscriptions**
- `POST /api/subscriptions/create` - Create subscription
- `GET /api/subscriptions/status` - Get subscription status
- `POST /api/subscriptions/cancel` - Cancel subscription

### **Usage Tracking**
- `POST /api/usage/record` - Record usage
- `GET /api/usage/stats` - Get usage statistics
- `POST /api/credits/deduct` - Deduct credits

### **Admin**
- `GET /api/admin/analytics` - Get analytics data
- `GET /api/admin/users` - Get user list
- `GET /api/admin/revenue` - Get revenue data

---

## 🛡️ **Security**

- **Authentication**: NextAuth.js with secure session management
- **Authorization**: Role-based access control (USER/ADMIN)
- **Data Protection**: Encrypted sensitive data
- **Rate Limiting**: API endpoint protection
- **CORS**: Proper cross-origin configuration
- **Input Validation**: Sanitized user inputs

---

## 📈 **Scaling**

### **Performance Optimization**
- **CDN**: Static assets via Vercel Edge Network
- **Database**: Connection pooling with Prisma
- **Caching**: Redis for session and API caching
- **Monitoring**: Real-time error tracking

### **Infrastructure Scaling**
- **Horizontal Scaling**: Multiple Vercel deployments
- **Database**: PostgreSQL read replicas
- **AI Services**: Google Cloud quotas and rate limits
- **Payment Processing**: Stripe's global infrastructure

---

## 🤝 **Contributing**

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📞 **Support**

- **Documentation**: [docs.vulu.ai](https://docs.vulu.ai)
- **Support Email**: support@vulu.ai
- **Discord**: [discord.gg/vulu-ai](https://discord.gg/vulu-ai)

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🎉 **Success Story**

*"Started as a personal Jarvis assistant, transformed into a profitable SaaS platform serving thousands of users worldwide."*

**Ready to launch your AI empire?** 🚀

---

**Made with ❤️ by the Vulu.ai team**
