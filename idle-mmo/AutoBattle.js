// ==UserScript==
// @name         Idle MMO Automation with Timed Clicks
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  在Battle页面，自动点击Start Hunt按钮和Battle Max按钮。添加了部分页面的快捷键。
// @author       Jaord Sun
// @match        https://web.idle-mmo.com/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  let lastHuntTime = 0;
  let lastBattleTime = 0;

  function clickButton() {
    const buttons = Array.from(document.querySelectorAll("button"));
    const startHuntButton = buttons.find((btn) =>
      btn.textContent.includes("Start Hunt")
    );
    const battleMaxButton = buttons.find((btn) =>
      btn.textContent.includes("Battle Max")
    );

    const currentTime = Date.now();

    if (
      startHuntButton &&
      !startHuntButton.disabled &&
      currentTime - lastHuntTime > 60000
    ) {
      console.log("Clicking Start Hunt button.");
      startHuntButton.click();
      lastHuntTime = currentTime; // Update last hunt time
    } else if (
      battleMaxButton &&
      !battleMaxButton.disabled &&
      currentTime - lastBattleTime > 30000
    ) {
      console.log("Clicking Battle Max button.");
      battleMaxButton.click();
      lastBattleTime = currentTime; // Update last battle time
    } else {
      console.log(
        "No actionable buttons available or waiting for next available time."
      );
    }
  }

  setInterval(clickButton, 30000); // Check buttons every second

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
