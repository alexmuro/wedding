window.xs_screen_max = 768;
window.sm_screen_max = 992;

function viewport() {
    var c = window,
        b = "inner";
    if (!("innerWidth" in window)) {
        b = "client";
        c = document.documentElement || document.body
    }
    return {
        width: c[b + "Width"],
        height: c[b + "Height"]
    }
}

function toggle_main_menu() {
    if (viewport().width <= window.xs_screen_max) {
        var a = $("#left-sidebar #mobile-menu-icon");
        var b = $("#left-sidebar #main-menu");
        if (b.is(":visible")) {
            b.addClass("menu_closed_on_xs").removeClass("menu_opened_on_xs").slideUp("fast", function() {
                a.removeClass("active")
            })
        } else {
            b.addClass("menu_opened_on_xs").removeClass("menu_closed_on_xs").slideDown("fast", function() {
                a.addClass("active")
            })
        }
    }
}

function main_menu_visiblity_on_resize() {
    var a = $("#left-sidebar #main-menu");
    if (viewport().width > window.xs_screen_max) {
        if (a.hasClass("menu_closed_on_xs")) {
            a.show()
        }
    } else {
        if (a.hasClass("menu_closed_on_xs")) {
            a.hide()
        }
        if (a.hasClass("menu_opened_on_xs")) {
            a.show()
        }
    }
}

function sections_content_vertical_position() {
    if (viewport().width > window.xs_screen_max) {
        var a = $(window).height();
        var b = 0.8 * a;
        $("#main-content .section-wrapper").each(function() {
            var e = $(this).find(".content-wrapper");
            var c = e.height();
            var d = ($(this).hasClass("active")) ? true : false;
            if (c > b) {
                e.css({
                    position: "static"
                })
            } else {
                e.css({
                    position: "absolute"
                })
            }
        })
    } else {
        $("#main-content .section-wrapper .content-wrapper").css({
            position: "static"
        })
    }
}

function initialise_general_links_click_events() {
    $("a.link-scroll").click(function(c) {
        var a = $(this).attr("href");
        if (a !== undefined && a != "" && a != "#") {
            var d = a.substr(0, 1);
            if (d == "#") {
                if ($(a).length > 0) {
                    $("#main-content").addClass("same_page_link_in_action");
                    var b = $(a).offset().top;
                    $("html, body").stop().animate({
                        scrollTop: b
                    }, 1500, "easeInOutCubic", function() {
                        $("#main-content").removeClass("same_page_link_in_action");
                        update_active_sections_on_scroll()
                    });
                    c.preventDefault ? c.preventDefault() : c.returnValue = false
                } else {
                    return false
                }
            } else {}
        } else {
            c.preventDefault ? c.preventDefault() : c.returnValue = false;
            return false
        }
    })
}

function initialise_main_menu_click_events() {
    $("#main-menu .menu-item > a").off("click");
    $("#main-menu .menu-item > a").prop("onclick", null);
    $("#main-menu .menu-item > a").click(function(c) {
        var b = $(this).attr("href");
        var f = b.substr(0, 1);
        var e = $(this).parent(".menu-item");
        var d = e.attr("id");
        if (e.hasClass("scroll") && f == "#") {
            var a = (d !== undefined && d != "") ? d : "";
            $("#main-content").addClass("same_page_link_in_action");
            var g = (viewport().width > window.xs_screen_max) ? true : false;
            scroll_to_section(b, a, g);
            c.preventDefault ? c.preventDefault() : c.returnValue = false
        } else {
            if (b === undefined || b == "" || b == "#") {
                c.preventDefault ? c.preventDefault() : c.returnValue = false;
                return false
            }
        }
    })
}

function scroll_to_section(b, a, d) {
    if (b !== undefined && b != "") {
        var c = $("#main-content " + b + ".section-wrapper");
        if (c.length != 0 && !c.hasClass("active")) {
            var e = c.offset().top;
            $("html, body").stop().animate({
                scrollTop: e
            }, 1500, "easeInOutCubic", function() {
                $("#main-content").removeClass("same_page_link_in_action")
            });
            set_section_to_active(b, a, "", d)
        } else {
            return false
        }
    } else {
        return false
    }
}

function set_section_to_active(h, k, j, b) {
    if (h !== undefined && h != "") {
        var a = $("#main-content " + h + ".section-wrapper");
        $("#main-menu .menu-item").removeClass("active");
        $("#main-content .section-wrapper").removeClass("active");
        var d = (k != undefined && k != "") ? $("#main-menu #" + k + ".menu-item") : "";
        if (d != "" && d.length != 0) {
            d.addClass("active")
        } else {
            var c = h.substr(1);
            $("#main-menu #menu-item-" + c + ".menu-item").addClass("active")
        }
        a.addClass("active");
        toggle_top_icon_in_main_menu();
        if (b != false) {
            var f = a.attr("data-custom-background-img");
            var e = (f !== undefined && f != "") ? f : $("#outer-background-container").attr("data-default-background-img");
            if (e !== undefined && e != "") {
                var g = (j != true) ? 1500 : 550;
                $("#outer-background-container").backstretch(e, {
                    fade: g
                })
            }
        }
    }
}

