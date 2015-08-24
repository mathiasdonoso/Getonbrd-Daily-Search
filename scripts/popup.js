document.addEventListener('DOMContentLoaded', function() {


    $.get('https://www.getonbrd.cl').success(function(data) {
        // var jobs = [];

        $('.loader').hide();
        $(data).find('ul.job-list').find('li').find('a').each(function(index, value) {

            var date = $(data).find('.cell.date')[index].textContent;
            var dateFormatted = date.substring(1, date.length-1)
            var title = $(this)[0].title;
            var url = $(this)[0].href;

            var job = {
                'title': title,
                'url': url,
                'date': dateFormatted
            };

            if (dateFormatted == 'jul 30') {
                $("#job-list").append('<li> <a href="' + url + '" target="_blank"><img src="./images/getonboard.png" alt="' + title + '" /> <div class="title">' + title + '</div> </a></li>');
            };
        
            // jobs.push(job);
        });
    });


});
