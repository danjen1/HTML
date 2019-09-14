// Get the modal
var modal = document.getElementById("contact");
window.onload = contactFormButtons;

function contactFormButtons() {
    var contactLink = document.getElementById("contactForm");
    contactLink.onclick = handleControl;

    var cancel = document.getElementById("cancelbtn");
    cancel.onclick = handleControl;

    var close = document.getElementById("modalClose");
    close.onclick = handleControl;
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        var form = document.getElementById("form");
        form.reset();

    }
}

function handleControl(e){
    var id = e.target.getAttribute("id");
    if(id == "contactForm"){
        document.getElementById("contact").style.display="block";
    }
    if(id == "cancelbtn"){
        document.getElementById("contact").style.display="none";
    }
    if(id == "modalClose"){
        document.getElementById("contact").style.display="none";
    }
}

$( ".certImage" ).click(function() {
    if (  $( this ).css( "transform" ) == 'none' ){
        $(this).css("transform","scale(2)");
    } else {
        $(this).css("transform","" );
    }
});

$(document).ready(function() {
    $("body").on('click', '.top', function() {
        $("nav.menu").toggleClass("menu_show");
    });
});