// ==UserScript==
// @name         Idle MMO Hunt
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  打怪快捷操作
// @author       Jaord Sun
// @match        https://web.idle-mmo.com/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const monsterMap = {
    "BbFrAHBkgPgeIoH3CYPBgftF9xVAsZ-metacmFiYml0LnBuZw==-": "Rabbit",
    "twGfp1Ijkvy2RoDyfxI4pNQV22S9OM-metaZHVjay5wbmc=-": "Duck",
    "g1C5bzqltirL8kOyRh0YivzykocuS5-metaZ29ibGluLnBuZw==-": "Goblin",
    "MJyIgbYBnhEGoUIROnsjVpyrXqAn5N-metaa2luZyBnb2JsaW4ucG5n-": "Goblin King",
    "slGUwMeiU4U6cvDSxAXLxMHKt1qCXb-metaaXNhZG9yYS5wbmc=-": "BOSS : Isadora",
    "iR395gp1qTHRoLAGJQ7gbtFaewpgue-metad2l6YXJkLnBuZw==-": "Cultist",
    "s6U8V5YpxRaaEDyQRzXT50r1jzo6IQ-metaYm9hci5wbmc=-": "Boar",
    "nPkp0ZRC5w1geeiPrSErVF9XzNHtK1-metaZGVlci5wbmc=-": "Deer",
    "yQeoiiEKR3Pz5gELIENMMTUaNtQKi4-metaZ2VuaWUucG5n-": "Djinn",
    "qcvqFhkILdQw7KERMGuSbYwwKw9UO5-metaZ29yZ29uLnBuZw==-": "Gorgon",
    "hYWjCxJenGKwSf8yQnlRBqnWv9XxWf-metabWFsZ2F6YXIucG5n-": "BOSS : Malgazar",
    "wpwz5FQLd6zUlqcdrjb3n4IkqxyJjT-metac2tlbGV0b24ucG5n-": "Skeleton Warrior",
    "Zx8R3Xy0k8yV04SmReHDfCMamGXJ0T-metaYnVmZmFsby5wbmc=-": "Buffalo",
    "E2NtgabSRR5dN7u0skGQbfYSIE4nGS-metad3JhaXRoIG5ldy5wbmc=-": "Spectre",
    "b5gPdhGIxCJbeQEqQZly8waX98EYtN-metac2xpbWUgKHJlcGxhY2UgdGhlIG9sZCBvbmUpLnBuZw==-":
      "Slimeball",
    "AYzG7bQA2PryP8KC8Ayywi2d2284uY-metab2JzaWRpYW51cy5wbmc=-":
      "BOSS : Obsidianus",
    "0tPQgRb3d7O1hd5vV2zWDG9h283sSW-metacGlyYXRlLnBuZw==-": "Pirate",
    "vjbKfYYvK5rzBDN9bWCRZlFrgFMOtd-metab3JnZS5wbmc=-": "Ogre",
    "y5a9vDL55uqi64fhNCFR7Cd5Dqx4pq-metaem9tYmllIChyZXBsYWNlIHRoZSBvbGQgb25lIGNvbXBsZXRlbHkpLnBuZw==-":
      "Zombie",
    "F7ZGrBIQoYKvsDZuZjZIStEqoM5Flo-metaZWxlcGhhbnQucG5n-": "Elephant",
    "UjVdU3rHDGLivlXSym2tnFq3q7Q1zf-metac2lyZW4ucG5n-": "Siren",
    "uRelsuUwFtCbTCzhHBwJFJUS36ahLn-metaYmVhc3QgKHJlcGxhY2UgdGhlIG9sZCBvbmUpLnBuZw==-":
      "Shadow Beast",
    "VYjiuEvsxGQ2yLtVxJIYCNSPzgeHhQ-metaZWxrLnBuZw==-": "Elk",
    "IBzH3zhbJJOZwXGzJnBVbVPzPsOvde-metac2hhZG93bWlyZS5wbmc=-":
      "BOSS : Shadowmire",
  };

  let monsters = []; // Define monsters array in the global scope

  window.addEventListener("load", function () {
    const panel = document.createElement("div");
    panel.id = "monster-panel";
    panel.style.cssText =
      "position: fixed; top: 10px; right: 10px; background-color: rgba(0, 0, 0, 0.8); color: white; padding: 10px; border-radius: 5px; z-index: 1000; width: 200px;";
    panel.innerHTML = `<h3>Monsters</h3><ul id="monster-list"></ul><input type="text" id="monster-input" placeholder="Enter number" style="color: black;"><button onclick="chooseMonster()">Go</button><button onclick="closePanel()">Close</button>`;

    document.body.appendChild(panel);

    document.addEventListener("keydown", function (e) {
      if (
        document.activeElement.tagName === "INPUT" ||
        document.activeElement.tagName === "TEXTAREA"
      ) {
        return; // 如果焦点在输入框或文本区域，不执行快捷键操作
      }

      if (e.altKey && e.key.toLowerCase() === "q") {
        if (panel.style.display === "none") {
          panel.style.display = "block"; // 显示面板
          listAndChooseMonster();
          document.getElementById("monster-input").focus(); // 自动聚焦到输入框
        } else {
          panel.style.display = "none"; // 隐藏面板
        }
      }
    });

    window.chooseMonster = function () {
      const input = document.getElementById("monster-input");
      const index = parseInt(input.value, 10);
      if (index > 0 && index <= monsters.length) {
        monsters[index - 1].button.click();
        console.log(`Clicked monster ${monsters[index - 1].monsterName}`);
        panel.style.display = "none"; // 成功后隐藏面板
        input.value = ""; // 清空输入框
      } else {
        console.log("Invalid monster number");
        input.value = ""; // 如果输入无效也清空输入框
      }
    };

    document
      .getElementById("monster-input")
      .addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          window.chooseMonster();
        }
      });

    window.closePanel = function () {
      panel.style.display = "none";
    };

    function listAndChooseMonster() {
      const monsterButtons = document.querySelectorAll(
        'button[x-on\\:click*="open-modal"]'
      );
      const monsterList = document.getElementById("monster-list");
      monsterList.innerHTML = ""; // 清空之前的列表
      monsters = []; // 清空之前的怪物数组
      let index = 1; // 开始序号从1开始
      monsterButtons.forEach((button) => {
        const imgElement = button.querySelector("img");
        if (imgElement && imgElement.src) {
          const imageUrl = imgElement.src;
          const imageName = imageUrl.split("/").pop();
          const monsterName = Object.keys(monsterMap).find((key) =>
            imageName.includes(key)
          );
          if (monsterName) {
            const listItem = document.createElement("li");
            listItem.textContent = `${index}: ${monsterMap[monsterName]}`; // 使用index显示序号
            monsterList.appendChild(listItem);
            monsters.push({ button, monsterName: monsterMap[monsterName] }); // 添加到怪物数组
            index++; // 增加序号
          }
        }
      });
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.altKey && e.key.toLowerCase() === "t") {
      clickHuntAgentButton(); // 切换菜单显示
    }
  });

  function clickHuntAgentButton() {
    const buttons = Array.from(document.querySelectorAll("button"));
    const startHuntAgentButton = buttons.find((btn) =>
      btn.textContent.includes("Hunt Again")
    );
    if (startHuntAgentButton) {
      // console.log("点击Hunt Again按钮");
      startHuntAgentButton.click();
    } else {
      // console.log("Hunt Again按钮不存在");
    }
  }

  document.addEventListener("keydown", function (e) {
    if (e.altKey && e.key.toLowerCase() === "l") {
      clickBattleButton(); // 切换菜单显示
    }
  });

  function clickBattleButton() {
    const battleButton = document.querySelector(
      'div.text-center button[type="submit"]'
    );
    if (battleButton) {
      console.log("点击Battle按钮");
      battleButton.click();
    } else {
      console.log("Battle按钮不存在");
    }
  }

  document.addEventListener("keydown", function (e) {
    if (e.altKey && e.key.toLowerCase() === "c") {
      clickBattleButton(); // 切换菜单显示
    }
  });

  function clickCampaignLink() {
    const characterLink = document.querySelector(
      'a[href="https://web.idle-mmo.com/campaign"]'
    );
    if (characterLink) {
      // console.log("点击Character链接");
      characterLink.click();
    } else {
      // console.log("Character链接不存在");
    }
  }
})();
