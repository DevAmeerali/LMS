const Stripe = require('stripe');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

exports.createCheckoutSession = async (req, res) => {
  try {
    const { courseId } = req.body;

    // Ensure user is authenticated
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized. User not logged in." });
    }
    const userId = req.user.id;

    // Validate input
    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required." });
    }

    // Fetch course and instructor
    const course = await Course.findById(courseId).populate('instructor');
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    const instructor = course.instructor;
    if (!instructor || !instructor.stripeAccountId) {
      return res.status(400).json({ message: "Instructor has not connected their Stripe account." });
    }

    // Validate course price
    const priceInCents = Math.round(course.price * 100);
    if (!priceInCents || isNaN(priceInCents)) {
      return res.status(400).json({ message: "Invalid course price." });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: course.title,
            },
            unit_amount: course.price * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      payment_intent_data: {
        application_fee_amount: Math.round(priceInCents * 0.10),
        transfer_data: {
          destination: instructor.stripeAccountId,
        },
      },
      success_url: `${process.env.CLIENT_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/payment-cancelled`,
      metadata: {
        courseId: course._id.toString(),
        buyerId: userId.toString(),
        instructorId: instructor._id.toString(),
      },
    });

    return res.json({ id: session.id });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    return res.status(500).json({ message: "Something went wrong. Please try again.", error: error.message });
  }
};

exports.verifyCheckoutSession = async (req, res) => {
  const { sessionId } = req.body;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      const { courseId, buyerId } = session.metadata;

      // Check if already enrolled
      const existing = await Enrollment.findOne({ student: buyerId, course: courseId });
      if (existing) {
        return res.status(200).json({ success: true, message: 'Already enrolled.' });
      }

      // Create enrollment
      await Enrollment.create({ student: buyerId, course: courseId });
      return res.status(200).json({ success: true, message: 'Enrollment successful!' });
    }

    return res.status(400).json({ success: false, message: 'Payment not completed.' });
  } catch (err) {
    console.error("Verify session error:", err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};
