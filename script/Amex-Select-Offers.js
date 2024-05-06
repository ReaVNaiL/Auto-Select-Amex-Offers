// ==UserScript==
// @name         Amex Click Offers
// @namespace    http://tampermonkey.net/
// @version      2024-03-29
// @description  Clicks on available Amex offers automatically and marks them as done. Adds a button to the page layout to initiate the process.
// @author       ReaVNaiL
// @match        https://global.americanexpress.com/offers/eligible
// @icon         https://www.google.com/s2/favicons?sz=64&domain=americanexpress.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  const button = document.createElement("button");

  function handleMouseOver() {
    button.classList.remove("dls-deep-blue-bg");
    button.classList.add("dls-light-blue-bg");
  }

  function handleMouseOut() {
    button.classList.remove("dls-light-blue-bg");
    button.classList.add("dls-deep-blue-bg");
  }

  function disableButton() {
    button.removeEventListener("mouseover", handleMouseOver);
    button.removeEventListener("mouseout", handleMouseOut);

    button.textContent = "Done";
    button.disabled = true;
    button.classList.remove(
      "dls-deep-blue-bg",
      "dls-light-blue-bg",
      "dls-white"
    );
    button.classList.add("dls-bright-blue", "dls-gray-01-bg");
    button.style.filter = "grayscale(50%)";
    button.style.width = "100px";
  }

  function inProgressButton() {
    button.removeEventListener("mouseover", handleMouseOver);
    button.removeEventListener("mouseout", handleMouseOut);

    button.textContent = "In Progress";
    button.disabled = true;
  }

  function clickAmexOffers() {
    const WAIT_TIME_MS = 2500;
    console.log("Set wait time to " + WAIT_TIME_MS + "ms");

    const offerButtons = document.querySelectorAll('[data-rowtype="offer"]');

    if (offerButtons.length === 0) {
      console.log("No offers found!");
      return;
    }

    console.log(`Found ${offerButtons.length} possible offers!`);
    console.log("Selecting offers...");

    const offerInfoClass = ".offer-info";
    const headingClass = ".heading-2";
    const descriptionClass = ".body-1";
    const addToCardButtonClass =
      "div.axp-offers__global__mobileWidth100___3A2Jn button.offer-cta";

    for (let i = 0; i < offerButtons.length; ++i) {
      try {
        const offerButton = offerButtons[i];

        const addToCardButton = offerButton.querySelector(addToCardButtonClass);
        if (!addToCardButton) {
          //   console.log("Button not found, skipping...");
          continue;
        }

        const addToCardButtonText =
          addToCardButton.querySelector("span").textContent;
        const offerName = offerButton.querySelector(
          offerInfoClass + " " + headingClass
        ).textContent;
        const offerDescription = offerButton.querySelector(
          offerInfoClass + " " + descriptionClass
        ).textContent;

        if (addToCardButtonText === "Add to Card") {
          console.log(
            `Clicking "${offerName}" offer for "${offerDescription}"`
          );
          setTimeout(() => {
            addToCardButton.click();
            console.log(`Clicked "${offerName}" offer!`);
          }, i * WAIT_TIME_MS);
        } else {
          console.log(`Button for offer ${i} is not Add to Card, skipping...`);
        }
      } catch (e) {
        console.error(e);
      }
    }

    if (offerButtons.length == i) {
        disableButton();
        console.log("Done selecting offers!");
    } else {
        inProgressButton();
    }
  }

  function createAndInsertButton() {
    button.classList.add(
      "axp-offers__filter__filter___3yO4Q",
      "border",
      "label-1",
      "gray-2",
      "outline",
      "margin-2-r",
      "dls-deep-blue-bg",
      "dls-white"
    );
    button.style.transition = "background-color 0.3s";
    button.setAttribute("type", "button");
    button.setAttribute("aria-pressed", "true");
    button.style.marginLeft = "10px";
    button.addEventListener("click", clickAmexOffers);

    const buttonContent = document.createElement("span");
    buttonContent.textContent = "Select Offers";
    buttonContent.classList.add("pad-1");
    button.appendChild(buttonContent);

    button.addEventListener("mouseover", handleMouseOver);
    button.addEventListener("mouseout", handleMouseOut);

    const mapAnchor = document.querySelector("#map-anchor");
    if (mapAnchor) {
      const mapAnchorParent = mapAnchor.parentNode;
      mapAnchorParent.insertBefore(button, mapAnchorParent.firstChild);
    } else {
      console.error("Anchor tag with ID 'map-anchor' not found!");
    }
  }

  function waitForMapAnchor() {
    if (document.getElementById("map-anchor")) {
      createAndInsertButton();
    } else {
      setTimeout(waitForMapAnchor, 500);
    }
  }

  waitForMapAnchor();
})();