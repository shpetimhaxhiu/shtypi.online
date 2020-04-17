// masi te loadohet jQuery
jQuery(document).ready(function($){
  // Kur te klikohet ndonje portal-link
  $('.portal-link').on("click", function(e){
    
    // Mos e bo refresh faqen
    e.preventDefault();

    // Merr linkun
    var portal_link = $(this).attr('data-portal-link');

    // Kontrolloje linkun
    try {
        $('.error').remove();
        var clean_url = (new URL(portal_link)).protocol + '//' + (new URL(portal_link)).hostname;

        var rest_api = clean_url + '/wp-json/wp/v2/';   // wp_rest_api

        // TODO: funksioni qe merr postimet
        wp_lista_postimeve(rest_api);
    }
    // nese seshte ne rregull linku error
    catch (e) {
        $('.site-header').append('<div class="error">That didn&rsquo;t work. Try a different URL.</div>');
    }
  });
  // //Kur te klikohet ndonje portal-link



  function wp_lista_postimeve($rest_api) {

    var postimet_url = $rest_api + 'posts/';

    // provo me kontaktu
    $.ajax({
        dataType: 'json',
        url: postimet_url
    })

    // nese ka sukses
    .done(function(data){
        console.log(data);

        // TODO: Me manipulu html-in ne index
        krijo_listen_cardave(data);
    })

    // nese ka deshtu
    .fail(function() {
        // $('.site-header').append('<div class="error">That didn&rsquo;t work. Try a different URL.</div>');
        console.log('ERROR: REST error. Nothing returned for AJAX.');
    })

    // gjithmone
    .always(function() {
        $('.nav-loader').remove();
    })
}


function krijo_listen_cardave(objektet){

  // Zbrase listen me karda
  $('.card-columns').empty().append('<ul></ul>');

  var karda_re;

  // Per secilin objekt nga postimet
  for(var i=0; i<objektet.length; i++) {

    // krijoje nje kard
    karda_re =
          '<div class="card">' +
            '<div class="card-body">' +
              '<div class="card-title">' +
                '<a href="javascript:void(0)" data-id="' + objektet[i].id + '">' +
                  objektet[i].title.rendered +
                '</a>' +
              '</div>' +
            '</div>' +
          '</div>';

      // vendose karden e re tek lista kardave
      $('.card-columns').append(karda_re);
  }


}

})

