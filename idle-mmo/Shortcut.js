// ==UserScript==
// @name         Idle MMO Shortcut
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  页面跳转快捷键
// @author       Jaord Sun
// @match        https://web.idle-mmo.com/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  document.addEventListener("keydown", function (e) {
    if (e.altKey) {
      switch (e.key.toLowerCase()) {
        case "c":
          console.log("按下了Alt+C");
          clickCharacterLink();
          break;
        case "b":
          console.log("按下了Alt+B");
          clickBattleLink();
          break;
        case "i":
          console.log("按下了Alt+I");
          clickInventoryLink();
          break;
        case "w":
          console.log("按下了Alt+W");
          clickWoodcuttingLink();
          break;
        case "m":
          console.log("按下了Alt+M");
          clickMiningLink();
          break;
        case "h":
          console.log("按下了Alt+H");
          clickFishingLink();
          break;
        case "a":
          console.log("按下了Alt+A");
          clickAlchemyLink();
          break;
        case "s":
          console.log("按下了Alt+S");
          clickSmeltingLink();
          break;
        case "k":
          console.log("按下了Alt+K");
          clickCookingLink();
          break;
        case "g":
          console.log("按下了Alt+G");
          clickForgeLink();
          break;
        case "r":
          console.log("按下了Alt+R");
          clickMarketLink();
          break;
        case "v":
          console.log("按下了Alt+V");
          clickVendorLink();
          break;
        case "p":
          console.log("按下了Alt+P");
          clickPetsLink();
          break;
      }
    }
  });

  function clickCharacterLink() {
    const characterLink = document.querySelector(
      'a[href="https://web.idle-mmo.com/profile"]'
    );
    if (characterLink) {
      console.log("点击Character链接");
      characterLink.click();
    } else {
      console.log("Character链接不存在");
    }
  }

  function clickBattleLink() {
    const battleLink = document.querySelector(
      'a[href="https://web.idle-mmo.com/battle"]'
    );
    if (battleLink) {
      console.log("点击Battle链接");
      battleLink.click();
    } else {
      console.log("Battle链接不存在");
    }
  }

  function clickInventoryLink() {
    const inventoryLink = document.querySelector(
      'a[href="https://web.idle-mmo.com/inventory"]'
    );
    if (inventoryLink) {
      console.log("点击Inventory链接");
      inventoryLink.click();
    } else {
      console.log("Inventory链接不存在");
    }
  }

  function clickWoodcuttingLink() {
    const woodcuttingLink = document.querySelector(
      'a[href="https://web.idle-mmo.com/skills/view/woodcutting"]'
    );
    if (woodcuttingLink) {
      console.log("点击Woodcutting链接");
      woodcuttingLink.click();
    } else {
      console.log("Woodcutting链接不存在");
    }
  }
  function clickMiningLink() {
    const miningLink = document.querySelector(
      'a[href="https://web.idle-mmo.com/skills/view/mining"]'
    );
    if (miningLink) {
      console.log("点击Mining链接");
      miningLink.click();
    } else {
      console.log("Mining链接不存在");
    }
  }

  function clickFishingLink() {
    const fishingLink = document.querySelector(
      'a[href="https://web.idle-mmo.com/skills/view/fishing"]'
    );
    if (fishingLink) {
      console.log("点击Fishing链接");
      fishingLink.click();
    } else {
      console.log("Fishing链接不存在");
    }
  }

  function clickAlchemyLink() {
    const alchemyLink = document.querySelector(
      'a[href="https://web.idle-mmo.com/skills/view/alchemy"]'
    );
    if (alchemyLink) {
      console.log("点击Alchemy链接");
      alchemyLink.click();
    } else {
      console.log("Alchemy链接不存在");
    }
  }

  function clickSmeltingLink() {
    const smeltingLink = document.querySelector(
      'a[href="https://web.idle-mmo.com/skills/view/smelting"]'
    );
    if (smeltingLink) {
      console.log("点击Smelting链接");
      smeltingLink.click();
    } else {
      console.log("Smelting链接不存在");
    }
  }

  function clickCookingLink() {
    const cookingLink = document.querySelector(
      'a[href="https://web.idle-mmo.com/skills/view/cooking"]'
    );
    if (cookingLink) {
      console.log("点击Cooking链接");
      cookingLink.click();
    } else {
      console.log("Cooking链接不存在");
    }
  }

  function clickForgeLink() {
    const forgeLink = document.querySelector(
      'a[href="https://web.idle-mmo.com/skills/view/forge"]'
    );
    if (forgeLink) {
      console.log("点击Forge链接");
      forgeLink.click();
    } else {
      console.log("Forge链接不存在");
    }
  }

  function clickMarketLink() {
    const marketLink = document.querySelector(
      'a[href="https://web.idle-mmo.com/market/listings"]'
    );
    if (marketLink) {
      console.log("点击Market链接");
      marketLink.click();
    } else {
      console.log("Market链接不存在");
    }
  }

  function clickVendorLink() {
    const vendorLink = document.querySelector(
      'a[href="https://web.idle-mmo.com/vendor/shop"]'
    );
    if (vendorLink) {
      console.log("点击Vendor链接");
      vendorLink.click();
    } else {
      console.log("Vendor链接不存在");
    }
  }

  function clickPetsLink() {
    const petsLink = document.querySelector(
      'a[href="https://web.idle-mmo.com/pets"]'
    );
    if (petsLink) {
      console.log("点击Pets链接");
      petsLink.click();
    } else {
      console.log("Pets链接不存在");
    }
  }
})();
