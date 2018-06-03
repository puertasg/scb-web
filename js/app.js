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

var dernierMatricule = "";
$("#collabs").on("click", "td", function () {

    dernierMatricule = $(this).closest('tr').find('td:first').text();

    //Récupération des données bancaires du collaborateur choisi et alimente les inputs correspondants
    $.ajax({
        type: "GET",
        url: "https://gauthier-sgp-api.herokuapp.com/api/collaborateurs/" + dernierMatricule + "/banque",
        success: function (data) {
            //$("#inputBanque").val(data.nomBanque);
            $("#inputBanque").val(data.id);
            $("#inputIban").val(data.iban);
            $("#inputBic").val(data.bic)
        },
        error: function (e) {
            console.log(e);
        }
    });

    //Permet de donner une indication visuelle sur le collaborateur choisi
    $("tr").removeClass("table-primary");
    $(this).closest('tr').addClass("table-primary");
});

$("#formBanque").on("submit", function (e) {
    e.preventDefault();

    if (dernierMatricule != "") {

        //Création d'un objet JSON banque
        var banque = {
            //"nomBanque": $("#inputBanque").val(),
            "id": $("#inputBanque").val(),
            "iban": $("#inputIban").val(),
            "bic": $("#inputBic").val()
        };

        //Envoi de la requete vers l'api
        $.ajax({
            type: "PUT",
            url: "https://gauthier-sgp-api.herokuapp.com/api/collaborateurs/" + dernierMatricule + "/banque",
            contentType: "application/json",
            data: banque,
            error: function (e) {
                console.log(e);
            }
        });
    }
    else {
        alert("Veuillez choisir un collaborateur");
    }
});