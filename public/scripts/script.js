//select elements from DOM
const APIkey = '31e4f6a29b8faf4952a44d7d753057bb';
const APIurl = 'https://api.themoviedb.org/3/search/collection?api_key=31e4f6a29b8faf4952a44d7d753057bb&query=happy';
const IMGurl = 'https://image.tmdb.org/t/p/w500';


const button = document.getElementById('searchButton');
const userInput = document.getElementById('inputValue');
const titleCollection = document.getElementById('titleCollection');

function titleSelection(titles) { 
    return titles.map((title)=> { 
        if (title.poster_path) { 
        return `
            <img src = ${IMGurl + title.poster_path} info-title-id${title.id}/>
        `;
        }
    })
}
function createTitleCollection(titles) { 
    const titleElement = document.createElement('div');
    titleElement.setAttribute('class','title');
    const titleInfoTemplate = `
        <section class="section">
        ${titleSelection(titles)}
        </section>
        <div class="content">
            <p id ="contentExit">X</p>
        </div>
        `;
        titleElement.innerHTML = titleInfoTemplate;
        return titleElement;
}

button.onclick = function(event) { 
    event.preventDefault();
    //gets user value and inputs into console
    const value = userInput.value;

    const updateURL = APIurl + '&query=' + value;
    fetch(updateURL) 
        .then((res) => res.json())
        .then((info) => {
            const titles =info.results;
            const titleBlock = createTitleCollection(titles);
            titleCollection.appendChild(titleBlock);
            console.log('Info: ', info);
        })
        .catch((error) => { 
            console.log('Error: ', error);
        });
    console.log('Value: ', value);
}


