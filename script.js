// RIVER PORTFOLIO - FULL SCENE RENDERING

const riverLayer = document.getElementById('river-layer');
const fisherman = document.getElementById('fisherman');
const overlay = document.getElementById('ui-overlay');
const content = document.getElementById('catch-data');

const screenWidth = 200; // Total character width of the scene
const riverWidths = [15, 20, 28, 38, 50, 65, 82, 100, 120, 140]; // Perspective
let frame = 0;

// Generate static terrain once
const staticTerrain = [];
for (let i = 0; i < 25; i++) {
    const currentRiverWidth = riverWidths[Math.floor(i / 2.5)] || 120;
    const riverStart = Math.floor((screenWidth / 2) - (currentRiverWidth / 2));
    const riverEnd = riverStart + currentRiverWidth;
    
    let terrainLine = [];
    for (let x = 0; x < screenWidth; x++) {
        if (x >= riverStart && x <= riverEnd) {
            terrainLine.push({ type: 'water', char: ' ' });
        } else {
            const noise = Math.random();
            if (noise > 0.99) terrainLine.push({ type: 'tree', char: '^' });
            else if (noise > 0.97) terrainLine.push({ type: 'grass', char: '"' });
            else terrainLine.push({ type: 'grass', char: '.' });
        }
    }
    staticTerrain.push({ line: terrainLine, riverStart, riverEnd });
}

function drawScene() {
    frame++;
    let sceneStr = "";
    
    // Render 25 lines of terrain
    for (let i = 0; i < 25; i++) {
        const terrain = staticTerrain[i];
        let line = "";
        
        for (let x = 0; x < screenWidth; x++) {
            const cell = terrain.line[x];
            
            if (cell.type === 'water') {
                // WATER LOGIC - diagonal cascading waves flowing down
                const wavePosition = (frame * 0.09 + i * 2 + x * 0.5) % 10;
                let ripple = " ";
                
                if (wavePosition < 1) {
                    ripple = "^";
                } else if (wavePosition < 3) {
                    ripple = "~";
                }
                
                line += `<span class="water">${ripple}</span>`;
            } else {
                // Static grass/trees
                line += `<span class="${cell.type}">${cell.char}</span>`;
            }
        }
        sceneStr += line + "\n";
    }
    
    riverLayer.innerHTML = sceneStr;
    requestAnimationFrame(drawScene);
}

drawScene();

function catchItem(type) {
    // Change fisherman to pulling pose
    fisherman.textContent = 
    `
      /
     /
  O /
  []/
  []
    `;

    setTimeout(() => {
        const profilePic = document.getElementById('profile-pic');
        let info = "";
        
        if(type === 'ABOUT') {
            profilePic.style.display = 'block';
            info = "NAME: Cooper Huntington-Bugg\nLOCATION: Jenks, OK\nSCHOOL: Oklahoma State University\nMAJOR: Computer Science\nMINOR: Mathematics";
        }
        if(type === 'SKILLS') {
            profilePic.style.display = 'none';
            info = "TECHNICAL SKILLS:<br><div style='display: flex; gap: 30px; justify-content: center; margin: 20px 0;'><div style='text-align: center;'><i class='fab fa-html5' style='font-size: 40px; display: block; margin-bottom: 8px;'></i><span style='font-size: 12px;'>HTML5</span></div><div style='text-align: center;'><i class='fab fa-css3-alt' style='font-size: 40px; display: block; margin-bottom: 8px;'></i><span style='font-size: 12px;'>CSS3</span></div><div style='text-align: center;'><i class='fab fa-js' style='font-size: 40px; display: block; margin-bottom: 8px;'></i><span style='font-size: 12px;'>JavaScript</span></div><div style='text-align: center;'><i class='fab fa-python' style='font-size: 40px; display: block; margin-bottom: 8px;'></i><span style='font-size: 12px;'>Python</span></div><div style='text-align: center;'><i class='fab fa-java' style='font-size: 40px; display: block; margin-bottom: 8px;'></i><span style='font-size: 12px;'>Java</span></div><div style='text-align: center;'><i class='fas fa-code' style='font-size: 40px; display: block; margin-bottom: 8px;'></i><span style='font-size: 12px;'>C++</span></div></div><br><br>INTERPERSONAL SKILLS:<br>• Problem Solving & Critical Thinking<br>• Team Collaboration & Communication<br>• Adaptability & Continuous Learning<br>• Attention to Detail";
        }
        if(type === 'PROJECTS') {
            profilePic.style.display = 'none';
            info = "<a href='https://github.com/Cooper-Bugg/Discord-Bot' target='_blank' style='color: #fff; text-decoration: underline;'>Discord Bot</a><br><a href='https://github.com/Cooper-Bugg/Intel-Event-Checkin' target='_blank' style='color: #fff; text-decoration: underline;'>Simple Check-in Site</a><br><a href='https://github.com/Cooper-Bugg/charitywater-GameFinal' target='_blank' style='color: #fff; text-decoration: underline;'>Charity Water Game</a><br><a href='https://github.com/Cooper-Bugg/Student-Network-Analyzer' target='_blank' style='color: #fff; text-decoration: underline;'>Student Network Analyzer</a><br><a href='https://github.com/Cooper-Bugg/Floating-Point-Error-Visualizer' target='_blank' style='color: #fff; text-decoration: underline;'>Floating Point Error Visualizer</a><br>ASCII River Engine<br>More coming soon...";
        }
        if(type === 'CONTACT') {
            profilePic.style.display = 'none';
            info = "<div style='text-align: center;'><h2 style='margin-bottom: 30px;'>CONTACT ME</h2><p style='margin-bottom: 15px; font-size: 18px;'>EMAIL: <a href='mailto:cohunti@okstate.edu' style='color: #fff; text-decoration: underline;'>cohunti@okstate.edu</a></p><p style='margin-bottom: 15px; font-size: 18px;'><a href='https://www.linkedin.com/in/cooper-huntington-bugg-b04643280/' target='_blank' style='color: #fff; text-decoration: underline;'>LinkedIn Profile</a></p><p style='font-size: 18px;'><a href='https://github.com/Cooper-Bugg' target='_blank' style='color: #fff; text-decoration: underline;'>GitHub Profile</a></p></div>";
        }
        if(type === 'RESUME') {
            profilePic.style.display = 'none';
            info = "<div style='text-align: center;'><h2 style='margin-bottom: 30px;'>RESUME</h2><p style='margin-bottom: 30px; color: #aaa; font-size: 16px;'>Click below to view my resume</p><button onclick='window.open(\"Resume.pdf\", \"_blank\")' style='background: #fff; color: #000; border: 2px solid #fff; padding: 15px 40px; font-size: 18px; cursor: pointer; font-family: inherit; font-weight: bold;'>VIEW RESUME (PDF)</button></div>";
        }

        content.innerHTML = info;
        overlay.classList.add('active');
    }, 300);
}

