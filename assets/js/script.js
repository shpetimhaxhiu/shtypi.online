// funksionet qe kena mi zhvillu, etj

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

        rest_api = clean_url + '/wp-json/wp/v2/';   // wp_rest_api

        // TODO: funksioni qe merr postimet
    }
    // nese seshte ne rregull linku error
    catch (e) {
        $('.site-header').append('<div class="error">That didn&rsquo;t work. Try a different URL.</div>');
    }
  });
})

