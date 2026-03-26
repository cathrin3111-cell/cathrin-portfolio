document.addEventListener('DOMContentLoaded', function() {

    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name === '' || email === '' || message === '') {
            alert('Please fill in all fields!');
            return;
        }

        fetch('https://your-render-url.onrender.com/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                document.querySelector('.contact-form-box').innerHTML =
                    '<h3 style="color:#806375;text-align:center;padding:30px;background:#f0dce8;border-radius:8px;border:2px solid #806375;font-size:1.1rem;">✅ Thank you! Your message has been sent successfully!</h3>';
            }
        })
        .catch(() => {
            alert('Error sending message. Please try again.');
        });
    });
});