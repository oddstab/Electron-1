
const electron = require("electron");
const fs = require("fs");

/**
 * 取得系統資訊
 */
function getProcessInfo() {
    console.log("環境:", process.env);
    console.log("位元:", process.arch);
}


(()=>{

});

//window open彈出子視窗
//https://www.electronjs.org/docs/api/window-open
(() => {
    //每次open都會返回一個BrowserWindowProxy
    //https://www.electronjs.org/docs/api/browser-window-proxy
    var myWindow ;
    function openNewWindow() {
        //開啟子視窗
        myWindow = window.open("second.html", "校內專題~");
    }

    
    function closeWindow() {
        myWindow.close();
    }

    //開起
    document.getElementById("sub-window")
        .addEventListener("click", openNewWindow);

    //關閉
    document.getElementById("close-sub-window")
        .addEventListener("click", closeWindow);

    //接受子視窗的訊息
    window.addEventListener("message", (msg) => {
        console.log("接受到的msg：", msg)
    });
})();

//webView 物件
//https://www.electronjs.org/docs/api/webview-tag
(() => {
    const wb = document.getElementById("wb");
    const loading = document.getElementById("loading");

    //讀取完成
    wb.addEventListener("did-stop-loading", (e) => {
        console.log("ok!");
        loading.innerHTML = "ok!";
        //在webview裡注入CSS
        wb.insertCSS(`
            #hplogo{
                background-image: -webkit-linear-gradient(top,#c2c,#f1f1f1);
            }
        `);
        //注入JS
        wb.executeJavaScript(`
            var hplogo = document.getElementById("hplogo");
            //alert(hplogo);
        `);
    })
})();

//File 物件
//https://www.electronjs.org/docs/api/file-object
(() => {
    const drag = document.getElementById("holder");
    //拖放
    drag.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        for (const f of e.dataTransfer.files) {
            console.log('File(s) you dragged here: ', f.path)
            console.log(fs.readFileSync(f.path).toString());
        }
    });
    //放掉
    drag.addEventListener('dragover', (e) => {
        //取消原生的事件
        e.preventDefault();
        e.stopPropagation();
    });
})();