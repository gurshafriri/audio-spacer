inlets = 1;
outlets = 1;

// Expect: a "dictionary <name>" message into this [js] box
function dictionary(dictname) {
    
	var obj = JSON.parse(new Dict(dictname).stringify()); 

	const positions = obj.layers
		.filter(layer => layer.type === "markers")
		.flatMap(layer => layer.data.data.map(item => item.position))
  		.sort((a, b) => a - b);
    
	outlet(0, positions); // outputs a Max list
}