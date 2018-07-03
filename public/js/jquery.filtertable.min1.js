/**
 * jquery.filterTable
 *
 * This plugin will add a search filter to tables. When typing in the filter,
 * any rows that do not contain the filter will be hidden.
 *
 * Utilizes bindWithDelay() if available. https://github.com/bgrins/bindWithDelay
 *
 * @version v1.5.5
 * @author Sunny Walker, swalker@hawaii.edu
 * @license MIT
 */
!function($){var e=$.fn.jquery.split("."),t=parseFloat(e[0]),n=parseFloat(e[1]);2>t&&8>n?($.expr[":"].filterTableFind=function(e,t,n){return $(e).text().toUpperCase().indexOf(n[3].toUpperCase())>=0},$.expr[":"].filterTableFindAny=function(e,t,n){var i=n[3].split(/[\s,]/),r=[];return $.each(i,function(e,t){var n=t.replace(/^\s+|\s$/g,"");n&&r.push(n)}),r.length?function(e){var t=!1;return $.each(r,function(n,i){return $(e).text().toUpperCase().indexOf(i.toUpperCase())>=0?(t=!0,!1):void 0}),t}:!1},$.expr[":"].filterTableFindAll=function(e,t,n){var i=n[3].split(/[\s,]/),r=[];return $.each(i,function(e,t){var n=t.replace(/^\s+|\s$/g,"");n&&r.push(n)}),r.length?function(e){var t=0;return $.each(r,function(n,i){$(e).text().toUpperCase().indexOf(i.toUpperCase())>=0&&t++}),t===r.length}:!1}):($.expr[":"].filterTableFind=jQuery.expr.createPseudo(function(e){return function(t){return $(t).text().toUpperCase().indexOf(e.toUpperCase())>=0}}),$.expr[":"].filterTableFindAny=jQuery.expr.createPseudo(function(e){var t=e.split(/[\s,]/),n=[];return $.each(t,function(e,t){var i=t.replace(/^\s+|\s$/g,"");i&&n.push(i)}),n.length?function(e){var t=!1;return $.each(n,function(n,i){return $(e).text().toUpperCase().indexOf(i.toUpperCase())>=0?(t=!0,!1):void 0}),t}:!1}),$.expr[":"].filterTableFindAll=jQuery.expr.createPseudo(function(e){var t=e.split(/[\s,]/),n=[];return $.each(t,function(e,t){var i=t.replace(/^\s+|\s$/g,"");i&&n.push(i)}),n.length?function(e){var t=0;return $.each(n,function(n,i){$(e).text().toUpperCase().indexOf(i.toUpperCase())>=0&&t++}),t===n.length}:!1})),$.fn.filterTable=function(e){var t={autofocus:!1,callback:null,containerClass:"filter-table",containerTag:"p",filterExpression:"filterTableFind",hideTFootOnFilter:!1,highlightClass:"alt",ignoreClass:"",ignoreColumns:[],inputSelector:null,inputName:"",inputType:"search",label:"Filter:",minChars:1,minRows:8,placeholder:"search this table",preventReturnKey:!0,quickList:[],quickListClass:"quick",quickListGroupTag:"",quickListTag:"a",visibleClass:"visible"},n=function(e){return e.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},i=$.extend({},t,e),r=function(e,t){var n=e.find("tbody");if(""===t||t.length<i.minChars)n.find("tr").show().addClass(i.visibleClass),n.find("td").removeClass(i.highlightClass),i.hideTFootOnFilter&&e.find("tfoot").show();else{var r=n.find("td");if(n.find("tr").hide().removeClass(i.visibleClass),r.removeClass(i.highlightClass),i.hideTFootOnFilter&&e.find("tfoot").hide(),i.ignoreColumns.length){var a=[];i.ignoreClass&&(r=r.not("."+i.ignoreClass)),a=r.filter(":"+i.filterExpression+'("'+t.replace(/(['"])/g,"\\$1")+'")'),a.each(function(){var e=$(this),t=e.parent().children().index(e);-1===$.inArray(t,i.ignoreColumns)&&e.addClass(i.highlightClass).closest("tr").show().addClass(i.visibleClass)})}else i.ignoreClass&&(r=r.not("."+i.ignoreClass)),r.filter(":"+i.filterExpression+'("'+t.replace(/(['"])/g,"\\$1")+'")').addClass(i.highlightClass).closest("tr").show().addClass(i.visibleClass)}i.callback&&i.callback(t,e)};return this.each(function(){var e=$(this),t=e.find("tbody"),a=null,s=null,l=null,o=!0;"TABLE"===e[0].nodeName&&t.length>0&&(0===i.minRows||i.minRows>0&&t.find("tr").length>=i.minRows)&&!e.prev().hasClass(i.containerClass)&&(i.inputSelector&&1===$(i.inputSelector).length?(l=$(i.inputSelector),a=l.parent(),o=!1):(a=$("<"+i.containerTag+" />"),""!==i.containerClass&&a.addClass(i.containerClass),a.prepend(i.label+" "),l=$('<input type="'+i.inputType+'" placeholder="'+i.placeholder+'" name="'+i.inputName+'" />'),i.preventReturnKey&&l.on("keydown",function(e){return 13===(e.keyCode||e.which)?(e.preventDefault(),!1):void 0})),i.autofocus&&l.attr("autofocus",!0),$.fn.bindWithDelay?l.bindWithDelay("keyup",function(){r(e,$(this).val())},200):l.bind("keyup",function(){r(e,$(this).val())}),l.bind("click search input paste blur",function(){r(e,$(this).val())}),o&&a.append(l),i.quickList.length>0&&(s=i.quickListGroupTag?$("<"+i.quickListGroupTag+" />"):a,$.each(i.quickList,function(e,t){var r=$("<"+i.quickListTag+' class="'+i.quickListClass+'" />');r.text(n(t)),"A"===r[0].nodeName&&r.attr("href","#"),r.bind("click",function(e){e.preventDefault(),l.val(t).focus().trigger("click")}),s.append(r)}),s!==a&&a.append(s)),o&&e.before(a))})}}(jQuery);