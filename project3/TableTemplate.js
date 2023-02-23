"use strict";

class TableTemplate {
	static fillIn( id, dict, columnName ){
		const table = document.getElementById(id);
		const rows = table.rows;
		const header = rows.item(0);
		let cols = [];
		
		// process the whole header row
		const headerProc = new Cs142TemplateProcessor(header.innerHTML);
		header.innerHTML = headerProc.fillIn(dict);
		
		// if columnName undefined then process the whole table, otherwise just that col
        for (let i = 0; i < header.cells.length; ++ i) {
            if(columnName !== undefined){
				if (header.cells[i].textContent === columnName) {
					cols = [i];
					break;
				}
			} else {
				cols.push(i);
			}
		}
        
		// fill in each column in col
        for (let i = 1; i < rows.length; i++) {
            for (let j = 0; j < cols.length; j++) {
                const cell = rows[i].cells[cols[j]];
                const cellProc = new Cs142TemplateProcessor(cell.innerHTML);
                cell.innerHTML = cellProc.fillIn(dict);
            }
        }

		// if tables are sit to hidden
        if (table.style.visibility === 'hidden') {
            table.style.visibility = 'visible';
        }
	}
}