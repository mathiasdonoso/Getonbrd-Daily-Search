document.addEventListener('DOMContentLoaded', function() {

    $.get('https://www.getonbrd.cl').success(function(data) {
        // var jobs = [];

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
                'image': image
            };

            if (dateFormatted == 'ago 20') {
                // jobs.push(job);
                $("#job-list").append('<li> <a href="' + url + '" target="_blank"><img src="' + imageFormatted +'" alt="' + title + '" /> <div class="title">' + title + '</div> </a></li>');
            };
        
            // jobs.push(job);
        });
    });


});
