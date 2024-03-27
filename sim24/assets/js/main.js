
/*Detalle producto */
var totalGeneral = 0;
var items = [];

document.getElementById('add-item').addEventListener('click', function() {
    var merchandise = document.getElementById('merchandise').value;
    var quantity = parseInt(document.getElementById('quantity').value);
    var itemName = '';
    var price = 0;
    
    switch (merchandise) {
        case 'sombrero':
            itemName = 'Sombrero';
            price = 100;
            break;
        case 'vaso':
            itemName = 'Vaso';
            price = 50;
            break;
        case 'gorra':
            itemName = 'Gorra';
            price = 75;
            break;
        default:
            break;
    }
    
    var total = price * quantity;
    totalGeneral += total;

    items.push({ itemName: itemName, quantity: quantity, price: price });

    var listItem = document.createElement('li');
    listItem.textContent = itemName + ' - Cantidad: ' + quantity + ' - Precio Unitario: Q' + price + ' - Total: Q' + total;
    
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.addEventListener('click', function() {
        totalGeneral -= total;
        items = items.filter(item => item.itemName !== itemName);
        listItem.remove();
        document.getElementById('total').textContent = 'Q' + totalGeneral;
    });
    listItem.appendChild(deleteButton);

    document.getElementById('selected-items').appendChild(listItem);
    document.getElementById('total').textContent = 'Q' + totalGeneral;
});

document.getElementById('download-pdf').addEventListener('click', function() {
    var docDefinition = {
        content: [
            { text: 'Detalle de Pago', style: 'header' },
     
            { text: 'Artículos Seleccionados:', style: 'subheader' },
            {
                ul: items.map(item => `${item.itemName} - Cantidad: ${item.quantity} - Precio Unitario: Q${item.price} - Total: Q${item.price * item.quantity}`)
            },
            { text: `Total General: Q${totalGeneral}`, style: 'total' }
        ],
        styles: {
            header: { fontSize: 18, bold: true, margin: [0, 0, 0, 10] },
            subheader: { fontSize: 16, bold: true, margin: [0, 10, 0, 5] },
            total: { fontSize: 14, bold: true, margin: [0, 10, 0, 0] }
        }
    };

    pdfMake.createPdf(docDefinition).download('detalle_pago.pdf');
});




/* validacion registro de pago */
document.getElementById('payment-form').addEventListener('submit', function(event) {
    var carnet1 = document.getElementById('carnet1').value;
    var carnet2 = document.getElementById('carnet2').value;
    var carnet3 = document.getElementById('carnet3').value;
    var boleta = document.getElementById('boleta').value;
    var fileInput = document.getElementById('fileInput').files[0]; // Obtener el archivo seleccionado

    if (carnet1.trim() === '' || carnet2.trim() === '' || carnet3.trim() === '' || boleta.trim() === '' || !fileInput) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, completa todos los campos y selecciona un archivo.'
        });
        event.preventDefault(); // Detiene el envío del formulario si algún campo está vacío o no se seleccionó archivo
    } else if (fileInput.size > 2 * 1024 * 1024) { // Verificar que el tamaño del archivo sea menor o igual a 2MB
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El archivo seleccionado excede el límite de tamaño (2MB).'
        });
        event.preventDefault(); // Detiene el envío del formulario si el archivo excede el límite de tamaño
    } else {
        // Envío exitoso
        Swal.fire({
            icon: 'success',
            title: '¡Envío exitoso!',
            text: 'Tu formulario ha sido enviado correctamente.'
        });
    }
});



/* registro */
document.getElementById('submitBtn').addEventListener('click', function(event) {
    var carnet1 = document.getElementById('carnet1').value.trim();
    var carnet2 = document.getElementById('carnet2').value.trim();
    var carnet3 = document.getElementById('carnet3').value.trim();
    var nombres = document.getElementById('grid-last-name').value.trim();
    var apellidos = document.getElementById('grid-password').value.trim();
    var correo = document.getElementById('grid-city').value.trim();
    var fechaNacimiento = document.getElementById('grid-zip').value.trim();


    if (carnet1.trim() === '' || carnet2.trim() === '' || carnet3.trim() === '' || nombres.trim() === '' || nombres.trim() === '' || apellidos.trim() === '' ||
    correo.trim() === '' || fechaNacimiento.trim() === ''    ) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, completa todos los campos y selecciona un archivo.'
        });
        event.preventDefault(); // Detiene el envío del formulario si algún campo está vacío o no se seleccionó archivo
  
    } else {
        // Envío exitoso
        Swal.fire({
            icon: 'success',
            title: '¡Envío exitoso!',
            text: 'Tu formulario ha sido enviado correctamente.'
        });
    }
});