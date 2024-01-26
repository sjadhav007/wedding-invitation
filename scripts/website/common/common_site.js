var popover, rsvpId, regex = { 'name': /^[a-zA-Z0-9\s\.-@&]+$/, 'email': /^[a-zA-Z0-9][\w\+\.\*-]+@\w+[\w\.]*\.[a-zA-Z]{2,3}$/, 'phone': /^\+*[0-9]{8,15}$/, 'image': /(\.jpg|\.jpeg|\.png|\.gif)$/i, 'audio': /(\.mp3|\.wav|\.ogg|\.aac|\.m4a)$/i, 'video': /(\.mp4|\.webm|\.ogg|\.mov)$/i };
const mapModal = document.getElementById('map_view');
if (mapModal) {
    mapModal.addEventListener('show.bs.modal', event => {
        var triggerButton, triggerButtonId, mapLink, lat, lng;
        triggerButton = event.relatedTarget;
        triggerButtonId = triggerButton.getAttribute('id');
        if (mapLinks.hasOwnProperty(triggerButtonId)) {
            mapLink = mapLinks[triggerButtonId];
            lat = parseFloat(mapLink['lat']);
            lng = parseFloat(mapLink['lon']);
            document.getElementById('map_view_direction').setAttribute("onclick", `window.open('https://www.google.com/maps?daddr=${lat},${lng}')`);
            var macc = { lat: lat, lng: lng };
            var map = new google.maps.Map(document.getElementById('google-map-view'), { zoom: 15, center: macc });
            var marker = new google.maps.Marker({ position: macc, map: map });
        }
    });
}

function showOverlay() {
    jQuery('#ww-overlay').css({'display': 'flex'});
}

function hideOverlay() {
    jQuery('#ww-overlay').removeAttr('style');
}

function loadCountdownTimer() {
    var date, difference;
    date = new Date(eventDate);
    date = date.getTime() + ((date.getTimezoneOffset() + 330) * 60 * 1000);
    date = new Date(date);
    difference = parseInt((date.getTime() - new Date().getTime()) / 1000);
    setInterval(() => {
        coundownTimer(difference);
        difference--;
    }, 1000);
}

function coundownTimer(difference) {
    var diffDate, sec, min, hrs, day;
    if (difference < 1) {
        sec = min = hrs = day = 0;
        if (difference > (24 * 60 * 60 * -1)) {
            jQuery('.countdown-section .today-banner, .countdown-section .countdown-banner').toggleClass('d-none');
        } else {
            jQuery('.countdown-section .today-banner, .countdown-section .countdown-banner').addClass('d-none');
            jQuery('.old-banner').removeClass('d-none');
        }
    } else {
        /* diffDate = new Date(difference);
        sec = diffDate.getSeconds();
        min = diffDate.getMinutes();
        hrs = diffDate.getHours();
        day = diffDate.getDate() + (diffDate.getMonth() * 30) + ((diffDate.getFullYear() - 1970) * 365); */
        day = Math.floor(difference / (60 * 60 * 24));
        difference -= day * 60 * 60 * 24;
        hrs = Math.floor(difference / (60 * 60));
        difference -= hrs * 60 * 60;
        min = Math.floor(difference / 60);
        sec = difference - (min * 60);
    }
    jQuery('.countdown-section .timer.days').html((day < 10) ? `0${day}` : day);
    jQuery('.countdown-section .timer.hours').html((hrs < 10) ? `0${hrs}` : hrs);
    jQuery('.countdown-section .timer.min').html((min < 10) ? `0${min}` : min);
    jQuery('.countdown-section .timer.sec').html((sec < 10) ? `0${sec}` : sec);
    // console.log(`sec - ${sec}, min - ${min}, hrs - ${hrs}, day - ${day}`);
}

function reorderGallery() {
    var galleryGrid = jQuery('#photo_gallery .grid');
    if (galleryGrid.length > 0 && galleryGrid.children().length > 0) {
        waterfall(galleryGrid.get(0));
    }
}

