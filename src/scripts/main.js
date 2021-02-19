const activeClass = "active";

// https://imask.js.org/guide.html
// Маски для телефона
const maskTel = {
	rus: {
		mask: "+{7} (000) 000-00-00",
	},
	aze: {
		mask: "+{994} (000) 000-00-00",
	},
};

// Выбор маски для инпута телефона tel-country
const telCountryList = document.querySelectorAll(".input_tel-country");
if (telCountryList) {
	for (const telCountry of telCountryList) {
		const input = telCountry.querySelector(".input__input"),
			button = telCountry.querySelector(".tel-country__select"),
			img = telCountry.querySelector(".tel-country__img"),
			listFlag = telCountry.querySelectorAll(".tel-country__option-input"),
			wrap = telCountry.querySelector(".tel-country");

		let mask = IMask(input, maskTel[button.dataset.country]);

		button.addEventListener("click", () => {
			wrap.classList.toggle(activeClass);
		});

		for (const flag of listFlag) {
			flag.addEventListener("change", (event) => {
				img.src = `./assets/images/flag/flag-${event.currentTarget.value}.svg`;
				mask.destroy();
				mask = IMask(input, maskTel[event.currentTarget.value]);
				button.dataset.country = event.currentTarget.value;
				wrap.classList.toggle(activeClass);
			});
		}
	}
}

// button-active
const buttonActiveList = document.querySelectorAll(".button");
if (buttonActiveList) {
	for (const buttonActive of buttonActiveList) {
		buttonActive.addEventListener("click", (event) => {
			const button = buttonActive.getBoundingClientRect(),
				buttonEffect = buttonActive.querySelector(".buttonEffect"),
				buttonEffectHtml = `<div class="buttonEffect" style="top:${event.clientY - 10 - button.y}px; left:${event.clientX - 10 - button.x}px;"></div>`;

			if (buttonEffect) buttonEffect.remove();
			buttonActive.insertAdjacentHTML("afterbegin", buttonEffectHtml);
		});
	}
}

// Слайдер
// https://swiperjs.com/swiper-api
const mainSliderList = document.querySelectorAll(".main-slider");
if (mainSliderList) {
	for (const mainSlider of mainSliderList) {
		var swiper = new Swiper(mainSlider, {
			effect: "fade",
			loop: true,
			pagination: {
				el: ".main-slider__pagination",
			},
			navigation: {
				nextEl: ".main-slider__button-next",
				prevEl: ".main-slider__button-prev",
			},
		});
	}
}
