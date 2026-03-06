if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const Booking = require("./models/booking.js");
const Listing = require("./models/listing.js");
const { isLoggedIn, isOwner } = require("./middleware.js");

const listingRouter = require("./routes/listings.js");
const reviewRouter = require("./routes/reviews.js");
const userRouter = require("./routes/users.js");
const MongoStore = require("connect-mongo");

const MONGO_URL = process.env.ATLASDB_URL || process.env.DB_URL || "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const store = MongoStore.create({
    mongoUrl: MONGO_URL,
    crypto: {
        secret: process.env.SECRET || "mysupersecretcode",
    },
    touchAfter: 24 * 3600,
});

store.on("error", (err) => {
    console.log("ERROR in MONGO SESSION STORE", err);
});

const sessionOptions = {
    store,
    secret: process.env.SECRET || "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);
// Bookings
// Create Booking Route
app.post("/listings/:id/bookings", async (req, res) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "You must be logged in to book a listing!");
        return res.redirect("/login");
    }
    let { id } = req.params;
    let listing = await Listing.findById(id);
    let { checkIn, checkOut, guests } = req.body.booking;

    const date1 = new Date(checkIn);
    const date2 = new Date(checkOut);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    let totalPrice = diffDays * listing.price;

    let newBooking = new Booking({
        listing: id,
        user: req.user._id,
        checkIn,
        checkOut,
        guests,
        totalPrice
    });

    await newBooking.save();
    req.flash("success", "Booking Successful!");
    res.redirect("/bookings");
});

// User Bookings Route
app.get("/bookings", async (req, res) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "You must be logged in to view your bookings!");
        return res.redirect("/login");
    }
    const allBookings = await Booking.find({ user: req.user._id }).populate("listing");
    res.render("bookings/index.ejs", { allBookings });
});

app.get("/", (req, res) => {
    res.send("Hi, I am root");
});

app.get("/debug-session", (req, res) => {
    res.json({
        sessionID: req.sessionID,
        session: req.session,
        user: req.user
    });
});

app.all(/(.*)/, (req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render("error.ejs", { err });
});

if (process.env.NODE_ENV !== "production") {
    app.listen(8080, () => {
        console.log("server is listening to port 8080");
    });
}

module.exports = app;