function collapseHamburger() {
    jQuery('.navbar .navbar-toggler').trigger('click');
}

function adjustLogo() {
    var fixed_logo_themes = ['theme16', 'theme17', 'theme18', 'theme19', 'theme20'];
    if (fixed_logo_themes.includes(siteTheme)) {
        if (window.matchMedia("(min-width: 991px)").matches) {
            if (jQuery(window).scrollTop() > 50) {
                jQuery('#header-logo').attr('style', 'top:0px !important;width:100px !important;');
            } else {
                jQuery('#header-logo').attr('style', 'top:10px !important;width:auto !important;');
            }
        } else if (window.matchMedia("(min-width: 768px)").matches) {
            if (jQuery(window).scrollTop() > 50) {
                jQuery('#header-logo').attr('style', 'top:0px !important;width:100px !important;');
            } else {
                jQuery('#header-logo').attr('style', 'top:10px !important;width:150px !important;');
            }
        } else {
            if (window.matchMedia("(min-width: 768px)").matches) {
                jQuery('#header-logo').attr('style', 'width:85px !important;');
            }
        }
    }
}

function initCurtains() {
    if (layout == 3) {
        LoadCurtains();
        jQuery('.curtains').curtain({
            scrollSpeed: 400,
            curtainLinks: '.curtain-links',
        });
    }
}

function initiateSite() {
    initiateAudio();
    jQuery('#arrival_date, #departure_date').datetimepicker({ defaultTime: '16:00' });
}

function initiateAudio() {
    var initAudio = true, search, searches = window.location.search.substring(1).split('&');
    for (var i = 0; i < searches.length; i++) {
        search = searches[i].split('=');
        if (search[0] && search[1] && search[0] == 'view' && search[1] == 'mobile') {
            initAudio = false;
        }
    }
    if (initAudio) {
        toggleAudio();
    }
}

function toggleAudio() {
    if (jQuery("#mymusic").length > 0) {
        if (jQuery("#mymusic").get(0).paused) {
            jQuery("#mymusic").get(0).play();
        } else {
            jQuery("#mymusic").get(0).pause();
        }
    }
    resetAudioState();
}

function resetAudioState() {
    if (jQuery("#mymusic").length > 0) {
        setTimeout(() => {
            jQuery('.play-music .thumb-image').addClass('d-none');
            var audioId = 'thumb-image-' + ((jQuery("#mymusic").get(0).paused) ? 'off' : 'on');
            var btnTitle = 'Click to ' + (jQuery("#mymusic").get(0).paused ? 'un' : '') + 'mute';
            jQuery('.play-music, .play-music #' + audioId).removeClass('d-none');
            jQuery('.play-music').attr('title', btnTitle);
        }, 2000);
    }
}

function loadElementToShow(step) {
    var nextImg, nextIndex, currentIndex, currentUrl, allImages = [];
    jQuery.each(jQuery('#photo_gallery .gallery-image'), function (key, value) {
        allImages.push(jQuery(value).attr('src'));
    });
    currentUrl = jQuery('#galleryModal .modal-body .img-modal').attr('src');
    currentIndex = allImages.indexOf(currentUrl);
    if (step == -1) {
        nextIndex = (currentIndex == 0) ? allImages.length - 1 : currentIndex - 1;
    } else {
        nextIndex = (currentIndex == (allImages.length - 1)) ? 0 : currentIndex + 1;
    }
    nextImg = allImages[nextIndex];
    jQuery('#galleryModal .modal-body .img-modal').attr('src', nextImg);
}

function loadGalleryModal(url) {
    jQuery('#galleryModal .modal-body .img-modal').attr('src', url);
    jQuery('#galleryModal').modal('show');
}

function verifyPassword() {
    if (!password) {
        setTimeout(() => { jQuery('#loading').hide(); }, 2000);
    } else {
        var passwordText = prompt("Please enter the password to continue", "");
        jQuery.ajax({
            type: "POST", data: { 'url': regurl, 'password': passwordText }, url: base_url + "api/website/password",
            success: function (data) {
                if (data.result.toLowerCase() == 'success') { jQuery('#loading').hide(); }
                else { alert('Invalid Password!'); verifyPassword(); }
            }
        });

    }
}

