const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/courses");
const enrollmentRoutes = require("./routes/enrollment");
const userRoutes = require("./routes/user");
const notificationRoutes = require("./routes/notifications")
const progressRoutes = require("./routes/progress");
const certificateRoutes = require("./routes/certificates")
const paymentRoutes = require('./routes/paymentRoutes');
const stripeRoutes = require('./routes/stripe');
const aiRoutes = require('./routes/ai');
const connectDB = require('./config/db');
require("dotenv").config();

connectDB()

const app = express();

app.use('/uploads', express.static('uploads'));
app.use(express.static('public'))
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/user", userRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/certificates", certificateRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api', aiRoutes);


app.listen(process.env.PORT, () => {
    console.log(`Server running on port 5000`);
});