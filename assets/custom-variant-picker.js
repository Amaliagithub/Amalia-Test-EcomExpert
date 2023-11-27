var variantData = JSON.parse(document.querySelector('.custom-variant-picker').querySelector('[type="application/json"]').textContent);
var isGiftProduct = false;
isGiftProduct();

var currentVariant;
var sectionId = document.querySelector('.custom-variant-picker').getAttribute('data-section-id');

function changeVariant() {
    const size = document.querySelector('.custom-variant-select').value;
    const color = document.querySelector('.custom-variant-radio__input:checked').value;
    
    const variantTitle  = color + ' / ' + size;

    for( let i = 0; i < variantData.length; i++ ) {
        if( variantData[i].title == variantTitle ) currentVariant = variantData[i];
        if(size == 'unselected' && variantData[i].title.indexOf(color) > -1) currentVariant = variantData[i];
    }

    if(currentVariant) {
        document.querySelector(`[data-target="${sectionId}-${currentVariant.featured_media.id}"]`).querySelector('button').click();
        document.querySelector('.price-item--regular').textContent = '$' + ( currentVariant.price / 100 ).toFixed(2) + 'CAD';
        document.querySelector(".product-variant-id").value = currentVariant.id;
        
    }
    console.log(isGiftProduct);
    if(currentVariant.id == 41392653828148 && !isGiftProduct) {
        var form = document.querySelector('[data-type="add-to-cart-form"]');

        const giftId = document.createElement("input");
        giftId.type="hidden";
        giftId.name="items[1][id]";
        giftId.value="41390951792692";
        const giftQuantity = document.createElement("input");
        giftQuantity.type="hidden";
        giftQuantity.name="items[1][quantity]";
        giftQuantity.value="1";
        giftQuantity.form = form.getAttribute('id');
        form.appendChild(giftId);
        document.querySelector('quantity-input').appendChild(giftQuantity);
    } else {
        if(document.querySelector('[name="items[1][id]"]')) document.querySelector('[name="items[1][id]"]').remove();
        if(document.querySelector('[name="items[1][quantity]"]')) document.querySelector('[name="items[1][quantity]"]').remove();
    }
    if(color && size != 'unselected') document.querySelector('.product-form__submit').removeAttribute('disabled');
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


document.querySelector(`#ProductSubmitButton-${sectionId}`).setAttribute("disabled", true);

function isGiftProduct() {
    fetch('/cart.js')
    .then((response) => response.text())
    .then((responseText) => {
        let items = JSON.parse(responseText).items;
        for(var i=0;i<items.length;i++) {
            if(items[i].id == 41390951792692) isGiftProduct = true;
        }
    })
    .catch((e) => {
        console.error(e);
    });
}