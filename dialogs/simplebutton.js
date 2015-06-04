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
						items: [ ['Blue', '#2A80B9'], ['Green', '#27AE61'], ['Red', '#DD5561'], ['Orange', '#F39C11'], ['Teal', '#1BBC9B'], ['Purple', '#8F44AD'] ],
						'default': '#27AE61',
						setup: function( element, preview ) {
							this.preview_button = preview;
							this.setValue( element.getAttribute( "data-color" ) );
						},
						commit: function ( element ) {
							var background = this.getValue();
							element.setAttribute( "data-color", background );
							element.setStyle( "background-color", background );
							element.setStyle( "border", '1px solid ' + background );
						},
						onChange: function() {
							var background = this.getValue();
							this.preview_button.setStyle( "background-color", background );
							this.preview_button.setStyle( "border", '1px solid ' + background );
						}
					},
					{
						type : 'html',
						html : '<p>Preview</p><div id="previewDiv" style="border: 1px solid #bbb;padding: 10px;text-align: center;"><a id="preview-button"></a></div>',
						setup: function( element ) {
							var document = this.getElement().getDocument();
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

			this.setupContent( this.element, preview_button );
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
