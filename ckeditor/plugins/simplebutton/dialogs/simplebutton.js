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
						setup: function( element ) {
							this.setValue( element.getAttribute( "value" ) );
						},
						commit: function( element ) {
							element.setAttribute( "value", this.getValue() );
							element.findOne('input').setAttribute( "value", this.getValue() );
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
						type: 'select',
						id: 'button-color',
						label: 'Color',
						items: [ ['Blue'], ['Green'], ['Red'], ['Orange'], ['Teal'], ['Purple'] ],
						'default': 'Green',
						setup: function( element ) {
							this.setValue( element.getAttribute( "data-color" ) );
						},
						commit: function ( element ) {
							var color = this.getValue();
							var background = '#27AE61';
							if (color == 'Blue')
								background = '#2A80B9';
							else if (color == 'Red')
								background = '#DD5561';
							else if (color == 'Orange')
								background = '#F39C11';
							else if (color == 'Teal')
								background = '#1BBC9B';
							else if (color == 'Purple')
								background = '#8F44AD';

							var style_button = 'background-color:'+background+';border:1px solid '+background+';color:#fff !important;padding:5px 10px;border-radius:5px;font-size:14px;cursor:pointer;';

							element.setAttribute( "data-color", color );
							element.findOne('input').setAttribute( "style", style_button );
						}
					}
				]
			}
		],

		onShow: function() {
			var selection = editor.getSelection();
			var element = selection.getStartElement();

			if ( element ) {
				if ( element.getParent().hasClass('simple-button-plugin') ) {
					element = element.getParent();
				}
			}

			if ( !element || (!element.hasClass('simple-button-plugin') && !element.getParent().hasClass('simple-button-plugin') ) ) {
				element = editor.document.createElement( 'a' );
				element.setAttribute('class', 'simple-button-plugin');
				element.setAttribute('target', '_blank');
				element.setAttribute('style', 'text-decoration: none !important; cursor: pointer;');
				element.appendHtml('<input type="button" />');
				this.insertMode = true;
			}
			else
				this.insertMode = false;

			this.element = element;
			if ( !this.insertMode )
				this.setupContent( this.element );
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
