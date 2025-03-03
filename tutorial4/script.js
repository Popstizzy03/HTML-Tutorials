// Game configuration
const config = {
    maxAmmo: 15,
    reloadTime: 2000,
    shootCooldown: 200,
    playerSpeed: 0.15,
    playerHealth: 100,
    enemySpawnTime: 3000,
    enemySpeed: 0.06,
    enemyDamage: 10,
    enemyHealth: 30,
    bulletDamage: 10,
    minEnemies: 3,
    maxEnemies: 10,
    groundSize: 100,
    wallHeight: 10,
    mouseSensitivity: 0.002,
    touchSensitivity: 0.05
};

// Game state
const state = {
    score: 0,
    ammo: config.maxAmmo,
    health: config.playerHealth,
    isReloading: false,
    lastShootTime: 0,
    enemySpawnInterval: null,
    nextEnemySpawn: 0,
    gameActive: false,
    enemies: [],
    bullets: [],
    keys: {
        forward: false,
        backward: false,
        left: false,
        right: false
    },
    touchLook: {
        active: false,
        lastX: 0,
        lastY: 0
    }
};

// DOM elements
const gameContainer = document.getElementById('game-container');
const scoreElement = document.getElementById('score');
const healthBar = document.getElementById('health-bar');
const ammoElement = document.getElementById('ammo');
const reloadMessage = document.getElementById('reload-message');
const hitMarker = document.getElementById('hit-marker');
const damageOverlay = document.getElementById('damage-overlay');
const startScreen = document.getElementById('start-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');
const finalScoreElement = document.getElementById('final-score');

// Mobile controls
const mobileForward = document.getElementById('mobile-forward');
const mobileBackward = document.getElementById('mobile-backward');
const mobileLeft = document.getElementById('mobile-left');
const mobileRight = document.getElementById('mobile-right');
const mobileShoot = document.getElementById('mobile-shoot');

// Three.js setup
let scene, camera, renderer;
let player, ground, walls = [];
let clock = new THREE.Clock();

// Initialize game
function init() {
    // Create scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x222222);
    
    // Create fog for atmosphere
    scene.fog = new THREE.Fog(0x222222, 0, 80);
    
    // Create camera (first-person view)
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.y = 2;
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    gameContainer.appendChild(renderer.domElement);
    
    // Create lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.near = 0.1;
    directionalLight.shadow.camera.far = 100;
    directionalLight.shadow.camera.right = 30;
    directionalLight.shadow.camera.left = -30;
    directionalLight.shadow.camera.top = 30;
    directionalLight.shadow.camera.bottom = -30;
    scene.add(directionalLight);
    
    // Create ground
    const groundGeometry = new THREE.PlaneGeometry(config.groundSize, config.groundSize);
    const groundMaterial = new THREE.MeshStandardMaterial({
        color: 0x333333,
        roughness: 0.9,
        metalness: 0.1
    });
    ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);
    
    // Create walls
    createWalls();
    
    // Create player
    player = new THREE.Group();
    player.position.y = 2;
    scene.add(player);
    
    // Add camera to player
    player.add(camera);
}

function createWalls() {
    const halfSize = config.groundSize / 2;
    const wallGeometry = new THREE.BoxGeometry(config.groundSize, config.wallHeight, 1);
    const wallMaterial = new THREE.MeshStandardMaterial({
        color: 0x5D5CDE,
        roughness: 0.5,
        metalness: 0.3
    });
    
    // North wall
    const northWall = new THREE.Mesh(wallGeometry, wallMaterial);
    northWall.position.set(0, config.wallHeight / 2, -halfSize);
    northWall.castShadow = true;
    northWall.receiveShadow = true;
    scene.add(northWall);
    walls.push(northWall);
    
    // South wall
    const southWall = new THREE.Mesh(wallGeometry, wallMaterial);
    southWall.position.set(0, config.wallHeight / 2, halfSize);
    southWall.castShadow = true;
    southWall.receiveShadow = true;
    scene.add(southWall);
    walls.push(southWall);
    
    // East wall
    const eastWall = new THREE.Mesh(wallGeometry, wallMaterial);
    eastWall.rotation.y = Math.PI / 2;
    eastWall.position.set(halfSize, config.wallHeight / 2, 0);
    eastWall.castShadow = true;
    eastWall.receiveShadow = true;
    scene.add(eastWall);
    walls.push(eastWall);
    
    // West wall
    const westWall = new THREE.Mesh(wallGeometry, wallMaterial);
    westWall.rotation.y = Math.PI / 2;
    westWall.position.set(-halfSize, config.wallHeight / 2, 0);
    westWall.castShadow = true;
    westWall.receiveShadow = true;
    scene.add(westWall);
    walls.push(westWall);
}

