function drawBiplot(data,eigenvalue,eigenvector,labels,isColor){

    // compute the projections using pc1 and pc2

    // X is our data which has all the ndim points
    // need to find basis vectors pc1 and pc2 **** maybe top two vectors
    // Take dot product to get x and y coordinates and plot scaterplot

    d3.select('svg').remove()
    d3.select('text').remove()

    var dataX = [] // array of all x cordinates
    var dataY = []

    console.log(eigenvector[0].length)

    for(let i=0;i<data.length;i++){
        dataX.push(dot_product(data[i],eigenvector[0])) /// need to change this to columns instead of row
        dataY.push(dot_product(data[i],eigenvector[1]))
    }

    console.log(dataX)
    console.log(dataY)

    console.log(eigenvalue)

    var AxesX = []
    var AxesY = []


    for(let i=0;i<6;i++){
      AxesX.push(eigenvector[0][i]) /// need to change this to columns instead of row
      AxesY.push(eigenvector[1][i])
    }

    console.log(AxesX)
    console.log(AxesY)


    const width = 1000
    const height = 500
    const margin = {top: 10, right: 30, bottom: 50, left: 90}

    const svg = d3.select('#main_graphs')
    .attr("class","mdl-color--white mdl-shadow--2dp mdl-cell--2-col mdl-cell--9-col mdl-grid text-aligin--center")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + 2*margin.top + 1.75*margin.bottom)
    .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleLinear()
    .domain([d3.min(dataX), d3.max(dataX)])     
    .range([0, width-margin.right-margin.left]);
    
    svg.append("g")
    .attr("transform", "translate(0," + height/1.58 + ")")
    .call(d3.axisBottom(x))


    var percent1 = (eigenvalue[0].eigenvalue)/(eigenvalue[0].eigenvalue+eigenvalue[1].eigenvalue)
    var percent2 = (eigenvalue[1].eigenvalue)/(eigenvalue[0].eigenvalue+eigenvalue[1].eigenvalue)
    
    svg.append("text")
    .attr("transform", "translate(" + ((width-margin.right-margin.left)/ 2) + " ," + (height + margin.bottom/1.5) + ")")
    .style("text-anchor", "middle")
    .text("PC1 Explains "+(percent1*100).toFixed(2)+"% of Variance");

    var y = d3.scaleLinear()
    .range([height, 0]);
    y.domain([d3.min(dataY), d3.max(dataY)]);   

    svg.append("g")
    .attr("transform", "translate(" + width/5.7 + ",0)")
    .call(d3.axisLeft(y))

    svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("PC2 Explains "+(percent2*100).toFixed(2)+"% of Variance");

    svg.append('g')
    .selectAll("dot")
    .data(d3.zip(dataX,dataY,labels))
    .enter()
    .append("circle")
    .attr("cx", function (d) { return x(d[0]); } )
    .attr("cy", function (d) { return y(d[1]); } )
    .attr("r", 3)
    .style("fill", function(d){
      if(isColor==0){
          return "#69b3a2"
      }
      else if (isColor==1){
        if(d[2]==0){
          return "#69b3a2"
        }
        else if (d[2]==1){
          return "#ff0000"
        }
      }
  })

    svg.append('g')
    .selectAll("dot")
    .data(d3.zip(AxesX,AxesY))
    .enter()
    .append("circle")
    .attr("cx", function (d) { return x(d[0]); } )
    .attr("cy", function (d) { return y(d[1]); } )
    .attr("r", 3)
    .style("fill", "#ff0000")

    var table_data = []
    for(let i=0;i<6;i++){ 
      var temp=[]
      temp.push(i+1)
      temp.push(eigenvalue[i].feature)
      table_data.push(temp)
    }

    console.log(table_data)

    columns = ["number","features"]

    var table = svg.append("foreignObject")
    .attr("width",2.5*margin.right+margin.left)
    .attr("height", height/3.5)
    .attr("x",width-margin.left-4*margin.right)
    .attr("style", "border:1px solid black")
    .classed("style","padding: 75px")
    .append("xhtml:body")

    table.append("table")

    thead = table.append("thead"),
    tbody = table.append("tbody");

    thead.append("tr")
        .selectAll("th")
        .data(columns)
        .enter()
        .append("th")
            .text(function(column) { return column; });

    var rows = tbody.selectAll("tr")
    .data(table_data)
    .enter()
    .append("tr");

    rows.selectAll("td")
        .data(function(row) {
            return columns.map(function(column) {
                return {column: column, value: row[columns.indexOf(column)]};
            });
        })
        .enter()
        .append("td")
        .attr("style","padding-left:25px ")
        .html(function(d) { return d.value; });
   

    for(let i=0;i<6;i++){   // can we factor this by 2
      var line = svg.append("g")

      line.append("line")
             .attr("x1",x(0))
             .attr("y1",y(0))
             .attr("x2",x(AxesX[i]))  
             .attr("y2",y(AxesY[i]))
             .attr("stroke","red")  
             .attr("stroke-width",2)
      
      line.append('text')
             .attr('class', 'barsEndlineText')
             .attr('text-anchor', 'middle')
              .attr("x",x(AxesX[i]))
             .attr("y", y(AxesY[i]))
             .style('fill', 'darkPink')
             .text(" "+(i+1))           
    }
   
}

function dot_product(vector1, vector2) {

    var result = 0;
    for (var i = 0; i < vector1.length; i++) {
      result += vector1[i] * vector2[i];
    }
    return result;
  }

function getColumn(data, col){
    var column = [];
    for(var i=0; i<data.length; i++){
       column.push(data[i][col]);
    }
    return column;
 }