function get_all_section_wrappers_in_page() {
    var a = $("#main-content").find(".section-wrapper");
    return a
}

function update_active_sections_on_scroll(f, a) {
    var e = (f !== undefined && f != "") ? f : $("#main-content").find(".section-wrapper");
    var a = (a !== a && a != "") ? a : 0.25 * ($(window).height());
    var b = $(document).scrollTop();
    var d = e.map(function() {
        var g = ($(this).offset().top) - a;
        var h = $(this).height();
        var j = g + h;
        if (b > g && b <= j) {
            return this
        }
    });
    if (d !== undefined && d != "") {
        var c = "#" + d.attr("id");
        if (!d.hasClass("active")) {
            set_section_to_active(c, "", true)
        }
    }
}

function toggle_top_icon_in_main_menu() {
    var a = $("#main-menu #menu-item-intro");
    if (a.hasClass("active")) {
        a.css({
            opacity: 0
        }).addClass("main-menu-top-icon-active")
    } else {
        a.css({
            opacity: 0.7
        }).removeClass("main-menu-top-icon-active")
    }
}

function preload_section_backgrounds() {
    var a = get_all_section_wrappers_in_page();
    if (a.length > 0) {
        a.each(function() {
            var c = $(this).attr("data-custom-background-img");
            if (c !== undefined && c != "") {
                var b = new Image();
                b.src = c
            }
        })
    }
}

function add_clear_items_to_fix_grid_items_different_heights_issue() {
    if ($("#main-content .grid .grid-item").length > 0) {
        var a = $("#main-content .grid");
        if (a.hasClass("clearfix-for-2cols")) {
            a.find(".grid-item:nth-of-type(2n+2)").after('<article class="clearfix"></article>');
            return false
        } else {
            if (a.hasClass("clearfix-for-3cols")) {
                a.find(".grid-item:nth-of-type(3n+3)").after('<article class="clearfix"></article>');
                return false
            }
        }
    }
}

function effect_fade_out_inactive_grid_items() {
    if ($("#main-content .projects-grid.effect-fade-inactive").length > 0) {
        $("#main-content .projects-grid.effect-fade-inactive").each(function() {
            var a = $(this);
            a.find(".grid-item .item-content").hover(function() {
                var b = $(this);
                b.css({
                    opacity: 1
                });
                a.find(".grid-item .item-content").not(b).css({
                    opacity: 0.3
                })
            }, function() {
                var b = $(this);
                b.css({
                    opacity: 0.3
                })
            });
            a.hover(function() {}, function() {
                setTimeout(function() {
                    a.find(".grid-item .item-content").css({
                        opacity: 1
                    })
                }, 200)
            })
        })
    }
}

function set_height_of_parent_content_wrappers() {
    var a = $("#main-content .max-height");
    a.each(function() {
        var b = $(this).parents(".content-wrapper");
        if (b.length > 0) {
            b.parents(".section-wrapper").addClass("modified-height");
            var c = $(this).attr("data-height-percent");
            if (c !== undefined && c != "" && !isNaN(c)) {
                b.css({
                    height: c + "%"
                })
            } else {
                b.css({
                    height: "80%"
                })
            }
        }
    })
}

function set_equal_height_to_all_carousel_slides_on_small_displays() {
    var a = $("#main-content .carousel");
    a.each(function() {
        var d = ($(this).attr("data-height-percent") !== undefined && $(this).attr("data-height-percent") != "" && !isNaN($(this).attr("data-height-percent"))) ? $(this).attr("data-height-percent") : 80;
        var c = (d / 100) * viewport().height;
        var e = $(this).find(".item .carousel-text-content");
        $(this).find(".item:not(.active)").css({
            opacity: "0",
            position: "absolute",
            display: "block"
        });
        e.css({
            height: "auto"
        });
        var f = [];
        e.each(function() {
            f.push($(this).height())
        });
        var b = Math.max.apply(Math, f) + 40;
        $(this).find(".item:not(.active)").attr("style", "");
        if (viewport().width <= window.sm_screen_max || b >= c) {
            $(this).parents(".section-wrapper").addClass("modified-height");
            e.height(b)
        } else {
            $(this).parents(".section-wrapper").removeClass("modified-height");
            $(this).removeClass("slides-height-modified").find(".item .carousel-text-content").css({
                height: "100%"
            })
        }
    })
}

