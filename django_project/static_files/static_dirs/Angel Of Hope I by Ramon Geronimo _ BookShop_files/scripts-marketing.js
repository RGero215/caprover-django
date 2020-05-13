var AVL = AVL || {};

AVL.TRACKING = {

    Init: function() {
      
        switch (AVL.UTILITIES.FUNCTIONS.GetAvlBrand()) {

            case "0": // DM
                AVL.TRACKING.FUNCTIONS.AddWisepopTracking("26242");
                AVL.TRACKING.FUNCTIONS.AddTrustpilotWidget();
                AVL.TRACKING.FUNCTIONS.AddNetresultEmailTracking("18603");
                break;

            case "4": // Oasis
                AVL.TRACKING.FUNCTIONS.AddHotjarTracking("344631");
                AVL.TRACKING.FUNCTIONS.AddWisepopTracking("26364");
                AVL.TRACKING.FUNCTIONS.AddNetresultEmailTracking("18660");
                break;

            case "5": // CDB
                AVL.TRACKING.FUNCTIONS.AddHotjarTracking("297297");
                AVL.TRACKING.FUNCTIONS.AddWisepopTracking("29004");
                AVL.TRACKING.FUNCTIONS.AddNetresultEmailTracking("18727");
                break;

            case "14": // BBP
                AVL.TRACKING.FUNCTIONS.AddBingTracking();
                AVL.TRACKING.FUNCTIONS.AddWisepopTracking("26363");
                AVL.TRACKING.FUNCTIONS.AddGoogleAdsServices(1029153070);
                AVL.TRACKING.FUNCTIONS.AddTrustpilotWidget();
                AVL.TRACKING.FUNCTIONS.AddNetresultEmailTracking("18604");
                break;
            case "16": // BookShop
                AVL.TRACKING.FUNCTIONS.AddFacebookPixelTracking("311038509644983");
                break;
        }
    },

    FUNCTIONS: {

        AddBingTracking: function() {
            (function (w, d, t, r, u) {
                var f, n, i;
                w[u] = w[u] || [], f = function() {
                        var o = { ti: "23002453" };
                        o.q = w[u], w[u] = new UET(o), w[u].push("pageLoad")
                    },
                    n = d.createElement(t), n.src = r, n.async = 1, n.onload = n.onreadystatechange = function() {
                        var s = this.readyState;
                        s && s !== "loaded" && s !== "complete" || (f(), n.onload = n.onreadystatechange = null);
                    }, i = d.getElementsByTagName(t)[0], i.parentNode.insertBefore(n, i);
            })(window, document, "script", "//bat.bing.com/bat.js", "uetq");
        },

        AddFacebookPixelTracking: function (brandTrackingID) {

            // ================================================================================
            // Facebook Pixel tracks conversions from Facebook ads.
            // It allows monitoring of how successful our Facebook ads actually were—giving more accurate conversion rates—and creates custom audiences based on site traffic.
            // ================================================================================
            if (typeof fbq === "undefined") {
                !function(f, b, e, v, n, t, s) {
                    if (f.fbq) return;
                    n = f.fbq = function() {
                        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
                    };
                    if (!f._fbq) f._fbq = n;
                    n.push = n;
                    n.loaded = !0;
                    n.version = "2.0";
                    n.queue = [];
                    t = b.createElement(e);
                    t.async = !0;
                    t.src = v;
                    s = b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t, s);
                }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");

                fbq("init", brandTrackingID);
                fbq("track", "PageView");
            }
        },


        AddGoogleAdsServices: function (brandTrackingID) {

            // ================================================================================
            // Google remarketing tracking is a part of Google Adwords and Google Analytics. 
            // The site tag is a web tagging library for Google's site measurement, conversion tracking, and remarketing products.
            // ================================================================================

            /* <![CDATA[ */
            window.google_conversion_id = brandTrackingID;
            window.google_custom_params = window.google_tag_params;
            window.google_remarketing_only = true;
            /* ]]> */

            var scriptSource = "//www.googleadservices.com/pagead/conversion.js";
            AVL.TRACKING.FUNCTIONS.AddScriptDynamically(scriptSource, false, false);
              
        },
              
        AddHotjarTracking: function (brandTrackingID) {

            // ================================================================================
            // Hotjar is used to measure and observe user behaviors. 
            // It tracks users' interactions with our site by recording their clicks, taps and scrolling behavior. 
            // ================================================================================

            (function (h, o, t, j, a, r) {
                h.hj = h.hj || function () { (h.hj.q = h.hj.q || []).push(arguments) };
                h._hjSettings = { hjid: brandTrackingID, hjsv: 5 };
                a = o.getElementsByTagName("head")[0];
                r = o.createElement("script");
                r.async = 1;
                r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
                a.appendChild(r);
            })(window, document, "//static.hotjar.com/c/hotjar-", ".js?sv=");
        },

        AddNetresultEmailTracking: function (brandTrackingID) {

            // ================================================================================
            // Net-Results code pertain to the email program. 
            // The tracking code monitors which pages on our websites visitors do and do not land on. 
            // With this code, we are able to send emails to subscribers based on which pages they do or do not visit.
            // ================================================================================

            (function (c, a, p, j, s) {
                p = c.createElement(a); j = !c.URL.indexOf("https:") ? "s" : "";
                p.type = "text/java" + a;
                p.id = "__maSrc";
                p.async = true;
                p.src = "http" + j + "://" + j + "c.cdnma.com/apps/" + brandTrackingID + "/capture.js";
                s = c.getElementsByTagName(a)[0];
                s.parentNode.insertBefore(p, s);
            }(document, "script"));

            document.getElementById("__maSrc").setAttribute("data-pid", brandTrackingID);
        },

        AddWisepopTracking: function (brandTrackingID) {

            // ================================================================================
            // WisePops is used to create custom popups. 
            // The tracking code allows us to analyze the pop­up’s performance and click through rate, which can be viewed on WisePops site's data dashboard.
            // ================================================================================

            (function () {
                var scriptSource = document.location.protocol + "//loader.wisepops.com/default/index/get-loader?user_id=" + brandTrackingID;
                AVL.TRACKING.FUNCTIONS.AddScriptDynamically(scriptSource, true, false);
            })();

        },

        AddTrustpilotWidget: function () {

            // ================================================================================
            // Script for Trustpilot widget to run 
            // ================================================================================
            
            (function () {
                var scriptSource = "//widget.trustpilot.com/bootstrap/v5/tp.widget.sync.bootstrap.min.js";
                AVL.TRACKING.FUNCTIONS.AddScriptDynamically(scriptSource, false, true);
            })();

        },

        AddScriptDynamically: function (scriptSource, async, defer) {
            
            var newScript = document.createElement("script");
            newScript.type = "text/javascript";
            if (async) newScript.async = true;
            if (defer) newScript.defer = true;
            newScript.src = scriptSource;
            var scriptElement = document.getElementsByTagName("script")[0];
            scriptElement.parentNode.insertBefore(newScript, scriptElement);
        }

    }

}

AVL.TRACKING.Init();

