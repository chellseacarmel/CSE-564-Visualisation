
var f = []
var values = []
var indices = []


function drawTable (data,id,num_components,eigenvalue,eigenvector){

    d3.select('svg').remove()
    const width = 1000
    const height = 500
    const margin = {top: 10, right: 30, bottom: 50, left: 40}

    const svg = d3.select('#main_graphs')
    .attr("class","mdl-color--white mdl-shadow--2dp mdl-cell--2-col mdl-cell--9-col mdl-grid text-aligin--center")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + 2*margin.top + 1.75*margin.bottom)
    .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    var loading_data=[]                 
    for(let i =0;i<num_components;i++){
        var temp=[]
        for(let j=0;j<eigenvector.length;j++){
            temp.push(eigenvector[i][j])
        } 
        loading_data.push(temp)
    }

    console.log(loading_data)

    var sum_squares = []

    for(let j=0;j<eigenvector.length;j++){
        var temp=0
        for(let i =0;i<num_components;i++){
            temp+=(loading_data[i][j]*loading_data[i][j])
        }
        sum_squares.push(temp)
    } 

    console.log(sum_squares)
    
    var columns=[]
    columns.push("features")
    for(let i=0;i<num_components;i++){
        columns.push("PC"+i)
    }
    columns.push("Sum of squares")

    var copy = []
    for(let i=0;i<sum_squares.length;i++){
        copy.push(sum_squares[i])
    }

    console.log(eigenvalue[0].feature)

    console.log(copy)

    for(let i=0;i<4;i++){
        var max = Math.max(...copy);
        console.log(max)
        values.push(max)
        var index = sum_squares.indexOf(max)
        console.log(index)
        indices.push(index)
        f.push(eigenvalue[index].feature)
        copy = copy.filter(item => item !== max)
    }

    console.log(f)
    console.log(values)
    console.log(indices)
    
    //need to display table

    var table_data = []
    //table_data.push(columns)
    for(let i=0;i<4;i++){ //num of rows
        var temp = []
        temp.push(f[i])
        for(let j =0;j<num_components;j++){
            temp.push((loading_data[j][indices[i]]).toFixed(4))
        }
        temp.push(values[i].toFixed(4))
        table_data.push(temp)
    }

    console.log(table_data)

    var table = svg.append("foreignObject")
    .attr("width", 2*width)
    .attr("height", height)
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
        .attr("style", "padding-left: 15px; padding-right: 5px; border:1px solid black")
            .html(function(d) { return d.value; });
   
}

function get4Features(){
    return f
}

function get4Indices(){
    return indices
}

function get4Values(){
    return values
}