function release() {
    overlay.classList.remove('active');
    fisherman.textContent = `
             / \\
  O        /     \\
  [].- - /         \\
  []   /             \\
    `;
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        release();
    }
});

// Add Font Awesome for icons in skills
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
document.head.appendChild(link);

// Mountain Range - Fixed 60-character grid (no drifting)
function fillMountainHorizon() {
    const container = document.getElementById('mountain-tiles');
    if (!container) return;
    
    // Every line here is exactly 60 characters long
    const mountainPattern = [
        "              /\\              .                             ",
        "             /**\\            / \\                            ",
        "            /<span class='snow'>####</span>\\          /<span class='snow'>***</span>\\          /\\               ",
        "           /<span class='snow'>##..##</span>\\        /<span class='snow'>#####</span>\\        /**\\              ",
        "          /  <span class='snow'>.</span>  <span class='snow'>.</span>  \\      /<span class='snow'>##</span> <span class='trees'>^</span> <span class='snow'>##</span>\\      /<span class='snow'>####</span>\\             ",
        "         /   <span class='snow'>.</span>  <span class='snow'>.</span>   \\    /   <span class='trees'>^ ^</span>   \\    /<span class='snow'>##..##</span>\\            ",
        "        /    /\\      \\  /   <span class='trees'>^ ^ ^</span>   \\  /  <span class='snow'>.</span>  <span class='snow'>.</span>  \\           ",
        "       /____/  \\______\\/_____________\\/__________\\          ",
        " <span class='trees'>^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^</span>"
    ];
    
    const screenWidth = window.innerWidth;
    const charWidth = 12;
    const charsNeeded = Math.ceil(screenWidth / charWidth) + 60;
    const patternWidth = mountainPattern[0].length;
    const repeatCount = Math.ceil(charsNeeded / patternWidth);
    
    let finalOutput = "";
    
    // Build line-by-line to stay 100% straight
    for (let row = 0; row < mountainPattern.length; row++) {
        let repeatedRow = "";
        for (let i = 0; i < repeatCount; i++) {
            repeatedRow += mountainPattern[row];
        }
        finalOutput += repeatedRow + "\n";
    }
    
    container.innerHTML = finalOutput;
}

// Create twinkling stars in the sky
function createStars() {
    const mountainWrapper = document.getElementById('mountain-wrapper');
    const starCount = 100;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.textContent = '✦';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 70 + '%'; // Keep stars in upper portion
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.fontSize = (Math.random() * 3 + 1) + 'px';
        mountainWrapper.appendChild(star);
    }
    
    // Create moon
    const moon = document.createElement('div');
    moon.id = 'moon';
    mountainWrapper.appendChild(moon);
}

window.addEventListener('resize', fillMountainHorizon);
fillMountainHorizon();
createStars();
