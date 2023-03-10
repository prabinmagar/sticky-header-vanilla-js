const dataContainer = document.getElementById('data-container');

const fetchData = async() => {
    const response = await fetch("../../characters.json");
    const characters = await response.json();
    return characters;
}

const populateData = async() => {
    const data = await fetchData();
    let html = "";
    data.forEach(item => {
        const eyeColor = item.eye_color !== null ? `<span class="badge badge-${item.eye_color}">${item.eye_color}</span>` : "--";
        const hairColor = item.hair_color !== null ? `<span class="badge badge-${item.hair_color}">${item.hair_color}</span>` : "--";
        const skinColor = item.skin_color !== null ? `<span class="badge badge-${item.skin_color}">${item.skin_color}</span>` : "--";

        html += `
        <tr class = "table-row">
            <td class = "table-cell">${item.id}</td>
            <td class = "table-cell">
                <div class = "character-elem">
                    <span class = "character-avatar">
                        <img src = "${item.image}" alt = "character image">
                    </span>
                    <span class = "character-name">${item.character_name}</span>
                </div>
            </td>
            <td class = "table-cell">${item.alignment}</td>
            <td class = "table-cell">${item.gender}</td>
            <td class = "table-cell text-center">${eyeColor}</td>
            <td class = "table-cell">${item.race}</td>
            <td class = "table-cell text-center">${hairColor}</td>
            <td class = "table-cell">${item.publisher}</td>
            <td class = "table-cell text-center">${skinColor}</td>
            <td class = "table-cell">${item.height}</td>
        </tr>
        `
    });
    
    dataContainer.innerHTML = html;
}

populateData();

let tableOffset = document.getElementById('table-one').offsetTop;
let clonedHeader = document.querySelector('#table-one > thead').cloneNode(true);
document.getElementById('header-fixed').appendChild(clonedHeader);

window.addEventListener('scroll', function(event){
    let offset = this.scrollY;

    if(offset >= tableOffset){
        document.getElementById('header-fixed').style.display = "block";
    } else if(offset < tableOffset){
        document.getElementById('header-fixed').style.display = "none";
    }
});