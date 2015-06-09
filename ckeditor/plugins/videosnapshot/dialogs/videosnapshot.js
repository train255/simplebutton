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


CKEDITOR.dialog.add( 'videosnapshotDialog', function( editor ) {
	return {
		title: 'Video Snapshot',
		minWidth: 400,
		minHeight: 200,
		contents: [
			{
				id: 'tab-basic',
				elements: [
					{
						type: 'text',
						id: 'video-url',
						label: 'URL (Youtube)',
						validate: CKEDITOR.dialog.validate.notEmpty( "Text field cannot be empty." ),
						setup: function( element ) {
							this.setValue( element.getAttribute('href') );
						},
						commit: function( element ) {
							element.setAttribute('href', this.getValue());
							var key = this.getValue().split('watch?v=')[1];
							if (key) {
								var video_url = 'https://www.youtube.com/watch?v=' + key;
								var image_url = 'https://i.ytimg.com/vi/' + key + '/hqdefault.jpg';
								element.setHtml('<img src="'+image_url+'" style="max-width:480px;margin:auto;"/><span style="background-image: url(data:image/png;base64,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); background-repeat:no-repeat; background-position:center center; top:0; bottom:0; left:0; right:0; position:absolute; pointer-events:none; background-color:rgba(0,0,0,0.5);"></span>');
							}

						}
					}
				]
			}
		],

		onShow: function() {
			var selection = editor.getSelection();
			var element = selection.getStartElement();
			if ( element && (element.hasClass('video-snapshot-plugin') || element.getParent().hasClass('video-snapshot-plugin')) ) {
				if (element.getParent().hasClass('video-snapshot-plugin'))
					element = element.getParent();

				this.insertMode = false;
			} else {
				element = editor.document.createElement( 'a' );
				element.setAttribute('class', 'video-snapshot-plugin');
				element.setAttribute('target', '_blank');
				element.setAttribute('style', 'display:block;max-width:480px;position:relative;margin:auto;');
				element.setAttribute('href', '');
				this.insertMode = true;
			}
			this.element = element;
			if (!this.insertMode)
				this.setupContent( this.element );
		},

		onOk: function() {
			var dialog = this;
			var video_snapshot = this.element;
			this.commitContent( video_snapshot );

			if ( this.insertMode )
				editor.insertElement( video_snapshot );
		}
	};
});
