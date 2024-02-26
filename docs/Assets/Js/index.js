/**
 * YouTube Tutorial:
 * https://youtu.be/wG_5453Vq98
  */

function IsMobileOrTablet() {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

// Select the circle element
const circleElement = document.querySelector('.circle');

if (!IsMobileOrTablet()) {

    // Create objects to track mouse position and custom cursor position
    const mouse = { x: 0, y: 0 }; // Track current mouse position
    const previousMouse = { x: 0, y: 0 } // Store the previous mouse position
    const circle = { x: 0, y: 0 }; // Track the circle position

    // Initialize variables to track scaling and rotation
    let currentScale = 0; // Track current scale value
    let currentAngle = 0; // Track current angle value

    // Update mouse position on the 'mousemove' event
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    // Smoothing factor for cursor movement speed (0 = smoother, 1 = instant)
    const speed = 0.17;

    // Start animation
    const tick = () => {
        // MOVE
        // Calculate circle movement based on mouse position and smoothing
        circle.x += (mouse.x - circle.x) * speed;
        circle.y += (mouse.y - circle.y) * speed;
        // Create a transformation string for cursor translation
        const translateTransform = `translate(${circle.x}px, ${circle.y}px)`;

        // SQUEEZE
        // 1. Calculate the change in mouse position (deltaMouse)
        const deltaMouseX = mouse.x - previousMouse.x;
        const deltaMouseY = mouse.y - previousMouse.y;

        // Update previous mouse position for the next frame
        previousMouse.x = mouse.x;
        previousMouse.y = mouse.y;

        // 2. Calculate mouse velocity using Pythagorean theorem and adjust speed
        const mouseVelocity = Math.min(Math.sqrt(deltaMouseX ** 2 + deltaMouseY ** 2) * 4, 150);

        // 3. Convert mouse velocity to a value in the range [0, 0.5]
        const scaleValue = (mouseVelocity / 150) * 0.5;

        // 4. Smoothly update the current scale
        currentScale += (scaleValue - currentScale) * speed;

        // 5. Create a transformation string for scaling
        const scaleTransform = `scale(${1 + currentScale}, ${1 - currentScale})`;

        // ROTATE
        // 1. Calculate the angle using the atan2 function
        const angle = Math.atan2(deltaMouseY, deltaMouseX) * 180 / Math.PI;

        // 2. Check for a threshold to reduce shakiness at low mouse velocity
        if (mouseVelocity > 20) {
            currentAngle = angle;
        }

        // 3. Create a transformation string for rotation
        const rotateTransform = `rotate(${currentAngle}deg)`;

        // Apply all transformations to the circle element in a specific order: translate -> rotate -> scale
        circleElement.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;

        // Request the next frame to continue the animation
        window.requestAnimationFrame(tick);
    }

    // Start the animation loop
    tick();
}
else {
    circleElement.style.display = "none";

    // Get the cards to animate
    const cards = document.querySelectorAll(".services>div");

    // Set the options of the intersection observer
    const options = {
        threshold: 1,
        rootMargin: "0px 0px -150px 0px"
    }

    // Create a new intersection observer
    const observer = new IntersectionObserver(function (entries, observer) {
        // For each element observe that element
        entries.forEach(entry => {
            // If the entry is intersecting animate it
            if (entry.isIntersecting) {
                entry.target.classList.add('extra-info');
            } else {
                entry.target.classList.remove('extra-info');
            }
        });
    }, options);

    // For each card
    cards.forEach(element => {
        // Observe that element
        observer.observe(element);
    });





}

const nextPageButton = document.querySelector(".first-page>button");
nextPageButton.onclick = () => {
    window.scrollBy({
        behavior: "smooth",
        left: 0,
        top: window.innerHeight
    })
}


window.addEventListener('scroll', () => {
    var scrollValue = (window.scrollY + window.innerHeight) / window.innerHeight;
    var animationPercent = (scrollValue < 1) ? 0 : Math.min(scrollValue - 1, 1);

    document.body.style.setProperty('--animation-percent', animationPercent);
});
