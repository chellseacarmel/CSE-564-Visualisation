
// Numerical need Histogram
var Budget = []
var Revenue = []
var VoteAverage = []
var VoteCount = []
var Popularity = []
var Runtime = []
var Dates = []

var parseTime = d3.timeParse("%Y-%m-%d");

//Categorical need BarChart
var IsCollection = []
var Adult = []
var Genres = []
var Status = []
var OrigLang =[]
var ProdCtry = []
var Lang = []
var ProdComp= []

var flag = 0
var axis = 0 // 0 is x and 1 is y

d3.csv("final datas/moviesdataset.csv", function(data) {
	for (var i = 0; i < data.length; i++) {
		console.log(data[i].release_date);
	}
	data.forEach(function(d) {
		d.budget = +d.budget;
		d.revenue = +d.revenue;
		d.vote_average = +d.vote_average;
		d.vote_count = +d.vote_count;
		d.popularity= +d.popularity;
		d.runtime= +d.runtime;
		d.isCollection= +d.isCollection;
		d.adult = +d.adult;
		d.status = +d.status;
		d.release_date = parseTime(d.release_date);
		
		Budget.push(d.budget);
		Revenue.push(d.revenue);
		VoteAverage.push(d.vote_average);
		VoteCount.push(d.vote_count);
		Popularity.push(d.popularity);
		Runtime.push(d.runtime)
		IsCollection.push(d.isCollection)
		Adult.push(d.adult)
		Status.push(d.status)

		Dates.push(d.release_date)
	  });
});

d3.csv("final datas/movie_original_languages.csv",function(data){
	data.forEach(function(d) {
		OrigLang.push(d)
	});
})

d3.csv("final datas/movies_genres.csv",function(data){
	data.forEach(function(d) {
		Genres.push(d)
	});
})

d3.csv("final datas/movies_production_country.csv",function(data){
	console.log(data[0])

	data.forEach(function(d) {
		ProdCtry.push(d)
	});
})

d3.csv("final datas/movies_languages.csv",function(data){
	
	data.forEach(function(d) {
		Lang.push(d)
	});
})

d3.csv("final datas/movies_production_companies.csv",function(data){
	data.forEach(function(d) {
		ProdComp.push(d)
	});
})

function revealcheck(){
	var x = document.getElementById("radio_buttons");
  	if (x.style.display === "none") {
    x.style.display = "block";
  	} else {
    x.style.display = "none";
  	}
}

function revealmenu(){
	var x = document.getElementById("scatter");
  	if (x.style.display === "none") {
    x.style.display = "block";
  	} else {
    x.style.display = "none";
  	}
}

function drawBudget(){
	revealcheck()
	console.log(Budget)
	document.querySelector("h1").innerHTML="Budget Graph";
	if(flag==0){
		drawHistogram(Budget,"budget","frequency")
	}
	else if(flag==1){
		drawFlippedHistogram(Budget,"budget","frequency")
	}
	revealcheck()

}

function drawRevenue(){
	revealcheck()
	document.querySelector("h1").innerHTML="Revenue Graph";
	if(flag==0){
		drawHistogram(Revenue,"revenue","frequency")
	}
	else if(flag==1){
		drawFlippedHistogram(Revenue,"revenue","frequency")
	}
	revealcheck()
}

function drawVoteAverage(){
	revealcheck()
	document.querySelector("h1").innerHTML="Ratings Graph";
	if(flag==0){
		drawHistogram(VoteAverage,"ratings","frequency")
	}
	else if(flag==1){
		drawFlippedHistogram(VoteAverage,"ratings","frequency")
	}
	revealcheck()
}

function drawVoteCount(){
	revealcheck()
	document.querySelector("h1").innerHTML="Vote Count Graph";
	if(flag==0){
		drawHistogram(VoteCount,"vote count","frequency")
	}
	else if(flag==1){
		drawFlippedHistogram(VoteCount,"vote count","frequency")
	}
	revealcheck()
}