function changeAttendingStatus(element) {
    var status = jQuery(element).val();
    jQuery('.rsvp-form, .rsvp-form-not-sure').addClass('d-none');
    if (status == 'attending') {
        jQuery('.rsvp-form').removeClass('d-none');
    } else if (status == 'not_sure' && jQuery('.rsvp-form-not-sure').length > 0) {
        jQuery('.rsvp-form-not-sure').removeClass('d-none');
    }
}

function changeAccompanyingFor(element) {
    var status = jQuery(element).val();
    if (status == 'accompany') {
        jQuery('#rsvp-accompany-name').parents('.row').removeClass('d-none');
    } else {
        jQuery('#rsvp-accompany-name').parents('.row').addClass('d-none');
    }
}

function changeSectionStatus(element) {
    var name = jQuery(element).attr('name');
    if (name == 'accomodate_status') {
        changeAccomodationStatus(element);
    } else {
        var status = jQuery(element).val();
        var additionalElement = jQuery(`.${name.replace('_status', '') + '_additional'}`);
        if (additionalElement.length > 0) {
            if (status == 'other') {
                additionalElement.removeClass('d-none');
            } else {
                additionalElement.addClass('d-none');
            }
        }
    }
}

function changeAccomodationStatus(element) {
    var status = jQuery(element).val();
    if (status == 'needed') {
        jQuery('.accomodation_additional').removeClass('d-none');
    } else {
        jQuery('.accomodation_additional').addClass('d-none');
    }
}

function updateInputText(element) {
    var elemId = jQuery(element).attr('id');
    var value = jQuery(element).val();
    var inputRegEx = /[^0-9\+]/g;
    jQuery(element).val(value.replace(inputRegEx, ''));
}

function checkRsvpExists(element) {
    var email = jQuery('#rsvp-email').val(), phone = jQuery('#rsvp-phone').val();
    if ((typeof email == 'undefined' || email == null || email == '') && (typeof phone == 'undefined' || phone == null || phone == '')) {
        rsvpId = '';
        return null;
    }
    var data = { email: email, phone: phone, url: regurl };
    jQuery.ajax({
        type: "POST", data: data, url: rsvp_url + "api/check",
        success: function (data) {
            if (data.status == 'success') {
                rsvpId = data.rsvp_id;
            }
        }
    });
}

function sendRsvp() {
    var rsvpData = getRsvpData();
    var allErrors = jQuery('.error-red-text').length, hiddenErrors = jQuery('.error-red-text.d-none').length;
    if (allErrors === hiddenErrors) {
        jQuery.ajax({
            type: "POST", data: rsvpData, url: rsvp_url + "api/save",
            success: function (data) {
                if (data.status == 'success') {
                    rsvpId = data.id;
                    if (jQuery('#rsvp-accompany-name').length > 0)
                        jQuery('#rsvp-accompany-name').parents('.row').addClass('d-none');
                    uploadFiles();
                }
            }, error: function (data) {
                console.log('error', data);
            }
        });
    }
}