function populate_and_open_modal(b, g, f, d) {
    var j = $("#common-modal.modal");
    var k = j.find(".modal-body");
    var c = $("#" + g);
    var h = "";
    if (d !== undefined && d != "") {
        h = d
    }
    if (k.length > 0 && c.length > 0) {
        $("#outer-container").fadeTo("fast", 0.2);
        var a = $(document).scrollTop();
        var e = c.html();
        k.empty().html(e);
        j.modal();
        c.find("a[data-lightbox]").each(function() {
            var l = $(this).attr("data-lightbox");
            $(this).removeAttr("data-lightbox");
            $(this).attr("data-mod-lightbox", l)
        });
        if (h != "") {
            j.addClass(h)
        }
        j.on("shown.bs.modal", function(l) {
            position_modal_at_centre();
            if (f !== undefined && f != "" && $("#common-modal.modal").find(f).length > 0) {
                var m = $("#common-modal.modal").find(f).offset().top;
                $("#common-modal.modal").stop().animate({
                    scrollTop: m
                }, 800, "easeInOutCubic")
            }
            modal_backdrop_height(j)
        });
        j.on("hide.bs.modal", function(l) {
            $("#outer-container").fadeTo("fast", 1);
            $("#" + g).find("a[data-mod-lightbox]").each(function() {
                var m = $(this).attr("data-mod-lightbox");
                $(this).removeAttr("data-mod-lightbox");
                $(this).attr("data-lightbox", m)
            })
        });
        j.on("hidden.bs.modal", function(l) {
            k.empty();
            if (h != "") {
                j.removeClass(h)
            }
        })
    }
    b.preventDefault ? b.preventDefault() : b.returnValue = false;
    return false
}

function modal_backdrop_height(a) {
    a.find(".modal-backdrop").css({
        "min-height": a.find(".modal-dialog").outerHeight(true) + "px"
    })
}

function position_modal_at_centre() {
    var f = $(".modal");
    if (f.length > 0 && f.is(":visible")) {
        var a = f.find(".modal-dialog");
        var c = a.width();
        var d = a.height();
        var e = ((d + 70) < viewport().height) ? true : false;
        if (viewport().width > window.sm_screen_max && e == true) {
            var b = (viewport().height - d) / 2;
            a.css({
                "margin-top": b + "px",
                "margin-bottom": "20px"
            })
        } else {
            a.removeAttr("style")
        }
    }
}

function go_to_top_visibility() {
    var a = $("#go-to-top");
    if (a.length > 0) {
        var b = $(document).scrollTop();
        if (b < viewport().height) {
            a.removeClass("active")
        } else {
            a.addClass("active")
        }
    }
}

function scroll_to_top() {
    $("html, body").stop().animate({
        scrollTop: 0
    }, 1500, "easeInOutCubic", function() {
        $("#go-to-top").removeClass("active")
    })
}

function load_images(b, d, f) {
    var e = $("." + b);
    if (e.length > 0) {
        var a = new Array();
        e.each(function() {
            var j = $(this).attr("data-img-src");
            if (j !== undefined && j != "") {
                var h = new Array();
                h.img_object = $(this);
                h.img_src = j;
                a.push(h)
            }
        });
        var c = a.length;
        for (i = 0; i < c; i++) {
            var g = new Image();
            g.src = a[i]["img_src"];
            a[i]["img_object"].attr("src", a[i]["img_src"]);
            if (d == true) {
                a[i]["img_object"].removeClass(b)
            }
            if (f == true && i == c - 1 && (!jQuery.browser.mobile || viewport().width > window.xs_screen_max)) {
                g.onload = function() {
                    sections_content_vertical_position()
                }
            }
        }
    }
}