function createEnemy() {
    const colors = [0xff5252, 0xffb142, 0x2ecc71, 0x3498db, 0x9b59b6];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const enemyGeometry = new THREE.BoxGeometry(2, 2, 2);
    const enemyMaterial = new THREE.MeshStandardMaterial({
        color: randomColor,
        roughness: 0.7,
        metalness: 0.3
    });
    
    const enemy = new THREE.Mesh(enemyGeometry, enemyMaterial);
    enemy.castShadow = true;
    enemy.receiveShadow = true;
    
    // Position enemy at a random location around the perimeter
    const spawnSide = Math.floor(Math.random() * 4);
    const halfSize = (config.groundSize / 2) - 5;
    
    if (spawnSide === 0) { // North
        enemy.position.set(Math.random() * config.groundSize - halfSize, 1, -halfSize);
    } else if (spawnSide === 1) { // South
        enemy.position.set(Math.random() * config.groundSize - halfSize, 1, halfSize);
    } else if (spawnSide === 2) { // East
        enemy.position.set(halfSize, 1, Math.random() * config.groundSize - halfSize);
    } else { // West
        enemy.position.set(-halfSize, 1, Math.random() * config.groundSize - halfSize);
    }
    
    // Add properties to enemy
    enemy.health = config.enemyHealth;
    enemy.isEnemy = true;
    
    scene.add(enemy);
    state.enemies.push(enemy);
    
    return enemy;
}

function shoot() {
    if (state.ammo <= 0) {
        reloadMessage.style.display = 'block';
        setTimeout(() => {
            reloadMessage.style.display = 'none';
        }, 1000);
        return;
    }
    
    if (state.isReloading) return;
    
    const now = Date.now();
    if (now - state.lastShootTime < config.shootCooldown) return;
    
    state.lastShootTime = now;
    state.ammo--;
    updateAmmoUI();
    
    // Create bullet
    const bulletGeometry = new THREE.SphereGeometry(0.2, 8, 8);
    const bulletMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const bullet = new THREE.Mesh(bulletGeometry, bulletMaterial);
    
    // Position bullet at camera position
    bullet.position.copy(camera.getWorldPosition(new THREE.Vector3()));
    
    // Set bullet direction from camera
    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);
    bullet.userData.velocity = direction.multiplyScalar(0.8);
    bullet.userData.lifeTime = 2000; // Bullet will live for 2 seconds
    bullet.userData.createdAt = Date.now();
    
    scene.add(bullet);
    state.bullets.push(bullet);
    
    // Play gunshot sound simulation with vibration
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
    
    // Raycasting for instant hit detection
    const raycaster = new THREE.Raycaster();
    const rayOrigin = camera.getWorldPosition(new THREE.Vector3());
    const rayDirection = new THREE.Vector3();
    camera.getWorldDirection(rayDirection);
    
    raycaster.set(rayOrigin, rayDirection);
    
    const intersects = raycaster.intersectObjects(scene.children);
    
    for (let i = 0; i < intersects.length; i++) {
        const object = intersects[i].object;
        
        if (object.isEnemy) {
            // Hit enemy
            object.health -= config.bulletDamage;
            
            // Show hit marker
            hitMarker.style.display = 'block';
            setTimeout(() => {
                hitMarker.style.display = 'none';
            }, 100);
            
            // Check if enemy is defeated
            if (object.health <= 0) {
                state.score += 10;
                updateScoreUI();
                
                // Create explosion effect
                createExplosion(object.position);
                
                // Remove enemy
                scene.remove(object);
                state.enemies = state.enemies.filter(e => e !== object);
            }
            
            break;
        }
    }
}

