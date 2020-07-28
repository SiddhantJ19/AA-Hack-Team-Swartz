const puppeteer = require('puppeteer');

const mockControllerRegister = async (req, res) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://finvu.in/webview/onboarding/webview-register', {waitUntil: 'load'});
    console.log(page.url());


    await page.type('input[formControlName=aaId]', "");
    await page.type('input[formControlName=mobile]', "");
    await page.type('input[formControlName=password]', "");
    await page.type('input[formControlName=confirmPassowwrd]', "");
    await page.type('input[formControlName=aaId]', "");  // check box for accept terms and conditions

    await page.keyboard.press('Enter');
    await page.waitForNavigation();

    console.log('New Page URL:', page.url());

    browser.close();
    return res.status(200)

};

const mockControllerLogin = async (req, res) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    console.log("yahan tak aaye hain")
    await page.goto('https://finvu.in/webview/onboarding/webview-login', {waitUntil: 'load', timeout: 0});
    console.log("page url is ", page.url());

    await page.waitForSelector('input[formcontrolname="username"]', {timeout: 0});
    await page.type('input[formcontrolname="username"]', 'swartz',{delay: 5});
    await page.type('input[formcontrolname="password"]', '1234');

    await page.keyboard.press('Enter');
    await page.waitForNavigation();

    console.log('New Page URL:', page.url());

    return res.status(200)

};

module.exports = {mockControllerRegister, mockControllerLogin};

