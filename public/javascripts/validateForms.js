// const { default: bsCustomFileInput } = require("bs-custom-file-input")

// (() => {
//     'use strict'

//     bsCustomFileInput.init()
  
//     // Fetch all the forms we want to apply custom Bootstrap validation styles to
//     const forms = document.querySelectorAll('.validated-form')
  
//     // Loop over them and prevent submission
//     Array.from(forms).forEach(form => {
//       form.addEventListener('submit', event => {
//         if (!form.checkValidity()) {
//           event.preventDefault()
//           event.stopPropagation()
//         }
  
//         form.classList.add('was-validated')
//       }, false)
//     })
//   })()


const { FilePond } = require('filepond');

(() => {
  'use strict'

  // Initialize FilePond
  FilePond.registerPlugin(FilePondPluginFileValidateType);
  const pond = FilePond.create({
    // Your FilePond options here (e.g., server, allowMultiple, etc.)
  });

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.validated-form')

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
})();