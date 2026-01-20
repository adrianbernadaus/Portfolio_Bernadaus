import * as THREE from 'three';

export function initVoidBackground(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.001);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const count = 3000;
    const positions = new Float32Array(count * 3);
    const velocities = [];

    for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 2000;
        if (i % 3 === 2) {
            velocities.push((Math.random() * 0.5) + 0.1);
        }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 2,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true
    });

    const stars = new THREE.Points(geometry, material);
    scene.add(stars);

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - window.innerWidth / 2) * 0.05;
        mouseY = (e.clientY - window.innerHeight / 2) * 0.05;
    });

    function animate() {
        requestAnimationFrame(animate);

        const positions = stars.geometry.attributes.position.array;

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            positions[i3 + 2] += velocities[i] * 5;

            if (positions[i3 + 2] > 200) {
                positions[i3 + 2] = -1000;
                positions[i3] = (Math.random() - 0.5) * 2000;
                positions[i3 + 1] = (Math.random() - 0.5) * 2000;
            }
        }

        stars.geometry.attributes.position.needsUpdate = true;

        stars.rotation.x += (mouseY * 0.0001 - stars.rotation.x) * 0.05;
        stars.rotation.y += (mouseX * 0.0001 - stars.rotation.y) * 0.05;

        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
