// ==UserScript==
// @name         Idle MMO Menu
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  游戏菜单和战斗菜单，使用通用函数创建菜单面板和项目信息。
// @author       Jaord Sun
// @match        https://web.idle-mmo.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let currentRow = 0;
    let currentCol = 0;
    let currentMonsterIndex = 0;
    let autoBattleInterval = null; // Add a variable to track the auto battle interval

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

    // 通用函数：创建菜单面板
    function createMenuPanel(id, title, items) {
        const menuPanel = document.createElement('div');
        menuPanel.id = id;
        menuPanel.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: rgba(0, 0, 0, 0.8); color: white; padding: 20px; border-radius: 10px; z-index: 1000; display: none;';
        
        let menuContent = `<h2>${title}</h2><div id="${id}-container" style="display: flex; flex-wrap: wrap; justify-content: space-around;">`;
        
        items.forEach((row, rowIndex) => {
            menuContent += `<ul id="${id}-items-row${rowIndex + 1}" style="margin-right: 20px;">`;
            row.forEach(item => {
                if (item.onclick) {
                    menuContent += `<li tabindex="0"><button onclick="${item.onclick}">${item.label}</button></li>`;
                } else {
                    menuContent += `<li tabindex="0"><button onclick="window.location.href='${item.href}'">${item.label}</button></li>`;
                }
            });
            menuContent += `</ul>`;
        });
        
        menuContent += `</div>`;
        menuPanel.innerHTML = menuContent;
        
        document.body.appendChild(menuPanel);
        
        return menuPanel;
    }

    // 创建游戏菜单
    const gameMenuItems = [
        [
            { label: 'Inventory', href: '/inventory' },
            { label: 'Character-Profile', href: '/profile' },
            { label: 'Campaign', href: '/campaign' },
            { label: 'Pets', href: '/pets' },
            { label: 'Inventory-Equipment', href: '/equipment' },
            { label: 'Inventory-Bank', href: '/bank' }
        ],
        [
            { label: 'Battle', href: '/battle' },
            { label: 'Vendor', href: '/vendor/shop' },
            { label: 'Market', href: '/market/listings' },
            { label: 'Market-Purchase', href: '/market/orders/all' },
            { label: 'Guilds', href: '/guilds' },
            { label: 'Friends', href: '/friends' }
        ],
        [
            { label: 'Woodcutting', href: '/skills/view/woodcutting' },
            { label: 'Mining', href: '/skills/view/mining' },
            { label: 'Fishing', href: '/skills/view/fishing' },
            { label: 'Alchemy', href: '/skills/view/alchemy' },
            { label: 'Smelting', href: '/skills/view/smelting' },
            { label: 'Cooking', href: '/skills/view/cooking' },
            { label: 'Forge', href: '/skills/view/forge' }
        ]
    ];
    const gameMenuPanel = createMenuPanel('game-menu-panel', 'Game Menu', gameMenuItems);

    // 创建战斗菜单
    const battleMenuItems = [
        [
            { label: 'Battle', href: '/battle' },
            { label: 'Auto Battle', onclick: 'toggleAutoBattle()' }, // Add onclick event for Auto Battle
            { label: 'Stop Auto Battle', onclick: 'stopAutoBattle()' } // Add onclick event for Stop Auto Battle
        ],
        [
            { label: 'Hunt', onclick: 'handleHunt()' },
            { label: 'Find Monster', onclick: 'showMonsterPanel()' }
        ]
    ];
    const battleMenuPanel = createMenuPanel('battle-menu-panel', 'Battle Menu', battleMenuItems);

    // 通用函数：切换菜单显示/隐藏
    function toggleMenu(id) {
        const menuPanel = document.getElementById(id);
        const isDisplayed = menuPanel.style.display === 'block';
        menuPanel.style.display = isDisplayed ? 'none' : 'block';
        if (!isDisplayed) {
            currentRow = 0;
            currentCol = 0;
            updateFocus(id); // Update focus when menu is shown
        }
    }

    // 通用函数：更新菜单项焦点
    function updateFocus(id) {
        const rows = document.querySelectorAll(`#${id}-container > ul`);

        // Remove focus from all items
        rows.forEach(row => {
            row.querySelectorAll('li').forEach(item => {
                item.classList.remove('focused');
            });
        });

        // Add focus to the current item
        const currentItem = rows[currentRow].children[currentCol];
        currentItem.classList.add('focused');
        currentItem.focus();
    }

    // 监听键盘事件
    document.addEventListener('keydown', function(e) {
        if (e.altKey && e.key.toLowerCase() === 'm') {
            toggleMenu('game-menu-panel'); // 切换游戏菜单显示
        } else if (e.altKey && e.key.toLowerCase() === 'b') {
            toggleMenu('battle-menu-panel'); // 切换战斗菜单显示
        } else if (document.getElementById('game-menu-panel').style.display === 'block') {
            handleMenuNavigation(e, 'game-menu-panel');
        } else if (document.getElementById('battle-menu-panel').style.display === 'block') {
            handleMenuNavigation(e, 'battle-menu-panel');
        } else if (document.getElementById('monster-panel').style.display === 'block') {
            handleMonsterNavigation(e);
        }
    });

    // 通用函数：处理菜单导航
    function handleMenuNavigation(e, id) {
        e.preventDefault(); // 阻止默认行为
        const rows = document.querySelectorAll(`#${id}-container > ul`);
        const numRows = rows.length;
        const numCols = rows[currentRow].children.length;

        switch (e.key) {
            case 'ArrowUp':
                currentCol = (currentCol - 1 + numCols) % numCols;
                break;
            case 'ArrowDown':
                currentCol = (currentCol + 1) % numCols;
                break;
            case 'ArrowLeft':
                currentRow = (currentRow - 1 + numRows) % numRows;
                break;
            case 'ArrowRight':
                currentRow = (currentRow + 1) % numRows;
                break;
            case 'Enter':
                rows[currentRow].children[currentCol].querySelector('button').click();
                return; // No need to update focus after clicking
            case 'Escape':
                toggleMenu(id); // Hide menu on Escape key
                return;
        }

        updateFocus(id);
    }

    // 处理怪物列表导航
    function handleMonsterNavigation(e) {
        e.preventDefault(); // 阻止默认行为
        const monsterListItems = document.querySelectorAll('#monster-list li');
        const numMonsters = monsterListItems.length;

        switch (e.key) {
            case 'ArrowUp':
                currentMonsterIndex = (currentMonsterIndex - 1 + numMonsters) % numMonsters;
                break;
            case 'ArrowDown':
                currentMonsterIndex = (currentMonsterIndex + 1) % numMonsters;
                break;
            case 'Enter':
                monsters[currentMonsterIndex].button.click();
                setTimeout(clickBattleButton, 100); // 等待100ms后点击Battle按钮
                return; // No need to update focus after clicking
            case 'Escape':
                closeMonsterPanel(); // Close monster panel on Escape key
                return;
        }

        updateMonsterFocus();
    }

    // 更新怪物列表项焦点
    function updateMonsterFocus() {
        const monsterListItems = document.querySelectorAll('#monster-list li');

        // Remove focus from all items
        monsterListItems.forEach(item => {
            item.classList.remove('focused');
        });

        // Add focus to the current item
        const currentItem = monsterListItems[currentMonsterIndex];
        currentItem.classList.add('focused');
        currentItem.focus();
        currentItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    window.handleHunt = function() {
        const buttons = Array.from(document.querySelectorAll("button"));
        const startHuntButton = buttons.find((btn) =>
            btn.textContent.includes("Start Hunt")
        );
        const startHuntAgentButton = buttons.find((btn) =>
            btn.textContent.includes("Hunt Again")
        );

        if (startHuntButton) {
            startHuntButton.click();
        } else if (startHuntAgentButton) {
            startHuntAgentButton.click();
        } else {
            console.error("No Hunt button found.");
        }
    }

    window.showMonsterPanel = function() {
        const panel = document.getElementById("monster-panel");
        const battleMenuPanel = document.getElementById("battle-menu-panel");
        if (panel.style.display === "none") {
            battleMenuPanel.style.display = "none"; // 隐藏战斗菜单
            panel.style.display = "block"; // 显示怪物面板
            listAndChooseMonster();
            currentMonsterIndex = 0; // Reset to the first monster
            updateMonsterFocus(); // Update focus to the first monster
        }
    }

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

        currentMonsterIndex = 0; // Reset to the first monster
        updateMonsterFocus(); // Update focus to the first monster
    }

    // 创建怪物面板
    const monsterPanel = document.createElement("div");
    monsterPanel.id = "monster-panel";
    monsterPanel.style.cssText =
        "position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: rgba(0, 0, 0, 0.8); color: white; padding: 10px; border-radius: 5px; z-index: 1000; width: 200px; display: none;";
    monsterPanel.innerHTML = `<h3>Monsters</h3><ul id="monster-list"></ul>`;

    document.body.appendChild(monsterPanel);

    window.closeMonsterPanel = function() {
        const panel = document.getElementById("monster-panel");
        panel.style.display = "none";
        document.getElementById("battle-menu-panel").style.display = "block"; // 显示战斗菜单
        updateFocus('battle-menu-panel'); // Return focus to battle menu
    }

    // Add focused class styling
    const style = document.createElement('style');
    style.textContent = `
        #game-menu-panel ul li.focused, #battle-menu-panel ul li.focused, #monster-list li.focused {
            background-color: #555; /* Highlight color for focused item */
        }
    `;
    document.head.appendChild(style);

    // 自动点击Battle按钮的函数
    function clickBattleButton() {
        const battleButton = document.querySelector(
            'div.text-center button[type="submit"]'
        );
        if (battleButton) {
            // console.log("点击Battle按钮");
            battleButton.click();
        } else {
            console.log("Battle按钮不存在");
        }
    }

    // 自动战斗的函数
    let lastHuntTime = 0;
    let lastBattleTime = 0;
    let huntWaitTime = 0;
    let battleWaitTime = 0;

    function clickButton() {
        const buttons = Array.from(document.querySelectorAll("button"));
        const startHuntButton = buttons.find((btn) =>
            btn.textContent.includes("Start Hunt")
        );
        const battleMaxButton = buttons.find((btn) =>
            btn.textContent.includes("Battle Max")
        );

        const currentTime = Date.now();

        if (startHuntButton && !startHuntButton.disabled) {
            if (currentTime - lastHuntTime > huntWaitTime) {
                console.log("Clicking Start Hunt button.");
                startHuntButton.click();
                lastHuntTime = currentTime; // Update last hunt time
            } else {
                console.log("Waiting for Start Hunt button cooldown.");
            }
        } else if (battleMaxButton && !battleMaxButton.disabled) {
            if (currentTime - lastBattleTime > battleWaitTime) {
                console.log("Clicking Battle Max button.");
                battleMaxButton.click();
                lastBattleTime = currentTime; // Update last battle time
            } else {
                console.log("Waiting for Battle Max button cooldown.");
            }
        } else {
            console.log("No actionable buttons available or waiting for next available time.");
        }
    }

    // 切换自动战斗功能
    window.toggleAutoBattle = function() {
        if (autoBattleInterval) {
            clearInterval(autoBattleInterval);
            autoBattleInterval = null;
            console.log("Auto Battle stopped.");
        } else {
            // 提示用户输入等待时间
            huntWaitTime = parseInt(prompt("请输入 Start Hunt 按钮的等待时间（秒）："), 10) * 1000;
            battleWaitTime = parseInt(prompt("请输入 Battle Max 按钮的等待时间（秒）："), 10) * 1000;

            autoBattleInterval = setInterval(clickButton, 1000); // Check buttons every second
            console.log("Auto Battle started.");
        }
    }

    window.stopAutoBattle = function() {
        if (autoBattleInterval) {
            clearInterval(autoBattleInterval);
            autoBattleInterval = null;
            console.log("Auto Battle stopped.");
        } else {
            console.log("Auto Battle is not running.");
        }
    }
})();
