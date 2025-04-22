$(window).on("load", function(){
    $('#loader_wrapper').fadeOut('slow');
});

// typing animation
const options = {
    strings: ['Web Developer.', 'Teaching Assistant', 'AI Engineer'],
    typeSpeed: 100,
    backSpeed: 50,
    loop: true,
};
const typed = new Typed('.typerjs', options);


// fetching year 
/// Year retriver for footer
document.getElementById("year").innerHTML = (new Date().getFullYear());
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// Header Scroll
let nav = document.querySelector(".navbar");
let nav_list = document.querySelector(".menu-navbar-nav");
$( window ).scroll(function () {
    if(document.documentElement.scrollTop > 20){
        nav.classList.add("header-scrolled");
        nav_list.classList.add("menu-navbar-nav-scrolled");
    }else{
        nav.classList.remove("header-scrolled");
        nav_list.classList.remove("menu-navbar-nav-scrolled");
    }
} 
)

// Send Email function
const emailButton = document.getElementById('sendmail');


function sendEmail(event) {
    event.preventDefault();
    
    // Clear any previous messages

    
    // Get form inputs
    const nameInput = document.getElementById("form-name");
    const phoneInput = document.getElementById("form-phone");
    const emailInput = document.getElementById("form-email");
    const messageInput = document.getElementById("form-message");
    
    // Basic validation
    if (!nameInput.value.trim()) {
        emailInfo.innerHTML = '<i class="fas fa-exclamation-circle"></i> Please enter your name';
        return;
    }
    
    if (!emailInput.value.trim()) {
        emailInfo.innerHTML = '<i class="fas fa-exclamation-circle"></i> Please enter your email';
        return;
    }
    
    if (!messageInput.value.trim()) {
        emailInfo.innerHTML = '<i class="fas fa-exclamation-circle"></i> Please enter a message';
        return;
    }
    
    // Show loading state
    emailButton.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Sending...';
    emailButton.classList.add("disabled_def");
    emailButton.style.cursor = "default";
    emailButton.style.pointerEvents = "none";

    
    // Prepare data for EmailJS
    let data = {
        service_id: 'service_lnq0i8r',
        template_id: 'template_ywd5pbv',
        user_id: 'CQjQX5z5gvDcvjEHY',
        template_params: {
            name: nameInput.value,
            email: emailInput.value,
            phone: phoneInput.value || 'Not provided',
            message: messageInput.value
        }
    };
    
    // Send email using EmailJS API
    $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json'
    }).done(function() {
        // Success handling
        emailButton.innerHTML = '<i class="fa fa-check"></i> Message Sent!';
        emailButton.style.background = "green";
        
        // Reset form
        document.getElementById("contact-form").reset();
        
        // Reset button after delay
        setTimeout(function() {
            emailButton.innerHTML = 'Submit';
            emailButton.style.background = "";
            emailButton.classList.remove("disabled_def");
            emailButton.style.cursor = "pointer";
            emailButton.style.pointerEvents = "auto";
        }, 3000);
        
    }).fail(function(error) {
        // Error handling
        console.error("EmailJS error:", error);
        emailButton.innerHTML = '<i class="fa fa-times"></i> Failed';
        emailButton.style.background = "red";
        
        // Reset button after delay
        setTimeout(function() {
            emailButton.innerHTML = 'Submit';
            emailButton.style.background = "";
            emailButton.classList.remove("disabled_def");
            emailButton.style.cursor = "pointer";
            emailButton.style.pointerEvents = "auto";
        }, 3000);
    });
}