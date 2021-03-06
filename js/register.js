var request;
$(document).ready(function () {
    $('btnRegister').click( function () {
        $('#register-form').submit();
    });
    $('#facebook-button').click( function () {
        ga('send', 'event', 'button', 'click', 'facebook');
    });
    $('#twitter-button').click( function () {
        ga('send', 'event', 'button', 'click', 'twitter');
    });
    
    RegisterInterest = function () {
        $("#btnRegister").button('loading');
        ga('send', 'event', 'button', 'click', 'interest');
        // abort any pending request
        if (request) {
            request.abort();
        }

        var $form = $('#register-form');
        var $inputs = $form.find("input, select, button, textarea");
        var serializedData = $form.serialize();

        // disable the inputs for the duration of the ajax request
        // (note: we disable elements AFTER the form data has been serialized. Disabled form elements will not be serialized)
        $inputs.prop("disabled", true);

        request = $.ajax({
            url: "form.php",
            type: "post",
            data: serializedData,
            success: function(){
                $('#register-form').fadeOut( 1600, function () {
                    $("#thanks").removeClass('hidden');
                });
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                alert("Status: " + textStatus); alert("Error: " + errorThrown);
            }
        });

        // callback handler that will be called regardless
        // if the request failed or succeeded
        request.always(function () {
            // re-enable the inputs
            $inputs.prop("disabled", false);
        });

        // prevent default posting of form
        if (event.preventDefault)
            event.preventDefault();
        else
            event.returnValue = false;
    }
    $('#register-form').validate({ // initialize the plugin
        submitHandler: RegisterInterest,
        rules: {
            name: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            tel: {
                required: true,
                digits: true
            }
        }
    });

});
