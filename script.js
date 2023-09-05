$(document).ready(function () {

    // BARRE DE RECHERCHE 
    $("#searchbar , #selectCity").on('input change', function () {

        var barberName = $('#searchbar').val();
        var barberCity = $("#selectCity").val();
       // On définit l'URL
        var apiUrl = 'http://127.0.0.1:8000/api/barbershops'

        // Si value de searchbar ou select City pas vide on l'ajoute a l'URL
        if ($('#searchbar').val() !== "") {
            apiUrl += (apiUrl.includes('?') ? '&' : '?') + 'nom=' + barberName;
        }

        if ($('#selectCity').val() !== "") {
            apiUrl += (apiUrl.includes('?') ? '&' : '?') + 'ville=' + barberCity;
        }
        
        // On envoie la requete 
        $.ajax({
            url: apiUrl,
            method: "GET", 
            dataType: "json", 
            success: function (data) {
                // Selection de la div qui contiendra les résultats
                var resultsDiv = $(".result");
                // On la vide a chaque recherche
                resultsDiv.empty();
                // Pour chaque résultat, on l'affiche dans result
                $.each(data, function (index, barber) {
                    var barberCard = $("<div class='barber-card'></div>");
                    var h1 = $("<h1>" + barber.nom + "</h1>");
                    var img = $("<img src='" + barber.photo + "' class='barber-img'>");
                    var adresse = $("<p><i class='fa-solid fa-location-dot'></i>&nbsp;" + barber.adresse + ", " + barber.ville + "</p>")
                    var button = $("<a href='' id='discover' data-id='" + barber.id + "'> Découvrir </a>");
                    barberCard.append(h1);
                    barberCard.append(adresse);
                    barberCard.append(img);
                    barberCard.append(button);
                    resultsDiv.append(barberCard);
                });
            },
            error: function (error) {
                console.error("Erreur lors de la requête :", error);
            }
        });
    });
   
    // DETAIL D'UN BARBER
    $(document).on('click', '#discover', function (e) {            
        e.preventDefault();
        var resultsDiv = $(".result");
        // On récupère l'id du barbier dans le data-id du lien 
        var barberId = $(this).data('id');

        // On refait une requete pour récuperer seulement les données du barbier selectionné
        $.ajax({
            url: 'http://127.0.0.1:8000/api/barbershops/' + barberId,
            method: "GET", 
            dataType: "json", 
            success: function (data) {
                resultsDiv.empty();
                    var barberDetail = $("<div class='barber-detail'></div>");
                    var h1 = $("<h1>" + data.nom + "</h1>");
                    var img = $("<img src='" + data.photo + "' class='barber-img'>");
                    var desc = $("<p>" + data.description + "</p>")
                    var adresse = $("<p><i class='fa-solid fa-location-dot'></i>&nbsp;" + data.adresse + ", " + data.ville + "</p>")
                    barberDetail.append(h1);
                    barberDetail.append(adresse);
                    barberDetail.append(desc);
                    barberDetail.append(img);
                    resultsDiv.append(barberDetail);
            },
            error: function (error) {
                console.error("Erreur lors de la requête :", error);
            }
        });

    })
    

});

