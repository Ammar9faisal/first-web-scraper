import puppeteer from "puppeteer";


async function delay(time) {
    await new Promise(resolve => setTimeout(resolve, time));}   //await delay promise

async function getProductData() {
    let browser;
    
   try {
    //Initites browser login
    browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://schedulebuilder.yorku.ca/vsb/getclassdata.jsp?term=2024102119&course_0_0=LE-EECS-1021-3.00-EN-&t=984&e=46&nouser=1&_=${Date.now()}`);

    //Enters YorkU lgoin Details
    await page.waitForSelector('.footer')
    await page.type("#mli", username);   //Replace your username here or declare in another file
    await page.type('#password', password);  //Replace password here or declare in another file
    await page.click("input[type=submit]");
    await page.waitForNavigation(); 

    //Checks if authentication successfull
    if (page.url().startsWith('https://api-8878c827.duosecurity.com')) {
        console.log('Reached Authentication Page ✅')
    }
    else {
        console.log('Login Information Invalid ❌')
    }

    await delay(5000);
    console.log("Authentication Sent")
    await delay(10000);
    await page.click('button')
    await delay(15000)
    console.log("Page Loaded")
    console.log(page.url())
    

} catch (error) {
    console.log(error);
}   finally {
    await browser?.close();
 }
}
getProductData();