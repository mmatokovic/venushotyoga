const typography = require('@tailwindcss/typography');

module.exports = {
	content: ['./hugo_stats.json'],
	plugins: [typography],
	theme: {
		fontFamily: {
			'quicksand': ['Quicksand', 'sans-serif'],
			'nunito': ['Nunito', 'sans-serif']
		},
		extend: {
			colors: {
				transparent: 'transparent',
				current: 'currentColor',
				'beige': '#f5f5dc',
                'wheat': '#F3D9A9',
				'almond': '#eed9c4',
				'bisque': '#ffe4c4',
				'buff': '#daa06d',
				'camel': '#c19a6b',
				'cosmic-latte': '#fffde7',
				'daesert-sand': '#edc9af',
				'hazelnut': '#cfb095',
				'ecru': '#c2b280',
				'french-beige': '#a67b5b',
				'khaki': '#c3b091',
				'tuscan': '#fad6a5',
			},
			backgroundImage: {
				'blob': "url('/images/svg/blob-scene-haikei.svg')",
				'home-featured': "url('/images/image6.jpeg')",
				'mobilift': "url('/images/mobilift.jpg')",
				'product-integral': "url('/images/product-integral.jpg')",
			}
		}
	}
};