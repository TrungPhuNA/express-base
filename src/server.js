const express = require('express');
const connectDB = require('./config/db');
const swaggerSetup = require('./config/swagger');
require('dotenv').config(); // Load environment variables
const cors = require('cors');
const puppeteer = require("puppeteer"); // Thêm dòng này
const axios = require('axios');
const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(cors()); // Thêm dòng này

// Define Routes
app.use('/api', require('./routes'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/appointments', require('./routes/appointment'));
app.use('/api/notifications', require('./routes/notification'));
app.use('/api/orders', require('./routes/order'));

// Setup Swagger
swaggerSetup(app);


// API để cào dữ liệu từ petstation.vn và gửi đến API đích
app.get('/scrape', async (req, res) => {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.goto('https://www.petstation.vn/thuc-an-hat', { waitUntil: 'networkidle2' });

        const products = await page.evaluate(() => {
            const productElements = document.querySelectorAll('.w_product .item_sp');
            const productData = [];

            productElements.forEach(product => {
                const nameElement = product.querySelector('h2 a.ten');
                const priceElement = product.querySelector('.gia .giaban');
                const imgElement = product.querySelector('.img img');

                const priceText = priceElement ? priceElement.innerText.replace('vnđ', '').trim() : null;
                const price = priceText ? parseInt(priceText.replace(/\./g, ''), 10) : null;

                productData.push({
                    name: nameElement ? nameElement.innerText.trim() : null,
                    price: price,
                    avatar: imgElement ? 'https://petstation.vn/' + imgElement.getAttribute('data-src') : null,
                    // url: nameElement ? nameElement.getAttribute('href') : null,
                    category : '66d57cd9a3d6c6ab7173a302',
                    content : 'Đang cập nhật'
                });
            });

            return productData;
        });

        // Gửi dữ liệu đến API
        for (const product of products) {
            try {
                let item = {
                    name: product.name,
                    price: product.price,
                    avatar: product.avatar,
                    content: product.content,
                    category: product.category
                }
                console.info("===========[] ===========[item] : ",item);
                const response = await axios.post('http://localhost:3014/api/admin/products/scrape', item);
                console.log(`Product ${product.name} uploaded successfully:`, response.data);
            } catch (error) {
                console.error(`Failed to save product ${product.name}:`, error.message);
            }
        }

        await browser.close();
        res.json({ status: 'success', message: 'Data scraped and sent to API successfully' });
    } catch (error) {
        console.error('Error during scraping:', error);
        res.status(500).json({ status: 'error', message: 'Scraping failed', error: error.message });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
