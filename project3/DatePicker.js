"use strict";

class DatePicker {
    constructor(id, callback) {
        this.id = id;
        this.callback = callback;
    }

    render(date) {
		// blank table created
		var parent = document.getElementById(this.id);
        var table = document.createElement("table");
        parent.appendChild(table);

        // < Month Year >  - first row
        var header = this.createHeader(table, date);
 
        // Su Mo Tu We Th Fr Sa - second row
        var rowWeek = header.insertRow(1);
		rowWeek.innerHTML = '<tr><th>Su</th><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th><tr>';

		var currDate = new Date(date.getFullYear(), date.getMonth(), 1);

		// 1 2 3 4 5 6 7 - third and above row (days numbers)		
		var r = 1;
			// end loop if the start of the next row is next month
		while ( currDate.getMonth() !== (date.getMonth() + 1) ) {
			r += 1;
			var row = table.insertRow(r);		

			for ( let c = 0; c < 7; c++) {
				// fill in days of prev month
				if( r === 2 && c === 0 ){
					const day = currDate.getDay();
					for( let d = 0; d < day; d++){
						var dCell = row.insertCell(c);
						var firstDayofMonth = new Date(date.getFullYear(), date.getMonth(), 1);
						firstDayofMonth.setDate(currDate.getDate() - d - 1);
						dCell.innerHTML = firstDayofMonth.getDate();
						dCell.setAttribute("id", "diffMonth");

					}
					c = day;
				}
				// fill in days of the curr month
				var cell = row.insertCell(c);
				cell.innerHTML = currDate.getDate();
				
				if ( currDate.getMonth() === date.getMonth()) {
					const cellDate = {
						month: currDate.getMonth() + 1,
                        day: cell.innerHTML,
                        year: currDate.getFullYear()
                    };
					// invoking callback only for days of curr month
                    cell.addEventListener("click", () => {
						this.callback(this.id, cellDate);
                    });
					cell.setAttribute("id", "currMonth");
                } else {
					cell.setAttribute("id", "diffMonth");
				}
				
				currDate.setDate(currDate.getDate() + 1);
			}
			
		}

		return table;
    }

	
	createHeader(table, date) {
		var header = table.createTHead();
        var firstRow = header.insertRow(0);

		// Row 0 Col 0
        var leftBttn = firstRow.insertCell(0);
        leftBttn.innerHTML = "<";
        leftBttn.setAttribute("id", "bttn");
        
		// Row 0 Col 1 to 5
        var month = firstRow.insertCell(1);
        var months = ["January", "February","March", "April","May", "June", "July", "August", "September",
        "October","November","December"];
        month.innerHTML = months[date.getMonth()] + "   " + date.getFullYear();
        month.colSpan = "5";

		// Row 0 Col 6
        var rightBttn = firstRow.insertCell(2);
        rightBttn.innerHTML = ">";
        rightBttn.setAttribute("id", "bttn");

        // Change Month Event Handlers
        leftBttn.addEventListener("click", () => {
            table.remove();
            date.setMonth(date.getMonth() - 1);
            console.log(date);
            this.render(date);
        });
        rightBttn.addEventListener("click", () => {
            table.remove();
            date.setMonth(date.getMonth() + 1);
            console.log(date);
            this.render(date);
        });

        return header;
	}
}