function reload() {
    if (state.ammo === config.maxAmmo || state.isReloading) return;
    
    state.isReloading = true;
    reloadMessage.textContent = 'Reloading...';
    reloadMessage.style.display = 'block';
    
    setTimeout(() => {
        state.ammo = config.maxAmmo;
        state.isReloading = false;
        updateAmmoUI();
        reloadMessage.style.display = 'none';
    }, config.reloadTime);
}

function createExplosion(position) {
    const particleCount = 20;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        const particleGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
        const particleMaterial = new THREE.MeshBasicMaterial({
            color: Math.random() > 0.5 ? 0xffff00 : 0xff5500
        });
        
        const particle = new THREE.Mesh(particleGeometry, particleMaterial);
        particle.position.copy(position);
        
        // Random velocity
        const velocity = new THREE.Vector3(
            (Math.random() - 0.5) * 0.3,
            Math.random() * 0.2 + 0.1,
            (Math.random() - 0.5) * 0.3
        );
        
        particle.userData.velocity = velocity;
        particle.userData.lifeTime = 1000; // Particle will live for 1 second
        particle.userData.createdAt = Date.now();
        
        scene.add(particle);
        particles.push(particle);
    }
    
    // Remove particles after animation
    setTimeout(() => {
        particles.forEach(p => scene.remove(p));
    }, 1000);
}

function takeDamage(amount) {
    state.health -= amount;
    
    // Show damage effect
    damageOverlay.style.opacity = '1';
    setTimeout(() => {
        damageOverlay.style.opacity = '0';
    }, 300);
    
    updateHealthUI();
    
    // Check for game over
    if (state.health <= 0) {
        gameOver();
    }
}

function updateScoreUI() {
    scoreElement.textContent = `Score: ${state.score}`;
}

function updateHealthUI() {
    const healthPercent = Math.max(0, state.health) / config.playerHealth * 100;
    healthBar.style.width = `${healthPercent}%`;
    
    // Change color based on health
    if (healthPercent > 70) {
        healthBar.style.backgroundColor = '#2ecc71';
    } else if (healthPercent > 30) {
        healthBar.style.backgroundColor = '#f39c12';
    } else {
        healthBar.style.backgroundColor = '#e74c3c';
    }
}

function updateAmmoUI() {
    ammoElement.textContent = `Ammo: ${state.ammo} / ${config.maxAmmo}`;
}

function spawnEnemies() {
    // Scale enemy count with score
    const scaledMaxEnemies = Math.min(
        config.maxEnemies,
        config.minEnemies + Math.floor(state.score / 100)
    );
    
    if (state.enemies.length < scaledMaxEnemies) {
        createEnemy();
    }
}

function updateEntities(delta) {
    // Update bullets
    const now = Date.now();
    for (let i = state.bullets.length - 1; i >= 0; i--) {
        const bullet = state.bullets[i];
        
        // Move bullet
        bullet.position.add(bullet.userData.velocity);
        
        // Check bullet lifetime
        if (now - bullet.userData.createdAt > bullet.userData.lifeTime) {
            scene.remove(bullet);
            state.bullets.splice(i, 1);
        }
    }
    
    // Update enemies
    for (let i = state.enemies.length - 1; i >= 0; i--) {
        const enemy = state.enemies[i];
        
        // Move enemy towards player
        const direction = new THREE.Vector3();
        direction.subVectors(player.position, enemy.position).normalize();
        
        // Keep enemies on the ground
        direction.y = 0;
        
        // Move enemy
        enemy.position.add(direction.multiplyScalar(config.enemySpeed * delta * 60));
        
        // Rotate enemy to face player
        enemy.lookAt(new THREE.Vector3(player.position.x, enemy.position.y, player.position.z));
        
        // Check collision with player
        const distanceToPlayer = enemy.position.distanceTo(player.position);
        if (distanceToPlayer < 2) {
            takeDamage(config.enemyDamage * delta);
            
            // Push enemy away slightly
            const pushDirection = new THREE.Vector3();
            pushDirection.subVectors(enemy.position, player.position).normalize();
            enemy.position.add(pushDirection.multiplyScalar(0.2));
        }
    }
    
    // Update explosion particles
    scene.children.forEach(child => {
        if (child.userData.velocity && child.userData.createdAt) {
            // Apply gravity to particles
            child.userData.velocity.y -= 0.01 * delta;
            
            // Move particle
            child.position.add(child.userData.velocity.clone().multiplyScalar(delta * 60));
            
            // Rotate particle for effect
            child.rotation.x += 0.1 * delta;
            child.rotation.y += 0.1 * delta;
        }
    });
}

