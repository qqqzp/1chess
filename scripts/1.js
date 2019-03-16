const layout = {
    cell: 50,
    width: 400,
    height: 400,
};
const style = {
    board: {border: "#630", background: "#fed"},
    chess: {radius:25}
};

chessList = [];
const names = ['Abaddon',
    'Alchemist',
    'Anti_Mage',
    'Axe',
    'Bat Rider',
    'Beast Master',
    'Bounty Hunter',
    'Chaos Knight',
    'Clockwerk',
    'Crystal Maiden',
    'Death Prophet',
    'Disruptor',
    'Doom',
    'Dragon Knight',
    'Drow Ranger',
    'Enchantress',
    'Enigma',
    'Gyrocopter',
    'Juggernaut',
    'Kunkka',
    'Lich',
    'Light Keeper',
    'Lina',
    'Lone Druid',
    'Luna',
    'Lycan',
    'Medusa',
    'Mirana',
    'Morphling',
    'Natures Prophet',
    'Necrophos',
    'Ogre Magi',
    'Omni Knight',
    'Pain Queen',
    'Phantom Assassin',
    'Puck',
    'Razor',
    'Riki',
    'Sand King',
    'Shadow Fiend',
    'Shadow Shaman',
    'Slardar',
    'Slark',
    'Sniper',
    'Techies',
    'Templar Assassin',
    'Terrorblade',
    'Tide Hunter',
    'Timbersaw',
    'Tinker',
    'Tiny',
    'Treant Protector',
    'Troll Warlord',
    'Tusk',
    'Venomancer',
    'Viper',
    'Wind Ranger',
    'Witch Doctor',
]

function drawBoard() {
    ctx.fillStyle = style.board.background;
    ctx.beginPath();
    ctx.rect(0, 0, layout.width, layout.height);
    ctx.fill();
    ctx.closePath();
    let Color = "";
    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            if((i%2 === 0 && j % 2 === 0)||(i % 2 === 1 && j % 2 === 1) ){
                Color="#6b6dcc";
            }else{
                Color = "#b3bacc"
            }
            ctx.beginPath();
            ctx.fillStyle = Color;
            ctx.fillRect(layout.cell * i,layout.cell * j,layout.cell,layout.cell);
        }
    }
    ctx.fillStyle = style.board.border;
}

function addChampion() {
    let champ = document.getElementById("champli");
    let opt = champ.value;
    addChess(opt);
}

function addRandomChampion() {

    function randomFromTo(from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from);
    }

    let cpn = names[randomFromTo(0,names.length-1)];
    // alert(cpn);
    addChess(cpn);
}
function Chess(name,src,x,y) {
    this.name = name;
    this.src = src;
    this.x = x; //左上角
    this.y = y;
    this.isSelected = false;
    this.isDragging = false;
}


function drawChess() {
    ctx1.clearRect(0, 0, canvas.width, canvas.height);

    for(chess of chessList) {
        // let chess = chessList[1];
        // let img = new Image();
        // img.src = chess.src;
        // if(images[i].complete) { //已经加载过
            let i = chessList.indexOf(chess);
            ctx1.drawImage(images[i], chess.x, chess.y, layout.cell, layout.cell);
            console.log(chess.name+"iscomp")
            if(chess.isSelected) {
                ctx1.beginPath();
                ctx1.moveTo(chess.x,chess.y+layout.cell);
                ctx1.lineTo(chess.x+layout.cell,chess.y+layout.cell)
                ctx1.strokeStyle = "black";
                ctx1.stroke();
                ctx1.closePath();
            }
        // }
        // else {
        //     img.onload =  function ()  {  //首次加载完成
        //         ctx1.drawImage(img, chess.x, chess.y, layout.cell, layout.cell);
        //         console.log(chess.name+"first time")
        //         if(chess.isSelected) {
        //             ctx1.beginPath();
        //             ctx1.moveTo(chess.x,chess.y+layout.cell);
        //             ctx1.lineTo(chess.x+layout.cell,chess.y+layout.cell)
        //             ctx1.strokeStyle = "black";
        //             ctx1.stroke();
        //             ctx1.closePath();
        //         }
        //     }
        // }

    }
}

var cnt = 0;
function addChess(chessName) {
    let src = "champions/"+chessName+".png";
    let chs =  new Chess(chessName,src,cnt % 8 * layout.cell,layout.cell * 7 - Math.floor(cnt / 8 )* layout.cell);
    chessList.push(chs);
    cnt++;
    drawChess();
}


