$(document).ready(function() {
    $.getJSON('../data/OTelLogs.json', function(data) {
        if (data.length > 0) {
            // Example: dynamically determine and populate the columns
            var columns = Object.keys(data[0]).map(function(key) {
                return {data: key, title: key.toUpperCase()};
            });
            
            // Dynamically populate the thead and tfoot with columns
            var theadTr = $('#myTable thead tr');
            var tfootTr = $('#myTable tfoot tr');
            columns.forEach(function(column) {
                theadTr.append($('<th>').text(column.title));
                tfootTr.append($('<th>').html('<input type="text" placeholder="Search ' + column.title + '" />'));
            });
            
            // Now that the DOM is fully prepared, initialize DataTables
            var table = $('#myTable').DataTable({
                data: data,
                columns: columns,
                responsive: true
            });
            
            // Apply column search functionality
            table.columns().every(function() {
                var that = this;
                $('input', this.footer()).on('keyup change', function() {
                    if (that.search() !== this.value) {
                        that.search(this.value).draw();
                    }
                });
            });
        }
    });
});
        