function getRsvpData() {
    var i, element, value, status, rsvpData = { 'url': regurl };
    var guestDetails = (rsvpSection.guest_details && rsvpSection.guest_details.visible_options) ? rsvpSection.guest_details.visible_options : [];
    var guestMessage = (rsvpSection.guest_message && rsvpSection.guest_message.show && rsvpSection.guest_message.show == 'yes' && rsvpSection.guest_message.visible_options) ? rsvpSection.guest_message.visible_options : [];
    var attendingStatus = (rsvpSection.attending_status && ((typeof rsvpSection.attending_status == 'string' && rsvpSection.attending_status == 'yes') || (typeof rsvpSection.attending_status != 'string' && rsvpSection.attending_status.show && rsvpSection.attending_status.show == 'yes' && rsvpSection.attending_status.visible_options))) ? rsvpSection.attending_status.visible_options : [];
    var guestCount = (rsvpSection.no_of_guests && ((typeof rsvpSection.no_of_guests == 'string' && rsvpSection.no_of_guests == 'yes') || (typeof rsvpSection.no_of_guests != 'string' && rsvpSection.no_of_guests.show && rsvpSection.no_of_guests.show == 'yes'))) ? 'yes' : '';
    var arrDepDetails = (rsvpSection.arrival_departure_details && rsvpSection.arrival_departure_details.visible_options) ? rsvpSection.arrival_departure_details.visible_options : [];
    var rsvpFor = jQuery('input[name="rsvp_for"]:checked').val();
    var accompanyFor = (typeof(rsvpFor) != 'undefined' && rsvpFor != null && rsvpFor != '') ? jQuery('#rsvp-accompany-name').val() : '';
    var callbackDate = jQuery('#callback-date').length > 0 ? jQuery('#callback-date').val() : '';
    if (typeof rsvpId != 'undefined' && rsvpId != null && rsvpId != '')
        rsvpData.id = rsvpId;
    if (typeof rsvpFor != 'undefined' && rsvpFor != null && rsvpFor != '') {
        rsvpData.rsvp_for = rsvpFor;
        rsvpData.accompany_for = accompanyFor;
    }
    if (typeof callbackDate != 'undefined' && callbackDate != null && callbackDate != '') {
        var date = new Date(callbackDate);
        var cbDate = date.getDate() < 10 ? date.getDate() : '0' + date.getDate();
        cbDate += '-' + (date.getMonth() < 10 ? date.getMonth() : '0' + date.getMonth());
        cbDate += '-' + date.getFullYear();
        rsvpData.notes = `Call back date is ${cbDate}`;
    }
    jQuery('.error-red-text').addClass('d-none');
    for (i = 0; i < guestDetails.length; i++) {
        element = guestDetails[i].toLowerCase();
        value = jQuery(`#rsvp-${element}`).val();
        if (typeof value == 'undefined' || value == null || value == '' || !regex[element].test(value)) {
            jQuery(`.rsvp-${element}_error`).removeClass('d-none');
        } else {
            rsvpData[element] = value;
        }
    }
    for (i = 0; i < guestMessage.length; i++) {
        element = guestMessage[i].toLowerCase();
        if (element == 'text') {
            rsvpData['message'] = jQuery('#rsvp-message').val();
        }
    }
    if (attendingStatus.length > 0) {
        var attending = jQuery('input[name="stats_attend"]:checked').val();
        if (typeof attending == 'undefined' || attending == null || attending == '')
            jQuery(`.stats_attend-error`).removeClass('d-none');
        else {
            jQuery(`.stats_attend-error`).addClass('d-none');
            rsvpData['status'] = attending;
        }
    }
    if (rsvpData['status'] != 'attending')
        return rsvpData;
    if (guestCount == 'yes') {
        var guestCountValue = jQuery('#guest_count').val();
        if (rsvpData['status'] == 'attending' && (typeof guestCountValue == 'undefined' || guestCountValue == null || guestCountValue == '')) {
            jQuery(`.guest_count-error`).removeClass('d-none');
        } else {
            jQuery(`.guest_count-error`).addClass('d-none');
        }
        rsvpData['no_guests'] = jQuery('#guest_count').val();
    }
    rsvpData.arrival = {};
    rsvpData.departure = {};
    for (i = 0; i < arrDepDetails.length; i++) {
        if (arrDepDetails[i].indexOf('arrival') === 0)
            rsvpData.arrival[arrDepDetails[i]] = jQuery(`.rsvp-wrapper #${arrDepDetails[i]}`).val();
        if (arrDepDetails[i].indexOf('departure') === 0)
            rsvpData.departure[arrDepDetails[i]] = jQuery(`.rsvp-wrapper #${arrDepDetails[i]}`).val();
    }
    if (rsvpSection.accomodation_details && rsvpSection.accomodation_details.show == 'yes') {
        status = jQuery('input[name="accomodate_status"]:checked').val();
        rsvpData.accomodation_status = (typeof status == 'undefined' || status == null || status == '') ? '' : status;
        if (rsvpData.accomodation_status == 'needed')
            rsvpData.accomodation_details = jQuery('#additional_details').val();
    }
    if (rsvpSection.meal_preference && rsvpSection.meal_preference.show == 'yes') {
        status = jQuery('input[name="meal_status"]:checked').val();
        rsvpData.meal = (typeof status == 'undefined' || status == null || status == '') ? '' : status;
    }
    if (rsvpSection.allergic && rsvpSection.allergic.show == 'yes') {
        status = jQuery('input[name="allergic_status"]:checked').val();
        rsvpData.allergic = (typeof status == 'undefined' || status == null || status == '') ? '' : status;
        if (rsvpData.allergic == 'other')
            rsvpData.allergic_other = jQuery('#allergic_details').val();
    }
    if (rsvpSection.main_course && rsvpSection.main_course.show == 'yes') {
        status = jQuery('input[name="mainCourse_status"]:checked').val();
        rsvpData.main_course = (typeof status == 'undefined' || status == null || status == '') ? '' : status;
    }
    if (rsvpSection.custom_one && rsvpSection.custom_one.show == 'yes') {
        status = jQuery('input[name="customOne_status"]:checked').val();
        rsvpData.custom_one = (typeof status == 'undefined' || status == null || status == '') ? '' : status;
        if (rsvpData.custom_one == 'other')
            rsvpData.custom_one_other = jQuery('#customOne_details').val();
    }
    if (rsvpSection.custom_two && rsvpSection.custom_two.show == 'yes') {
        status = jQuery('input[name="customTwo_status"]:checked').val();
        rsvpData.custom_two = (typeof status == 'undefined' || status == null || status == '') ? '' : status;
        if (rsvpData.custom_two == 'other')
            rsvpData.custom_two_other = jQuery('#customTwo_details').val();
    }
    if (rsvpSection.custom_three && rsvpSection.custom_three.show == 'yes') {
        status = jQuery('input[name="customThree_status"]:checked').val();
        rsvpData.custom_three = (typeof status == 'undefined' || status == null || status == '') ? '' : status;
        if (rsvpData.custom_three == 'other')
            rsvpData.custom_three_other = jQuery('#customThree_details').val();
    }
    return rsvpData;
}

