(() => {
    const sizes = document.querySelectorAll(".size");
    const colors = document.querySelectorAll(".color");
    const shoes = document.querySelectorAll(".shoe");
    const gradients = document.querySelectorAll('.gradient');
    const shoeBg = document.querySelector('.shoeBackground');

    let prevColor = "blue";
    let animationEnd = true;

    const changeSize = (event) => {
        sizes.forEach(size => size.classList.remove("active"));
        const size = event.target;
        size.classList.add("active")
    };

    const changeColor = (event) => {
        if (!animationEnd) return;
        const color = event.target;
        let primary = color.getAttribute("primary");
        let col = color.getAttribute("color");
        let shoe = document.querySelector(`.shoe[color="${col}"]`);
        let gradient = document.querySelector(`.gradient[color="${col}"]`);
        let prevGradient = document.querySelector(`.gradient[color="${prevColor}"]`);
        console.log(prevGradient)
        if (col === prevColor) return;

        colors.forEach(color => color.classList.remove("active"));
        color.classList.add("active")

        document.documentElement.style.setProperty("--primary", primary)

        shoes.forEach(shoe => shoe.classList.remove("show"));
        shoe.classList.add("show")

        gradients.forEach(g => g.classList.remove('first', 'second'));
        gradient.classList.add('first');
        prevGradient.classList.add('second');

        prevColor = col;
        animationEnd = false;

        gradient.addEventListener('animationend', () => {
            animationEnd = true;
        })
    };

    sizes.forEach(size => size.addEventListener("click", changeSize));
    colors.forEach(color => color.addEventListener("click", changeColor));


    let x = window.matchMedia("(max-width: 1000px)");

    const changeHeight = () => {
        if (x.matches) {
            let shoeHeight = shoes[0].offsetHeight;
            shoeBg.style.height = `${shoeHeight * 0.9}px`;
        } else {
            shoeBg.style.height = "475px";
        }
    }
    changeHeight();
    window.addEventListener('resize', changeHeight);

})();