//check
var previousX,previousY;
function chessClick(e) {
    // 取得画布上被单击的点
    let clickX = e.pageX - canvas.offsetLeft;
    let clickY = e.pageY - canvas.offsetTop;
    console.log(clickX,clickY);
    // 查找被单击的棋子
    for(chess of chessList) {
        let a = chess.x+layout.cell/2, b = chess.y+layout.cell/2;  //中心点
        let distanceR =  Math.sqrt(Math.pow(clickX - a, 2) + Math.pow(clickY - b, 2));
        // 判断这个点是否在棋子上
        let onChess = style.chess.radius > distanceR;
        if (onChess) {
            // console.log(distanceX,distanceY);
            // // 清除之前选择的棋子
            if (previousSelected != null) previousSelected.isSelected = false;
            previousSelected = chess;
            // //选择新棋子
            console.log(chess.name+" is selected")
            previousSelected.isSelected = true;
            previousX = chess.x;
            previousY = chess.y;
            isDragging = true;
            // //更新显示
            // alert(previousSelected.name)
            drawChess();

            //停止搜索
            return;
        }
    }
}
var previousSelected;
function stopDragging() {
    if(previousSelected != null) {
        let offsetX = previousSelected.x % layout.cell;
        let offsetY = previousSelected.y % layout.cell;
        var fixedX,fixedY;
        if(offsetX<(layout.cell/2)) {
            fixedX = previousSelected.x - offsetX;
        } else {
            fixedX = previousSelected.x - offsetX + layout.cell;
        }
        if(offsetY<(layout.cell/2)) {
            fixedY = previousSelected.y - offsetY;
        } else {
            fixedY = previousSelected.y - offsetY + layout.cell;
        }

        for(let chess in chessList) {
            if(chess.x===fixedX&&chess.y===fixedY) {
                previousSelected.x = previousX;
                previousSelected.y = previousY;
            } else {
                previousSelected.x = fixedX;
                previousSelected.y = fixedY;
            }
        }
    }
    isDragging = false;
    drawChess();
}

function dragChess(e) {
    // alert("?")
    // 判断是否开始拖拽
    if (isDragging === true) {
        // 判断拖拽对象是否存在
        if (previousSelected != null) {
            // 取得鼠标位置
            var x = e.pageX - canvas.offsetLeft;
            var y = e.pageY - canvas.offsetTop;

            // 移动到鼠标位置
            previousSelected.x = x-style.chess.radius;
            previousSelected.y = y-style.chess.radius;

            // 更新画布
            drawChess();
        }
    }
}

window.onload = function () {

    canvas = document.getElementById("board");
    canvas1 = document.getElementById("chess")
    ctx = canvas.getContext("2d");
    ctx1 = canvas1.getContext('2d');
    preLoad();

    // addChess(ctx,null);
    // preLoad();
    // addChess("Abaddon",);//测试用
    // addChess('Light Keeper');
    // addChess(ctx,'Slardar');
    let ax,ay,x,y;

    isDragging = false;

}


function makeSelectList() {
    let list = document.getElementById("champli");
    // let preload = document.getElementsByClassName("preLoad");
    for(name of names) {
        let champopt = document.createElement("option");
        champopt.value=name;
        champopt.text=name;
        list.appendChild(champopt);
        //
        // let preloadLink = document.createElement("link");     //ques
        // preloadLink.href = "champions/"+name+".png";;
        // preloadLink.rel = "preload";
        // preloadLink.as = "image";
        // preloadLink.onload ="preloadFinished()"
        // document.head.appendChild(preloadLink);
    }
}

var images = new Array(names.length),imageLoaded = 0;
function preLoad() {
    for (let i = 0; i < images.length; i++) {
        images[i] = new Image();
        images[i].addEventListener("load", initSuccess, true);
        images[i].src ="champions/"+names[i]+".png" ;
    }
}

function initSuccess() {
    imageLoaded++;
    if (imageLoaded = names.length) {
        makeSelectList();
        drawBoard();
        canvas1.onmousedown = chessClick;
        canvas1.onmouseup = stopDragging;
        canvas1.onmouseout = stopDragging;
        canvas1.onmousemove = dragChess;
    }
}


function clearBoard() {
    chessList = [];
    cnt = 0;
   drawChess();
}
