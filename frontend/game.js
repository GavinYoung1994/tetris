var gameOfLife = {
  width: 12,
  height: 12,
  stepInterval: null,
  once: 0,

  createAndShowBoard: function () {
    // create <table> element
    var goltable = document.createElement("tbody");
    
    // build Table HTML
    var tablehtml = '';
    for (var h=0; h<this.height; h++) {
      tablehtml += "<tr id='row+" + h + "'>";
      for (var w=0; w<this.width; w++) {
        tablehtml += "<td data-status='dead' id='" + w + "-" + h + "'></td>";
      }
      tablehtml += "</tr>";
    }
    goltable.innerHTML = tablehtml;
    
    // add table to the #board element
    var board = document.getElementById('board');
    board.appendChild(goltable);


    var play_btn = document.getElementById('play_btn');
    var step_btn = document.getElementById('step_btn');
    step_btn.onclick = this.step.bind(this);
    play_btn.onclick = this.enableAutoPlay.bind(this);
    
    // once html elements are added to the page, attach events to them
    this.setupBoardEvents();
  },

  forEachCell: function (iteratorFunc) {
    /* 
      Write forEachCell here. You will have to visit
      each cell on the board, call the "iteratorFunc" function,
      and pass into func, the cell and the cell's x & y
      coordinates. For example: iteratorFunc(cell, x, y)
    // */
    //  for (var i = 0; i < this.width; i ++) {
    //   for (var j = 0; j < this.height; j ++) {
    //     iteratorFunc(cell, i, j);
    //     }
    //   }

  },
  
  setupBoardEvents: function() {
    // each board cell has an CSS id in the format of: "x-y" 
    // where x is the x-coordinate and y the y-coordinate
    // use this fact to loop through all the ids and assign
    // them "on-click" events that allow a user to click on 
    // cells to setup the initial state of the game
    // before clicking "Step" or "Auto-Play"
    
    // clicking on a cell should toggle the cell between "alive" & "dead"
    // for ex: an "alive" cell be colored "blue", a dead cell could stay white
    
    // EXAMPLE FOR ONE CELL
    // Here is how we would catch a click event on just the 0-0 cell
    // You need to add the click event on EVERY cell on the board
    
    var onCellClick = function (e) {
      // QUESTION TO ASK YOURSELF: What is "this" equal to here?
      
      // how to set the style of the cell when it's clicked
      if (this.getAttribute('data-status') == 'dead') {
        this.className = "alive";
        this.setAttribute('data-status', 'alive');
      } else {
        this.className = "dead";
        this.setAttribute('data-status', 'dead');
      }
    };
    
    for (var i = 0; i < this.width; i ++) {
      for (var j = 0; j < this.height; j ++) {
        var cell = document.getElementById(String(i)+'-'+String(j));
        cell.onclick = onCellClick;
      }
    }

    // var cell00 = document.getElementById('0-0');
    // cell00.onclick = onCellClick;
  },

  step: function () {
    // Here is where you want to loop through all the cells
    // on the board and determine, based on it's neighbors,
    // whether the cell should be dead or alive in the next
    // evolution of the game. 
    //
    // You need to:
    // 1. Count alive neighbors for all cells
    // 2. Set the next state of all cells based on their alive neighbors
    for (var i = 0; i < this.width; i ++) {
      for (var j = 0; j < this.height; j ++) {
        var cell = document.getElementById(String(i)+'-'+String(j));
        var aliveNeighbors = 0;
        for (var k = i - 1; k < i + 2; k ++){
          for(var l = j - 1; l < j + 2; l ++){
            if(!(k===i&&l===j) && !(k<0 || k>=this.width || l<0 || l>=this.height)){
              var neighbor = document.getElementById(String(k)+ '-' + String(l));
              if(neighbor.getAttribute('data-status')==='alive'){
                aliveNeighbors++;
              }
            }
          }
        }
        // if cell alive
        if (cell.getAttribute('data-status') === 'alive') {
          if (aliveNeighbors < 2 || aliveNeighbors > 3) {
            cell.setAttribute('data-status', 'dead');
            cell.setAttribute('class','dead');
          }
        // if cell dead
        } else {
          if (aliveNeighbors === 3) {
            cell.setAttribute('data-status', 'alive');
            cell.setAttribute('class','alive');
          }
        }

        
      }
    }

  },

  enableAutoPlay: function () {
    if(this.once === 0 ){
      this.once ++;
      var self = this.step.bind(this);
      // Start Auto-Play by running the 'step' function
      // automatically repeatedly every fixed time interval
      setInterval(self, 500);
    }
    
  }

};

gameOfLife.createAndShowBoard();