function showSelectedContent(element, type) {
    var message = '', fileTypeRegEx = regex[type];
    jQuery(`.rsvp-message_error`).addClass('d-none').html(message);
    if (element.files.length < 1) {
        jQuery(`.attached-file-info[data-attr="${type}"]`).addClass('d-none');
        jQuery(`.attached-file-info[data-attr="${type}"] span`).html('');
        return false;
    }
    if (!fileTypeRegEx.test(element.files[0].name)) {
        message = 'Please upload a valid file type. Allowed formats ';
        switch (type) {
            case 'image':
                message += '(JPG,JPEG,PNG,GIF)';
                break;
            case 'audio':
                message += '(MP3,WAV,OGG,AAC,M4A)';
                break;
            case 'video':
                message += '(MP4,WEBM,OGG,MOV)';
                break;
        }
    }
    if (message.length == 0) {
        var fileSize = 0;
        switch (type) {
            case 'image':
            case 'audio':
                fileSize = 5;
                break;
            case 'video':
                fileSize = 40;
                break;
        }
        if (element.files[0].size > (fileSize * 1024 * 1000)) {
            message += `Unable to upload ${type}. Please make sure ${type} is less than ${fileSize}MB`;
        }
    }
    if (message.length > 0) {
        jQuery(`.rsvp-message_error`).removeClass('d-none').html(message);
        return false;
    }
    jQuery(`.attached-file-info[data-attr="${type}"]`).removeClass('d-none');
    jQuery(`.attached-file-info[data-attr="${type}"] span`).html(element.files[0].name);
}

