(function() {
    let running = false;
    let intervalId = null;

    function todosComandos() {
        Game.OpenSesame();
        startLoop();
        Game.lumps = Infinity;
        Game.heavenlyChips = Infinity;
        Game.gainLumps(Infinity);
        Game.SetAllUpgrades(1);
    }

    function startLoop() {
        if (!running) {
            running = true;
            intervalId = setInterval(() => {
                Game.cookies = Infinity;
            }, 10);
            console.log('Comando executado!');
        }
    }

    function stopLoop() {
        if (running) {
            running = false;
            clearInterval(intervalId);
            console.log('Comando parado!');
        }
    }

    function clearCookies() {
        document.cookie.split(";").forEach(cookie => {
            const name = cookie.split("=")[0].trim();
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
        });

        localStorage.clear();
        sessionStorage.clear();

        if (window.indexedDB) {
            const req = indexedDB.deleteDatabase('cookie-clicker-db');
            req.onsuccess = function() {
                console.log("IndexedDB apagada com sucesso.");
            };
        }

        if ('caches' in window) {
            caches.keys().then(function(cacheNames) {
                cacheNames.forEach(function(cacheName) {
                    caches.delete(cacheName);
                });
            });
        }

        location.reload();
        alert("Todos os cookies foram apagados!");
    }

    function BuildingsAll() {
        for (let i in Game.Objects) {
            Game.Objects[i].buy();
        }
    }

    function BuildingsHack() {
        for (let i = 0; i < 9999; i++) {
            for (let obj in Game.Objects) {
                Game.Objects[obj].buy(1);
                obj++;
            }
        }
    }

    function startClicking() {
        const button = document.querySelector(`.my-class #my-button`);
        if (button) {
            intervalId = setInterval(() => {
                button.click();
            }, 500);
        }
    }

    function stopClicking() {
        if (intervalId) {
            clearInterval(intervalId);
            console.log('Auto clicker stopped.');
        }
        Game.cookies != Infinity;
    }

    const style = document.createElement('style');
    style.innerHTML = `
        #commandInterface {
            position: fixed;
            bottom: 200px;
            left: 20px;
            background: rgb(36, 36, 36);
            color: white;
            padding: 15px;
            border-radius: 10px;
            z-index: 999998;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
            display: flex;
            flex-direction: column;
            gap: 15px;
            font-family: Tahoma, Arial, sans-serif;
        }

        #commandInterface button {
            background: linear-gradient(145deg, #444, #666);
            color: #fff;
            padding: 10px 15px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            text-transform: uppercase;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
            transition: all 0.3s ease;
        }

        #commandInterface button:hover {
            background: linear-gradient(145deg, #666, #888);
            box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.5);
            transform: scale(1.05);
        }

        #commandInterface button:active {
            transform: scale(0.98);
            background: #555;
        }

        #cookieButton {
            position: fixed;
            top: 0px;
            left: 40px;
            background: url('https://cdn.dashnet.org/cookieclicker/img/perfectCookie.png') no-repeat center;
            background-size: cover;
            border: none;
            border-radius: 50%;
            width: 25px;
            height: 25px;
            cursor: pointer;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
            z-index: 999999;
            transition: transform 0.3s ease;
        }

        #cookieButton:hover {
            transform: scale(1.1);
        }
    `;
    document.head.appendChild(style);

    const cookieButton = document.createElement('button');
    cookieButton.id = 'cookieButton';
    cookieButton.onclick = () => {
        const interfaceDiv = document.getElementById('commandInterface');
        interfaceDiv.style.display = interfaceDiv.style.display === 'none' ? 'flex' : 'none';
    };
    document.body.appendChild(cookieButton);

    const commandInterface = document.createElement('div');
    commandInterface.id = 'commandInterface';
    commandInterface.innerHTML = `
        <h1>Commands</h1>
        <button onclick="Game.OpenSesame();">🔧 Dev Tools</button>
        <button onclick="startLoop();">🍪 Infinity Cookies | Start</button>
        <button onclick="stopLoop();">🍪 Infinity Cookies | Stop</button>
        <button onclick="BuildingsAll()">⚡ All Buildings</button>
        <button onclick="BuildingsHack()">🎁 Buildings Hack</button>
        <button onclick="startClicking()">🖱️ Auto Click | Start</button>
        <button onclick="stopClicking()">🖱️ Auto Click | Stop</button>
        <button onclick="todosComandos()">☢️ Unlock Everything</button>
        <button onclick="Game.Reset(1)">❗Reset Game</button>
        <button onclick="clearCookies()">❌ Exit</button>
    `;
    document.body.appendChild(commandInterface);

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    cookieButton.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.offsetX;
        offsetY = e.offsetY;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            cookieButton.style.left = `${Math.max(0, Math.min(window.innerWidth - cookieButton.offsetWidth, e.clientX - offsetX))}px`;
            cookieButton.style.top = `${Math.max(0, Math.min(window.innerHeight - cookieButton.offsetHeight, e.clientY - offsetY))}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    window.todosComandos = todosComandos;
    window.startLoop = startLoop;
    window.stopLoop = stopLoop;
    window.BuildingsAll = BuildingsAll;
    window.BuildingsHack = BuildingsHack;
    window.startClicking = startClicking;
    window.stopClicking = stopClicking;
    window.clearCookies = clearCookies;
})();


console.clear();