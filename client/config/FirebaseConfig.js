require('dotenv').config();

export default {
    firebaseConfig: {
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGING_SENDER_ID,
        appId: process.env.APP_ID,
    },
};


// const express = require("express");
// const router = express.Router();
// const Post = require("../models/Post");
// const User = require("../models/User");

// import { initializeApp } from "firebase/app";
// import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
// import multer from "multer";
// import config from "../config/FirebaseConfig";

// // Initialize a firebase application
// initializeApp(config.firebaseConfig);

// // Initialize Cloud Storage and get a reference to the service
// const storage = getStorage();

// // Setting up multer as middleware to grab photo uploads
// const upload = multer({ storage: multer.memoryStorage() });

// router.post("/", upload.single("filename"), async (req, res) => {
//     try {
//         const dateTime = giveCurrentDateTime();

//         const storageRef = ref(storage, `files/${req.file.originalname + "       " + dateTime}`);

//         // Create file metadata including the content type
//         const metadata = { contentType: req.file.mimetype };

//         // Upload the file in the bucket storage
//         const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

//         // Grab the public URL
//         const downloadURL = await getDownloadURL(snapshot.ref);

//         console.log('File successfully uploaded.');

//         // Get user details based on userID (assuming userID is sent in the request)
//         const user = await User.findById(req.body.userID);

//         if (!user) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         const { title, content, categories, tags } = req.body;

//         // Create a new post
//         const newPost = new Post({
//             title,
//             content,
//             img: downloadURL,
//             userID: user._id,
//             categories,
//             tags
//         });

//         const savedPost = await newPost.save();

//         res.status(201).json(savedPost);
//     } catch (error) {
//         console.log("Error creating a new post:", error);
//         res.status(500).json({ error: "Internal server error" });
//     }
// });

// const giveCurrentDateTime = () => {
//     const today = new Date();
//     const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
//     const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//     const dateTime = date + ' ' + time;
//     return dateTime;
// }

// module.exports = router;