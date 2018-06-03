// Fetch API
fetch('https://gauthier-sgp-api.herokuapp.com/api/collaborateurs/')
    .then((resp) => resp.json())
    .then(data => afficher(data))

function afficher(data) {

    var lignes = data.map(unCollab => `
        <tr>
            <td>${unCollab.matricule}</td>
            <td>${unCollab.nom}</td>
        </tr>
    `).join('')

    var html = `
        <table class="table table-striped table-bordered table-sm">
            <thead>
                <th>Matricule</th>
                <th>Nom</th>
            </thead>
            <tbody>
               ${lignes}
            </tbody>
        </table>
    `;
    document.querySelector('#collabs').innerHTML = html
}

$("#collabs").on("click", "td", function () {

    var matricule = $(this).closest('tr').find('td:first').text();
    
});

$("#btn-sav").click(function () {
    console.log("hello");
});