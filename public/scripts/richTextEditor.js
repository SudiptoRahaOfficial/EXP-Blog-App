window.onload = function () {
	tinymce.init({
		// Target textarea element
		selector: '#rich-text-editor',

		// Editor height in pixels
		height: 250,

		// Hide the top menu bar (File, Edit, View, etc.)
		menubar: false,

		// Enable required plugins
		plugins: [
			'lists', // Ordered & unordered lists
			'link', // Hyperlinks
			'image', // Image insertion
			'media', // YouTube/video embeds
			'table', // Tables
			'code', // View/edit raw HTML
			'codesample', // Syntax highlighted code blocks
			'wordcount', // Word count display
			'searchreplace', // Search & replace
			'autolink', // Automatically create links
			'charmap', // Special characters
			'preview', // Preview content
			'fullscreen', // Fullscreen writing mode
			'anchor', // Anchor links
			'visualblocks', // Visualize HTML block elements
			'quickbars', // Floating contextual toolbar
		],

		// Main toolbar
		toolbar: `
		undo redo |
		blocks |
		bold italic underline |
		alignleft aligncenter alignright alignjustify |
		bullist numlist |
		outdent indent |
		link image media |
		table |
		codesample |
		blockquote |
		removeformat |
		preview fullscreen code
	`,

		// Allowed heading options
		block_formats:
			'Paragraph=p; Heading 1=h1; Heading 2=h2; Heading 3=h3; Heading 4=h4',

		// Remove TinyMCE branding
		branding: false,

		// Show bottom status bar (Displays path, word count, etc.)
		statusbar: true,

		// Allow editor resizing
		resize: true,

		// Allow image captions
		image_caption: true,

		// Enable advanced image dialog options
		image_advtab: true,

		// Open inserted links in a new tab
		link_default_target: '_blank',

		// Automatically treat links as external URLs
		link_assume_external_targets: true,

		// Prevent pasting base64 images directly into content
		// Better for performance and database size
		paste_data_images: false,

		// Enable automatic image uploads
		automatic_uploads: true,

		// Backend endpoint that handles image uploads
		images_upload_url: '/uploads/postimage',

		// Styling only inside the editor
		content_style: `
		body {
			font-family: Inter, Arial, sans-serif;
			font-size: 16px;
			line-height: 1.7;
		}

		pre {
			background: #f4f4f4;
			padding: 12px;
			border-radius: 6px;
		}
	`,

		// Allow all HTML elements and attributes
		valid_elements: '*[*]',

		// Allow iframe embeds (YouTube, Vimeo, etc.)
		extended_valid_elements:
			'iframe[src|frameborder|style|scrolling|class|width|height|name|align]',

		// Floating toolbar when text is selected
		quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote',

		// Floating toolbar when cursor is placed
		quickbars_insert_toolbar: 'image media table',

		setup(editor) {
			// Runs whenever content changes
			editor.on('change', () => {
				editor.save()
			})
		},
	})
}