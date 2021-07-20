//Setup
let N = 15;
let items = [];
let maxWeight = 50;
let memo =[];

class Item {
	constructor(max){
		this.value = Math.floor(Math.random() * 100)+1;
		this.weight = Math.floor(Math.random() * 100)+1;
		//this.valuePerWeight = this.value/this.weight
	}
}
function initialize(){
	items = [];
	for(var i = 0; i < N; i++){
		items.push(new Item(100));
	}

	for(var i = 0; i <= N; i++){
		var w = [];
		for(var j = 0; j <= maxWeight; j++){
			w.push(-1);
		}
		memo.push(w);
	}
}

function runSims(){
	N = document.getElementById('N').value;
	maxWeight = document.getElementById('maxWeight').value;
	initialize();

	var start = window.performance.now();
	g = greedyAlgorithm();
	var end = window.performance.now();
	document.write("Greedy Time: " + (end-start)+" ms <br>");

	var start = window.performance.now();
	b = bruteForce(maxWeight, N);
	var end = window.performance.now();
	document.write("Brute Force Time: " + (end-start)+" ms <br>");

	var start = window.performance.now();
	d = dynamic(maxWeight, N);
	var end = window.performance.now();
	document.write("Dynamic Time: " + (end-start)+" ms <br>");

	document.write("Greedy: " + g+"<br>");
	document.write("Brute Force: " +b+"<br>");
	document.write("Dynamic: " +d);

	/*
	var same = 0;

	for(var i = 0; i < 100; i++){
		initialize();
		var g = greedyAlgorithm();
		var b = bruteForce(maxWeight,N);
		if(b == g){same++}
	}
	console.log("same: "+same);
	*/
}
function greedyAlgorithm(){
	var currentWeight = 0;
	var currentIndex = 0;
	var currentVal = 0;

	var sorted = items.sort((a,b)=>(b.value/b.weight)-(a.value/a.weight));
	
	while(currentWeight + sorted[currentIndex].weight <= maxWeight)
	{
		currentWeight += sorted[currentIndex].weight;
		currentVal += sorted[currentIndex].value;
		currentIndex++;
	}
	return currentVal;
}

function max(a, b){return (a > b) ? a : b;}

function bruteForce(maxWeight, n){
	if (n == 0 || maxWeight == 0)
		return 0;
	if (items[n-1].weight > maxWeight)
		return bruteForce(maxWeight, n-1);
	else
		return max(items[n-1].value + bruteForce(maxWeight - items[n-1].weight, n-1), bruteForce(maxWeight, n-1));
}

function dynamic(maxWeight,n){
	// Base condition
    if (n == 0 || maxWeight == 0)
        return 0;
         
    if (memo[n][maxWeight] != -1)
        return memo[n][maxWeight];
     
    if (items[n-1].weight > maxWeight)
        return memo[n][maxWeight] = dynamic(maxWeight,n-1);
                                     
    else
        return memo[n][maxWeight] = max((items[n-1].value+dynamic(maxWeight - items[n - 1].weight,n-1)),dynamic(maxWeight,n-1));
}