import Shuffle from 'shufflejs';

const portfolioSort = () => {

    class SortPortfolio {
        constructor(element) {
            this.element = element;
            this.shuffle = new Shuffle(element, {
                itemSelector: '.portfolio-list__item',
                group: Shuffle.ALL_ITEMS
            });
            this.hash = window.location.hash.substring(1);


            // Log events.
            this.addShuffleEventListeners();
            this._activeFilters = [];
            this.addFilterButtons();
            this.addSorting();

            this.hashSorting();

            this.shuffle.Css = {
                INITIAL: {
                    position: 'relative',
                },
            };
        }


        hashSorting() {

            if (window.location.hash.substring(1)) {
                let currentTab = document.querySelector(`[data-group=${window.location.hash.substring(1)}]`);
                currentTab.classList.add(`active`);
                this.shuffle.filter(window.location.hash.substring(1));
            }

            window.addEventListener('hashchange', () => {
                const btns = document.querySelectorAll(`.portfolio-tabs__item`);
                let currentTab = document.querySelector(`[data-group=${window.location.hash.substring(1)}]`);

                for (const btn of btns) {
                    btn.classList.remove('active');
                }

                currentTab.classList.add(`active`);

                this.shuffle.filter(window.location.hash.substring(1));
            });
        }

        /**
         * Shuffle uses the CustomEvent constructor to dispatch events. You can listen
         * for them like you normally would (with jQuery for example).
         */
        addShuffleEventListeners() {
            this.shuffle.on(Shuffle.EventType.LAYOUT, (data) => {
                console.log('layout. data:', data);

            });

            this.shuffle.on(Shuffle.EventType.REMOVED, (data) => {
                console.log('removed. data:', data);
            });
        }

        addFilterButtons() {
            const options = document.querySelector('.portfolio-tabs');
            if (!options) {
                return;
            }

            const filterButtons = Array.from(options.children);
            const onClick = this._handleFilterClick.bind(this);
            filterButtons.forEach((button) => {
                button.addEventListener('click', onClick, false);
            });
        }

        _handleFilterClick(evt) {
            const btn = evt.currentTarget;
            const isActive = btn.classList.contains('active');
            const btnGroup = btn.getAttribute('data-group');

            this._removeActiveClassFromChildren(btn.parentNode);

            let filterGroup;
            if (isActive) {
                btn.classList.remove('active');
                filterGroup = Shuffle.ALL_ITEMS;
            } else {
                btn.classList.add('active');
                filterGroup = btnGroup;
            }

            this.shuffle.filter(filterGroup);
        }

        _removeActiveClassFromChildren(parent) {
            const { children } = parent;
            for (let i = children.length - 1; i >= 0; i--) {
                children[i].classList.remove('active');
            }
        }

        addSorting() {
            const buttonGroup = document.querySelector('.sort-options');
            if (!buttonGroup) {
                return;
            }
            buttonGroup.addEventListener('change', this._handleSortChange.bind(this));
        }

        _handleSortChange(evt) {
            // Add and remove `active` class from buttons.
            const buttons = Array.from(evt.currentTarget.children);
            buttons.forEach((button) => {
                if (button.querySelector('input').value === evt.target.value) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
            });

            // Create the sort options to give to Shuffle.
            const { value } = evt.target;
            let options = {};

            function sortByDate(element) {
                return element.getAttribute('data-created');
            }

            function sortByTitle(element) {
                return element.getAttribute('data-title').toLowerCase();
            }

            if (value === 'date-created') {
                options = {
                    reverse: true,
                    by: sortByDate,
                };
            } else if (value === 'title') {
                options = {
                    by: sortByTitle,
                };
            }
            this.shuffle.sort(options);
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        const sortList = document.getElementById('portfolio-list');

        if (sortList) {
            window.demo = new SortPortfolio(sortList);
        }
    });
}

export {portfolioSort}
