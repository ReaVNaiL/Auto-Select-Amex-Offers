# Amex Auto Click Offers

![Amex Click Offers](https://www.americanexpress.com/en-us/newsroom/articles/financial-news/2023-chairman-s-letter/_jcr_content/root/responsivegrid/container/image.coreimg.jpeg/1710511517708/chairmansletter2024-banner-wavy-li.jpeg)

## Description

Automatically clicks on available Amex offers and marks them as done. Adds a button to the page layout to initiate the process.

## Installation

1. **Download Tampermonkey Extension:**
   - For Firefox: [Tampermonkey Firefox Add-on](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
   - For Chrome: [Tampermonkey Chrome Extension](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)

2. **Install Script:**
   - Once Tampermonkey is installed, click on its icon in the browser toolbar.
   - Click on "Create a new script".
   - Copy the script from [Amex-Select-Offers.js](script/Amex-Select-Offers.js) and paste it into the Tampermonkey editor.
   - Click on the save icon.

3. **Adjust Settings (Optional):**
   - You can tweak settings such as the delay time by modifying the `WAIT_TIME_MS` variable in the script.

4. **Reload Page:**
   - After installation, reload the American Express offers page to see the button.

## Known Issues

- The button only works for the first card in the Amex offers list site.
- You may need to reload the page to show the button.

## Usage

- Once the script is installed and the page is reloaded, a button labeled "Select Offers" will appear on the page layout.
- Click on the button to automatically select available Amex offers.
