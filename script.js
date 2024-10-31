function launchRockets() {
    const rocketContainer = document.querySelector('.rocket-container');
    rocketContainer.innerHTML = ''; // Clear previous rockets

    const skyContainer = document.querySelector('.sky-container');
    skyContainer.innerHTML = ''; // Clear previous sky particles

    const rocketSound = document.getElementById("rocketSound");
    const explosionSound = document.getElementById("explosionSound");

    // Trigger background color change
    document.body.classList.add('explode');
    setTimeout(() => document.body.classList.remove('explode'), 300);

    for (let i = 0; i < 6; i++) {
        const rocket = document.createElement('div');
        rocket.classList.add('rocket');
        rocketContainer.appendChild(rocket);

        rocketSound.currentTime = 0;
        rocketSound.play();

        rocket.addEventListener('animationend', () => {
            createExplosion(rocket);
            explosionSound.currentTime = 0;
            explosionSound.play();
            document.body.classList.add('shake');
            setTimeout(() => document.body.classList.remove('shake'), 300);
        });
    }

    // Launch multiple waves of sky particles for a denser effect
    for (let j = 0; j < 6; j++) {
        setTimeout(createSkyEffect, j * 1000); // Delay each wave
    }
}

function createSkyEffect() {
    const skyContainer = document.querySelector('.sky-container');
    const colors = ['#ff4444', '#ffbb33', '#33b5e5', '#2ecc71'];

    for (let i = 0; i < 100; i++) { // Increase number of particles to 100 per wave
        const skyParticle = document.createElement('div');
        skyParticle.classList.add('sky-particle');
        skyParticle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        // Set random spread direction and particle size for variation
        const angle = Math.random() * 2 * Math.PI;
        skyParticle.style.setProperty('--x', `${Math.cos(angle) * 120}px`);
        skyParticle.style.setProperty('--y', `${Math.sin(angle) * 120}px`);
        skyParticle.style.width = `${Math.random() * 8 + 4}px`; // Vary size between 4px and 12px
        skyParticle.style.height = skyParticle.style.width;

        // Random horizontal starting position for each particle
        skyParticle.style.left = `${Math.random() * 100}vw`;

        skyContainer.appendChild(skyParticle);

        // Remove particle after animation
        skyParticle.addEventListener('animationend', () => skyParticle.remove());
    }
}
