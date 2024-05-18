// ==UserScript==
// @name         Idle MMO Menu
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  游戏菜单
// @author       Jaord Sun
// @match        https://web.idle-mmo.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 创建菜单面板
    const menuPanel = document.createElement('div');
    menuPanel.id = 'game-menu-panel';
    menuPanel.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: rgba(0, 0, 0, 0.8); color: white; padding: 20px; border-radius: 10px; z-index: 1000; display: none;';
    menuPanel.innerHTML = `
        <h2>Game Menu</h2>
        <div id="menuContainer" style="display: flex; flex-wrap: wrap; justify-content: space-around;">
            <ul id="menuItemsRow1" style="margin-right: 20px;">
                <li tabindex="0"><button onclick="window.location.href='/inventory'">Inventory</button></li>
                <li tabindex="0"><button onclick="window.location.href='/profile'">Character-Profile</button></li>
                <li tabindex="0"><button onclick="window.location.href='/campaign'">Campaign</button></li>
                <li tabindex="0"><button onclick="window.location.href='/pets'">Pets</button></li>
                <li tabindex="0"><button onclick="window.location.href='/equipment'">Inventory-Equipment</button></li>
                <li tabindex="0"><button onclick="window.location.href='/bank'">Inventory-Bank</button></li>
            </ul>
            <ul id="menuItemsRow2" style="margin-right: 20px;">
            <li tabindex="0"><button onclick="window.location.href='/battle'">Battle</button></li>
            <li tabindex="0"><button onclick="window.location.href='/vendor/shop'">Vendor</button></li>
                <li tabindex="0"><button onclick="window.location.href='/market/listings'">Market</button></li>
                <li tabindex="0"><button onclick="window.location.href='/market/orders/all'">Market-Purchase</button></li>
                <li tabindex="0"><button onclick="window.location.href='/guilds'">Guilds</button></li>
                <li tabindex="0"><button onclick="window.location.href='/friends'">Friends</button></li>
            </ul>
            <ul id="menuItemsRow3" style="margin-right: 20px;">
            <li tabindex="0"><button onclick="window.location.href='/skills/view/woodcutting'">Woodcutting</button></li>
            <li tabindex="0"><button onclick="window.location.href='/skills/view/mining'">Mining</button></li>
            <li tabindex="0"><button onclick="window.location.href='/skills/view/fishing'">Fishing</button></li>
            <li tabindex="0"><button onclick="window.location.href='/skills/view/alchemy'">Alchemy</button></li>
            <li tabindex="0"><button onclick="window.location.href='/skills/view/smelting'">Smelting</button></li>
            <li tabindex="0"><button onclick="window.location.href='/skills/view/cooking'">Cooking</button></li>
            <li tabindex="0"><button onclick="window.location.href='/skills/view/forge'">Forge</button></li>
            </ul>
        </div>
        <button onclick="toggleMenu()">Close Menu</button>
    `;
    document.body.appendChild(menuPanel);

    const rows = document.querySelectorAll('#menuContainer > ul');
    let currentRow = 0;
    let currentCol = 0;

    // Function to update focus on menu items
    function updateFocus() {
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

    // 切换菜单显示/隐藏
    function toggleMenu() {
        const isDisplayed = menuPanel.style.display === 'block';
        menuPanel.style.display = isDisplayed ? 'none' : 'block';
        if (!isDisplayed) {
            updateFocus(); // Update focus when menu is shown
        }
    }

    // 监听键盘事件
    document.addEventListener('keydown', function(e) {
        if (e.altKey && e.key.toLowerCase() === 'm') {
            toggleMenu(); // 切换菜单显示
        } else if (menuPanel.style.display === 'block') {
            const numRows = rows.length;
            const numCols = rows[currentRow].children.length;
            switch (e.key) {
                case 'ArrowUp':
                    currentCol = (currentCol - 1 + numCols) % numCols;
                    
                    updateFocus();
                    break;
                case 'ArrowDown':
                    currentCol = (currentCol + 1) % numCols;
                    updateFocus();
                    
                    break;
                case 'ArrowLeft':
                    currentRow = (currentRow - 1 + numRows) % numRows;
                    updateFocus();
                    break;
                case 'ArrowRight':
                    currentRow = (currentRow + 1) % numRows;
                    updateFocus();
                    break;
                case 'Enter':
                    rows[currentRow].children[currentCol].querySelector('button').click();
                    break;
            }
        }
    });

    // Add focused class styling
    const style = document.createElement('style');
    style.textContent = `
        #menuContainer ul li.focused {
            background-color: #555; /* Highlight color for focused item */
        }
    `;
    document.head.appendChild(style);
})();
