/*

	This file is a part of simplebuttion project.

	Copyright (C) Thanh D. Dang <thanhdd.it@gmail.com>

	simplebuttion is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	simplebuttion is distributed in the hope that it will be useful, but
	WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
	General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/


CKEDITOR.dialog.add( 'simplebuttonDialog', function( editor ) {
	return {
		title: 'Simple Button',
		minWidth: 400,
		minHeight: 200,
		contents: [
			{
				id: 'tab-basic',
				elements: [
					{
						type: 'text',
						id: 'button-text',
						label: 'Text',
						validate: CKEDITOR.dialog.validate.notEmpty( "Text field cannot be empty." ),
						setup: function( element, preview ) {
							this.preview_button = preview;
							this.setValue( element.getText() );
						},
						commit: function( element ) {
							element.setText( this.getValue() );
						},
						onChange: function() {
							this.preview_button.setText( this.getValue() );
						}
					},
					{
						type: 'text',
						id: 'button-url',
						label: 'URL',
						setup: function( element ) {
							this.setValue( element.getAttribute( "href" ) );
						},
						commit: function( element ) {
							element.setAttribute( "href", this.getValue() );
						}
					},
					{
						type: 'text',
						id: 'font-size',
						label: 'Font Size (px)',
						validate: CKEDITOR.dialog.validate.regex( /^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/, "Font size is not valid." ),
						setup: function( element, preview ) {
							this.preview_button = preview;
							this.setValue( element.getStyle('font-size').split('px')[0] );
						},
						commit: function( element ) {
							element.setStyle( 'font-size', this.getValue() + 'px' );
						},
						onChange: function() {
							var valid = this.getValue().match( /^(?=.+)(?:[1-9]\d*|0)?(?:\.\d+)?$/ );
							if (valid) {
								this.preview_button.setStyle( 'font-size', this.getValue() + 'px' );
							}
						}
					},
					{
						type: 'text',
						id: 'border-radius',
						label: 'Border Radius (px)',
						validate: CKEDITOR.dialog.validate.regex( /^\+?(0|[1-9]\d*)$/, "Border Radius is not valid." ),
						setup: function( element, preview ) {
							this.preview_button = preview;
							this.setValue( element.getStyle('border-radius').split('px')[0] );
						},
						commit: function( element ) {
							element.setStyle( 'border-radius', this.getValue() + 'px' );
						},
						onChange: function() {
							var valid = this.getValue().match( /^\+?(0|[1-9]\d*)$/ );
							if (valid) {
								this.preview_button.setStyle( 'border-radius', this.getValue() + 'px' );
							}
						}
					},
					{
						type: 'select',
						id: 'button-color',
						label: 'Color',
						items: [ ['Blue', '#2A80B9'], ['Green', '#27AE61'], ['Red', '#DD5561'], ['Orange', '#F39C11'], ['Teal', '#1BBC9B'], ['Purple', '#8F44AD'], ['Custom...', 'custom'] ],
						'default': '#27AE61',
						setup: function( element, preview, custom_color_div ) {
							this.preview_button = preview;
							this.custom_color_div = custom_color_div;
							this.setValue( element.getAttribute( "data-color" ) );
						},
						commit: function ( element ) {
							var background = this.getValue();
							if (background == 'custom') {
								 background = this.custom_color_div.find('#color-text-input').$[0].value;
							}
							element.setAttribute( "data-color", background );
							element.setStyle( "background-color", background );
							element.setStyle( "border", '1px solid ' + background );
						},
						onChange: function() {
							var background = this.getValue();
							if (background == 'custom') {
								this.custom_color_div.setStyle( "display", "block" );
								background = this.custom_color_div.find('#color-text-input').$[0].value;
							} else {
								this.custom_color_div.setStyle( "display", "none" );
							}
							this.preview_button.setStyle( "background-color", background );
							this.preview_button.setStyle( "border", '1px solid ' + background );
						}
					},
					{
						type : 'html',
						html : '<div id="customColorDiv" style="display:none"><div id="custom-color-button" style="width:23px; height:23px; background-color:#F44236; float:right; cursor: pointer;"></div><div style="float: left; width: 90%;"><input id="color-text-input" class="cke_dialog_ui_input_text" type="text" value="#F44236"></div><table id="colors-table" style="right: 40px; margin-top: -68px; position: absolute; z-index: 1; display:none"><tbody><tr style="border-bottom: 1px solid #fff;height: 23px;"><td class="color-column" style="cursor:pointer;border-left: 1px solid #fff;width: 23px; background-color: #F44236;"></td><td class="color-column" style="cursor:pointer;border-left: 1px solid #fff;width: 23px; background-color: #E91D62;"></td><td class="color-column" style="cursor:pointer;border-left: 1px solid #fff;width: 23px; background-color: #363F46;"></td><td class="color-column" style="cursor:pointer;border-left: 1px solid #fff;width: 23px; background-color: #9C26B0;"></td><td class="color-column" style="cursor:pointer;border-left: 1px solid #fff;width: 23px; background-color: #6739B6;"></td></tr><tr style="border-bottom: 1px solid #fff;height: 23px;"><td class="color-column" style="cursor:pointer;border-left: 1px solid #fff;background-color: #3E50B4;"></td><td class="color-column" style="cursor:pointer;border-left: 1px solid #fff;background-color: #2095F2;"></td><td class="color-column" style="cursor:pointer;border-left: 1px solid #fff;background-color: #02A8F4;"></td><td class="color-column" style="cursor:pointer;border-left: 1px solid #fff;background-color: #01BBD4;"></td><td class="color-column" style="cursor:pointer;border-left: 1px solid #fff;background-color: #019587;"></td></tr><tr style="border-bottom: 1px solid #fff;height: 23px;"><td class="color-column" style="cursor:pointer;border-left: 1px solid #fff;background-color: #4BAF4F;"></td><td class="color-column" style="cursor:pointer;border-left: 1px solid #fff;background-color: #8BC24A;"></td><td class="color-column" style="cursor:pointer;border-left: 1px solid #fff;background-color: #CCDB38;"></td><td class="color-column" style="cursor:pointer;border-left: 1px solid #fff;background-color: #FFE93B;"></td><td class="color-column" style="cursor:pointer;border-left: 1px solid #fff;background-color: #FEC107;"></td></tr><tr style="border-bottom: 1px solid #fff;height: 23px;"><td class="color-column" style="cursor:pointer;border-left: 1px solid #fff;background-color: #FF9700;"></td><td class="color-column" style="cursor:pointer;border-left: 1px solid #fff;background-color: #FF5521;"></td><td class="color-column" style="cursor:pointer;border-left: 1px solid #fff;background-color: #795549;"></td><td class="color-column" style="cursor:pointer;border-left: 1px solid #fff;background-color: #9D9D9D;"></td><td class="color-column" style="cursor:pointer;border-left: 1px solid #fff;background-color: #607C8A;"></td></tr></tbody></table></div>'
					},
					{
						type : 'html',
						html : '<p>Preview</p><div id="previewDiv" style="border: 1px solid #bbb;padding: 10px;text-align: center;"><a id="preview-button"></a></div>',
						setup: function( element ) {
							var document = this.getElement().getDocument();
							var color_columns = document.find('.color-column').$;
							for (var i = 0; i < color_columns.length; i++) {
								var color = color_columns[i].getAttribute('style').split('background-color: ')[1].split(';')[0];
								color_columns[i].setAttribute('onclick', 'document.getElementById("color-text-input").value = "'+color+'";var preview_button = document.getElementById("preview-button");var color = document.getElementById("color-text-input").value;preview_button.style["background-color"] = "'+color+'";preview_button.style["border"] = "1px solid '+color+'";document.getElementById("custom-color-button").style["background-color"] = "'+color+'";document.getElementById("colors-table").style.display = "none"');
							}
							var custom_color_button = document.getById( 'custom-color-button' );
							custom_color_button.setAttribute( 'onclick', 'var colors_table = document.getElementById("colors-table"); if(colors_table.style.display == "none") colors_table.style.display = "block"; else colors_table.style.display = "none";' );
							var color_text_input = document.getById( 'color-text-input' );
							color_text_input.setAttribute( 'onchange', 'var preview_button = document.getElementById("preview-button");var color = document.getElementById("color-text-input").value;preview_button.style["background-color"] = color;preview_button.style["border"] = "1px solid " + color;' );
							var preview_button = document.getById( 'preview-button' );
							preview_button.setAttribute( "style", element.getAttribute( "style" ) );
							preview_button.setText( element.getText() );
						}
					}
				]
			}
		],

		onShow: function() {
			var selection = editor.getSelection();
			var element = selection.getStartElement();

			if ( !element || !element.hasClass('simple-button-plugin') ) {
				element = editor.document.createElement( 'a' );
				element.setAttribute('class', 'simple-button-plugin');
				element.setAttribute('target', '_blank');
				var style_button = 'display:inline-block;background-color:#27AE61;border:1px solid #27AE61;color:#fff !important;padding:5px 10px;border-radius:5px;font-size:14px;text-decoration: none !important; cursor: pointer;';
				element.setAttribute( "style", style_button );
				element.setText( 'Unsubscribe' );
				this.insertMode = true;
			}
			else
				this.insertMode = false;

			this.element = element;

			var document = this.getElement().getDocument();
			var preview_button = document.getById( 'preview-button' );
			var custom_color_div = document.getById( 'customColorDiv' );
			this.setupContent( this.element, preview_button, custom_color_div );
		},

		onOk: function() {
			var dialog = this;
			var simple_btn = this.element;
			this.commitContent( simple_btn );

			if ( this.insertMode )
				editor.insertElement( simple_btn );
		}
	};
});
