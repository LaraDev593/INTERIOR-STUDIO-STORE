$(document).ready(function () {

    const $burgerBtn = $('#burgerToggle');
    const $navigation = $('#navigation');

    $burgerBtn.on('click', function () {
        $(this).toggleClass('active');
        $navigation.toggleClass('active');
        $('body').toggleClass('no-scroll');
    });

    $('.navigation-item a').on('click', function (e) {
        const target = this.hash;

        if (target) {
            e.preventDefault();
            const $target = $(target);
            if ($target.length) {
                $burgerBtn.removeClass('active');
                $navigation.removeClass('active');
                $('body').removeClass('no-scroll');
                $('html, body').animate({
                    scrollTop: $target.offset().top
                }, 800);
            }
        }
    });

    $(window).on('scroll', function () {
        const $scrollBtn = $('#backToTop');
        if ($(this).scrollTop() > 800) {
            $scrollBtn.addClass('show'); 
        } else {
            $scrollBtn.removeClass('show'); 
        }
    });

    $('#backToTop').on('click', function () {
        $('html, body').animate({
            scrollTop: 0
        }, 800); 
    });


    $('.btn-explore-projects').on('click', function () {
        const targetId = $(this).attr('data-target'); 
        const $targetElement = $(targetId);
        if ($targetElement.length) {
            $('html, body').animate({
                scrollTop: $targetElement.offset().top
            }, 800); 
        }
    });

    let counterAnimated = false;

    $(window).on('scroll load', function () {
        const $section = $('.about-us');
        if (!$section.length || counterAnimated) return;
        const windowHeight = $(window).height();
        const scrollTop = $(window).scrollTop();
        const sectionTop = $section.offset().top;
        if (scrollTop + windowHeight > sectionTop + ($section.outerHeight() / 2)) {
            counterAnimated = true; 
            $('.counter').each(function () {
                const $this = $(this);
                const targetValue = parseInt($this.attr('data-target'), 10);
                $({Counter: 0}).animate({Counter: targetValue}, {
                    duration: 2000, 
                    easing: 'swing', 
                    step: function () {
                        $this.text(Math.ceil(this.Counter));
                    },
                    complete: function () {
                        $this.text(targetValue);
                    }
                });
            });
        }
    });



    $('#accordionExample .btn-explore-projects').click(function () {
        $('html, body').animate({
            scrollTop: $('#contact').offset().top
        }, 600); 
    });


    let productsContainer = $('.products-container');

    const $slider = productsContainer.slick({
        centerMode: true,
        centerPadding: '150px', 
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,      
        appendArrows: $('.slider-controls'),
        prevArrow: '<button type="button" class="slick-prev"><img src="images/slider/prev.png" alt="prev"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="images/slider/next.png" alt="next"></button>',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    centerPadding: '40px',
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768, 
                settings: {
                    slidesToShow: 1,       
                    slidesToScroll: 1,
                    centerMode: true,       
                    centerPadding: '50px'  
                }
            },
            {
                breakpoint: 420, 
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: '35px'  
                }
            }
        ]
    });

    const $productsFurniture = $('.products-furniture');


    $('.catalog-link ul li a').on('click', function (e) {
        e.preventDefault();

        $('.catalog-link ul li a').removeClass('active');
        $(this).addClass('active');

        const filterValue = $(this).data('filter');

        const $controls = $('.slider-controls');
        const $emptyMessage = $('.catalog-empty-message');

        $emptyMessage.hide();
        $controls.show();
        $productsFurniture.show(); 
        $slider.slick('slickUnfilter');

        if (filterValue !== 'all') {
            const hasItems = $slider.find('.' + filterValue).not('.slick-cloned').length > 0;

            if (hasItems) {
                $slider.slick('slickFilter', '.' + filterValue);
                $controls.show();
                $productsFurniture.show();
            } else {
                $productsFurniture.hide();
                $controls.hide();
                $emptyMessage.fadeIn(300);
            }
        }
    });

    $('.empty-message-btn').on('click', function () {
        $('.catalog-link ul li a[data-filter="all"]').trigger('click');
    });


    $('.projects-container').slick({
        infinite: true,
        slidesToShow: 1,     
        slidesToScroll: 1, 
        arrows: true,
        appendArrows: $('.projects-controls'),
        prevArrow: '<button type="button" class="slick-prev"><img src="/images/slider/prev.png" alt="prev"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="/images/slider/next.png" alt="next"></button>',
        responsive: [
            {
                breakpoint: 1200, 
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    productsContainer.magnificPopup({
        delegate: 'a.product-image:not(.slick-cloned)',
        type: 'image',
        closeMarkup: '<button type="button" class="mfp-close custom-close-btn" title="Закрыть"></button>',
        mainClass: 'mfp-fade',
        removalDelay: 300
    });

    let blogSlider = $('.blog-slider');
    blogSlider.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        appendArrows: $('.blog-controls'),
        prevArrow: '<button type="button" class="slick-prev"><img src="images/slider/prev.png" alt="prev"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="images/slider/next.png" alt="next"></button>'
    });

    blogSlider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        const $gridParent = $('.blog-grid-parent');
        $gridParent.removeClass(function (index, className) {
            return (className.match(/(^|\s)slide-\S+/g) || []).join(' ');
        }).addClass('slide-' + (nextSlide + 1));

        const mobileImages = [
            'images/blog-image1.png',
            'images/blog-image2.jpg',
            'images/blog-image3.jpg',
            'images/blog-image4.jpg'
        ];
        $('.mobile-active-img').attr('src', mobileImages[nextSlide]);
    });

    $(window).on('resize orientationchange', function () {
        blogSlider.slick('setPosition');
    });

    $('#phone').inputmask("+375 (999) 999-99-99");
    $('#submit').click(function (e) {
        e.preventDefault(); 
        let hasError = false;
        const name = $('#name');
        const phone = $('#phone');
        const comment = $('#comment');
        const loader = $('#loader');
        $('.contact-input').removeClass('error');
        $('.error-input').hide();

        if (!name.val().trim()) {
            name.addClass('error');
            name.next('.error-input').show(); 
            hasError = true;
        }

        if (!phone.val().trim() || !phone.inputmask("isComplete")) {
            phone.addClass('error');
            phone.next('.error-input').show(); 
            hasError = true;
        }

        if (!comment.val().trim()) {
            comment.addClass('error');
            comment.next('.error-input').show(); 
            hasError = true;
        }

        if (!hasError) {
            if (loader.length) loader.css('display', 'flex');
            $.ajax({
                method: "POST",
                url: "https://testologia.ru/checkout",
                data: {
                    name: name.val(),
                    phone: phone.val(),
                    comment: comment.val()
                }
            })
                .done(function (msg) {
                    if (loader.length) loader.hide();
                    if (msg.success === 1 || msg.success === "1") {
                        $('.contact-form').hide();
                        $('.success-message').css('display', 'flex');
                    } else {
                        alert("Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ");
                    }
                    $('#success-ok').off('click').click(function () {
                        name.val('');
                        phone.val('');
                        comment.val('');
                        $('.contact-input').removeClass('error');
                        $('.error-input').hide();
                        $('.success-message').hide();
                        $('.contact-form').show();
                    });
                })
                .fail(function () {
                    if (loader.length) loader.hide();
                    alert("Ошибка соединения с сервером. Попробуйте позже.");
                });
        }
    });
});

