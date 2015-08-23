function getDate() {
    var date = new Date();
    var months = new Array();
    months[0] = "ene";
    months[1] = "feb";
    months[2] = "mar";
    months[3] = "abr";
    months[4] = "may";
    months[5] = "jun";
    months[6] = "jul";
    months[7] = "ago";
    months[8] = "sep";
    months[9] = "oct";
    months[10] = "nov";
    months[11] = "dic";

    var month = months[date.getMonth()];
    var day = date.getDate();

    if (day < 10) {
        day = "0" + day
    }

    var finalDate = month + ' ' + day;

    return finalDate;
}