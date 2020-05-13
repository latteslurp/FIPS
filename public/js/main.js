$(document).ready(()=>{
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