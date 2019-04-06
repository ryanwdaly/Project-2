$(document).ready(function() {
    $.get("/api/smart-rocket-data/all", function(data) {
        console.log(data);

        for (let i = 0; i < data.length; i++) {

          
            let newRow = $("<tr>")
            newRow.attr("id", i)

            let newId = generateEl(data[i].id);
            let newPop = generateEl(data[i].population);
            let newMut = generateEl(data[i].mutation_rate);
            let newFrames = generateEl(data[i].frames);
            let newSuccess = generateEl(data[i].first_success_generation);
            console.log(newId)
            $("#data-body").append(newRow)

            $("#" + i).append(newId)
            $("#" + i).append(newPop)
            $("#" + i).append(newMut)
            $("#" + i).append(newFrames)
            $("#" + i).append(newSuccess)
        }
    });
    function generateEl(data) {
        let newEl = $("<td>");
        newEl.html(data);
        return newEl
    }
});
