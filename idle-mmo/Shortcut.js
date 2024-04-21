// ==UserScript==
// @name         Idle MMO Shortcut
// @namespace    http://tampermonkey.net/
// @version      0.1
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
          case "w":
            console.log("按下了Alt+W");
            clickWoodcuttingLink();
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
  })();
  