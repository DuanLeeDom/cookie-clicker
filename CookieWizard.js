alert('Comandos executados com sucesso!');
(function() {
    // Definições dos comandos
    let running = false; // Controle do loop
    let intervalId = null; // Armazena o ID do intervalo

    // Comandos
    function todosComandos() {
        Game.OpenSesame();
        startLoop();    
        Game.lumps = Infinity
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
        const cookies = document.cookie.split(";");
        cookies.forEach(cookie => {
            const name = cookie.split("=")[0].trim();
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
        });

        localStorage.clear();

        sessionStorage.clear();

        if (window.indexedDB) {
            const req = indexedDB.deleteDatabase('cookie-clicker-db')
            req.onsuccess = function() {
                console.log("IndenxedDB apagada com sucesso.");
            };
            req.onerror = function() {
                console.log("Erro ao apagar IndexedDB.");
            }
        }

        if ('caches' in window) {
            caches.keys().then(function(cacheNames) {
                cacheNames.forEach(function(cacheName) {
                    cache.delete(cacheName);
                });
            });
        }

        location.reload();
        alert("Todos os cookies foram apagados!");
    }

    // Função de clicar em mais coisas
    function BuildingsAll() {
        for (var i in Game.Objects){Game.Objects[i].buy(99999);}
    }

    // Função de clicar em edifícios
    function Buildings(baseID, totalIDs) {
        for (let i = 0; i < totalIDs; i++) {
            const elemento = document.getElementById(`${baseID}${i}`);
            if (elemento) {
                elemento.click();
                console.log(`Clicando no elemento com ID: ${baseID}${i}`);
            } else {
                console.log(`Elemento com ID: ${baseID}${i} não encontrado.`);
            }
        }
    }

    // Adicionando estilos
    const style = document.createElement('style');
    style.innerHTML = `
        #commandInterface {
            position: fixed;
            bottom: 10px;
            left: 10px;
            background-color: rgba(0, 0, 0, 0.7);
            color: white;
            padding: 10px;
            border-radius: 5px;
            z-index: 9999;
            display: none;
        }
        #commandInterface button {
            z-index: 99999;
            background-color:#4CAF50;
            color: white;
            padding: 10px;
            margin: 5px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
        }
        #commandInterface button:hover {
            z-index: 99999;
            background-color: #45a049;
        }
        #cookieButton {
            z-index: 99999;
            position: fixed;
            bottom: 50px;
            left: 100px;
            background-color: rgb(255, 255, 255);
            border: none;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            cursor: pointer;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
        }
        #cookieButton::after {
            content: '🍪';
            font-size: 30px;
            display: block;
            text-align: center;
            line-height: 50px;
        }
    `;
    document.head.appendChild(style);

    // Criando o botão de cookie
    const cookieButton = document.createElement('button');
    cookieButton.id = 'cookieButton';
    cookieButton.onclick = () => {
        const interfaceDiv = document.getElementById('commandInterface');
        interfaceDiv.style.display = interfaceDiv.style.display === 'none' ? 'block' : 'none';
    };
    document.body.appendChild(cookieButton);

    // Criando a interface de controle
    const commandInterface = document.createElement('div');
    commandInterface.id = 'commandInterface';
    commandInterface.innerHTML = `
        <h2>Comandos Cookie Clicker</h2>
        <button onclick="todosComandos()">Executar Todos os Comandos</button>
        <button onclick="startLoop()">Iniciar Loop de Cookies</button>
        <button onclick="stopLoop()">Parar Loop de Cookies</button>
        <button onclick="Buildings('product', 20)">Clique em 20 Edifícios</button>
        <button onclick="BuildingsAll()">BuildingsAll</button>
        <button onclick="clearCookies()">Sair</button>
    `;
    document.body.appendChild(commandInterface);

    // Tornando as funções acessíveis globalmente
    window.todosComandos = todosComandos;
    window.startLoop = startLoop;
    window.stopLoop = stopLoop;
    window.clearCookies = clearCookies;
    window.Buildings = Buildings;
    window.BuildingsAll = BuildingsAll;
})();

console.clear();


