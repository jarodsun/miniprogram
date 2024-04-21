// ==UserScript==
// @name         Idle MMO Automation
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  在Battle页面，自动点击Start Hunt按钮和Battle Max按钮。
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
})();
