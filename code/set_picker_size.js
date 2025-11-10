var p = this.patcher.parentpatcher;


function set_cells(cell_num) {
	
	let result = [];
    for (let i = 0; i < cell_num; i++) {
      result.push(i, 0, 1);
    }
    return result;
}
	
function set_picker_size(columns, height) {
    var named_object = p.getnamed("picker");

    if (named_object) {
    
        named_object.setboxattr("patching_size", [columns*30, height]);
        named_object.setboxattr("presentation_size", [columns*30, height]);
        named_object.message("clear")
        named_object.message("columns", columns)
        named_object.message("list",set_cells(columns))
        

    } else {
        post("Error: Object not found with scripting name:", name);
    }
}