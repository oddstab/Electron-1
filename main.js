// import {app, BrowserWindow} from "electron"
const { app, BrowserWindow, BrowserView } = require("electron")

//BrowserWindow
//https://www.electronjs.org/docs/api/browser-window

app.on("ready", () => {
    console.log("ready!!")
    let mainWindow = new BrowserWindow({
        //寬高
        width: 1024,
        height: 768,

        //無邊框
        // frame: false,

        // 優雅的顯示(?)
        // show: false,
        // backgroundColor:"#cca011",
        webPreferences: {
            //整合nodeJs裡面的module
            nodeIntegration: true,
            webviewTag: true
        }
    });
    mainWindow.loadFile("index.html");


    const view = new BrowserView();

    //設定BrowserView
    view.setBounds({
        x: 20,
        y: 20,
        width: 300,
        height: 200
    });
    
    //讀取內容
    view.webContents.loadURL("https://www.microsoft.com/zh-tw");

    //放到mainWindow中
    mainWindow.setBrowserView(view);
    mainWindow.webContents.openDevTools();
    mainWindow.on("closed", () => {
        mainWindow = null;
    });
    mainWindow.once("ready-to-show", () => {
        mainWindow.show();
    });
    // let child = new BrowserWindow({
    //     //指定父級
    //     parent: mainWindow,

    //     //點不到父窗口,除非關閉
    //     // modal: true
    // });

    //沒show也會跳出來(????)
    // child.show();
});