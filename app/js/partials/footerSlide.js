const footerSlide = () => {
    const footer = document.querySelector('.main-footer');

    if (footer) {

        const setSlide = () => {
            let bodyScrollTop = document.documentElement.scrollTop || document.body.scrollTop;

            console.log(bodyScrollTop + document.documentElement.clientHeight, document.body.scrollHeight)

            if (bodyScrollTop + document.documentElement.clientHeight + 50 >= document.body.scrollHeight) {
                footer.classList.add('active')
            } else {
                footer.classList.remove('active')
            }
        }

        setSlide();

        window.addEventListener('scroll', setSlide);
    }
}

export {footerSlide}
