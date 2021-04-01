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

// Маски для телефона
const telInputList = document.querySelectorAll('.input > input[type="tel"]');
if (telInputList) {
	for (const telInput of telInputList) {
		let telMask = IMask(telInput, maskTel.rus);
	}
}

// button-active
const buttonActiveList = document.querySelectorAll(".button:not(.button.button_icon)");
if (buttonActiveList) {
	for (const buttonActive of buttonActiveList) {
		buttonActive.addEventListener("click", (event) => {
			const button = buttonActive.getBoundingClientRect(),
				buttonEffect = buttonActive.querySelector(".buttonEffect"),
				buttonEffectHtml = `<div class="buttonEffect" style="top:${event.clientY - 10 - button.y}px; left:${event.clientX - 10 - button.x}px;"></div>`;
			console.log(button);
			console.log(event.clientY);
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

const progresSsliderList = document.querySelectorAll(".progress-slider__wrap");
if (progresSsliderList) {
	for (const progresSslider of progresSsliderList) {
		let galleryThumbs = new Swiper(progresSslider.querySelector(".progress-slider__thumbs"), {
			spaceBetween: 24,
			direction: "vertical",
			slidesPerView: 4,
			slidesPerColumn: 2,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
		});
		let galleryTop = new Swiper(progresSslider.querySelector(".progress-slider"), {
			spaceBetween: 10,
			navigation: {
				nextEl: ".progress-slider__button-prev",
				prevEl: ".progress-slider__button-next",
			},
			thumbs: {
				swiper: galleryThumbs,
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

// bron-progres
const bronProgresList = document.querySelectorAll(".bron-progres");
if (bronProgresList) {
	for (const bronProgres of bronProgresList) {
		bronProgres.querySelector(".bron-progres__button").addEventListener("click", () => {
			bronProgres.classList.toggle(activeClass);
			if (bronProgres.classList.contains(activeClass)) {
				bronProgres.style.height = bronProgres.scrollHeight + "px";
			} else {
				bronProgres.style.height = "";
			}
		});
	}
}

// https://github.com/michu2k/Accordion
// faq
const helpFaqList = document.querySelectorAll(".help-faq");
if (helpFaqList) {
	for (const helpFaq of helpFaqList) {
		new Accordion(helpFaq, {
			duration: 400,
			elementClass: "help-faq-item",
			triggerClass: "help-faq-item__head",
			panelClass: "help-faq-item__body",
			activeClass: activeClass,
		});
	}
}

// data-active
const activeBlockList = document.querySelectorAll("[data-active-block]");
if (activeBlockList) {
	for (const activeBlock of activeBlockList) {
		const activeControlList = document.querySelectorAll(`[data-active-control="${activeBlock.dataset.activeBlock}"]`);
		for (const activeControl of activeControlList) {
			activeControl.addEventListener("click", () => {
				for (const activeControlItem of activeControlList) activeControlItem.classList.toggle(activeClass);
				activeBlock.classList.toggle(activeClass);
			});
		}
	}
}

// input file
function uploadFile(target) {
	target.parentElement.querySelector(".input__file-text").innerHTML = target.files[0].name;
}

const switchDark = document.querySelector("#switch-dark");
if (switchDark) {
	switchDark.addEventListener("change", () => {
		document.body.classList.toggle("dark");
	});
	if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
		switchDark.setAttribute("checked", "checked");
		document.body.classList.toggle("dark");
	}
}