function drawPopularity(){
	revealcheck()
	document.querySelector("h1").innerHTML="Popularity Graph";
	if(flag==0){
		drawHistogram(Popularity,"popularity","frequency")
	}
	else if(flag==1){
		drawFlippedHistogram(Popularity,"popularity","frequency")
	}
	revealcheck()
}

function drawRuntime(){
	revealcheck()
	document.querySelector("h1").innerHTML="Runtime Graph";
	if(flag==0){
		drawHistogram(Runtime,"runtime","frequency")
	}
	else if(flag==1){
		drawFlippedHistogram(Runtime,"runtime","frequency")
	}
	revealcheck()
}


function drawIsCollection(){
	revealcheck()
	document.querySelector("h1").innerHTML="IsCollection Graph";
	console.log(IsCollection)
	var new_collection = []
	var sum = 0;
	for (let i = 0; i < IsCollection.length; i++) {
	sum += IsCollection[i];
	}
	new_collection.push(["NotCollection",(IsCollection.length)-sum])
	new_collection.push(['IsCollection',sum])
	if(flag==0){
	drawBarChart(new_collection,"isCollection","frequency")
	}
	else if(flag==1){
		drawFlippedBarChart(new_collection,"isCollection","frequency")
	}
	revealcheck()
}


function drawIsAdult(){   // need to change data since only non adult is shown
	revealcheck()
	document.querySelector("h1").innerHTML="IsAdult Graph";
	var sum = 0;
	var new_adult = []
	for (let i = 0; i < Adult.length; i++) {
		sum += Adult[i];
	}
	new_adult.push(["NotAdult",(Adult.length)-sum]) 
	new_adult.push(["IsAdult",sum])
	if(flag==0){
	drawBarChart(new_adult,"IsAdult","frequency")
	}
	else if(flag==1){
		drawFlippedBarChart(new_adult,"IsAdult","frequency")
	}
	revealcheck()
}