function movePlayer(delta) {
    // Get movement direction
    const moveDirection = new THREE.Vector3(0, 0, 0);
    
    if (state.keys.forward) {
        moveDirection.z = -1;
    }
    if (state.keys.backward) {
        moveDirection.z = 1;
    }
    if (state.keys.left) {
        moveDirection.x = -1;
    }
    if (state.keys.right) {
        moveDirection.x = 1;
    }
    
    // Normalize for consistent diagonal movement
    if (moveDirection.length() > 0) {
        moveDirection.normalize();
    }
    
    // Apply movement relative to camera direction
    if (moveDirection.z !== 0) {
        const forward = new THREE.Vector3(0, 0, moveDirection.z);
        forward.applyQuaternion(camera.quaternion);
        forward.y = 0; // Keep movement on ground plane
        forward.normalize();
        
        player.position.add(forward.multiplyScalar(config.playerSpeed * delta * 60));
    }
    
    if (moveDirection.x !== 0) {
        const right = new THREE.Vector3(moveDirection.x, 0, 0);
        right.applyQuaternion(camera.quaternion);
        right.y = 0; // Keep movement on ground plane
        right.normalize();
        
        player.position.add(right.multiplyScalar(config.playerSpeed * delta * 60));
    }
    
    // Keep player within bounds
    const halfSize = config.groundSize / 2 - 2;
    player.position.x = Math.max(-halfSize, Math.min(halfSize, player.position.x));
    player.position.z = Math.max(-halfSize, Math.min(halfSize, player.position.z));
}

function handleMouseMove(event) {
    if (!state.gameActive || document.pointerLockElement !== document.body) return;
    
    const movementX = event.movementX || 0;
    const movementY = event.movementY || 0;
    
    // Rotate player (camera) based on mouse movement
    player.rotation.y -= movementX * config.mouseSensitivity;
    
    // Limit vertical camera rotation
    const verticalRotation = camera.rotation.x + movementY * config.mouseSensitivity;
    camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, verticalRotation));
}

function handleTouchMove(event) {
    if (!state.gameActive || !state.touchLook.active) return;
    
    const touch = event.touches[0];
    const movementX = touch.clientX - state.touchLook.lastX;
    const movementY = touch.clientY - state.touchLook.lastY;
    
    // Rotate player (camera) based on touch movement
    player.rotation.y -= movementX * config.touchSensitivity;
    
    // Limit vertical camera rotation
    const verticalRotation = camera.rotation.x + movementY * config.touchSensitivity;
    camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, verticalRotation));
    
    // Update last touch position
    state.touchLook.lastX = touch.clientX;
    state.touchLook.lastY = touch.clientY;
    
    // Prevent default to avoid scrolling
    event.preventDefault();
}

function handleTouchStart(event) {
    if (!state.gameActive) return;
    
    // Start tracking for camera rotation
    state.touchLook.active = true;
    state.touchLook.lastX = event.touches[0].clientX;
    state.touchLook.lastY = event.touches[0].clientY;
    
    // Prevent default to avoid scrolling
    event.preventDefault();
}

function handleTouchEnd() {
    state.touchLook.active = false;
}

