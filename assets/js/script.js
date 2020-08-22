var app = new Vue({
	el: '#app',
	data() {
		return {
			selected: undefined,
			arr: '',
			list: [
				{
					prefix: 'radiozenit',
					title: 'Радио Зенит 89,7 FM',
					artist: '',
					song: '',
					icon: '',
					icon_png:
						'https://upload.wikimedia.org/wikipedia/commons/e/ef/FK_Zenit_St_Peterburg.svg',
					new: false,
					has_feedback: false,
					stream: '',
					stream_32: 'https://pub0101.101.ru:8000/stream/trust/mp3/256/269',
					stream_64: 'https://pub0101.101.ru:8000/stream/trust/mp3/256/269',
					stream_128: 'https://pub0101.101.ru:8000/stream/trust/mp3/256/269',
					stream_320: 'https://pub0101.101.ru:8000/stream/trust/mp3/256/269',
				},
			],
			sound: null,
			visible: true,
			title: 'Station',
			icon_png: 'favicon.ico',
			counter: 0,
			artist: 'выбери стацию',
			song: 'наслаждайся',
			myTimer: null,
			index: 0,
		};
	},
	methods: {
		play(index) {
			if (this.sound != null) {
				clearInterval(this.myTimer);
				this.sound.stop();
				this.visible = true;
			}
			this.selected = undefined;
			this.sound = new Howl({
				src: this.list[index].stream_32,
				html5: true,
			});
			this.sound.play();
			this.selected = index;
			this.artistAndSong(index);
			this.title = this.list[index].title;
			this.icon_png = this.list[index].icon_png;
			this.visible = false;
		},
		stop() {
			this.sound.stop();
			clearInterval(this.myTimer);
			this.artist = 'выбери стацию';
			this.song = 'наслаждайся';
			this.selected = undefined;
			this.title = 'Station';
			this.icon_png = 'favicon.ico';
			this.visible = true;
		},
		artistAndSong(index) {
			this.myTimer = setInterval(() => {
				this.artist = this.list[index].artist;
				this.song = this.list[index].song;
			}, 2000);
		},
	},
	mounted: function () {
		setInterval(() => {
			axios
				.get('https://www.radiorecord.ru/radioapi/stations/now/')
				.then((response) => {
					this.list = Object.values(response.data.result);
				});
		}, 2000);
	},
	created: function () {
		// setInterval(() => {
		// 	axios
		// 		.get('https://www.radiorecord.ru/radioapi/stations/')
		// 		.then((response) => {
		// 			this.list = Object.values(response.data.result);
		// 		});
		// }, 2000);
	},
	updated: function () {},
	computed: {},
});
