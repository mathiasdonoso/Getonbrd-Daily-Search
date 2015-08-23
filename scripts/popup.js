document.addEventListener('DOMContentLoaded', function() {

    $.get('https://www.getonbrd.cl').success(function(data) {
        var jobs = [];

        $(data).find('ul.job-list li a').each(function(index, value) {

            $('#loader').hide();

            var date = $(data).find('.cell.date')[index].textContent;
            var dateFormatted = date.substring(1, date.length-1)
            var title = $(this)[0].title;
            var url = $(this)[0].href;
            var image = $(data).find('.job_logo')[index].outerHTML;
            var imageFormatted = image.substring(image.indexOf('(') + 1, image.indexOf(')'));

            var job = {
                'title': title,
                'url': url,
                'date': dateFormatted,
                'image': image
            };

            //if (dateFormatted == getDate()) {
            if (dateFormatted == 'ago 20') {
                jobs.push(job);
                $("#job-list").append('<li> <a href="' + url + '" target="_blank"><img src="' + imageFormatted +'" alt="' + title + '" /> <div class="title">' + title + '</div> </a></li>');
            };
        });

        if (jobs.length == 0) {
            $("#job-list").append('<li>No hay nuevos empleos el día de hoy.</li>');
        };
    });


});


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
