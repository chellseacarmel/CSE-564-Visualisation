var bars,x,y;
var di,ncomponents;


function drawBarChart(data, Xparam, Yparam){

    d3.select('svg').remove()
    const width = 1000
    const height = 500
    const margin = {top: 10, right: 30, bottom: 50, left: 40}

    const svg = d3.select('#main_graphs')
    .attr("class","mdl-color--white mdl-shadow--2dp mdl-cell--2-col mdl-cell--9-col mdl-grid text-aligin--center")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + 2*margin.top + 1.75*margin.bottom)
    .call( d3.brush().extent( [ [margin.left,margin.top], [width+margin.left+margin.right,height+margin.top+margin.bottom]])
    .on("end", drawUpdateChart) )
    
    .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    x = d3.scaleBand()
    .range([ 0, width ])
    .domain(data.map(function(d) { return d[0]; }))
    .padding(0.2);
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(0,0)rotate(0)")
    .style("text-anchor", "middle");

    svg.append("text")
    .attr("transform", "translate(" + ((width-margin.right-margin.left)/ 2) + " ," + (height + 1.5*margin.bottom) + ")")
    .style("text-anchor", "middle")
    .text(Xparam);

    y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return d[1];})+10])//data.map(function(d) { return d[1];})
    .range([ height, 0]);
    svg.append("g")
    .call(d3.axisLeft(y));

    svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0-margin.left-2)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "end")
    .text(Yparam);

    bars=svg.selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("x",function(d) { return x(d[0]); })
    .attr("y",function(d) { return y(d[1]); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(d[1]) })
    .attr("fill", "#69b3a2")

    d3.select('#main_graphs')
    .append("text")
    .attr("id","di_val")
    .attr("transform", "translate(" + 40 + " ," + 10 + ")")
    .style("text-anchor", "end")

    return di;


}

function drawUpdateChart(){  
    
    console.log(d3.event.selection)
    var arr =[]
    var sum = 0
    bars.attr("rx",function(d){ 
        var temp = isBrushed(d3.event.selection, x(d[0]), y(d[1]))
        if(temp==1){
            arr.push(d[1])
            sum+=d[1]
        }
        return 15*temp})

    bars.attr("fill",function(d){ 
        var temp = isBrushed(d3.event.selection, x(d[0]), y(d[1]))
        if(temp==1){
            return "#e91363"
        }
        else{
            return "#69b3a2"
        }
        })
    console.log(arr)
    console.log(sum)

   d3.select('#di_val').text("The intrinsic dimensionality is: "+sum)
   di=sum;
   ncomponents=arr.length
    // edit the visual

}

function isBrushed(coords, cx, cy) {
    var x0 = coords[0][0]-70,
        x1 = coords[1][0]-70,
        y0 = coords[0][1],
        y1 = coords[1][1];
    if(x0 <= cx && cx <= x1 && y0 <= cy && cy <= y1){
        return 1;
    }
   else{
       return 0;
   } 
}


function getIntrinsic(){
    return di;
}

function getNumComponents(){
    return ncomponents;
}