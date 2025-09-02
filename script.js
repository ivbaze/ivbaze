document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

function createCloud() {
    const cloudEmojis = ['☁️'];
    const cloud = document.createElement('div');
    cloud.className = 'cloud';
    cloud.innerHTML = cloudEmojis[Math.floor(Math.random() * cloudEmojis.length)];
    cloud.style.top = Math.random() * window.innerHeight + 'px';
    cloud.style.animation = `cloudFloat ${Math.random() * 20 + 30}s linear`;
    cloud.style.opacity = (Math.random() * 0.4 + 0.6).toString();
    cloud.style.transform = `scale(${Math.random() * 0.5 + 0.8})`;
    document.body.appendChild(cloud);
    
    cloud.addEventListener('animationend', () => cloud.remove());
}

setInterval(createCloud, 6000);
for(let i = 0; i < 4; i++) createCloud();

document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
});

async function loadMediumArticles() {
  const statusDiv = document.getElementById('status');
  const articlesDiv = document.getElementById('medium-articles');

  try {
    const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@faaa367810');
    const data = await response.json();

    if (data.status === 'ok' && data.items.length) {
      statusDiv.remove();

      const html = data.items.map((item, index)=> {
        const desc = item.description || '';
        const match = desc.match(/<img[^>]+src="([^">]+)"/i);
        const img = match ? match[1] : 'https://via.placeholder.com/300x200?text=No+Image';
        const date = new Date(item.pubDate).toLocaleDateString();

        const extraClass = index > 1 ? 'extra hidden' : '';

        return `
            <div class="blog-card ${extraClass}">
            <img src="${img}" alt="Blog image">
            <div class="blog-content">
              <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
              <p class="blog-date">${date}</p>
              <p>${(item.description.replace(/<[^>]+>/g, '').substring(0, 150))}...</p>
            </div>
          </div>
        `;
      }).join('');

      articlesDiv.innerHTML = html;

    } else {
      statusDiv.textContent = ' No articles found';
    }
  } catch (e) {
    statusDiv.textContent = ` Error: ${e.message}`;
  }
}

document.addEventListener('DOMContentLoaded', loadMediumArticles);

function toggleSection(button) {
  const section = button.closest('section');
  const extras = section.querySelectorAll('.extra');

  extras.forEach(card => {
    card.classList.toggle('hidden');
  });

  button.innerText = button.innerText === 'View More' ? 'View Less' : 'View More';
}
