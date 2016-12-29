var Board = function(row, col){
    var row = row;
    var col = col;
    
    // init frontier
    var frontier = new Array();
    for(var i=0; i<col; i++) {
        frontier[i] = 0;
    }
    // init state
    var state = new Array();
    var curBlock;

    Board.prototype.setCurBlock = function(newBlock){
        curBlock = newBlock;
    }

    Board.prototype.checkDrop = function() {
        for(var i=0;i<curBlock.length;i++){
            if(frontier[curBlock[i].x]+1 === curBlock[i].y){
                return false;
            }
        }
        return true;
    }

    Board.prototype.clear = function() {
        var counter = new Object();
        var RowsToClear = new Array();
        for(var i=0; i<state.length; i++) {
            if(counter.hasOwnProperty(state[i].y)) {
                counter[state[i].y]++;
                if(counter[state[i].y] === col) {
                    RowsToClear.add(state[i].y)
                }
            }
            else {
                counter[state[i].y] = 1;
            }
        }
        RowsToClear.sort(function(a,b){
            return b-a;
        });
        for(var i=0; i<state.length; i++) {
            var marker = RowsToClear.length;
            for(var j=0; j < RowsToClear.length; j++) {
                if(state[i].y === RowsToClear[j]) {
                    marker = -1;
                    break;
                }
                if(state[i].y > RowsToClear[j]) {
                    marker = j;
                    break;
                }
            }
            if(marker === -1) {
                state.splice(i, 1);
            }
            else {
                state[i].y -= RowsToClear.length - marker;
                if(frontier[state[i].x] < state[i].y) {
                    frontier[state[i].x] = state[i].y;
                }
            }
        }

    }

    Board.prototype.drop = function() {
        if(Board.checkDrop()) {
            for(var i=0; i<curBlock.length; i++) {
                curBlock[i].y -= 1;
            }
        }
        else {
            //update state
            for(var i=0; i<curBlock.length; i++) {
                // update state
                state.push(curBlock[i])

            }
            // reset frontier
            for(var i=0; i<frontier.length; i++) {
                frontier[i] = 0;
            }
            // clear
            Board.clear();
        }
    }
}


