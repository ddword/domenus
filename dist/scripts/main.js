var Domenus = {
    Registry: {
        storage: [],
        set: function (item) {
            if (!item in this.storage) {
                this.storage.push(item);
            }
        },
        get: function (item) {
            var instance = null;
            this.storage.forEach(function(v) {
                if (v === item) {
                    instance = item;
                    return null;
                }
            });

            return instance;
        }
    }
};

function touchspin($el) {
    if (Domenus.Registry.get($el)) {
        return $el;
    }

    Domenus.Registry.set($el);

    var $inputCtrl = $el
        .find('.period-control-input')
        .TouchSpin({
            min: 1,
            max: 10,
            step: 1
        })
        .on('touchspin.on.min', function () {
            $(this).find('.bootstrap-touchspin-down').attr('disabled', true);
        })
        .on('touchspin.on.max', function () {
            $(this).find('.bootstrap-touchspin-up').attr('disabled', true);
        })
        .on('touchspin.on.startspin', function() {
            var period = $(this).val() || 1,
                p = parseInt(period, 10);

            if (p == 1) {
                $(this).val(p + ' год');
            } else if (p < 5) {
                $(this).val(p + ' года');
            } else if(p >= 5) {
                $(this).val(p + ' лет');
            }

        });

    $('button.bootstrap-touchspin-up').text('>');
    $('button.bootstrap-touchspin-down').text('<');

    return $inputCtrl;
}
(function() {

    var Api = (function () {
        /**
         * @var Api instance
         */
        var instance;

        var result = '{"time":"2015-08-11 12:09:30","code":1,"result":[{"name":".org","price":"2300.00"},{"name":".com","price":"6300.00"},{"name":".ru","price":"2600.00"}]}';

        function init() {
            return {
                getPrices: function (userId) {
                    //todo: getresult from curl
                    return JSON.parse(result);
                }
            };
        }

        return {
            getInstance: function() {
                if (!instance) {
                    instance = init();
                }
                return instance;
            }
        };
    })();

    Domenus.Registry.Api = Api;
})(Domenus.Registry);
(function($) {
    "use strict";

    $(function() {

        touchspin($('.period-control')).trigger('touchspin.on.startspin');

        $(function () {
            if ($(window).width() > 768 ) {
                var $domainSelection = $('.top-search  > .domain-selection');
                $domainSelection
                .css({
                    width: '100%',
                    zIndex: '20',
                    background: '#eef0f1'
                }).sticky({topSpacing: 80});
            }
        });

         //header
       /* $(".navbar.navbar-default").sticky({
            topSpacing:0
        });*/

       // search
        $('input.search-tld').select2({
            tags: [".ru", ".com", ".org"],
            width: '100%'
        });

        // slider-reckl
        $('.slider.slider-reckl').slick({
            dots: true,
            infinite: false,
            speed: 300,
            arrows: false,
            slidesToShow: 4,
            slidesToScroll: 4,
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 606,
                    settings: {
                        dots: false,
                        arrows: true,
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
        //slider en index, domains,
        $('.slider.slider-domain').slick({
            dots: true,
            infinite: false,
            speed: 300,
            arrows: false,
            slidesToShow: 5,
            slidesToScroll: 5,
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                },
                {
                    breakpoint: 606,
                    settings: {
                        dots: false,
                        arrows: true,
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
        //slider cyrillic-domain
        $('.slider.cyrillic-domain').slick({
            dots: true,
            infinite: false,
            speed: 300,
            arrows: false,
            slidesToShow: 7,
            slidesToScroll: 7,
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 4
                    }
                },
                {
                    breakpoint: 606,
                    settings: {
                        dots: false,
                        arrows: true,
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
        //slider marketing
        $('.slider.fco-marketing').add('.slider.marketing').slick({
            dots: true,
            infinite: true,
            autoplay: true,
            autoSpeed: 3000,
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        dots: false,
                        arrows: true,
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
        //slider business-decisions, slider info
        $('.slider.business-decision').slick({
            dots: true,
            infinite: false,
            arrows: false,
            slidesToShow: 4,
            slidesToScroll: 4,
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        dots: false,
                        arrows: true,
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 606,
                    settings: {
                        dots: false,
                        arrows: true,
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    });
    //test showed dropdown table result with domains which dropped from .top-search.search-row
     /* скролл таблицы из подбора доменов*/
    $(function(){
        var scroll = 0,
            $topTable = $('.top-search > .container-fluid:last'),
            heightMenu = $('header').height(),
            heightSearch = $('.domain-selection').height();

        $(window).on('scroll', function () {
            scroll = this.pageYOffset;
        }).trigger('scroll');

        function showTable() {
            var total = heightMenu + heightSearch;

            if(scroll > $topTable.offset.top) {
                $('body, html').animate({
                    scrollTop: $topTable.offset.top - total.toFixed(2)
                });
            }
        }
        $('#search').click(showTable);
    });
    //header
    $(function() {
         if($(window).width() < 768){
             var prev = 80;
             var scroll = 0;

             $(window).scroll(function(){
                 scroll = $(window).scrollTop();
                 if (prev < scroll) {
                     $('header').hide();
                 } else {
                     $('header').slideDown(600);
                 }
                 prev = scroll;
             });
         }
    });
    //popover
    $(function() {
        var $popover = $(".form-group>div").data('data-toggle','popover');
        $popover.on('click', function () {
              $(this).popover('show');
        });
    });
    //table-domain
    $(function() {
        $('.table-filter > a').on('click', function () {
            $(this).next('.block-filter').slideToggle(300);
            $(this).find(".caret").toggleClass('turn');
        });
        $('a.table-toggle').on('click', function () {
            var cont = $(this).find('i.control-element');
            cont.toggleClass('active');/*for time*/
        });

        //checkbox in cell of table & icon-checkbox
        //чекбоксы в таблице с доменами
        $('.table').on('click', '.cell', function (e){
            e.stopPropagation();
            var $icell = $(this).find('i');
            var $input = $(this).find('input');
            /*переключение атрибута checked*/
            $input.prop("checked", !$input.is(":checked"));

            function calc(){
                var price = 0;
                var count =0;
                //считаем сумму по отмеченным чекбоксам
                $('.cell.cell-checked').each(function(){
                    price += parseInt($(this).find('.domain-price > span').text());
                    count ++;
                });
                var $block = $('.editor-domains');
                $block.find('.editor-domains--price > span').text('Сумма: ' + price + ' руб.');
                $block.find('.editor-domains--total > span').text(' Всего: ' + count + ' доменов.');
            };
            $(this).toggleClass('cell-checked');
            $icell.toggleClass('checked');

            calc();
            //editor-page
            //плавающее окно с суммой заказа на мобильной версии
            if(($('.cell').hasClass('cell-checked'))&&($(window).width() < 768 )) {
                $('.editor-domains').show().find('button').click(function (){
                        $('body, html').animate({
                            scrollTop: 0
                        }, 'slow');
                    $('.stripe.top-search').find('#search').addClass('focused');
                        return false;
                    });
            } else {
                $('.editor-domains').hide();
            }
        });

        $('.cell .domain-name').click(function(e) {
            e.stopPropagation();
        })
    });

    //accordion
    $(function(){
        $('a.panel-toggle').on('click', function () {
            var cont = $(this).find('i.control-element');
            cont.toggleClass('active');/*for time*/
            $(this).toggleClass('active');
        });
    });
    //spoilers
    $(function(){
        $('.form-whois').on('click', 'a.href-spoiler', function(){
            $(this).toggleClass('current');
            var $body =  $(this).parents('.form-group-head').next('.form-group-body');
            if($(this).hasClass('current')) {
                $body.slideDown();
            }
            else {
                $body.slideUp();
            }
        });
    });
    //accordion-spoilers in EDS page
    $(function(){
        $(".thead-tariffs").click(function(){
            if($(this).hasClass('current')) {
                $(this).removeClass('current').next().slideUp();
            }
            else {
                $('.thead-tariffs.current').removeClass('current').next().slideUp();
                $(this).addClass('current').next().slideDown();
            }
        });
    });
    //for block en page domain-package.html
    $(function() {
        $('.packageRuRf').popover({
            placement: "bottom",
            trigger: "hover",
            content: '<div class="pop-content">Заманчивое предложение для всех желающих сэкономить на регистрации сразу двух доменов - RU и/или РФ.<br> Зарегистрируйте 2 домена по сниженной цене - за 350 руб.</div>',
            html: true
        });

        $('.packageRuRfSu').popover({
            placement: "bottom",
            content: '<div class="pop-content">Регистрируйте домены в популярных зонах Российского Интернета - .RU, .SU и .РФ за 550 руб.</div>',
            trigger: "hover",
            html: true
        });

        $('.packageRuRf1200').popover({
            placement: "bottom",
            content: '<div class="pop-content">Предложение для практичных людей.<br>Подключайте пакет и регистрируйте домены всего за 120 руб.</div>',
            trigger: "hover",
            html: true
        });

        $('.fco-business-solutions .item').popover({
            placement: 'bottom',
            trigger: 'hover',
            container: 'body'
        });
    });

    $('.panel .panel-toggle').mousedown(function(e) {

        e.preventDefault();
    });

})(jQuery);


(function ($, Registry) {
    "use strict";


    var Search = {
        collapsed: true,
        /**
         * @var Array names
         * Domain names
         */
        names: [],

        /**
         * @var Array zones
         * Domain zones
         */
        zones: [],

        /**
         *
         */
        start: function() {
            if (
                this.names.length > 0 && this.collapsed
                ||
                this.names.length === 0 && !this.collapsed
            ) {
                var prices = Registry.Api.getInstance().getPrices();
                this.toggle();
            }
        },

        setNames: function() {
            var $inputControl = $('.search-sld'),
                values = $inputControl.val();

            this.names = values.split(/,?\s/).filter(function (v) {
                return v.length > 0;
            });
        },
        /**
         *
         */
        setZones: function() {
            var $inputControl = $('.search-tld'),
                zones = $inputControl.select2('data') || [];

            for (var zone in zones) {
                if (zones.hasOwnProperty(zone)) {
                    this.zones.push(zones[zone].id);
                }
            }
        },
        /**
         *
         */
        toggle: function () {
            var $hs = $('.home-search');

            if (this.collapsed) {
                $hs.addClass('search-mode');
                this.collapsed = false;
            } else {
                $hs.removeClass('search-mode');
                this.collapsed = true;
            }
        }
    };


    $('#search').on('click', function() {
        Search.start();
    });

    $('.search-sld').on('keyup', function () {
        Search.setNames();
    });

    $('.search-tld')
        .on('select2-removed', function () {
            if (!$(this).val() && !Search.collapsed) {
                Search.toggle();
            }
        })
        .on('change', function() {
            Search.setZones();
        });

})(jQuery, Domenus.Registry);
(function($) {

    var Cart = function() {
        this.$input = $('table tr').find('input.period-control-input');
        this.cost = 0;
        this.items = [
            {"id": 1, "name": "domain-name.org", "period": 5, "price": 1000},
            {"id": 2, "name": "domain-name.ru", "period": 3, "price": 1000 },
            {"id": 3, "name": "domain-name.ru", "period": 1, "price": 1200 },
            {"id": 4, "name": "domain-name.org", "period": 3, "price": 2400}
        ];
    };

    Cart.prototype = {

        remove: function($item, cb) {
            var id = $item.data('item'),
                self = this;

            this.items.forEach(function(item, idx) {
               if (id == item.id) {
                   self.items.splice(idx, 1);
                   return null;
               }
            });

            if (this.items.length == 0){
                 $("table tbody").append("<div>");
                $("table tbody div").text('Ваша корзина опустела');

            };

            if(cb){
                cb()
            };

            this.total();
        },

        total: function() {
            this.cost = 0;

            this.items.forEach(function(item) {
                this.cost += parseInt(item.price * item.period, 10);
            }, this);

            $('.price-order p > span').text(this.cost);

        }

    };

    var cart = new Cart();
    cart.total();

    $(function() {
        //remove item from cart
        $('.action-remove').click(function() {
            var $item = $(this).closest('tr');
            cart.remove($item, function () {
                $item.fadeOut(function() {
                    $(this).remove();
                });
            });
        })
    });

})(jQuery);