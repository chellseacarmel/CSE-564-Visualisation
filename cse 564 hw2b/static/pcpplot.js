function drawPCPplot(data,label,ordering){

    console.log(data)

    d3.select('svg').remove()

    const width = 1000
    const height = 500
    const margin = {top: 10, right: 30, bottom: 50, left: 90}

    const svg = d3.select('#main_graphs')
    .attr("class","mdl-color--white mdl-shadow--2dp mdl-cell--2-col mdl-cell--9-col mdl-grid text-aligin--center")
    .append('div')
    .attr("id","graph")
    .style({
        'width':width + margin.left + margin.right+"px",
        'height':height + 2*margin.top + 1.75*margin.bottom+"px",
    })
    .attr("class","parcoords")

    var parcoords = d3.parcoords()("#graph")
    .data(data)
    if(ordering.length!=0){
        parcoords.dimensionTitles(ordering)
    }
    else{
        parcoords.dimensionTitles(['budget', 'revenue', 'vote_average', 'vote_count', 'popularity',
        'runtime',"adult","isCollection","status"])
    }
    parcoords.color(function(d,i){
        if(label[i]==0){
            return "#69b3a2"
        }
        else {
            return "#ff0000"
        }
    })
    .alpha(0.2)
    .render()
    if(ordering.length!=0){
    parcoords.brushMode("1D-axes"); 
    }
    else {
    parcoords.reorderable()
    }


}