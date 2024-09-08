const express = require('express');
const puppeteer = require('puppeteer');
const axios = require('axios');


const TARGET_API_URL = 'http://localhost:3014/api/admin/products'; // URL API của bạn
const TOKEN = 'Bearer <your-token-here>'; // Thay bằng token của bạn


const cors = require('cors'); // Thêm dòng này

const app = express();
// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors()); // Thêm dòng này
