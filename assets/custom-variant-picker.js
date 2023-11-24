var variantDate = JSON.parse(document.querySelector('.custom-variant-picker').querySelector('[type="application/json"]').textContent);

var currentVariant;
var sectionId = document.querySelector('.custom-variant-picker').getAttribute('data-section-id');

function changeVariant() {
    const size = document.querySelector('.custom-variant-select').value;
    const color = document.querySelector('.custom-variant-radio__inpute:checked').value;

    const variantTitle  = color + '/' + size;

    for( let i = 0; i < variantDate.length; i++ ) {
        if( variantDate[i].title == variantTitle ) currentVariant = variantDate[i];
    }

    
}