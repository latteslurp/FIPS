$(document).ready(()=>{
    //NAVBAR
    //navbar
    var button = $('.toggle-icon');
    var icon = $('#carrot-toggle')
    button.on('click',()=>{
        icon.toggleClass("rotate");
    });


    // scrollreveal
    window.sr = ScrollReveal();
    sr.reveal('.invite-icon',{
        origin:'left',
        distance:'300px',
        easing:'ease-in-out',
        duration: 800
    });
    sr.reveal('.invite-text',{
        origin:'right',
        distance:'300px',
        easing:'ease-in-out',
        duration: 800
    });
});