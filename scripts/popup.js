document.addEventListener('DOMContentLoaded', function() {

    var page = 'https://www.getonbrd.cl'

    $.get(page).success(function(data) {
        var jobs = [];
        $('.loader').hide();

        $(data).find('.job-list a').each(function(index, value) {
            var $self           = $(this);
            var date            = $self.children('.cell.date').text();
            var dateFormatted   = date.substring(1, date.length - 1);
            var title           = $self.children('.job_desc').children('h4').text();
            var url             = page + $self[0].href;
            var urlFormatted    = url.replace('chrome-extension://' + $self[0].host, '');
            var image           = $self.children().context.innerHTML;
            var imageFormatted  = image.substring(image.indexOf('(') + 1, image.indexOf(')'));

            var job = {
                'title': title,
                'url': urlFormatted,
                'date': dateFormatted,
                'image': image
            };

            if (dateFormatted == getDate()) {
                jobs.push(job);
                $("#job-list").append('\
                  <a href="' + urlFormatted + '" target="_blank">\
                    <li>\
                      <img src="' + imageFormatted +'" alt="' + title + '" />\
                      <div class="title">' + title + '</div>\
                    </li>\
                  </a>'
                );
            };
        });

        if (jobs.length == 0) {
            $("#job-list").append('<li class="noJob">No hay nuevos empleos el día de hoy.</li>');
        };
    });
});
