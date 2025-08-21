require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const logger = require('./utils/logger');
const errorHandler = require('./middlewares/errorMiddleware');
const setupSwaggerDocs = require('./swagger/index');

// Import Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const addressRoutes = require('./routes/addressRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

// Swagger Documentation
setupSwaggerDocs(app);

// Middleware
// CORS setup for frontend connection
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173', // React dev URL
  credentials: true
}));

app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/products', productRoutes);

// ===== Serve Frontend in Production =====
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '..', 'frontend', 'build');
  app.use(express.static(frontendPath));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(frontendPath, 'index.html'));
  });
}

// Error middleware
app.use(errorHandler);

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');

    // Start server
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
  });