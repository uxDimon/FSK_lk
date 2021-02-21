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
const buttonActiveList = document.querySelectorAll(".button:not(.button.button_icon)");
if (buttonActiveList) {
	for (const buttonActive of buttonActiveList) {
		buttonActive.addEventListener("mousedown", (event) => {
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

//- https://github.com/francoischalifour/medium-zoom
mediumZoom("[data-zoomable]", {
	margin: 24,
	background: "var(--color-main-back)",
});

// tabs
const tabIdList = document.querySelectorAll("[data-tab-id]");
if (tabIdList) {
	let tabGroupList = new Set();
	for (const tabId of tabIdList) {
		tabGroupList.add(tabId.dataset.tabId);
	}

	for (const tabGroup of tabGroupList) {
		const tab = {
			controlList: document.querySelectorAll(`[data-tab-id="${tabGroup}"][data-tab-control]`),
			blockList: document.querySelectorAll(`[data-tab-id="${tabGroup}"][data-tab-block]`),
		};

		function tabSwith(name) {
			for (const control of tab.controlList) control.classList.remove(activeClass);
			for (const block of tab.blockList) block.style.display = "none";
			document.querySelector(`[data-tab-id="${tabGroup}"][data-tab-control="${name}"]`).classList.add(activeClass);
			document.querySelector(`[data-tab-id="${tabGroup}"][data-tab-block="${name}"]`).style.display = "";
		}
		tabSwith(tab.controlList[0].dataset.tabControl);

		for (const control of tab.controlList) {
			const controlName = control.dataset.tabControl;
			control.addEventListener("click", () => {
				tabSwith(controlName);
			});
		}
	}
}