function drawStatus(){
	revealcheck()
	document.querySelector("h1").innerHTML="Status Graph";
	var sum = 0;
	var new_status = []
	for (let i = 0; i < Status.length; i++) {
		sum += Status[i];
	}
	new_status.push(["Released",sum]) 
	new_status.push(["Rumored",(Status.length)-sum])
	if(flag==0){
	drawBarChart(new_status,"Status","frequency")
	}
	else if(flag==1){
		drawFlippedBarChart(new_status,"Status","frequency")
	}
	revealcheck()
}

 function drawReleaseDate(){
	revealcheck()
	document.querySelector("h1").innerHTML="Release Date Graph";
	console.log(Dates)
	if(flag==0){
		drawTimeHistogram(Dates,"year","frequency")
	}
	else if(flag==1){
		drawFlippedTimeHistogram(Dates,"year","frequency")
	}
	revealcheck()
 }
 
 function drawOriginalLanguage(){
	revealcheck()
	document.querySelector("h1").innerHTML="Original Language Graph";
	console.log(OrigLang)
	var new_lang =[]
	for(let i =0;i<OrigLang.length;i++){
		new_lang.push([OrigLang[i].original_languages,+OrigLang[i].counts])
	 }
	if(flag==0){
		drawBarChart(new_lang,"languages","frequency")
	}
	else if(flag==1){
		drawFlippedBarChart(new_lang,"languages","frequency")
	}
	revealcheck()
 }
 	var new_genres =[]

 function drawGenres(){
	revealcheck()
	document.querySelector("h1").innerHTML="Genres Graph";
	console.log(Genres)
	var new_genres =[]
	for(let i =0;i<Genres.length;i++){
		new_genres.push([Genres[i].genres,+Genres[i].counts])
	}
	console.log(new_genres)
	if(flag==0){
		drawBarChart(new_genres,"genres","frequency")
	}
	else if(flag==1){
		drawFlippedBarChart(new_genres,"genres","frequency")
	}
	revealcheck()
 }

 function drawProductionCountries(){    // need to fix x axis very messy
	revealcheck()
	document.querySelector("h1").innerHTML="Production Countries Graph";
	console.log(ProdCtry)
	var new_countries =[]
	for(let i =0;i<ProdCtry.length;i++){
		new_countries.push([ProdCtry[i].production_countries,+ProdCtry[i].counts])
	}
	console.log(new_countries)
	if(flag==0){
		drawBarChart(new_countries,"countries","frequency")
	}
	else if(flag==1){
		drawFlippedBarChart(new_countries,"countries","frequency")
	}
	revealcheck()
 }

 function drawLanguage(){ // need to fix x axis very messy
	revealcheck()
	document.querySelector("h1").innerHTML="Available Languages Graph";
	console.log(Lang)
	var new_language =[]
	for(let i =0;i<Lang.length;i++){
		new_language.push([Lang[i].spoken_languages,+Lang[i].counts])
	}
	if(flag==0){
		drawBarChart(new_language,"languages","frequency")
	}
	else if(flag==1){
		drawFlippedBarChart(new_language,"languages","frequency")
	}
	revealcheck()
 }

 function drawCompanies(){ // need to fix x axis very messy
	revealcheck()
	document.querySelector("h1").innerHTML="Production Companies Graph";
	console.log(ProdComp);
	var new_comp =[];
	for(let i =0;i<ProdComp.length;i++){
		new_comp.push([ProdComp[i].production_companies,+ProdComp[i].counts])
	}
	if(flag==0){
		drawBarChart(new_comp,"companies","frequency");
	}
	else if(flag==1){
		drawFlippedBarChart(new_comp,"companies","frequency");
	}
	revealcheck()
 }

 function swap(){
	console.log("Swap")
	console.log(document.querySelector("h1").innerHTML=="Production Companies Graph")
	if(flag==0){
		flag = 1;
		console.log(flag)
	}
	else if (flag==1){
		flag = 0;
		console.log(flag)
	}
	
	if(document.querySelector("h1").innerHTML=="IsCollection Graph"){
		drawIsCollection()
	}
	else if(document.querySelector("h1").innerHTML=="IsAdult Graph"){
		drawIsAdult()
	}
	else if(document.querySelector("h1").innerHTML=="Status Graph"){
		drawStatus()
	}
	else if(document.querySelector("h1").innerHTML=="Original Language Graph"){
		drawOriginalLanguage()
	}
	else if(document.querySelector("h1").innerHTML=="Genres Graph"){
		drawGenres()
	}
	else if(document.querySelector("h1").innerHTML=="Production Countries Graph"){
		drawProductionCountries()
	}
	else if(document.querySelector("h1").innerHTML=="Available Languages Graph"){
		drawLanguage()
	}
	else if(document.querySelector("h1").innerHTML=="Budget Graph"){
		drawBudget()
	}
	else if(document.querySelector("h1").innerHTML=="Popularity Graph"){
		drawPopularity()
	}
	else if(document.querySelector("h1").innerHTML=="Production Companies Graph"){
		drawCompanies()
	}
	else if(document.querySelector("h1").innerHTML=="Release Date Graph"){
		drawReleaseDate()
	}
	else if(document.querySelector("h1").innerHTML=="Revenue Graph"){
		drawRevenue()
	}
	else if(document.querySelector("h1").innerHTML=="Runtime Graph"){
		drawRuntime()
	}
	else if(document.querySelector("h1").innerHTML=="Ratings Graph"){
		drawVoteAverage()
	}
	else if(document.querySelector("h1").innerHTML=="Vote Count Graph"){
		drawVoteCount()
	}

 }

 function getaxis(){
	console.log("Axis")
	if(axis==0){
		axis = 1;
	}
	else if (axis==1){
		axis = 0;
	}
 }

 var Xfeature=""
 var Yfeature=""

 function getFeature(){
	var e = document.getElementById("features");
	var strUser = e.options[e.selectedIndex].text;
	console.log(strUser)
	console.log(axis)
	if(axis==0){
		Xfeature=strUser;
	}
	else if (axis==1){
		Yfeature=strUser;
	}
	if(Xfeature!="" && Yfeature!=""){
		scatterplot()
	}
 }

 function setup(){
	d3.select('svg').remove()
	d3.select('#main_graphs')
    .attr("class","")
	document.querySelector("h1").innerHTML="";
	revealcheck()
	revealmenu()
	revealmenu()

}

