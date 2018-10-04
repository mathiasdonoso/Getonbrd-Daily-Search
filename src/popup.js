document.addEventListener('DOMContentLoaded', () => {
  init();
});

const init = () => {
  fetch('https://www.getonbrd.cl/empleos/programacion')
    .then(response => response.text())
    .then(text => {
      stopLoading();
      const parser = new DOMParser();
      const content = parser.parseFromString(text, 'text/html');
      draw(getJobsList(content));
    })
    .catch(err => handleError(err));
};

const stopLoading = () => {
  document.getElementById('loader').style.display = 'none';
};


const getJobsList = (content) => {
  const jobList = [];
  const sectionJobs = content.getElementsByClassName('job');

  for (let job of sectionJobs) {

    let title = job.getElementsByClassName('job_desc')[0].getElementsByTagName('h4')[0];
    let formattedTitle = title.innerText.replace(/\r\n/g, '').replace(/[\r\n]/g, ' ');
    let url = `https://www.getonbrd.cl${job.firstElementChild.attributes[0].nodeValue}`;
    let date = job.getElementsByClassName('date')[0].innerText;
    let image = job.getElementsByClassName('job_logo')[0].outerHTML;
    let formattedImage = image.substring(image.indexOf('(') + 1, image.indexOf(')'))

    if (date.trim() === getCurrentDate().trim()) {
      jobList.push({
        'title': formattedTitle,
        'url': url,
        'date': date,
        'image': formattedImage
      });
    }
  }

  return jobList;
};

const draw = (list) => {
  const jobList = document.getElementById('job-list');

  for (let job of list) {
    let link = document.createElement('a');
    link.href = job.url;
    link.target = '_blank';

    let element = document.createElement('li');
    let image = document.createElement('img');
    image.src = job.image;
    let title = document.createElement('div');
    title.classList.add('title');
    title.innerText = job.title;

    element.appendChild(image);
    element.appendChild(title);
    link.appendChild(element);
    jobList.appendChild(link);
  }

  if (list.length === 0) {
    const mensaje = document.createElement('li');
    mensaje.classList.add('noJob');
    mensaje.innerText = 'No hay nuevos empleos el día de hoy.';
    jobList.appendChild(mensaje);
  }
};


const getCurrentDate = () => {
  const date = new Date();
  const months = [
    'ene', 'feb', 'mar', 'abr', 'may', 'jun',
    'jul', 'ago', 'sep', 'oct', 'nov', 'dic',
  ];

  const month = months[date.getMonth()];
  let day = date.getDate();

  if (day < 10) {
    day = "0" + day
  }

  const finalDate = month + ' ' + day;

  return finalDate;
}


const handleError = (err) => {
  console.error(err);
};
