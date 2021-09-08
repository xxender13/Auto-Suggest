const search = document.getElementById('search');
const matchlist = document.getElementById('match-list');

//search data.json and filter it
const searchdata = async searchText => {
    const res = await fetch('./data.json');
    const data = await res.json();

    // get matches to current text
    console.log(data);
    let matches = data.filter(data => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return data.name.match(regex) || data.abbr.match(regex);
    });

    if (searchText.length == 0) {
        matches = [];
        matchlist.innerHTML = '';
    }

    outputHtml(matches);
};

const outputHtml = matches => {
    if (matches.length > 0) {
        const html = matches.map(match => `
        <div class ="card card-body  mb-1">
        <h4>${match.name} (${match.abbr})  <br>
        Post-${match.post} ${match.website} </h4>
        </div>
        
        `).join('');
        matchlist.innerHTML = html;
    }

}
search.addEventListener('input', () => searchdata(search.value));