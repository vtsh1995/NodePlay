const {connect, close} = require('./mongoose.setup')
const puppeteer = require('puppeteer')
let browser , page


beforeAll(async ()=>{
    await connect();
   browser = await puppeteer.launch({
        headless: true
    })
    page = await browser.newPage()
    await page.goto('http://localhost:2000')
    global.browser = browser;
    global.page = page
})

afterAll(async()=>{
    await close();
    await browser.close();
})
