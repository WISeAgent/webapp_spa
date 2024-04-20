$(document).ready(function() {
    $.getJSON('../data/OTelLogs.json', function(json) {
        let columns = [];
        if (json.length > 0) {
            // Create column headers dynamically from the first data object keys
            columns = Object.keys(json[0]).map(key => ({
                data: key, title: key.charAt(0).toUpperCase() + key.slice(1) // Capitalize headers
            }));
        }

        $('#myTable').DataTable({
            data: json,
            columns: columns
        });
    });
});
