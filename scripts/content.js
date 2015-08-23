$(window).load(function() {
    init();
});

function init() {

    $.get('https://www.getonbrd.cl').success(function(data) {
        var jobs = [];

        $(data).find('ul.job-list').find('li').find('a').each(function(index, value) {

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
                'image': imageFormatted
            };

            if (dateFormatted == 'ago 20') {
                jobs.push(job);
                $("#job-list").append('<li> <a href="' + url + '" target="_blank"><img src="' + imageFormatted +'" alt="' + title + '" /> <div class="title">' + title + '</div> </a></li>');
            };
        
        });

        console.log(jobs);
    });
};

function getDate() {
    var date = new Date();
    var months = new Array();
    month[0] = "ene";
    month[1] = "feb";
    month[2] = "mar";
    month[3] = "abr";
    month[4] = "may";
    month[5] = "jun";
    month[6] = "jul";
    month[7] = "ago";
    month[8] = "sep";
    month[9] = "oct";
    month[10] = "nov";
    month[11] = "dic";

    var month = months[date.getMonth()];
    var day = date.getDate();

    if (day < 10) {
        day = "0" + day
    }

    var finalDate = month + ' ' + day;

    return finalDate;
}
