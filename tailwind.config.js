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
				'bright-yellow': '#F4EBDF',
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
			},
			animation: {
				fadeInDown : 'fadeInDown 1s',
				fadeInLeft : 'fadeInLeft 1s',
				fadeInRight : 'fadeInRight 1s',
			},
			keyframes: {
				fadeInDown : {
				  'from': { opacity: 0, transform: 'translateY(-20px)' },
				  'to': { opacity: 1, transform: 'translateY(0)' },
				},
				fadeInLeft : {
				  'from': { opacity: 0, transform: 'translateX(-20px)' },
				  'to': { opacity: 1, transform: 'translateX(0)' },
				},
				fadeInRight : {
				  'from': { opacity: 0, transform: 'translateX(20px)' },
				  'to': { opacity: 1, transform: 'translateX(0)' },
				}  
			},
		}
	}
};