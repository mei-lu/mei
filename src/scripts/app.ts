import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export const initApp = () => {
    gsap.registerPlugin(ScrollTrigger)

    // gsap.to("#wavy-text", {
    //     scrollTrigger: {
    //         trigger: "#hero",
    //         start: "top top",
    //         end: "bottom 400",
    //         scrub: 1,
    //         // markers: true,
    //     },
    //     attr: { startOffset: "100%" },
    //     ease: "none",
    // })

    // gsap.from("#camera-image > img", {
    //     duration: 0.5,
    //     attr: { startOffset: "0%" },
    //     ease: "none",

    //     scrollTrigger: {
    //         trigger: "#hero",
    //         start: "top top",
    //         end: "bottom 400",
    //         scrub: 1,
    //         // markers: true,
    //     },
    // })
}

// Load

document.addEventListener("DOMContentLoaded", () => {
    App()
})
export default {}
