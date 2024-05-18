// ==UserScript==
// @name         Idle MMO Menu
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  游戏菜单和战斗菜单，使用通用函数创建菜单面板和项目信息。
// @author       Jaord Sun
// @match        https://web.idle-mmo.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let currentRow = 0;
    let currentCol = 0;

    // 通用函数：创建菜单面板
    function createMenuPanel(id, title, items) {
        const menuPanel = document.createElement('div');
        menuPanel.id = id;
        menuPanel.style.cssText = 'position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: rgba(0, 0, 0, 0.8); color: white; padding: 20px; border-radius: 10px; z-index: 1000; display: none;';
        
        let menuContent = `<h2>${title}</h2><div id="${id}-container" style="display: flex; flex-wrap: wrap; justify-content: space-around;">`;
        
        items.forEach((row, rowIndex) => {
            menuContent += `<ul id="${id}-items-row${rowIndex + 1}" style="margin-right: 20px;">`;
            row.forEach(item => {
                menuContent += `<li tabindex="0"><button onclick="window.location.href='${item.href}'">${item.label}</button></li>`;
            });
            menuContent += `</ul>`;
        });
        
        menuContent += `</div><button onclick="toggleMenu('${id}')">Close Menu</button>`;
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
            { label: 'Start Battle', href: '/battle/start' },
            { label: 'Battle Max', href: '/battle/max' },
            { label: 'Auto Battle', href: '/battle/auto' }
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
        }
    });

    // 通用函数：处理菜单导航
    function handleMenuNavigation(e, id) {
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
        }

        updateFocus(id);
    }

    // Add focused class styling
    const style = document.createElement('style');
    style.textContent = `
        #game-menu-panel ul li.focused, #battle-menu-panel ul li.focused {
            background-color: #555; /* Highlight color for focused item */
        }
    `;
    document.head.appendChild(style);
})();