function scatterplot(){
	console.log(Xfeature,Yfeature)

	//numeric values
	var fset = [Xfeature,Yfeature]
	var data2 = []
	var flag0=0;
	var flag1=0;
	for(let i=0;i<fset.length;i++){
		if(fset[i]=="Budget"){
			data2.push(Budget)
		}
		else if(fset[i]=="Revenue"){
			data2.push(Revenue)
		}
		else if(fset[i]=="Ratings"){
			data2.push(VoteAverage)
		}
		else if(fset[i]=="Vote Count"){
			data2.push(VoteCount)
		}
		else if(fset[i]=="Popularity"){
			data2.push(Popularity)
		}
		else if(fset[i]=="Runtime"){
			data2.push(Runtime)
		}
		else if(fset[i]=="IsCollection"){
			var sum = 0;
			var new_collection=[];
			for (let i = 0; i < IsCollection.length; i++) {
			sum += IsCollection[i];
			}
			new_collection.push(["NotCollection",(IsCollection.length)-sum])
			new_collection.push(['IsCollection',sum])
			data2.push(new_collection)
			if(i==0){flag0=1} else {flag1=1}
		}
		else if(fset[i]=="IsAdult"){
			var sum = 0;
			var new_adult = [];
			for (let i = 0; i < Adult.length; i++) {
			sum += Adult[i];
			}
			new_adult.push(["NotAdult",(Adult.length)-sum]) 
			new_adult.push(["IsAdult",sum])
			data2.push(new_adult)
			if(i==0){flag0=1} else {flag1=1}
		}
		else if(fset[i]=="Genres"){
			var new_genres=[];
			for(let i =0;i<Genres.length;i++){
			new_genres.push([Genres[i].genres,+Genres[i].counts])
			}
			data2.push(new_genres)
			if(i==0){flag0=1} else {flag1=1}
		}
		else if(fset[i]=="Production Countries"){
			var new_countries =[];
			for(let i =0;i<ProdCtry.length;i++){
			new_countries.push([ProdCtry[i].production_countries,+ProdCtry[i].counts])
			}
			data2.push(new_countries)
			if(i==0){flag0=1} else {flag1=1}
		}
		else if(fset[i]=="Production Companies"){
			var new_comp = [];
			for(let i =0;i<ProdComp.length;i++){
				new_comp.push([ProdComp[i].production_companies,+ProdComp[i].counts])
			}
			data2.push(new_comp)
			if(i==0){flag0=1} else {flag1=1}
		}
		else if(fset[i]=="Status"){
			var new_status=[];
			var sum = 0;
			for (let i = 0; i < Status.length; i++) {
			sum += Status[i];
			}
			new_status.push(["Released",sum]) 
			new_status.push(["Rumored",(Status.length)-sum])
			data2.push(new_status)
			if(i==0){flag0=1} else {flag1=1}
		}
		else if(fset[i]=="Original Language"){
			var new_lang=[];
			for(let i =0;i<OrigLang.length;i++){
				new_lang.push([OrigLang[i].original_languages,+OrigLang[i].counts])
			}
			data2.push(new_lang)
			if(i==0){flag0=1} else {flag1=1}
		}
		else if(fset[i]=="Available Language"){
			var new_language = []
			for(let i =0;i<Lang.length;i++){
				new_language.push([Lang[i].spoken_languages,+Lang[i].counts])
			}
			data2.push(new_language)
			if(i==0){flag0=1} else {flag1=1}
		}

	}
	console.log(2*flag0+flag1)
	drawScatterPlot(data2[0],data2[1],Xfeature,Yfeature,2*flag0+flag1)
	Xfeature=""
	Yfeature=""

}