(function() {
    let running = false;
    let intervalId = null;
    let isCommandInterfaceVisible = false;

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
                if (running) {
                    Game.cookies = Infinity;
                }
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
        for (var i in Game.Objects) {
            if (Game.Objects[i] === Infinity) {
                console.log("Buildings Infinity " + Game.Objects[i]);
            } else {
                Game.Objects[i].buy();
            }
        }
    }

    function BuildingsHack() {
        let cont = 0;
        let c = 0;

        for (var i in Game.Objects) {
            while (cont < 5000) {
                while (c <= 19) {
                    Game.Objects[c].buy(1);
                    c++;
                }
                cont++;
            }
        }
    }

    function startClicking() {
        const startClicking = () => {
            const button = document.querySelector(`.my-class #my-button`);
            if (button) {
                intervalId = setInterval(() => {
                    button.click();
                }, 500);
            }
        }
    }

    let intervalID;

    const style = document.createElement('style');
    style.innerHTML = `
        #commandInterface {
            position: absolute;
            background: rgb(36, 36, 36);
            color: white;
            padding: 15px;
            border-radius: 10px;
            z-index: 999998 !important; /* Forçando o z-index com !important */
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
            display: flex;
            flex-direction: column;
            align-items: stretch;
            gap: 50px;
            font-family: 'Merriweather', Georgia, serif; /* Mantém a fonte Merriweather */
            pointer-events: auto;
            display: none;
            max-width: 300px;
            width: 100%;
            overflow: hidden;
            position: relative;
            border: 2px solid transparent;
            animation: matrixBorder 1.5s infinite linear;
        }

        @keyframes matrixBorder {
            0% {
                border-color: transparent;
                box-shadow: 0 0 10px rgba(0, 255, 0, 0.5), 0 0 20px rgba(0, 255, 0, 0.4), 0 0 30px rgba(0, 255, 0, 0.3);
            }
            25% {
                border-color: rgba(0, 255, 0, 0.7);
                box-shadow: 0 0 15px rgba(0, 255, 0, 0.8), 0 0 25px rgba(0, 255, 0, 0.6), 0 0 35px rgba(0, 255, 0, 0.5);
            }
            50% {
                border-color: rgba(0, 255, 0, 0.9);
                box-shadow: 0 0 20px rgba(0, 255, 0, 1), 0 0 30px rgba(0, 255, 0, 0.8), 0 0 40px rgba(0, 255, 0, 0.6);
            }
            75% {
                border-color: rgba(0, 255, 0, 0.7);
                box-shadow: 0 0 15px rgba(0, 255, 0, 0.8), 0 0 25px rgba(0, 255, 0, 0.6), 0 0 35px rgba(0, 255, 0, 0.5);
            }
            100% {
                border-color: transparent;
                box-shadow: 0 0 10px rgba(0, 255, 0, 0.5), 0 0 20px rgba(0, 255, 0, 0.4), 0 0 30px rgba(0, 255, 0, 0.3);
            }
        }

        #commandInterface h1 {
            font-size: 18px;
            color: #FF0000;
            text-align: center;
            font-weight: bold;
            margin-bottom: 10px;
            padding: 0;
            font-family: 'Merriweather', Georgia, serif; /* Título com a fonte Merriweather */
        }

        #commandInterface button {
            background: linear-gradient(145deg, #444, #666);
            color: #00FF00;
            padding: 05px 05px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            text-transform: uppercase;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
            transition: all 0.3s ease;
            border: 1px solid #00FF00;
            background-color: transparent;
            width: 100%;
            box-sizing: border-box;
            font-family: 'Merriweather', Georgia, serif; /* Botões com a fonte Merriweather */
        }

        #commandInterface button:hover {
            background: #333;
            box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.5);
            transform: scale(1.05);
        }

        #commandInterface button:active {
            transform: scale(0.98);
            background: #444;
        }

        #cookieButton {
            position: fixed;
            top: 20px;
            left: 20px;
            background: url('https://cdn.dashnet.org/cookieclicker/img/perfectCookie.png') no-repeat center;
            background-size: cover;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            cursor: pointer;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
            z-index: 999999 !important;  /* Forçando o z-index com !important */
            transition: transform 0.3s ease;
            border: 2px solid #00FF00;
        }

        #cookieButton:hover {
            transform: scale(1.1);
        }

        #cookieButton:active {
            transform: scale(0.95);
        }

        #watermark {
            position: fixed;
            bottom: 10px;
            right: 10px;
            color: #00FF00;
            font-size: 14px;
            font-family: 'Merriweather', Georgia, serif; /* Marca d'água com a fonte Merriweather */
            z-index: 999999 !important;  /* Forçando o z-index com !important */
            pointer-events: none;
            text-shadow: 0 0 10px rgba(0, 255, 0, 0.8),
                        0 0 20px rgba(0, 255, 0, 0.6),
                        0 0 30px rgba(0, 255, 0, 0.4);
            animation: glow 2s infinite alternate;
        }

        @keyframes glow {
            from {
                text-shadow: 0 0 10px rgba(0, 255, 0, 0.8),
                            0 0 20px rgba(0, 255, 0, 0.6),
                            0 0 30px rgba(0, 255, 0, 0.4);
            }
            to {
                text-shadow: 0 0 20px rgba(0, 255, 0, 1),
                            0 0 30px rgba(0, 255, 0, 0.8),
                            0 0 40px rgba(0, 255, 0, 0.6);
            }
        }
    `;
    document.head.appendChild(style);

    const cookieButton = document.createElement('button');
    cookieButton.id = 'cookieButton';
    document.body.appendChild(cookieButton);

    const commandInterface = document.createElement('div');
    commandInterface.id = 'commandInterface';
    commandInterface.innerHTML = `
        <h1>Commands</h1>
        <button onclick="Game.OpenSesame();">🔧 Dev Tools</button>
        <!-- <button onclick="startLoop();">🍪 Infinity Cookies | Start</button> -->
        <!-- <button onclick="stopLoop();">🍪 Infinity Cookies | Stop</button> -->
        <button onclick="BuildingsAll()">⚡ All Buildings</button>
        <!-- <button onclick="BuildingsHack()">🎁 Buildings Hack</button> -->
        <!-- <button onclick="startClicking()">🖱️ Auto Click | Start</button> -->
        <!-- <button onclick="stopLoop()">🖱️ Auto Click | Stop</button> -->
        <button onclick="todosComandos()">☢️ Unlock Everything</button>
        <button onclick="Game.Reset(1)">❗Reset Game</button>
        <button onclick="clearCookies()">❌ Exit</button>
    `;
    document.body.appendChild(commandInterface);

    const watermark = document.createElement('div');
    watermark.id = 'watermark';
    watermark.innerHTML = `
        Modified by Duan Lee Dom | Channel: <a href='https://www.youtube.com/@DuanLeeDom' target='_blank' style='color: white;'>https://www.youtube.com/@DuanLeeDom</a>
    `;
    document.body.appendChild(watermark);

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;
    
    cookieButton.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - cookieButton.offsetLeft;
        offsetY = e.clientY - cookieButton.offsetTop;
        document.body.style.cursor = 'grabbing'; // Adiciona um indicador visual
    });
    
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const newX = e.clientX - offsetX;
            const newY = e.clientY - offsetY;
    
            // Atualiza a posição do botão de forma restrita à janela
            cookieButton.style.left = `${Math.max(0, Math.min(window.innerWidth - cookieButton.offsetWidth, newX))}px`;
            cookieButton.style.top = `${Math.max(0, Math.min(window.innerHeight - cookieButton.offsetHeight, newY))}px`;
    
            // Atualiza a posição da interface de comando
            const cookieRect = cookieButton.getBoundingClientRect();
            const margin = 10;
    
            if (cookieRect.right + commandInterface.offsetWidth + margin <= window.innerWidth) {
                commandInterface.style.left = `${cookieRect.right + margin}px`;
            } else {
                commandInterface.style.left = `${cookieRect.left - commandInterface.offsetWidth - margin}px`;
            }
    
            if (cookieRect.bottom + commandInterface.offsetHeight + margin <= window.innerHeight) {
                commandInterface.style.top = `${cookieRect.bottom + margin}px`;
            } else {
                commandInterface.style.top = `${cookieRect.top - commandInterface.offsetHeight - margin}px`;
            }
        }
    });
    
    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            document.body.style.cursor = ''; // Restaura o cursor padrão
        }
    });
    

    cookieButton.addEventListener('click', () => {
        isCommandInterfaceVisible = !isCommandInterfaceVisible;
        commandInterface.style.display = isCommandInterfaceVisible ? 'block' : 'none';
    });
    
    window.todosComandos = todosComandos;
    window.startLoop = startLoop;
    window.stopLoop = stopLoop;
    window.BuildingsAll = BuildingsAll;
    window.BuildingsHack = BuildingsHack;
    window.startClicking = startClicking;
    window.clearCookies = clearCookies;
})();

console.clear();