(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })

    // User menu toggle
    const navUser = document.getElementById('nav-user');
    const userMenu = document.getElementById('user-menu');

    if (navUser && userMenu) {
        navUser.addEventListener('click', (e) => {
            e.stopPropagation();
            userMenu.classList.toggle('show');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navUser.contains(e.target) && !userMenu.contains(e.target)) {
                userMenu.classList.remove('show');
            }
        });
    }
})()
