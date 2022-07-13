function drawPCPplot(data,label){

    console.log(data)

    d3.select('svg').remove()

    const width = 1000
    const height = 500
    const margin = {top: 10, right: 30, bottom: 50, left: 90}

    const svg = d3.select('#main_graphs')
    .attr("class","mdl-color--white mdl-shadow--2dp mdl-cell--2-col mdl-cell--9-col mdl-grid text-aligin--center")
     .append("svg")
     .attr("width", width + margin.left + margin.right)
     .attr("height", height + 2*margin.top + 1.75*margin.bottom)
     .attr("class","parcoords")
     .append("g")
     .attr("transform","translate(" + margin.left + "," + margin.top + ")");
 
    var parcoords = d3.parcoords()("#main_graphs")
    .data(data)
    .color(function(d,i){
        if(label[i]==0){
            return "#69b3a2"
        }
        else {
            return "#ff0000"
        }
    })
    .alpha(0.2)
    .render()
    .reorderable();

}