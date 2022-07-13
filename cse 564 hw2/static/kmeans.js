function kmeans(data,k,labels,eigenvector,eigenvalue){
    d3.select('svg').remove()

    var dataX = [] // array of all x cordinates
    var dataY = []

    console.log(eigenvector[0].length)

    console.log(eigenvector)
    console.log(eigenvalue)
    console.log(data)

    for(let i=0;i<data.length;i++){
        dataX.push(dot_product(data[i],eigenvector[0])) /// need to change this to columns instead of row
        dataY.push(dot_product(data[i],eigenvector[1]))
    }

    console.log(dataX)
    console.log(dataY)

    console.log(eigenvalue)

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
    .attr("transform", "translate(0," + height + ")")
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
        if(d[2]==0){
            return "#69b3a2"
        }
        else if (d[2]==1){
            return "#ff0000"
        }
    })

}