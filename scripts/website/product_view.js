jQuery(document)
    .ready(function () { })
    .on('click', '.back-to-gallery', function () {
        backToWebsiteGallery();
    })
    .on('click', '.choose-design', function () {
        chooseDesign();
    });

function backToWebsiteGallery() {
    var backUrl = 'wedding-website-free-templates';
    if (window.history.length > 2) {
        window.history.back();
    } else {
        switch (productOccasion) {
            case 'wedding':
                backUrl = 'wedding-website-free-templates';
                break;
            case 'baby':
                backUrl = 'baby-website-free-templates';
                break;
            case 'other':
                backUrl = 'other-occasion-free-templates';
                break;
        }
        window.location.href = base_url + backUrl;
    }
}

function chooseDesign() {
    var websiteId = '', searchParams, searches = window.location.search.substring(1).split('&');
    for(i = 0; i < searches.length; i++) {
        searchParams = searches[i].split('=');
        if (searchParams[0] && searchParams[0] == 'website') {
            websiteId = searchParams[1] ? searchParams[1] : '';
        }
    }
    if (websiteId == '') {
        window.location.href = `${base_url}website/create/${productId}`;
    } else {
        window.location.href = `${base_url}website/theme/${websiteId}/${productId}`;
    }
}
