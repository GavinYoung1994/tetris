var renderTetris = {
	width: 15,
	height: 30,
	createAndShowBoard: function(){
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
	    var board = document.getElementById('p1board');
	    board.appendChild(goltable);


	    var play_btn = document.getElementById('play_btn');
	    play_btn.onclick = this.enableAutoPlay.bind(this);
	    
	    // once html elements are added to the page, attach events to them
	    // this.setupBoardEvents();
	},

	forEachCell: function(func){
		for(var i=0; i<this.width;i++){
			for(var j=0; j<this.height;j++){
				func(i,j);
			}
		}
	}
}

renderTetris.createAndShowBoard();