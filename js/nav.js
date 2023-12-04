 $(document).ready((e) => {
    $('.hamBtn').click(() => {
        if ($('.hamBtn').hasClass('hide')) {
            $('.mobileNavLinks').toggle();
            $('.hamBtn').removeClass('hide')
            $('.hamBtn').addClass('show')
            $('.hamBtn').html(` <i class='bx bx-menu-alt-left'></i>`)
        }
        else {
            $('.mobileNavLinks').toggle();
            $('.hamBtn').removeClass('show')
            $('.hamBtn').addClass('hide')
            $('.hamBtn').html(`<i class='bx bx-menu'></i>`)
        }
    })
});

$('.eventNavLinkMobile').click(() => {
    $('.previousEventsMobile').toggle();
})

const closeNav = () => {
    $('.mobileNavLinks').toggle();
    $('.hamBtn').removeClass('show')
    $('.hamBtn').addClass('hide')
    $('.hamBtn').html(`<i class='bx bx-menu'></i>`)
}