(function($){
  
  $(document).ready(function() {

    // Initialize Isotope
    var $container = $('.product-grid');
    $container.isotope({
      itemSelector: '.grid-product',
      layoutMode: 'masonry'
    });

    // Setup filtering with dropdowns.
    var $filterSelects = $('.filter-grid select');
    var performFilter = function() {
      var filterVal = ( $(this).val() == '*' ) && '*' || '.'+$(this).val();
      $container.isotope({ filter: filterVal });
    };
    $filterSelects.on( 'change', performFilter );

    // Add to cart notification.
    var $addToCart = $('.js-add-to-cart');
    var performNotification = function() {
      $('.your-cart').addClass('have-items');
      $('.notifications').removeClass('fadeOut').addClass('fadeInLeft');
      setTimeout( function(){
        $('.notifications').removeClass('fadeInLeft').addClass('fadeOut');
      }, 3000 );
    };
    $addToCart.on( 'click', performNotification );

    // Cart Slide Down
    var $cartToggle = $('.js-toggle-cart');
    var performCartToggle = function() {
      $('.cart').toggleClass('show-cart');
    };
    $cartToggle.on( 'click', performCartToggle );
    
    var manipulateNumberInput = function(e) {
      
      e.preventDefault(); // Prevent default action.
      
      var $numberInput  = $(this).siblings('input[type=number]'),
          currentValue  = $numberInput.val() != '' && $numberInput.val() || 1,
          adjustedValue = parseInt( currentValue ) + ($(this).hasClass('plus') && 1 || -1);
      
      $numberInput.val( adjustedValue ).trigger('change'); 
    }
    
    
    var validateNumberInput = function(e) {
      
      var $numberInput = $(this),
          currentValue = parseInt( $numberInput.val() ),
          minimumValue = parseInt( $(this).attr('min') ),
          maximumValue = parseInt( $(this).attr('max') );
      
      if( currentValue < minimumValue ) $numberInput.val( minimumValue );
      if( currentValue > maximumValue ) $numberInput.val( maximumValue );
      
    }
    

    var $numberControls = $('.js-number-control');
    $numberControls.on( 'click', manipulateNumberInput );
    
    // Attach validation listeners.
    var $numberInputs = $('input[type=number]');
    $numberInputs.on( 'change', validateNumberInput );

  }); 

})(jQuery); // Map jQuery => $