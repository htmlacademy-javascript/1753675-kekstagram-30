import { getRandomNumber } from './utils.js';
import { renderThumbnails } from './photo-gallery.js';

const RANDOM_PHOTO_COUNT = 10;
const imagesFilterContainer = document.querySelector('.img-filters');
const imagesFilterForm = imagesFilterContainer.querySelector('.img-filters__form');
const inactiveFilterClass = 'img-filters--inactive';
const imageFilterButtonClass = 'img-filters__button';
const activeFilterButtonClass = 'img-filters__button--active';

const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const showImagesFilter = () => {
  imagesFilterContainer.classList.remove(inactiveFilterClass);
};

const filterByDefault = (data) => data;

const filterByRandom = (data) => {
  const randomData = [];
  const currentData = [...data];

  for (let i = 0; i < RANDOM_PHOTO_COUNT; i++) {
    const startIndex = getRandomNumber(0, currentData.length - 1);
    randomData.push(currentData.splice(startIndex, 1)[0]);
  }

  return randomData;
};

const filterByDiscussed = (data) => {
  const currentData = [...data];
  currentData.sort((photoA, photoB) => photoB.comments.length - photoA.comments.length);

  return currentData;
};

const FilterFunctions = {
  [Filter.DEFAULT]: filterByDefault,
  [Filter.RANDOM]: filterByRandom,
  [Filter.DISCUSSED]: filterByDiscussed
};

const setFilterClick = (callback) => {
  imagesFilterForm.addEventListener('click', (event) => {
    const activeImageFilterButton = imagesFilterContainer.querySelector('.img-filters__button--active');
    const isFilterButtonNotActive = event.target.classList.contains(imageFilterButtonClass) && !event.target.classList.contains(activeFilterButtonClass);

    if (isFilterButtonNotActive) {
      activeImageFilterButton.classList.remove(activeFilterButtonClass);
      event.target.classList.add(activeFilterButtonClass);
      callback(event.target);
    }
  });
};

const rerenderThumbmnails = (data, target) => {
  const thumbnails = document.querySelectorAll('.picture');
  thumbnails.forEach((element) => element.remove());
  const filteredData = FilterFunctions[target.id](data);
  renderThumbnails(filteredData);
};

export { showImagesFilter, setFilterClick, rerenderThumbmnails };
