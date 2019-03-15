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

function addRandomChampion() {

    function randomFromTo(from, to) {
        return Math.floor(Math.random() * (to - from + 1) + from);
    }

    let cpn = names[randomFromTo(0,57)];
    // alert(cpn);
    addChess(cpn);
}
function Chess(name,src,x,y) {
    this.name = name;
    this.src = src;
    this.x = x;
    this.y = y;
    this.isSelected = false;
    this.isDragging = false;
}


function drawChess() {
    ctx1.clearRect(0, 0, canvas.width, canvas.height);

    for(let chess of chessList) {
        // let chess = chessList[1];
        let img = new Image();
        img.src = chess.src;
        if(img.complete) { //已经加载过
            ctx1.drawImage(img, chess.x, chess.y, layout.cell, layout.cell);
            console.log(chess.name+"iscomp")
            if(chess.isSelected) {
                ctx1.beginPath();
                ctx1.arc(chess.x, chess.y, 25, 0, Math.PI*2);
                ctx1.strokeStyle = "black";
                ctx1.fill();
                ctx1.stroke();
            }
        } else {
            img.onload =  function ()  {  //首次加载完成
                ctx1.drawImage(img, chess.x, chess.y, layout.cell, layout.cell);
                console.log(chess.name+"first time")
                if(chess.isSelected) {
                    ctx1.beginPath();
                    ctx1.arc(chess.x, chess.y, 25, 0, Math.PI*2);
                    ctx1.strokeStyle = "black";
                    ctx1.fill();
                    ctx1.stroke();
                }
            }
        }

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

var previousSelected;
function chessClick(e) {
    // 取得画布上被单击的点
    let clickX = e.pageX - canvas.offsetLeft;
    let clickY = e.pageY - canvas.offsetTop;
    console.log(clickX,clickY);
    // 查找被单击的棋子
    for(let chess of chessList) {
        distanceX = clickX - chess.x;
        distanceY = Math.abs(clickY - chess.y);
        // 判断这个点是否在棋子上
        if (distanceX <= layout.cell && distanceY <= layout.cell) {
            console.log(distanceX,distanceY);
            // // 清除之前选择的棋子
            if (previousSelected != null) previousSelected.isSelected = false;
            previousSelected = chess;
            // //选择新棋子
            console.log(chess.name+" is selected")
            chess.isSelected = true;
            // //更新显示
            // alert(previousSelected.name)
            drawChess();

            //停止搜索
            return;
        }
    }
}

window.onload = function () {

    canvas = document.getElementById("board");
    canvas1 = document.getElementById("chess")
    ctx = canvas.getContext("2d");
    ctx1 = canvas1.getContext('2d');

    makeSelectList();
    // canvas.onmousedown = canvasClick;
    drawBoard();
    // addChess(ctx,null);
    addChess("Abaddon",);//测试用
    addChess('Light Keeper');
    // addChess(ctx,'Slardar');
    let ax,ay,x,y;

    canvas1.onmousedown = chessClick;

}

function makeSelectList() {
    let list =document.getElementById("champli");
    for(let name of names) {
        let champopt = document.createElement("option");
        champopt.value=name;
        champopt.text=name;
        list.appendChild(champopt);
    }
}
function addChampion() {
    let champ = document.getElementById("champli");
    let opt = champ.value;
    addChess(opt);

}
function clearBoard() {
    chessList = [];
    cnt = 0;
   drawChess();
}
