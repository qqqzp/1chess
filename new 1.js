
<!doctype html>
<html>
<head>
    <meta http-equiv=Content-Type content="text/html;charset=utf-8">
    <title>canvas 象棋 </title>


    <script>
        var layout = {padding: 30, cell: 50, chessRadius: 20, fontSize: 36, width: 400, height: 450, offsetWidth: 460, offsetHeight: 510};
        var style = {
            board: {border: "#630", background: "#fed", font: "36px 隶书"},
            chess: {border: "#fa8", background: "#fc9", font: "36px 隶书", fontColor: "#c00"}
        };
        function drawBoard(ctx) {
            ctx.fillStyle = style.board.background;
            ctx.beginPath();
            ctx.rect(0, 0, layout.offsetWidth, layout.offsetHeight);
            ctx.fill();
            ctx.closePath();
            var p = layout.padding, s = layout.cell, w = layout.width, h = layout.height;
            ctx.strokeStyle = style.board.border;
            ctx.lineWidth = 2;
            ctx.beginPath();
            for (var i = 0; i < 10; i++) {
                ctx.moveTo(p, s * i + p);
                ctx.lineTo(w + p, s * i + p);
            }
            ctx.moveTo(p, p);
            ctx.lineTo(p, h + p);
            ctx.moveTo(w + p, p);
            ctx.lineTo(w + p, h + p);
            for (var i = 1; i < 8; i++) {
                ctx.moveTo(s * i + p, p);
                ctx.lineTo(s * i + p, s * 4 + p);
                ctx.moveTo(s * i + p, s * 5 + p);
                ctx.lineTo(s * i + p, h + p);
            }
            ctx.moveTo(s * 3 + p, p);
            ctx.lineTo(s * 5 + p, s * 2 + p);
            ctx.moveTo(s * 5 + p, 0 + p);
            ctx.lineTo(s * 3 + p, s * 2 + p);
            ctx.moveTo(s * 3 + p, s * 7 + p);
            ctx.lineTo(s * 5 + p, s * 9 + p);
            ctx.moveTo(s * 5 + p, s * 7 + p);
            ctx.lineTo(s * 3 + p, s * 9 + p);
            ctx.stroke();
            ctx.closePath();
            ctx.font = style.board.font;
            ctx.fillStyle = style.board.border;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("楚河", p + s * 2, p + s * 4.5);
            ctx.fillText("漢界", p + s * 6, p + s * 4.5);
        }
        var chess = {
            name: "炮",
            pos: {x: 0, y: 0},
            offsetRect: {left: 10, top: 10, right: 50, bottom: 50, moveTo: function (x, y) {
                this.right += x - this.left;
                this.left = x;
                this.bottom += y - this.top;
                this.top = y;
            }},
            isDragging: false,
            drawChess: function drawChess(ctx) {
                ctx.fillStyle = style.chess.background;
                ctx.strokeStyle = style.chess.border;
                ctx.font = style.chess.font;
                var x = this.offsetRect.left + layout.cell / 2, y = this.offsetRect.top + layout.cell / 2;
                ctx.beginPath();
                ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
                if (chess.isDragging)
                    ctx.arc(x + 2, y + 4, layout.chessRadius + 1, 0, 360); else
                    ctx.arc(x + 1, y + 2, layout.chessRadius + 1, 0, 360);
                ctx.fill();
                ctx.fillStyle = style.chess.background;
                ctx.closePath();
                ctx.beginPath();
                ctx.arc(x, y, layout.chessRadius, 0, 360);
                ctx.fill();
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
                ctx.fillText(chess.name, x + 1, y - layout.fontSize / 16 + 1);
                ctx.fillStyle = style.chess.fontColor;
                ctx.fillText(chess.name, x, y - layout.fontSize / 16);
                ctx.stroke();
                ctx.closePath();
            }
        };
        function fixMousePoint(e, dom) {
            var x = e.pageX - dom.offsetLeft;
            var y = e.pageY - dom.offsetTop;
            return{x: x, y: y};
        }
        window.onload = function () {
            var canvasNode = document.getElementById("board");
            var ctx = canvasNode.getContext("2d");
            drawBoard(ctx);
            chess.drawChess(ctx);
            canvasNode.onmousedown = function (e) {
                var pos = fixMousePoint(e, canvasNode);
                if (pos.x >= chess.offsetRect.left && pos.x < chess.offsetRect.right && pos.y >= chess.offsetRect.top && pos.y < chess.offsetRect.bottom) {
                    chess.isDragging = true;
                }
            }
            canvasNode.onmousemove = function (e) {
                if (chess.isDragging != true)
                    return;
                var pos = fixMousePoint(e, canvasNode);
                chess.offsetRect.moveTo(pos.x - layout.cell / 2, pos.y - layout.cell / 2);
                drawBoard(ctx);
                chess.drawChess(ctx);
            }
            canvasNode.onmouseup = function (e) {
                if (chess.isDragging) {
                    chess.isDragging = false;
                    moveChessBack();
                }
            }
            function moveChessBack() {
                var left = layout.padding + layout.cell * chess.pos.x - layout.cell / 2, top = layout.padding + layout.cell * chess.pos.y - layout.cell / 2;
                var dx = left - chess.offsetRect.left, dy = top - chess.offsetRect.top;
                var t = 0, c = 20;
                var timer = setInterval(function () {
                    if (++t > c) {
                        clearInterval(timer);
                        chess.offsetRect.moveTo(left, top);
                        return;
                    }
                    var ratio = 0;
                    if (t <= c / 2) {
                        ratio = 2 * t / c;
                        ratio = 1 - 0.5 * Math.pow(ratio, 4);
                    } else {
                        ratio = 2 - 2 * t / c;
                        ratio = 0.5 * Math.pow(ratio, 4);
                    }
                    chess.offsetRect.moveTo(left - dx * ratio, top - dy * ratio);
                    drawBoard(ctx);
                    chess.drawChess(ctx);
                }, 40);
            }
        }
    </script>
</head>

<body>


<div id="main">
    <canvas id="board" width="460" height="510"></canvas>
</div>

</body>
</html>