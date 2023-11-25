var variantData = JSON.parse(document.querySelector('.custom-variant-picker').querySelector('[type="application/json"]').textContent);
var currentVariant;
console.log(variantData);
var sectionId = document.querySelector('.custom-variant-picker').getAttribute('data-section-id');
console.log(sectionId);

function changeVariant() {
    const size = document.querySelector('.custom-variant-select').value;
    const color = document.querySelector('.custom-variant-radio__input:checked').value;

    const variantTitle  = color + ' / ' + size;

    for( let i = 0; i < variantData.length; i++ ) {
        if( variantData[i].title == variantTitle ) currentVariant = variantData[i];
    }

    if(currentVariant) {

        document.querySelector(`[data-target="${sectionId}-${currentVariant.featured_media.id}"]`).querySelector('button').click();
        document.querySelector('.price-item--regular').textContent = '$' + ( currentVariant.price / 100 ).toFixed(2);
        document.querySelector(".product-variant-id").value = currentVariant.id;
    }


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

document.querySelectorAll("form.product-form").forEach((form) => {
    console.log(1);
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      // Show loading spinner
      const loadingOverlays = document.querySelectorAll(".loading-overlay");
      loadingOverlays.forEach((overlay) => overlay.classList.remove("hidden"));
  
      // Collect product data
      const productData = selectedProducts.map((product) => ({
        id: product.id,
        quantity: 1,
        variantId:
          product.variantId && product.variantId !== product.id
            ? parseInt(product.variantId)
            : undefined,
      }));
  
      const requestBody = {
        items: productData,
      };
  
      // Add products to cart
      await fetch(`${window.Shopify.routes.root}cart/add.js`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
  
      // Get updated cart data
      const res = await fetch("/cart.json");
      const cart = await res.json();
  
      // Update cart count
      document.querySelectorAll(".cart-count-bubble").forEach((el) => {
        el.textContent = cart.item_count;
      });
  
      // Navigate to cart page
      window.location.href = "/cart";
    });
  });