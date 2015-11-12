(function($) {
    /**/
    $(function() {
        $('.checkbox-group').click( function (){
            /*for checkboxes*/
            var $checkbox = $(this).find('.cell-choice i');

            var $inputCheckbox = $(this).find('.cell-choice input');

            $checkbox.toggleClass('checked');
            $inputCheckbox.prop("checked", !$inputCheckbox.is(":checked"));

            /*for radio*/
            var $radio = $(this).find('.cell-radio i');
            var $radioS = $('.checkbox-group .cell-radio i');
            var $inputS = $('.checkbox-group .cell-radio input');
            var $inputRadio = $(this).find('.cell-radio input');

            $radioS.removeClass('checked');
            $inputS.prop("checked", false);
            $radio.addClass('checked');
            if($radio.hasClass('checked')&&!$inputS.is(":checked")) {
                $inputRadio.prop("checked", true);
            }
            return false;
        });
       /*init popover for page index_balance.html*/
         $('.left-pay-popover').popover({
         placement: "bottom",
         trigger: "hover",
         viewport: {"selector": ".left-pay-popover"}
         });
         $('.right-pay-popover').popover({
         placement: "bottom",
         trigger: "hover",
         viewport: {"selector": ".right-pay-popover"}
         });

    });
})(jQuery);