import Vivus from 'vivus';

const animateLineBtn = () => {
    document.addEventListener('DOMContentLoaded', () => {
        const titleBlock = document.querySelector('.title-block');

        if (titleBlock) {
            let titleBlockTop = titleBlock.getBoundingClientRect().top + titleBlock.getBoundingClientRect().height;
            const lineLink = document.querySelector('.line-link');
            let bodyScrollTop = document.documentElement.scrollTop || document.body.scrollTop;

            const animateLine = (play = true, reset = false) => {
                const svgEls = document.getElementsByClassName('line-link-svg');

                for (let i = 0; i < svgEls.length; i++) {
                    let svgLine = new Vivus(svgEls[i]);
                    if (play) {
                        svgLine.play(10);
                    } else {
                        svgLine.stop();
                    }
                }
            };

            if (bodyScrollTop >= titleBlockTop) animateLine(false);

            const addClassNameListener = (elemId, callback) => {
                const elem = document.getElementById(elemId);
                let lastClassName = elem.className;

                window.setInterval( function() {
                    const className = elem.className;
                    if (className !== lastClassName) {
                        callback();
                        lastClassName = className;
                    }
                },0.01);
            }

            const actionLine = () => {
                let bodyScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                let titleBlockTop = titleBlock.getBoundingClientRect().top + titleBlock.getBoundingClientRect().height;

                if (bodyScrollTop >= titleBlockTop) {
                    lineLink.classList.add('remove')
                } else {
                    lineLink.classList.remove('remove')
                }

                addClassNameListener("line-link", function () {
                    if (lineLink.classList.contains('remove')) {
                        animateLine(false);
                    } else {
                        animateLine(true);
                    }
                })
            }


            actionLine();

            window.addEventListener('scroll', function () {
                actionLine()
            });

        }
    })
}

export {animateLineBtn}