function handleKeyDown(event) {
    if (!state.gameActive) return;
    
    switch (event.code) {
        case 'KeyW':
        case 'ArrowUp':
            state.keys.forward = true;
            break;
        case 'KeyS':
        case 'ArrowDown':
            state.keys.backward = true;
            break;
        case 'KeyA':
        case 'ArrowLeft':
            state.keys.left = true;
            break;
        case 'KeyD':
        case 'ArrowRight':
            state.keys.right = true;
            break;
        case 'KeyR':
            reload();
            break;
    }
}

function handleKeyUp(event) {
    if (!state.gameActive) return;
    
    switch (event.code) {
        case 'KeyW':
        case 'ArrowUp':
            state.keys.forward = false;
            break;
        case 'KeyS':
        case 'ArrowDown':
            state.keys.backward = false;
            break;
        case 'KeyA':
        case 'ArrowLeft':
            state.keys.left = false;
            break;
        case 'KeyD':
        case 'ArrowRight':
            state.keys.right = false;
            break;
    }
}

function handleMouseDown(event) {
    if (!state.gameActive || document.pointerLockElement !== document.body) return;
    
    if (event.button === 0) { // Left click
        shoot();
    }
}

function handleWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function startGame() {
    // Reset game state
    state.score = 0;
    state.ammo = config.maxAmmo;
    state.health = config.playerHealth;
    state.isReloading = false;
    state.gameActive = true;
    
    // Clear old enemies
    state.enemies.forEach(enemy => scene.remove(enemy));
    state.enemies = [];
    
    // Clear old bullets
    state.bullets.forEach(bullet => scene.remove(bullet));
    state.bullets = [];
    
    // Reset player position
    player.position.set(0, 2, 0);
    player.rotation.set(0, 0, 0);
    camera.rotation.set(0, 0, 0);
    
    // Update UI
    updateScoreUI();
    updateHealthUI();
    updateAmmoUI();
    
    // Hide start screen
    startScreen.style.display = 'none';
    gameOverScreen.style.display = 'none';
    
    // Request pointer lock for mouse control
    document.body.requestPointerLock();
    
    // Begin enemy spawning
    spawnEnemies();
    state.enemySpawnInterval = setInterval(spawnEnemies, config.enemySpawnTime);
}

function gameOver() {
    state.gameActive = false;
    
    // Show game over screen
    gameOverScreen.style.display = 'flex';
    finalScoreElement.textContent = `Your score: ${state.score}`;
    
    // Stop enemy spawning
    clearInterval(state.enemySpawnInterval);
    
    // Exit pointer lock
    document.exitPointerLock();
}

function animate() {
    requestAnimationFrame(animate);
    
    const delta = Math.min(0.1, clock.getDelta()); // Cap delta time to avoid large jumps
    
    if (state.gameActive) {
        movePlayer(delta);
        updateEntities(delta);
    }
    
    renderer.render(scene, camera);
}

// Event listeners
startButton.addEventListener('click', () => {
    startGame();
});

restartButton.addEventListener('click', () => {
    startGame();
});

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('mousedown', handleMouseDown);

// Mobile controls
document.addEventListener('touchstart', handleTouchStart, { passive: false });
document.addEventListener('touchmove', handleTouchMove, { passive: false });
document.addEventListener('touchend', handleTouchEnd);

mobileForward.addEventListener('touchstart', () => { state.keys.forward = true; });
mobileForward.addEventListener('touchend', () => { state.keys.forward = false; });

mobileBackward.addEventListener('touchstart', () => { state.keys.backward = true; });
mobileBackward.addEventListener('touchend', () => { state.keys.backward = false; });

mobileLeft.addEventListener('touchstart', () => { state.keys.left = true; });
mobileLeft.addEventListener('touchend', () => { state.keys.left = false; });

mobileRight.addEventListener('touchstart', () => { state.keys.right = true; });
mobileRight.addEventListener('touchend', () => { state.keys.right = false; });

mobileShoot.addEventListener('touchstart', () => { shoot(); });

window.addEventListener('resize', handleWindowResize);

// Exit pointer lock when ESC is pressed
document.addEventListener('pointerlockchange', () => {
    if (document.pointerLockElement !== document.body && state.gameActive) {
        // Pause game functionality could be added here
    }
});

// Initialize and start the game loop
init();
animate();
