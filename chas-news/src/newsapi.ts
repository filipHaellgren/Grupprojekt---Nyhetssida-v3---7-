const apiKey = '24b5031ec0774cdfbca8b3741c2a102f'; // Replace with your actual API key
const apiUrl = 'https://newsapi.org/v2/top-headlines';

const params = {
  
  category: 'technology',
  language: 'en',
  country: 'us',
  apiKey: apiKey,
};


/*   q: 'bitcoin',
  sources: 'bbc-news,the-verge',
  domains: 'bbc.co.uk, techcrunch.com',
  from: '2017-12-01',
  to: '2017-12-12',
  language: 'en',
  sortBy: 'relevancy',
  page: 2
 */
const queryString = Object.keys(params)
  .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  .join('&');

const url = `${apiUrl}?${queryString}`;

const newsContainer = document.getElementById('news-container');

fetch(url)
  .then(response => response.json())
  .then(data => {
    if (data.articles) {
      // Create an array of objects containing title and image URL
      const articlesWithImages = data.articles.map(article => ({
        title: article.title,
        imageUrl: article.urlToImage,
      }));

      // Update the innerHTML of the news container with a list of articles and images
      newsContainer.innerHTML = `<ul>${articlesWithImages.map(item => `
        <li>
          <div>
            <img src="${item.imageUrl}" alt="Article Image" style="max-width: 100px; max-height: 100px;">
            <p>${item.title}</p>
          </div>
        </li>`).join('')}</ul>`;
    } else {
      console.error('Invalid response format:', data);
    }
  })
  .catch(error => console.error('Error fetching data:', error));
