import Matter from 'matter-js';

export function initPlayground(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Cleanup existing canvas if any
    container.innerHTML = '';

    // Module aliases
    const Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Bodies = Matter.Bodies,
        Composite = Matter.Composite,
        Mouse = Matter.Mouse,
        MouseConstraint = Matter.MouseConstraint;

    // Create engine
    const engine = Engine.create();
    const world = engine.world;

    // Create renderer
    const render = Render.create({
        element: container,
        engine: engine,
        options: {
            width: container.clientWidth,
            height: container.clientHeight,
            background: 'transparent',
            wireframes: false, // Important for solid colors
            pixelRatio: window.devicePixelRatio
        }
    });

    // Create borders
    const WallThickness = 60;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const ground = Bodies.rectangle(width / 2, height + WallThickness / 2, width, WallThickness, { isStatic: true, render: { visible: false } });
    const leftWall = Bodies.rectangle(0 - WallThickness / 2, height / 2, WallThickness, height, { isStatic: true, render: { visible: false } });
    const rightWall = Bodies.rectangle(width + WallThickness / 2, height / 2, WallThickness, height, { isStatic: true, render: { visible: false } });

    // Create Skill Orbs (The "Prodigy" elements)
    const skills = [
        { label: 'JS', color: '#f7df1e' },
        { label: 'HTML', color: '#e34c26' },
        { label: 'CSS', color: '#264de4' },
        { label: 'Vite', color: '#646cff' },
        { label: 'React', color: '#61dafb' },
        { label: 'Git', color: '#f05032' },
        { label: 'Node', color: '#339933' }
    ];

    const orbs = skills.map((skill, index) => {
        const size = 30 + Math.random() * 20; // Random sizes
        return Bodies.circle(
            width / 2 + (Math.random() - 0.5) * 100, // Random X start
            -200 - (index * 100), // Staggered drop
            size,
            {
                restitution: 0.9, // Bouncy
                friction: 0.001,
                render: {
                    fillStyle: skill.color,
                    strokeStyle: '#ffffff',
                    lineWidth: 2
                }
                // Note: Adding text to Matter.js bodies requires a custom render loop or afterRender event
                // We will keep it simple with colored orbs for now to ensure performance
            }
        );
    });

    Composite.add(world, [ground, leftWall, rightWall, ...orbs]);

    // Add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

    Composite.add(world, mouseConstraint);

    // Keep the mouse in sync with rendering
    render.mouse = mouse;

    // Run the renderer
    Render.run(render);

    // Create runner
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Handle Resize
    window.addEventListener('resize', () => {
        render.canvas.width = container.clientWidth;
        render.canvas.height = container.clientHeight;
        // Reposition walls (simplified for now, full responsive physics needs more logic)
    });
}
