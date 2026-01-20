import './main.css'
import Lenis from 'lenis'
import { renderBentoGrid } from './components/BentoGrid.js'
import { renderDock } from './components/Dock.js'
import { initVoidBackground } from './components/VoidBackground.js'

const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

console.log("System Initialized: Portfolio Prime V2")

initVoidBackground('void-background');
renderBentoGrid('bento-grid-container');
renderDock('dock-container');
