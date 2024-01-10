const { Builder, By, Key, until, Select } = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');

const fetch = require('node-fetch');

const botToken = 'xxx';
const chatId = 'xxxx';

const message = 'YOUR MOVIE TICKET BOOKING IS NOW OPEN!!! GO BOOK ASAP';

const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${message}`;

const fs = require('fs'); 

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function automateWebsite() {

  const firefoxOptions = new firefox.Options();
 //firefoxOptions.headless(); // Run Firefox in headless mode


const driver = new Builder()
  .forBrowser('firefox')
  .setFirefoxOptions(firefoxOptions)
  .build();

  for (i = 0; i<999999; i++) {
  try {

    await driver.get('https://carnivalcinemas.sg/#/');

  
    const modalBackdrop = await driver.findElement(By.css('.modal-backdrop.fade.in'));
    await driver.executeScript("arguments[0].remove();", modalBackdrop);

    await(1000)
    const popupElement = await driver.findElement(By.id('HomeModalPopup'));
    if (popupElement) {
      await driver.executeScript('arguments[0].style.display = "none";', popupElement);
    }

    //Select movie details
    var element = await driver.findElement(By.css('a[ng-click="openMovieToggle()"]'));
    await element.click();
    
    element = await driver.findElement(By.xpath("//a[text()='Leo(NC16)']"));
    await element.click();

    element = await driver.findElement(By.css('a[ng-click="openCinemaToggle()"]'));
    await element.click();
    
    element = await driver.findElement(By.xpath("//a[text()='Carnival Cinema Golden Mile Tower']"));
    await element.click();

    element = await driver.findElement(By.css('a[ng-click="openShowDateToggle()"]'));

    await element.click();
    
    element = await driver.findElement(By.xpath("//a[text()='TUE 31 OCT']"));
    await element.click();

    element = await driver.findElement(By.css('a[ng-click="openShowTimeToggle()"]'));

    await element.click();
   
      element = driver.findElement(By.xpath('//a[text()="07:30 PM"]'));
      await element.click();
      console.log('Clicked on element.');
    
//Send telegram message
  fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error('Error sending Telegram message:', error);
  });

    element = await driver.findElement(By.css('a[ng-click="openNoOfSeatsToggle()"]'));

    await element.click();
    
    element = await driver.findElement(By.xpath("//a[text()='6']"));
    await element.click();

    const submitButton = await driver.findElement(By.id('btnBookNow'));
    await submitButton.click();

    await(1000);
    
    element = await driver.wait(
      until.elementLocated(By.css('input[ng-model="checkcnd"]')),
      10000 
    );
    await driver.executeScript('arguments[0].click();', element)
    
    const okButton = driver.findElement(By.css('button[ng-click="checkpopcondition(\'NC16\')"]'));
    await driver.wait(until.elementIsVisible(okButton), 1000);
    await okButton.click();

    const inputElement = await driver.wait(
      until.elementLocated(By.id('SelectSeatCheckBoxGroup0000000003J17')),
      10000 
    );


    // Click the input element
    await driver.executeScript('arguments[0].click();', inputElement);
    
    const loaderElement = await driver.findElement(By.css('.loader-bg'));

    // If the loader element is present, click it to close
    if (loaderElement) {
      await loaderElement.click();
    }

    const selectOptionDropdown = await driver.findElement(By.id('selectoption'));

    // Click the "selectoption" dropdown to open it
    await selectOptionDropdown.click();


    // Find the "PLATINUM" option and click it
    const platinumOption = await driver.findElement(By.xpath('//option[contains(text(),"PLATINUM")]'));
    await platinumOption.click();

    const proceedButton = await driver.wait(until.elementIsVisible(driver.findElement(By.id('btnProceddBooking'))));

    // Click the "Proceed" button to activate the ng-click event
    await proceedButton.click();

    console.log("you have 10 mins left");

  
  } catch (error) {

    //If not found/error, refresh the page
    await driver.navigate().refresh();
      continue;

  }finally {
    // Close the browser window
    //await driver.get('https://carnivalcinemas.sg/#/');
  }
  
  }

  //await driver.quit();
}



automateWebsite();