function removeSelectedContent(element) {
    var attachment = jQuery(element).parents('.attached-file-info');
    var type = attachment.attr('data-attr');
    attachment.find('span').html('');
    attachment.addClass('d-none');
    jQuery(`#${type}_upload`).val('');
}

function uploadFiles() {
    var fileUpload = false, formData = new FormData();
    if (jQuery('#image_upload').length && jQuery('#image_upload').val() != '') {
        formData.append('image', jQuery('#image_upload')[0].files[0]);
        fileUpload = true;
    }
    if (jQuery('#audio_upload').length && jQuery('#audio_upload').val() != '') {
        formData.append('audio', jQuery('#audio_upload')[0].files[0]);
        fileUpload = true;
    }
    if (jQuery('#video_upload').length && jQuery('#video_upload').val() != '') {
        formData.append('video', jQuery('#video_upload')[0].files[0]);
        fileUpload = true;
    }
    if (fileUpload) {
        formData.append('id', rsvpId);
        jQuery.ajax({
            type: 'POST', data: formData, contentType: false, cache: false, processData: false, url: rsvp_url + 'api/upload',
            success: function (data, textStatus, jqXHR) {
                if (data.status && data.status.toLowerCase() == 'success') {
                    showRsvpSuccess();
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('Some unexpected error! Try again later.');
                console.log(jqXHR);
            }
        });
    } else {
        showRsvpSuccess();
    }
}

function showRsvpSuccess() {
    jQuery('.remove-upload-attachment').trigger('click');
    jQuery('#host-rsvp-form').get(0).reset();
    alert('RSVP details saved successfully!');
    rsvpId = '';
}

function websiteAds() {
    if (websiteId !== '' && websiteId != undefined && websiteId != null) {
        jQuery.ajax({
            type: 'GET',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: `${base_url}websiteAds/${websiteId}`,
            success: function (data) {
                if (data.status == 'success' && data.flag == 0) {
                    adsCount = visible_sec.length == 1 ? [0] : (visible_sec.length == 2 ? [0, 1] : (visible_sec.length >= 3 ? [0, 1, (visible_sec.length - 1)] : []));
                    for (var i = 0; i < adsCount.length; i++) {
                        jQuery(`.promotional-${visible_sec[adsCount[i]]}-${websiteId}`).removeClass('d-none');
                    }
                }
            },
            error() {
                toastMessage('Some unexpected error! Try again later.');
            }
        });
    }
}

function getRegistryProductById(id) {
    for (var i = 0; i < registry_products.length; i++)
        if (registry_products[i]['id'] == id)
            return registry_products[i];

    return null;
}

function openProductModal(id) {
    var product, imgUrl, needsPercent, contributionPopover, contributionCta, popoverOptions;
    product = getRegistryProductById(id);
    if (product == null)
        return null;

    imgUrl = product.image.indexOf('http') == 0 || product.image.indexOf('//') == 0 ? product.image : asset_url + product.image;
    jQuery('#giftRegistryProduct .product-name').html(product.name);
    jQuery('#giftRegistryProduct .product-price').html('₹ ' + Intl.NumberFormat('en-in').format(product.price));
    jQuery('#giftRegistryProduct .product-image').attr('src', imgUrl);
    jQuery('#giftRegistryProduct #productDetailsContent #description').html(product.description);
    jQuery('#giftRegistryProduct #productDetailsContent #detail').html(product.detail);
    jQuery('#giftRegistryProduct #productDetailsContent #brand').html(product.brand_detail);
    jQuery('#giftRegistryProduct #purchased-sec, #giftRegistryProduct #stillneed-sec, #giftRegistryProduct #normal-sec').addClass('d-none');
    if (product.desired_quantity == product.received_quantity) {
        jQuery('#giftRegistryProduct #purchased-sec').removeClass('d-none');
    } else if (typeof (product.still_needs) != 'undefined' && product.still_needs != null && product.still_needs != '') {
        needsPercent = 100 - Math.round(product.still_needs / product.price * 100);
        jQuery('#giftRegistryProduct #stillneed-sec').removeClass('d-none');
        jQuery('#giftRegistryProduct #stillneed-sec .stillneed-amt span').html('₹ ' + Intl.NumberFormat('en-in').format(product.still_needs));
        jQuery('#giftRegistryProduct #stillneed-sec .stillneed-percent span').html(needsPercent);
        jQuery('#giftRegistryProduct #stillneed-sec .progress .progress-bar').attr('aria-valuenow', needsPercent).css({ 'width': `${needsPercent}%` });
        jQuery('#giftRegistryProduct #stillneed-sec .contribute-to-cart').attr('data-id', product.id);
    } else {
        jQuery('#giftRegistryProduct #normal-sec').removeClass('d-none');
        jQuery('#giftRegistryProduct #normal-sec #still-needs-quantity').html(product.desired_quantity - product.received_quantity);
        jQuery('#giftRegistryProduct #normal-sec .add-to-cart, #giftRegistryProduct #normal-sec .create-group-gift, #giftRegistryProduct #normal-sec .make-contribution').attr('data-id', product.id);
        contributionPopover = `<div class="row"><div class="col-6 order-2 order-md-1"><p class="stillneed-amt mt-0 my-2 text-end text-md-start">Still Needs <span>₹ ${Intl.NumberFormat('en-in').format(product.price)}</span></p></div>
            <div class="col-6 order-1 order-md-2"><p class="stillneed-percent mt-0 my-2 text-md-end"><span>0</span>% completed</p></div>
            <div class="col-12 order-3"><div class="progress progress-color mt-1 mb-3"><div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div></div></div>
            <div class="col-md-4 col-6 order-4"><input type="tel" id="contribution-main-popover" class="form-control border-0 border-bottom rounded-0 px-0" placeholder="₹ "></div>
            <div class="col-md-8 col-6 order-5"><button type="button" class="contribute-to-cart popover red-cta" data-id="${product.id}">CONTRIBUTE</button></div></div>`;
        // jQuery('#giftRegistryProduct #normal-sec .make-contribution').attr('data-bs-content', '');
        contributionCta = jQuery('#giftRegistryProduct #normal-sec .make-contribution');
        popoverOptions = {
            boundary: jQuery('#giftRegistryProduct .content-section').get(0),
            container: '#giftRegistryProduct .content-section',
            content: contributionPopover,
            customClass: 'contribution-popover',
            placement: 'bottom',
            html: true,
            sanitize: false,
            title: ''
        };
        if (typeof(popover) !== 'undefined' && popover != null && popover != '') {
            popover.dispose();
            popover = null;
        }
        popover = new bootstrap.Popover(contributionCta, popoverOptions);
    }
    jQuery('#giftRegistryProduct').modal('show');
}

function addProductToCart(id, isContribution, contributionAmount) {
    if (!loggedIn) {
        jQuery('#signup-modal-open').trigger('click');
        return null;
    }

    var product, cartData;
    product = getRegistryProductById(id);
    if (product == null)
        return null;

    cartData = {
        "product_id": product.product_id,
        "quantity": 1,
        "registry_id": product.registry_id,
        "registry_product_id": product.id,
        "user_id": tata_user_id
    }
    cartData.amount = (isContribution) ? contributionAmount : "";
    var settings = {
        "url": `${guest_url}addtocart`,
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify(cartData)
    };
    showOverlay();
    $.ajax(settings).done(function (response) {
        hideOverlay();
        // toastMessage(response.message,"info");
        window.location.href = `${base_url}registry/cart/${cartData.registry_id}/${registry_url}`;
    });
}

function contributeToCart(element) {
    if (!loggedIn) {
        jQuery('#signup-modal-open').trigger('click');
        return null;
    }

    var inputId, value, productId, product, stillNeeds;
    inputId = 'contribution-main' + (jQuery(element).hasClass('popover') ? '-popover' : '');
    value = jQuery(`#${inputId}`).val();
    if (value == null || value == '' || value < 0) {
        // toastMessage('Please enter valid contribution amount', 'info');
        console.log('Please enter valid contribution amount');
        return null;
    }

    productId = element.dataset.id;
    product = getRegistryProductById(productId);
    if (product == null)
        return null;

    stillNeeds = (typeof(product.still_needs) == 'undefined') ? product.price : product.still_needs;
    if (value > stillNeeds) {
        // toastMessage('Please enter contribution amount less than ₹ ' + Intl.NumberFormat('en-in').format(stillNeeds) + '/-', 'info');
        console.log('Please enter contribution amount less than ₹ ' + Intl.NumberFormat('en-in').format(stillNeeds) + '/-');
        return null;
    } else if (value == product.price) {
        addProductToCart(productId, false, 0);
        return null;
    }
    addProductToCart(productId, true, value);
}

function goToCreateGroupGift(id) {
    window.location.href = `${base_url}registry/${registry_url}/create-group-gift/${id}`;
}

jQuery(document)
    .ready(() => {
        verifyPassword();
        setTimeout(() => {
            adjustLogo();
            initCurtains();
            reorderGallery();
        }, 2000);
        initiateSite();
        loadCountdownTimer();
        websiteAds();
    })
    .on('click', 'ul.navbar-nav .nav-link', function () {
        setTimeout(() => {
            collapseHamburger();
        }, 200);
    })
    .on('click', '.thumb-image', function () {
        toggleAudio();
    })
    .on('click', '#photo_gallery .grid .gallery-image', function () {
        var url = jQuery(this).attr('src');
        loadGalleryModal(url);
    })
    .on('change', '#rsvp input[name="stats_attend"]', function () {
        changeAttendingStatus(this);
    })
    .on('change', '#rsvp input[name="rsvp_for"]', function () {
        changeAccompanyingFor(this);
    })
    .on('change', '#rsvp input[name$="_status"]', function () {
        changeSectionStatus(this);
    })
    .on('keyup', '#rsvp #rsvp-phone, #rsvp #guest_count', function () {
        updateInputText(this);
    })
    .on('blur', '#rsvp #rsvp-email, #rsvp #rsvp-phone', function () {
        checkRsvpExists(this);
    })
    .on('submit', '#rsvp #host-rsvp-form', function (e) {
        e.preventDefault();
        jQuery('#rsvp #rsvp_submit').trigger('click');
    })
    .on('click', '#rsvp #rsvp_submit', function () {
        if (typeof rsvpId != 'undefined' && rsvpId != null && rsvpId != '') {
            jQuery('#rsvpConfirm').modal('show');
            return null;
        }
        sendRsvp();
    })
    .on("click", '#banner_section .sticky-image-wrapper', function () {
        scrollTo(0, 200);
    })
    .on("change", '#image_upload', function () {
        showSelectedContent(this, 'image');
    })
    .on("change", '#audio_upload', function () {
        showSelectedContent(this, 'audio');
    })
    .on("change", '#video_upload', function () {
        showSelectedContent(this, 'video');
    })
    .on("click", '.remove-upload-attachment', function () {
        removeSelectedContent(this);
    })
    .on("click", '#do-sumbit-rsvp', function () {
        sendRsvp();
        jQuery('#rsvpConfirm').modal('hide');
    })
    .on('click', '#gift_registry .product-item', function (e) {
        if (e.target.className.indexOf('add-to-cart') > -1)
            return null;
        openProductModal(this.dataset.id);
    })
    .on('click', '.add-to-cart', function () {
        addProductToCart(this.dataset.id, false, 0);
    })
    .on('click', '.create-group-gift', function () {
        goToCreateGroupGift(this.dataset.id);
    })
    .on('click', '.contribute-to-cart', function () {
        contributeToCart(this);
    });

jQuery(window)
    .scroll(function () {
        adjustLogo();
    });
