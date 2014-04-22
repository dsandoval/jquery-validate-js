/*
 * jquery.validate.js
 * 
 * Copyright 2014 Danilo A Sandoval <dsandoval@sernac.cl>
 * 
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
 * MA 02110-1301, USA.
 * 
 * 
 */

/* You need JQUERY */
/* Tested in jQuery v1.11.0 */

(function( $ ){

	$.validate = function (args) {

		var format = {
			"alpha" 	: /([a-zA-Z])\w+/g,
			"num" 		: /([0-9])\w+/g,
			"decimal" 	: /((?:\d*\.)?\d+)/g,
			"alphanum" 	: /([a-zA-Z0-9])\w+/g,
			"email" 	: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g,
		};

		var errormsg = {
			"not-null" 	: "El elemento no debe ser vacío.",
			"alpha" 	: "El elemento debe contener sólo letras.",
			"num" 		: "El elemento debe contener sólo números.",
			"decimal" 	: "El elemento debe contener sólo números y decimales",
			"alphanum" 	: "El elemento debe contener sólo números y letras.",
			"email" 	: "El elemento debe ser una dirección de correo electrónico.",
			"equalTo" 	: "Los elementos deben ser idénticos.",
			"minLength" : "La cantidad mínima de caracteres debe ser ",
			"maxLength" : "La cantidad máxima de caracteres debe ser ",
			"equalTo" 	: "Los elementos deben ser idénticos.",
			"date" 		: "La fecha posee un formato incorrecto"
		}

		var elements = args.elements;


		$.each(elements, function (element,opts) {


			$(element).css("background","#FFF");
			$(element).css("border-color","none");

			if ( opts.required == true || (typeof opts.required == 'object' && opts.required.val == true) ) {
				if ($(element).val() == "") {
					var e = ((opts.required.errormsg)? opts.required.errormsg : errormsg["not-null"]);
			     	setAlert(element);
			     	$(element).val('');
			     	$(element).attr('placeholder',e);
					return false;
				}
			}
			if (typeof opts.format == 'string' || (typeof opts.format == 'object' && typeof opts.format.val == 'string')) {
				var f = ((opts.format.val)? opts.format.val : opts.format);
				var e = ((opts.format.errormsg)? opts.format.errormsg : errormsg[f]);
				var re = format[f];
				if (!$(element).val().match(re)) {
					setAlert(element);
					$(element).val('');
		     		$(element).attr('placeholder',e);
					return false;		
				}
			}
			if (typeof opts.minLength == 'number' || (typeof opts.minLength == 'object' && typeof opts.minLength.val == 'number')) {
				var f = ((opts.minLength.val)? opts.minLength.val : opts.minLength);
				var e = ((opts.minLength.errormsg)? opts.minLength.errormsg : errormsg['minLength']+" "+opts.minLength);
				if ($(element).val().length < f) {
					setAlert(element);			
					$(element).val('');
		     		$(element).attr('placeholder',e);
					return false;		
				}
			}
			if (typeof opts.maxLength == 'number' || (typeof opts.maxLength == 'object' && typeof opts.maxLength.val == 'number')) {
				var f = ((opts.maxLength.val)? opts.maxLength.val : opts.maxLength);
				var e = ((opts.maxLength.errormsg)? opts.maxLength.errormsg : errormsg['maxLength']+" "+opts.maxLength);
				if ($(element).val().length > f) {
					setAlert(element);			
					$(element).val('');
		     		$(element).attr('placeholder',e);
					return false;		
				}
			}
			if (typeof opts.equalTo == 'string' || (typeof opts.equalTo == 'object' && typeof opts.equalTo.val == 'string')) {
				var f = ((opts.equalTo.val)? opts.equalTo.val : opts.equalTo);
				var e = ((opts.equalTo.errormsg)? opts.equalTo.errormsg : errormsg['equalTo']);
				if ($(element).val() != $(f).val()) {
					setAlert(element);			
					setAlert(f);	
					$(element).val('');
		     		$(element).attr('placeholder',e);
					return false;		
				}
			}

		});

		/* Paint element in red */
		function setAlert(element) {
			$(element).css("background","#F2DEDE");
			$(element).css("border-color","#EBCCD1");
			$('html,body').animate({ scrollTop: $(element).offset().top - 25 },'slow');
		}

	}
})( jQuery );

/* 
 How to use:

// On submit

$.validate({
	elements : {
		"#name" : {
			required : { val: true, errormsg: "Your name here!" },
			format : "alpha",
			minLength : 5,
		},
		"#mail" : {
			required : true,
			format : { val: "email", errormsg: "Your email here!!"},
		},
		"#confirm_mail" : {
			required : true,
			format : "email",
			equalTo : "#mail"
		},
		"#password" : {
			required : true,
			minLength : { val: 6, errormsg: "Mínimo 6 caracteres" },
			maxLength : { val: 10, errormsg: "Máximo 6 caracteres" },
		},
		"#confirm_password" : {
			required : true,
			equalTo : { val: "#password", errormsg: "Lass password deben ser iguales" },
			minLength : 6 ,
			maxLength : 30
		},
	}
});

*/