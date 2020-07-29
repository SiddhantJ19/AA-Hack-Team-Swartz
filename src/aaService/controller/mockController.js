const puppeteer = require('puppeteer');

const mockControllerRegister = async (user) => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://finvu.in/webview/onboarding/webview-register', {waitUntil: 'load', timeout: 0});
    console.log(page.url());
    // console.log(await page.content()); // stringified snapshot of fom

    await page.waitForSelector('input[formcontrolname="aaId"]', {timeout : 0});
    await page.type('input[formcontrolname="aaId"]', user.aaId, {delay: 5});
    await page.type('input[formcontrolname="mobile"]', "8433460645"); // otp not accessible from user.phone
    await page.type('input[formcontrolname=password]', user.pin);
    await page.type('input[formcontrolname=reEnterPassword]', user.pin);

    await page.evaluate(() => { // checkbox for terms and conditions
        document.querySelector("input[formcontrolname=termCondition]").parentElement.click();
    }); 

    await page.keyboard.press('Enter');
    await page.waitForNavigation();

    console.log('New Page URL:', page.url());


    // process the next otp page before closing
    // browser.close();
    // return res.status(200)

};

const mockControllerLogin = async (req, res) => {
    const browser = await puppeteer.launch({headless: false});
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

