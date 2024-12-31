document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('nav a');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const url = e.target.getAttribute('href');
            history.pushState(null, '', url);

            // Load content dynamically
            fetch(url)
                .then(response => response.text())
                .then(html => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
                    document.querySelector('main').innerHTML = doc.querySelector('main').innerHTML;
                })
                .catch(err => console.error('Failed to load page', err));
        });
    });
});