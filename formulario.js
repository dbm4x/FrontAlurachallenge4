window.addEventListener("load", function () {


    const form = document.querySelector("#formulario")


    form.addEventListener('submit', e => {
        e.preventDefault();

        let nombre = document.getElementById("nombre");
        let asunto = document.getElementById("asunto");
        let email = document.getElementById("email");
        let mensaje = document.getElementById("mensaje");


        var formatoEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


        let isValid = true;


        if (nombre.value === '') {
            document.getElementById('validacion-nombre').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('validacion-nombre').style.display = 'none';
        }

        if (!email.value.match(formatoEmail)) {
            document.getElementById('validacion-email').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('validacion-email').style.display = 'none';
        }


        if (asunto.value === '') {
            document.getElementById('validacion-asunto').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('validacion-asunto').style.display = 'none';
        }

        if (mensaje.value === '') {
            document.getElementById('validacion-mensaje').style.display = 'block';
            isValid = false;
        } else {
            document.getElementById('validacion-mensaje').style.display = 'none';
        }


        if (!isValid) {
            event.preventDefault();
        } else {

            document.getElementById('spinner').style.display = 'block';
            document.getElementById('submitBtn').style.display = 'none';
            const msjError = document.getElementById('envio-error');
            msjError.style.display = 'none';

            const enviar = new FormData();

            //Enviar campos indepenientes
            enviar.append('Nombre', nombre.value);
            enviar.append('Email', email.value);
            enviar.append('Asunto', asunto.value);
            enviar.append('mensaje', mensaje.value);

            //Enviar como un todo
            enviar.append('mensaje',
                `Contacto desde Portafolio Web:
        
        Nombre: ${nombre.value}
        Email: ${email.value}
        Asunto: ${asunto.value}
        
        mensaje:
        
        ${mensaje.value}`);


            fetch('https://formspree.io/f/xvonlyej', {
                method: 'POST',
                body: enviar,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    const msjOk = document.querySelector('.msj-ok');
                    msjOk.style.display = 'block';
                    document.getElementById('spinner').style.display = 'none';
                    document.getElementById('submitBtn').style.display = 'none';
                } else {
                    response.json().then(data => {
                        const msjError = document.getElementById('envio-error');
                        msjError.style.display = 'block';
                        document.getElementById('spinner').style.display = 'none';
                        document.getElementById('submitBtn').style.display = 'block';

                    })
                }
            }).catch((error) => {
                const msjError = document.getElementById('envio-error');
                msjError.style.display = 'block';
                document.getElementById('spinner').style.display = 'none';
                document.getElementById('submitBtn').style.display = 'inline-block';
            });
        }



    });

});