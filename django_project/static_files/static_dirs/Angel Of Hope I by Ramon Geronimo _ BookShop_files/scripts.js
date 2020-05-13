//  ====================================================================================================
//  Scripts for the announcement bar; called in the AnnouncementBar user control
//  ====================================================================================================

var AVL = AVL || {};


AVL.ANNOUNCEMENTBAR = {
    CSSAnnouncementHeader: "announcement-header",
    CSSAnnouncementContainer: "announcement-container",
    BypassLocalStorageCheck: false,

    Init: function () {

        AVL.ANNOUNCEMENTBAR.DOM.RepositionContainers();

        $(window).on("resize orientationchange", function () {
            AVL.ANNOUNCEMENTBAR.DOM.RepositionContainers();
        });

        $(".link-dismiss").on("click", function () {
            AVL.ANNOUNCEMENTBAR.DOM.RemoveAnnouncementBar();
        });
    },

    DOM: {

        RepositionContainers: function () {
            // Check if web storage is supported by browser
            if (typeof (Storage) !== "undefined" && !AVL.ANNOUNCEMENTBAR.BypassLocalStorageCheck) {

                var announcementBanner = $("#announcement-bar");

                // Retrieve storage item
                if (localStorage.getItem("announcement") !== "off") {
                    AVL.ANNOUNCEMENTBAR.DOM.RenderAnnouncementBar();
                }
                else {
                    if ($(announcementBanner).length > 0) {
                        $(announcementBanner).remove();
                    }
                }
            } else {
                AVL.ANNOUNCEMENTBAR.DOM.RenderAnnouncementBar();
            }
        },

        RenderAnnouncementBar: function () {
            var siteHeader = $("#site-header"),
                contentContainer = $("#content-container"),
                announcementBanner = $("#announcement-bar"),
                isMobile = $(window).width() <= 960,
                mobileHeaderWrapper = $("#mobile-header > .content-wrapper"),
                siteHeaderWrapper = $("#site-header > .content-wrapper"),
                priority = $("input[name$='hdnAnnouncementState']").val(),
                displayLocation = $("input[name$='hdnAnnouncementDisplayLocation']").val(),
                bodyWidth = $("body").width(),
                mobileHeader = $("#mobile-header"),
                doubleBanner = $("#nav2-container"),
                isDM = $("#avlBrand").val() === "0",
                isQuoter = $("#quoter-container").length > 0,
                containerToBePadded = isQuoter ? $(contentContainer) : (isDM ? $("#page") : $("#content")); // for DiscMakers the overarching content page has been updated 

            if (priority === undefined || displayLocation === undefined) return false;

            var isMarketingPage = $("#hdnIsApplication").val() === undefined;
            var isApplicationPage = !isMarketingPage && $("#hdnIsApplication").val() === "true";
            
            if ($(announcementBanner).length > 0) {
                switch (priority) {
                    case "3":
                        $(announcementBanner).addClass("high");
                        break;
                    case "2":
                        $(announcementBanner).addClass("medium");
                        break;
                    case "1":
                        $(announcementBanner).addClass("low");
                        break;
                    case "0": // Hidden State
                        return;
                }
                
                // If displayLocation is 0, show the notification bar on both Application and marketing pages
                switch (displayLocation) {
                    case "0": // Both Apps and Marketing
                        $(announcementBanner).css("display", "table");
                        break;
                    case "1": // Application pages only
                        if (isApplicationPage) 
                            $(announcementBanner).css("display", "table");
                        else 
                            return; // Do not update any styles when we aren't showing the announcement
                        break;
                    case "2": // Marketing pages only
                        if (isMarketingPage) 
                            $(announcementBanner).css("display", "table");
                        else 
                            return; // Do not update any styles when we aren't showing the announcement
                        break;
                }
                
                if (isQuoter) {
                    if (!isMobile) {
                        $(siteHeaderWrapper).before($(announcementBanner));
                        $(siteHeader).addClass(AVL.ANNOUNCEMENTBAR.CSSAnnouncementHeader);
                        $(containerToBePadded).addClass(AVL.ANNOUNCEMENTBAR.CSSAnnouncementContainer);
                    }
                } else {
                    $("#nav-bar").css({ "top": $(announcementBanner).height() + "px", "box-shadow": "none" });

                    if (bodyWidth <= 1024) {

                        $(mobileHeaderWrapper).before($(announcementBanner));
                        var mobileHeaderHeight = $(announcementBanner).height() + 50;
                        $(mobileHeader).css("height", mobileHeaderHeight + "px");

                        if (isDM) {
                            if ($(containerToBePadded).css("margin-top") === "15px") {
                                $(containerToBePadded).css("padding-top", "30px");
                            } else {
                                $(containerToBePadded).css("padding-top", mobileHeaderHeight + "px");
                            }
                        }
                        else {
                            $(containerToBePadded).addClass(AVL.ANNOUNCEMENTBAR.CSSAnnouncementContainer);
                        }

                        if ($(doubleBanner).length) {
                            $(containerToBePadded).css("padding-top", "0");
                            $(doubleBanner).css("padding-top", mobileHeaderHeight + "px");
                        } else {
                            $(containerToBePadded).css("padding-top", mobileHeaderHeight + "px");
                        }

                    } else {
                        var siteHeaderHeight = $(announcementBanner).height() + 70;
                        $(siteHeaderWrapper).before($(announcementBanner));
                        $(siteHeader).addClass(AVL.ANNOUNCEMENTBAR.CSSAnnouncementHeader).css("height", siteHeaderHeight + "px");
                        $(containerToBePadded).addClass(AVL.ANNOUNCEMENTBAR.CSSAnnouncementContainer);
                        doubleBanner.css("padding-top", 70 + $(announcementBanner).height() + "px");
                        if ($(doubleBanner).length) {
                            $(containerToBePadded).removeClass("announcement-container");
                        }
                    }
                    $("#marketing-content-container").addClass(AVL.ANNOUNCEMENTBAR.CSSAnnouncementContainer);
                }
            }
        },
        
        RemoveAnnouncementBar: function () {
            // Remove announcement bar when user clicks on the "X" icon to dismiss the message
            var announcementBanner = $("#announcement-bar"),
                siteHeader = $("#site-header"),
                mobileHeader = $("#mobile-header"),
                contentContainer = $("#content-container, #page"),
                doubleBanner = $("#nav2-container"),
                isDM = $("#avlBrand").val() === "0",
                isQuoter = $("#quoter-container").length > 0,
                containerToBePadded = isQuoter ? $(contentContainer) : (isDM ? $("#page") : $("#content"));

            mobileHeader.css("height", "auto");
            $(containerToBePadded).attr("style", "");
            $(doubleBanner).attr("style", "");
            $("#nav-bar").css("top", "");

            if ($(announcementBanner).length > 0) {
                $(announcementBanner).remove();

                // Check if web storage is supported by browser
                if (typeof (Storage) !== "undefined") {
                    // Save Storage item 
                    localStorage.setItem("announcement", "off");
                }

                // Remove the classes associated with the announcement bar
                $(siteHeader).removeClass(AVL.ANNOUNCEMENTBAR.CSSAnnouncementHeader).css("height", "");
                $(contentContainer).removeClass(AVL.ANNOUNCEMENTBAR.CSSAnnouncementContainer);
                $("#marketing-content-container").removeClass(AVL.ANNOUNCEMENTBAR.CSSAnnouncementContainer);
            }
        },

        InitAnnouncementSetup: function (message, textColor, bgColor) {
            if ($(".announcement-bar-message").length > 0) {
                $(".announcement-bar-message").html(message);
                $("a.announcement-link").css("color", "#" + textColor + " !important");
                $(".announcement-bar-message").css("color", "#" + textColor + " !important");
                $("#announcement-bar.medium .announcement-bar-dismiss a").css("color", "#" + textColor + " !important");
                $("#announcement-bar.medium").css("background-color", "#" + bgColor + " !important");
            }


        },

        InitAnnouncementClickTracking: function (name, value) {
            $(".announcement-bar-message").on("click", function () {
                _gaq.push(["_trackEvent", name, "Click", value]);
            });
        }
    }
};

//  ====================================================================================================
//  Ready Function
//  ====================================================================================================

$(document).ready(function () {
    AVL.ANNOUNCEMENTBAR.Init();
});
