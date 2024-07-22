// ==UserScript==
// @name         Slither.io Enhanced
// @version      v1.0.0
// @description  Sliter.io Enhanced
// @author       cli-ish
// @match        http://slither.io/*
// @grant        none
// ==/UserScript==

(function (w) {
    const infoContainer = Object.assign(document.createElement("div"), {
        id: "info-container",
        style: "position: fixed; top: 15px; left: 15px; padding: 8px; font-family: 'Lucida Sans Unicode', 'Lucida Grande', sans-serif; color: rgb(255, 255, 255); z-index: 9; border-radius: 5px; min-height: 15px; min-width: 200px; background-color: rgba(0, 0, 0, 0.6);"
    });


    const serverSelect = Object.assign(document.createElement("div"), {
        id: "select-server",
        style: "margin-left: auto; margin-right: auto; text-align: center; opacity: 1; margin-top: 15px;",
    });
    const serverList = w.sos;
    const serverListSelect = document.createElement("select");
    serverListSelect.style.width = "200px";

    let option = Object.assign(document.createElement("option"), {
        value: "Any"
    });
    option.innerText = "Any";
    serverListSelect.appendChild(option);

    serverList.forEach(server => {
        let option = Object.assign(document.createElement("option"), {
            value: server.ip
        });
        option.innerText = server.ip;
        option.setAttribute("data-port", server.po);
        serverListSelect.appendChild(option);
    });
    w.onchange = function (e) {
        e.preventDefault();
        let option = e.target.querySelector('option:checked')
        if (option !== null && option.value !== "Any") {
            w.sos = [];
            w.forcing = true;
            w.bso = {};
            w.bso.ip = option.value;
            w.bso.po = parseInt(option.getAttribute('data-port'));
            w.bso.ac = 999;
            w.sos.push(w.bso);
        } else {
            w.bso = {};
            w.sos = serverList;
            w.forcing = false;
        }
    }
    serverSelect.appendChild(serverListSelect);
    document.getElementById("playh").before(serverSelect);
    document.body.appendChild(infoContainer);

    if (/firefox/i.test(navigator.userAgent)) {
        document.addEventListener("DOMMouseScroll", zoom, false);
    } else {
        document.body.onmousewheel = zoom;
    }
    setInterval(updateInfo, 100)

    function zoom(e) {
        w.gsc *= Math.pow(0.9, e.wheelDelta / -120 || e.detail / 2 || 0);
    }

    function updateInfo() {
        if (w.playing) {
            infoContainer.style.display = "block";
            infoContainer.innerHTML = '' +
                '<div style="color: #008000;">[Mouse wheel] - Zoom</div>' + "<br>" +
                "X: " + ~~w.slither.xx + "<br>" +
                "Y: " + ~~w.slither.yy + "<br>" +
                "Rank: " + w.rank + "/" + w.slither_count + "<br>" +
                "Server IP: " + w.bso.ip;
        } else {
            infoContainer.style.display = "none";
        }
    }
})(window);
