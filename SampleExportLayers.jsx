
run();

function run() {
    // 自身のPSDに合わせて書き換えてください。
    var targetLayers = app.activeDocument.layerSets["!目"].artLayers;

    // ダイアログを表示して保存先を選択させる
    selectedFolderPath = Folder.selectDialog("保存先のフォルダを選択してください");

    // レイヤーを切り替えて保存する
    exportLayers(selectedFolderPath, targetLayers);

    alert("出力完了");
}

// レイヤーを切り替えて保存
function exportLayers(folderPath, targetLayers) {
    // 表示状態を保存
    var copyVisibles = [];
    for (var i = 0; i < targetLayers.length; i++) {
        copyVisibles.push(targetLayers[i].visible);
    }

    // 全て非表示
    for (var i=0; i<targetLayers.length; i++) {
        targetLayers[i].visible = false;
    }

    for (var i=0; i<targetLayers.length; i++) {
        if (i >= 1) {
            targetLayers[i-1].visible = false;
        }
        targetLayers[i].visible = true;

        var fileName = replaceWord(targetLayers[i].name);
        
        var filePath = folderPath + "/" + fileName + ".png";
        exportWebPNG(filePath);
    }

    // 表示状態を元に戻す
    for (var i = 0; i < targetLayers.length; i++) {
        targetLayers[i].visible = copyVisibles[i];
    }
}

// WebPNGで保存
function exportWebPNG(path){
    var options = new ExportOptionsSaveForWeb();
    options.format = SaveDocumentType.PNG;
    options.PNG8 = false;
    options.optimized = false;
    options.quality = 100;
    var file = new File(path);
    app.activeDocument.exportDocument(file, ExportType.SAVEFORWEB, options);
}

// ファイル名に使用できない文字を除外
function replaceWord(fileName){
    var word=["\\",'/',':','*','?',"\"","<",">",'|'];
    for(var i=0;i<word.length;i++){
        fileName = fileName.replace(word[i], "");
    }
    return fileName;
}