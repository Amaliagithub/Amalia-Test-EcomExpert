var variantData = JSON.parse(document.querySelector('.custom-variant-picker').querySelector('[type="application/json"]').textContent);
console.log(variantData);
var currentVariant;
var sectionId = document.querySelector('.custom-variant-picker').getAttribute('data-section-id');

function changeVariant() {
    const size = document.querySelector('.custom-variant-select').value;
    const color = document.querySelector('.custom-variant-radio__input:checked').value;

    const variantTitle  = color + ' / ' + size;
    console.log(variantTitle);

    for( let i = 0; i < variantData.length; i++ ) {
        if( variantData[i].title == variantTitle ) currentVariant = variantData[i];
    }

    console.log(currentVariant);
    document.querySelector(`[data-target="${sectionId} - ${currentVariant.featured_media.id}"]`).querySelector('button').click();
    document.querySelector('.price-item--regular').textContent = '$' + ( currentVariant.price / 100 ).toFixed(2);
    document.querySelector(".product-variant-id").value = currentVariant.id;

}

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

