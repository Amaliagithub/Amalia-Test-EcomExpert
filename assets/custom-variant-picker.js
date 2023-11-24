var variantDate = JSON.parse(document.querySelector('.custom-variant-picker').querySelector('[type="application/json"]').textContent);

var currentVariant;
var sectionId = document.querySelector('.custom-variant-picker').getAttribute('data-section-id');

console.log(document.querySelector('.custom-variant-radio__inpute'));
function changeVariant() {
    const size = document.querySelector('.custom-variant-select').value;
    const color = document.querySelector('.custom-variant-radio__inpute:checked').value;

    const variantTitle  = color + '/' + size;

    for( let i = 0; i < variantDate.length; i++ ) {
        if( variantDate[i].title == variantTitle ) currentVariant = variantDate[i];
    }

    document.querySelector(`[data-target="${sectionId} - ${currentVariant.featured_media.id}"]`).querySelector('button').click();
    document.querySelector('.price-item--regular').textContent = '$' + ( currentVariant.price / 100 ).toFixed(2);
    document.querySelector(".product-variant-id").value = currentVariant.id;

}

console.log(document.querySelector('.custom-variant-select'));
document.querySelector('.custom-variant-select').addEventListener('change', function(e){
    e.preventDefault();
    changeVariant();
});

document.querySelectorAll('.custom-variant-radio').forEach((radio) => {
    radio.addEventListener('change', function(e) {
        e.preventDefault();
        changeVariant();
    })
})

