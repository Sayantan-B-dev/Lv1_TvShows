const form = document.querySelector("#searchForm");
const container = document.querySelector("#container");
const backText = document.querySelector("#backText");
const searchResult = document.querySelector("#searchResult");


form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const searchTerm = form.elements.q.value;
    const config = { params: { q: searchTerm } };
    const res = await axios.get(`https://api.tvmaze.com/search/shows`, config);
    backText.classList.add('displayToggle');
    container.innerHTML = '';
    searchResult.innerText = `Search results for: ${searchTerm}`;
    addCard(res.data);
    form.elements.q.value = '';
    
});
const addCard = (data) => {
    for (let tvShow of data) {
    if (tvShow.show.image) {
        const card = document.createElement('div');
        card.classList.add('card');

        const img = document.createElement('img');
        img.src = tvShow.show.image.original;
        img.classList.add('card-image');
            
        const content = document.createElement('div');
        content.classList.add("card-content");

        const h2 = document.createElement('h2');
        h2.innerText=tvShow.show.name
        h2.classList.add("card-title");

        const p = document.createElement('p');
        p.innerHTML = tvShow.show.summary;
        p.classList.add("card-text");

        const button = document.createElement('button');
        button.innerText = 'Watch'
        button.addEventListener('click', () => {
            window.open(tvShow.show.url);
        });
        button.classList.add("card-button");

        content.append(h2);
        content.append(p);
        content.append(button);

        card.append(img);
        card.append(content);
    
        container.append(card);
    }
    }
};