function validate_and_submit_forms(b) {
    var a = (b !== undefined && b.length > 0) ? b : $("form.validate-form");
    a.each(function() {
        var c = $(this);
        c.find(".validate-field").each(function() {
            $(this).change(function() {
                $(this).siblings(".alert").fadeOut("fast", function() {
                    $(this).remove()
                });
                if ($(this).val().trim() != "") {
                    var e = validate_fields(c, $(this));
                    if (e.length > 0) {
                        if (e[0]["message"] !== undefined && e[0]["message"] != "" && e[0]["message"] != "success") {
                            var d = '<div class="alert">' + e[0]["message"] + "</div>";
                            $(this).after(d);
                            $(this).siblings(".alert").fadeIn("fast")
                        }
                    }
                }
            })
        });
        c.find("#form-captcha-refresh").click(function() {
            reset_captcha(c)
        });
        c.submit(function(e) {
            e.preventDefault ? e.preventDefault() : e.returnValue = false;
            $(this).find(".form-loader").fadeIn("fast");
            var d = $(this).attr("action");
            if (d === undefined && d == "") {
                return false
            }
            $(this).find(".alert").fadeOut("fast", function() {
                $(this).remove()
            });
            $(this).find(".form-general-error-container").fadeOut("fast", function() {
                $(this).empty()
            });
            var f = false;
            $(this).find(".validate-field").each(function() {
                var h = validate_fields(c, $(this));
                if (h.length > 0) {
                    if (h[0]["message"] !== undefined && h[0]["message"] != "" && h[0]["message"] != "success") {
                        var g = '<div class="alert">' + h[0]["message"] + "</div>";
                        $(this).after(g);
                        $(this).siblings(".alert").fadeIn("fast");
                        f = true
                    }
                }
            });
            if (f == true) {
                $(this).find(".form-loader").fadeOut("fast");
                return false
            }
            $.ajax({
                type: "POST",
                url: d,
                data: $(this).serialize(),
                dataType: "html",
                success: function(k) {
                    
                    k = JSON.parse(k).responseText;
                    console.log('success',k);
                    c.find(".form-loader").fadeOut("fast");
                    var l = (k == "success") ? true : false;
                    var h = (k == "captcha") ? false : true;
                    var g = "";
                    switch (k) {
                        case "success":
                            g = "Form submitted successfully.";
                            break;
                        case "captcha":
                            g = "Incorrect text entered. (Case-sensitive)";
                            break;
                        case "incomplete":
                            g = "Please fill in all required fields.";
                            break;
                        case "error":
                            g = "An error occured. Please try again later.";
                            break
                    }
                    var j = '<div class="alert ';
                    j += (l == true) ? "success" : "error";
                    j += '">' + g + "</div>";
                    if (!h) {
                        c.find("#form-captcha").parent(".form-group").append(j);
                        c.find("#form-captcha").siblings(".alert").fadeIn("fast")
                    } else {
                        c.find(".form-general-error-container").html(j).fadeIn("fast", function() {
                            $(this).delay(10000).fadeOut("fast", function() {
                                $(this).html("")
                            })
                        })
                    }
                    reset_captcha(c);
                    if (l == true) {
                        c.find(".form-control").val("")
                    }
                },
                error: function(h) {
                    c.find(".form-loader").fadeOut("fast");
                    var g = '<div class="alert">An error occured. Please try again later.</div>';
                    c.find(".form-general-error-container").html(g).fadeIn("fast")
                }
            })
        })
    })
}

function reset_forms(b) {
    if (b !== undefined && b.length > 0) {
        var a = b;
        a.find("input").val("");
        a.find(".alert").remove();
        a.find(".form-general-error-container").empty().hide();
        reset_captcha(b)
    }
}

function reset_captcha(b) {
    var a = (b !== undefined && b.length > 0) ? b : $("form.validate-form");
    a.each(function() {
        var e = $(this);
        var c = e.find("#form-captcha-img");
        if (c.length > 0 && e.is(":visible")) {
            var f = new Date().getTime();
            c.replaceWith('<img id="form-captcha-img" src="assets/php/form_captcha/captcha_img.php?t=' + f + '" style="display:none">');
            e.find("#form-captcha").val("");
            setTimeout(function() {
                e.find("#form-captcha-img").show()
            }, 500)
        }
    })
}

function validate_fields(d, a) {
    if (d !== undefined && d.length > 0) {
        var b = (a !== undefined && a.length > 0) ? a : d.find(".validate");
        var c = new Array();
        b.each(function() {
            var e = $(this).attr("data-validation-type");
            var h = $(this).hasClass("required");
            var g = $(this).val().trim();
            var f = new Array();
            f.field_object = $(this);
            f.message = "success";
            if (h == true && (g == "" || g === null || g === undefined)) {
                f.message = "This field is required"
            }
            if (e == "string" && (g != "" && g !== null && g !== undefined)) {
                if (g.match(/^[a-z0-9 .\-]+$/i) == null) {
                    f.message = "Invalid characters found."
                }
            } else {
                if (e == "email" && (g != "" && g !== null && g !== undefined)) {
                    if (g.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) == null) {
                        f.message = "Please enter a valid email address."
                    }
                } else {
                    if (e == "phone" && (g != "" && g !== null && g !== undefined)) {
                        if (g.match(/^\(?\+?[\d\(\-\s\)]+$/) == null) {
                            f.message = "Invalid characters found."
                        }
                    }
                }
            }
            c.push(f)
        });
        return c
    }
}

function contact_form_IE9_placeholder_fix() {
    var a = $("form");
    a.each(function() {
        var b = $(this);
        $(this).find(".form-control").each(function() {
            var c = $(this).attr("placeholder");
            if (c !== undefined && c != "") {
                $(this).val(c);
                $(this).focus(function() {
                    if ($(this).val() == c) {
                        $(this).val("")
                    }
                });
                $(this).blur(function() {
                    if ($(this).val() == "") {
                        $(this).val(c)
                    }
                })
            }
        })
    })
};