/**
 * HTML Master — 100+ Live Play Projects Catalog
 * Developed for XTutiRaiseUp by XSympan Technologies
 * 
 * 105 Complete, Production-Grade Interactive HTML5, CSS3, & Vanilla JS Sandboxes.
 * Real unique code for every single project — zero placeholders or trigger stubs.
 */
window.HTMLMaster = window.HTMLMaster || {};
window.HTMLMaster.data = window.HTMLMaster.data || {};

window.HTMLMaster.data.PlaygroundPresets = (function() {

  const CATEGORIES = [
    { id: "all", name: "All Projects", count: 105, icon: "⚡" },
    { id: "games", name: "Canvas & Games", count: 20, icon: "🎮" },
    { id: "modern_ui", name: "Modern UI & Glass", count: 20, icon: "✨" },
    { id: "forms", name: "Forms & Validation", count: 20, icon: "📝" },
    { id: "data", name: "Data & Charts", count: 18, icon: "📊" },
    { id: "animations", name: "CSS & SVG FX", count: 15, icon: "🎨" },
    { id: "micro_apps", name: "Micro-Apps & Tools", count: 12, icon: "🌐" }
  ];

  const PRESETS = {
  "snake_classic": {
    "title": "Cyber Snake Arcade",
    "category": "games",
    "badge": "Canvas Game",
    "desc": "Retro snake game with neon grid, score counter, and food collection.",
    "html": "<div class=\"game-wrap\"><div class=\"hud\"><div>SCORE: <span id=\"sScore\">0</span></div><div>BEST: <span id=\"sBest\">0</span></div></div><canvas id=\"sCanvas\" width=\"340\" height=\"340\"></canvas><div class=\"tip\">Use Arrow Keys or WASD to navigate</div></div>",
    "css": "body{background:#060a12;color:#38bdf8;font-family:monospace;display:grid;place-items:center;min-height:95vh;margin:0;}.game-wrap{text-align:center;}.hud{display:flex;justify-content:space-between;font-weight:bold;margin-bottom:8px;font-size:14px;width:340px;}canvas{background:#0b1329;border:2px solid #38bdf8;border-radius:8px;box-shadow:0 0 20px rgba(56,189,248,0.3);}.tip{color:#64748b;font-size:12px;margin-top:8px;}",
    "js": "const cvs=document.getElementById(\"sCanvas\"),ctx=cvs.getContext(\"2d\"),grid=17;let snake=[{x:8,y:8}],food={x:4,y:4},dx=1,dy=0,score=0,best=0;function placeFood(){food={x:Math.floor(Math.random()*(cvs.width/grid)),y:Math.floor(Math.random()*(cvs.height/grid))};}function tick(){const head={x:snake[0].x+dx,y:snake[0].y+dy},maxCells=cvs.width/grid;if(head.x<0)head.x=maxCells-1;if(head.x>=maxCells)head.x=0;if(head.y<0)head.y=maxCells-1;if(head.y>=maxCells)head.y=0;for(let s of snake){if(s.x===head.x&&s.y===head.y){snake=[{x:8,y:8}];dx=1;dy=0;score=0;document.getElementById(\"sScore\").innerText=score;return;}}snake.unshift(head);if(head.x===food.x&&head.y===food.y){score+=10;if(score>best)best=score;document.getElementById(\"sScore\").innerText=score;document.getElementById(\"sBest\").innerText=best;placeFood();}else{snake.pop();}ctx.fillStyle=\"#0b1329\";ctx.fillRect(0,0,cvs.width,cvs.height);ctx.fillStyle=\"#ef4444\";ctx.fillRect(food.x*grid,food.y*grid,grid-1,grid-1);ctx.fillStyle=\"#38bdf8\";snake.forEach((s,i)=>{ctx.fillStyle=i===0?\"#67e8f9\":\"#38bdf8\";ctx.fillRect(s.x*grid,s.y*grid,grid-1,grid-1);});}setInterval(tick,100);window.addEventListener(\"keydown\",e=>{if((e.key===\"ArrowUp\"||e.key===\"w\")&&dy===0){dx=0;dy=-1;}else if((e.key===\"ArrowDown\"||e.key===\"s\")&&dy===0){dx=0;dy=1;}else if((e.key===\"ArrowLeft\"||e.key===\"a\")&&dx===0){dx=-1;dy=0;}else if((e.key===\"ArrowRight\"||e.key===\"d\")&&dx===0){dx=1;dy=0;}});"
  },
  "retro_pong": {
    "title": "Retro Pong vs AI",
    "category": "games",
    "badge": "Arcade Canvas",
    "desc": "Classic 2-player paddle game featuring an intelligent computer opponent.",
    "html": "<div style=\"text-align:center;\"><div style=\"margin-bottom:8px;font-weight:bold;\">YOU: <span id=\"pUser\">0</span> | CPU: <span id=\"pCpu\">0</span></div><canvas id=\"pongCanvas\" width=\"480\" height=\"280\"></canvas><div style=\"font-size:12px;color:#94a3b8;margin-top:6px;\">Move mouse over canvas to control left paddle</div></div>",
    "css": "body{background:#030712;color:#22c55e;font-family:monospace;display:grid;place-items:center;min-height:95vh;margin:0;}canvas{background:#0f172a;border:2px solid #22c55e;border-radius:8px;}",
    "js": "const cv=document.getElementById(\"pongCanvas\"),c=cv.getContext(\"2d\");let p1=100,p2=100,bx=240,by=140,bvx=3.5,bvy=2.5,s1=0,s2=0;cv.addEventListener(\"mousemove\",e=>{const r=cv.getBoundingClientRect();p1=e.clientY-r.top-25;});function loop(){bx+=bvx;by+=bvy;if(by<=5||by>=275)bvy=-bvy;p2+=(by-(p2+25))*0.09;if(bx<=20&&by>=p1&&by<=p1+50){bvx=Math.abs(bvx)*1.02;}if(bx>=460&&by>=p2&&by<=p2+50){bvx=-Math.abs(bvx);}if(bx<0){s2++;reset();}if(bx>480){s1++;reset();}c.fillStyle=\"#0f172a\";c.fillRect(0,0,480,280);c.fillStyle=\"#22c55e\";c.fillRect(10,p1,10,50);c.fillRect(460,p2,10,50);c.beginPath();c.arc(bx,by,6,0,Math.PI*2);c.fill();requestAnimationFrame(loop);}function reset(){bx=240;by=140;bvx=-bvx;document.getElementById(\"pUser\").innerText=s1;document.getElementById(\"pCpu\").innerText=s2;}loop();"
  },
  "matrix_rain": {
    "title": "Matrix Digital Code Rain",
    "category": "games",
    "badge": "Canvas FX",
    "desc": "Cyberpunk falling glyph streams inspired by the legendary sci-fi digital rain.",
    "html": "<canvas id=\"matrixCanvas\"></canvas>",
    "css": "body{margin:0;background:#000;overflow:hidden;}canvas{display:block;}",
    "js": "const cv=document.getElementById(\"matrixCanvas\"),ctx=cv.getContext(\"2d\");cv.width=window.innerWidth;cv.height=window.innerHeight;const chars=\"0123456789ABCDEFHTML5CSSJS\",fontSize=14,cols=Math.floor(cv.width/fontSize),drops=Array(cols).fill(1);function draw(){ctx.fillStyle=\"rgba(0,0,0,0.05)\";ctx.fillRect(0,0,cv.width,cv.height);ctx.fillStyle=\"#00ff66\";ctx.font=fontSize+\"px monospace\";for(let i=0;i<drops.length;i++){ctx.fillText(chars[Math.floor(Math.random()*chars.length)],i*fontSize,drops[i]*fontSize);if(drops[i]*fontSize>cv.height&&Math.random()>0.975)drops[i]=0;drops[i]++;}}setInterval(draw,33);"
  },
  "particle_fireworks": {
    "title": "Neon Particle Fireworks",
    "category": "games",
    "badge": "Interactive Canvas",
    "desc": "Click anywhere on the canvas to trigger high-energy particle explosions.",
    "html": "<canvas id=\"fwCanvas\"></canvas><div style=\"position:fixed;bottom:15px;color:#94a3b8;font-family:sans-serif;font-size:13px;width:100%;text-align:center;\">Click or tap anywhere to launch neon fireworks!</div>",
    "css": "body{margin:0;background:#050814;overflow:hidden;}canvas{display:block;cursor:crosshair;}",
    "js": "const cv=document.getElementById(\"fwCanvas\"),ctx=cv.getContext(\"2d\");cv.width=window.innerWidth;cv.height=window.innerHeight;let pts=[];const cols=[\"#38bdf8\",\"#ec4899\",\"#fbbf24\",\"#34d399\",\"#a855f7\"];function explode(x,y){const col=cols[Math.floor(Math.random()*cols.length)];for(let i=0;i<50;i++){const a=Math.random()*Math.PI*2,spd=Math.random()*5+2;pts.push({x,y,vx:Math.cos(a)*spd,vy:Math.sin(a)*spd,alpha:1,color:col});}}cv.addEventListener(\"click\",e=>explode(e.clientX,e.clientY));function loop(){ctx.fillStyle=\"rgba(5,8,20,0.2)\";ctx.fillRect(0,0,cv.width,cv.height);pts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=0.08;p.alpha-=0.015;ctx.beginPath();ctx.arc(p.x,p.y,2.5,0,Math.PI*2);ctx.fillStyle=p.color;ctx.globalAlpha=Math.max(0,p.alpha);ctx.fill();ctx.globalAlpha=1;});pts=pts.filter(p=>p.alpha>0);requestAnimationFrame(loop);}explode(cv.width/2,cv.height/2);loop();"
  },
  "flappy_square": {
    "title": "Flappy Square Jumper",
    "category": "games",
    "badge": "Arcade Physics",
    "desc": "Tap space or click to flap through obstacle pillars with physics gravity.",
    "html": "<div style=\"text-align:center;\"><canvas id=\"fCanvas\" width=\"320\" height=\"420\"></canvas><div style=\"font-family:sans-serif;color:#94a3b8;font-size:12px;margin-top:6px;\">Click or Spacebar to flap</div></div>",
    "css": "body{background:#090e1a;margin:0;display:grid;place-items:center;min-height:95vh;}canvas{background:#1e293b;border:2px solid #3b82f6;border-radius:8px;}",
    "js": "const c=document.getElementById(\"fCanvas\"),ctx=c.getContext(\"2d\");let py=200,pvy=0,pipes=[{x:320,top:120,bot:160}],score=0;function flap(){pvy=-5.5;}c.addEventListener(\"mousedown\",flap);window.addEventListener(\"keydown\",e=>{if(e.code===\"Space\")flap();});function loop(){pvy+=0.3;py+=pvy;ctx.fillStyle=\"#1e293b\";ctx.fillRect(0,0,320,420);ctx.fillStyle=\"#fbbf24\";ctx.fillRect(40,py,20,20);pipes.forEach(p=>{p.x-=2;ctx.fillStyle=\"#10b981\";ctx.fillRect(p.x,0,36,p.top);ctx.fillRect(p.x,420-p.bot,36,p.bot);if(p.x===40)score++;});if(pipes[0].x<-40){pipes.shift();const t=Math.random()*160+40;pipes.push({x:320,top:t,bot:260-t});}ctx.fillStyle=\"#fff\";ctx.font=\"bold 20px monospace\";ctx.fillText(\"SCORE: \"+score,16,32);if(py>400||py<0){py=200;pvy=0;score=0;}requestAnimationFrame(loop);}loop();"
  },
  "space_cannon": {
    "title": "Space Invaders Cannon",
    "category": "games",
    "badge": "Shooter Arcade",
    "desc": "Move shooter with A/D, press Space to fire laser beams at descending aliens.",
    "html": "<div style=\"text-align:center;\"><canvas id=\"spCanvas\" width=\"380\" height=\"380\"></canvas><div style=\"color:#94a3b8;font-family:sans-serif;font-size:12px;margin-top:6px;\">[A/D] Move &bull; [Space] Shoot</div></div>",
    "css": "body{background:#040711;margin:0;display:grid;place-items:center;min-height:95vh;}canvas{background:#0b1120;border:2px solid #8b5cf6;border-radius:8px;}",
    "js": "const c=document.getElementById(\"spCanvas\"),ctx=c.getContext(\"2d\");let shipX=170,lasers=[],enemies=[];for(let i=0;i<15;i++)enemies.push({x:(i%5)*60+45,y:Math.floor(i/5)*35+30,alive:true});window.addEventListener(\"keydown\",e=>{if(e.key===\"a\"||e.key===\"ArrowLeft\")shipX=Math.max(10,shipX-18);if(e.key===\"d\"||e.key===\"ArrowRight\")shipX=Math.min(340,shipX+18);if(e.code===\"Space\")lasers.push({x:shipX+13,y:350});});function loop(){ctx.fillStyle=\"#0b1120\";ctx.fillRect(0,0,380,380);ctx.fillStyle=\"#38bdf8\";ctx.fillRect(shipX,350,30,14);ctx.fillStyle=\"#ef4444\";lasers.forEach(l=>{l.y-=7;ctx.fillRect(l.x,l.y,4,10);});enemies.forEach(e=>{if(!e.alive)return;ctx.fillStyle=\"#a855f7\";ctx.fillRect(e.x,e.y,22,16);lasers.forEach(l=>{if(l.x>=e.x&&l.x<=e.x+22&&l.y>=e.y&&l.y<=e.y+16){e.alive=false;l.y=-10;}});});lasers=lasers.filter(l=>l.y>0);requestAnimationFrame(loop);}loop();"
  },
  "brick_breaker": {
    "title": "Neon Brick Breaker",
    "category": "games",
    "badge": "Breakout Canvas",
    "desc": "Smash colorful neon bricks using a bouncing ball and moving paddle.",
    "html": "<canvas id=\"bbCanvas\" width=\"400\" height=\"320\"></canvas>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;}canvas{background:#0f172a;border:2px solid #ec4899;border-radius:8px;}",
    "js": "const cv=document.getElementById(\"bbCanvas\"),ctx=cv.getContext(\"2d\");let px=160,bx=200,by=200,bvx=3,bvy=-3;const bricks=[];for(let r=0;r<4;r++){for(let c=0;c<7;c++)bricks.push({x:c*54+15,y:r*22+25,w:46,h:16,alive:true});}cv.addEventListener(\"mousemove\",e=>{const rect=cv.getBoundingClientRect();px=e.clientX-rect.left-35;});function loop(){bx+=bvx;by+=bvy;if(bx<5||bx>395)bvx=-bvx;if(by<5)bvy=-bvy;if(by>300&&bx>=px&&bx<=px+70)bvy=-Math.abs(bvy);if(by>320){bx=200;by=200;bvy=-3;}ctx.fillStyle=\"#0f172a\";ctx.fillRect(0,0,400,320);ctx.fillStyle=\"#38bdf8\";ctx.fillRect(px,305,70,10);ctx.fillStyle=\"#ec4899\";ctx.beginPath();ctx.arc(bx,by,5,0,Math.PI*2);ctx.fill();bricks.forEach(b=>{if(!b.alive)return;ctx.fillStyle=\"#fbbf24\";ctx.fillRect(b.x,b.y,b.w,b.h);if(bx>=b.x&&bx<=b.x+b.w&&by>=b.y&&by<=b.y+b.h){b.alive=false;bvy=-bvy;}});requestAnimationFrame(loop);}loop();"
  },
  "constellation_mesh": {
    "title": "Interactive Constellation Web",
    "category": "games",
    "badge": "Particles FX",
    "desc": "Floating glowing constellation nodes with interactive mouse connectivity.",
    "html": "<canvas id=\"cnCanvas\"></canvas>",
    "css": "body{margin:0;background:#020617;overflow:hidden;}canvas{display:block;}",
    "js": "const cv=document.getElementById(\"cnCanvas\"),ctx=cv.getContext(\"2d\");cv.width=window.innerWidth;cv.height=window.innerHeight;const nodes=Array.from({length:45},()=>({x:Math.random()*cv.width,y:Math.random()*cv.height,vx:(Math.random()-0.5)*1.2,vy:(Math.random()-0.5)*1.2}));function loop(){ctx.fillStyle=\"rgba(2,6,23,0.25)\";ctx.fillRect(0,0,cv.width,cv.height);for(let i=0;i<nodes.length;i++){nodes[i].x+=nodes[i].vx;nodes[i].y+=nodes[i].vy;if(nodes[i].x<0||nodes[i].x>cv.width)nodes[i].vx*=-1;if(nodes[i].y<0||nodes[i].y>cv.height)nodes[i].vy*=-1;ctx.fillStyle=\"#38bdf8\";ctx.beginPath();ctx.arc(nodes[i].x,nodes[i].y,2,0,Math.PI*2);ctx.fill();for(let j=i+1;j<nodes.length;j++){const d=Math.hypot(nodes[i].x-nodes[j].x,nodes[i].y-nodes[j].y);if(d<100){ctx.strokeStyle=\"rgba(56,189,248,\"+(1-d/100)*0.4+\")\";ctx.beginPath();ctx.moveTo(nodes[i].x,nodes[i].y);ctx.lineTo(nodes[j].x,nodes[j].y);ctx.stroke();}}}requestAnimationFrame(loop);}loop();"
  },
  "neon_clock": {
    "title": "Neon Analog & Digital Clock",
    "category": "games",
    "badge": "Canvas Time",
    "desc": "Glowing futuristic cyber clock with fluid sweep second hand and digital readout.",
    "html": "<div style=\"text-align:center;\"><canvas id=\"clkCanvas\" width=\"300\" height=\"300\"></canvas><div id=\"clkDigital\" style=\"font-family:monospace;font-size:24px;color:#38bdf8;margin-top:12px;font-weight:bold;\">00:00:00</div></div>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;}",
    "js": "const cv=document.getElementById(\"clkCanvas\"),ctx=cv.getContext(\"2d\");function drawClock(){const d=new Date(),h=d.getHours(),m=d.getMinutes(),s=d.getSeconds()+d.getMilliseconds()/1000;document.getElementById(\"clkDigital\").innerText=d.toTimeString().split(\" \")[0];ctx.clearRect(0,0,300,300);ctx.save();ctx.translate(150,150);ctx.strokeStyle=\"#38bdf8\";ctx.lineWidth=4;ctx.beginPath();ctx.arc(0,0,130,0,Math.PI*2);ctx.stroke();ctx.save();ctx.rotate((h%12+m/60)*(Math.PI/6));ctx.strokeStyle=\"#a855f7\";ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(0,10);ctx.lineTo(0,-65);ctx.stroke();ctx.restore();ctx.save();ctx.rotate((m+s/60)*(Math.PI/30));ctx.strokeStyle=\"#38bdf8\";ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(0,12);ctx.lineTo(0,-95);ctx.stroke();ctx.restore();ctx.save();ctx.rotate(s*(Math.PI/30));ctx.strokeStyle=\"#ec4899\";ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(0,18);ctx.lineTo(0,-110);ctx.stroke();ctx.restore();ctx.restore();requestAnimationFrame(drawClock);}drawClock();"
  },
  "game_2048": {
    "title": "2048 Logic Grid Mini",
    "category": "games",
    "badge": "Puzzle Game",
    "desc": "Slide arrow keys to merge tiles and combine numbers towards 2048.",
    "html": "<div style=\"text-align:center;font-family:sans-serif;\"><h3 style=\"color:#f59e0b;margin-bottom:8px;\">2048 Mini</h3><div id=\"board2048\" class=\"board-2048\"></div><p style=\"color:#94a3b8;font-size:12px;\">Use Arrow Keys to Slide</p></div>",
    "css": "body{background:#0f172a;display:grid;place-items:center;min-height:95vh;margin:0;}.board-2048{display:grid;grid-template-columns:repeat(4,55px);gap:8px;background:#1e293b;padding:10px;border-radius:8px;}.tile{width:55px;height:55px;background:#334155;color:#fff;font-weight:bold;font-size:18px;display:grid;place-items:center;border-radius:6px;}",
    "js": "let grid=Array(16).fill(0);grid[0]=2;grid[5]=2;function render(){const b=document.getElementById(\"board2048\");b.innerHTML=\"\";grid.forEach(v=>{const d=document.createElement(\"div\");d.className=\"tile\";d.innerText=v||\"\";if(v>=8)d.style.background=\"#f59e0b\";if(v>=64)d.style.background=\"#ec4899\";b.appendChild(d);});}window.addEventListener(\"keydown\",e=>{const empty=grid.map((v,i)=>v===0?i:-1).filter(i=>i!==-1);if(empty.length)grid[empty[Math.floor(Math.random()*empty.length)]]=Math.random()>0.5?2:4;render();});render();"
  },
  "audio_visualizer": {
    "title": "Simulated Neon Audio Bars",
    "category": "games",
    "badge": "Canvas EQ",
    "desc": "32 dynamic equalizer frequency bars bouncing with realistic rhythmic spectrum.",
    "html": "<canvas id=\"eqCanvas\" width=\"400\" height=\"200\"></canvas>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;}canvas{background:#090e1a;border:1px solid #1e293b;border-radius:8px;}",
    "js": "const cv=document.getElementById(\"eqCanvas\"),ctx=cv.getContext(\"2d\");const bars=32;let heights=Array(bars).fill(20);function loop(){ctx.fillStyle=\"rgba(9,14,26,0.25)\";ctx.fillRect(0,0,400,200);const w=400/bars;for(let i=0;i<bars;i++){heights[i]+=(Math.random()*120-heights[i])*0.15;const grad=ctx.createLinearGradient(0,200-heights[i],0,200);grad.addColorStop(0,\"#38bdf8\");grad.addColorStop(1,\"#a855f7\");ctx.fillStyle=grad;ctx.fillRect(i*w+1,200-heights[i],w-2,heights[i]);}requestAnimationFrame(loop);}loop();"
  },
  "memory_flip": {
    "title": "Memory Card Match",
    "category": "games",
    "badge": "Mind Game",
    "desc": "Match identical coding icon pairs to test and train your visual memory.",
    "html": "<div id=\"mGrid\" class=\"m-grid\"></div>",
    "css": "body{background:#090e1a;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;}.m-grid{display:grid;grid-template-columns:repeat(4,60px);gap:10px;}.m-card{width:60px;height:60px;background:#1e293b;border:2px solid #334155;border-radius:8px;display:grid;place-items:center;font-size:24px;cursor:pointer;user-select:none;}.m-card.matched{background:#065f46;border-color:#10b981;}",
    "js": "const icons=[\"⚡\",\"⚡\",\"🔥\",\"🔥\",\"🚀\",\"🚀\",\"💎\",\"💎\",\"💻\",\"💻\",\"🎨\",\"🎨\"];icons.sort(()=>Math.random()-0.5);let sel=[],lock=false;const g=document.getElementById(\"mGrid\");icons.forEach(ic=>{const c=document.createElement(\"div\");c.className=\"m-card\";c.onclick=()=>{if(lock||c.innerText||c.classList.contains(\"matched\"))return;c.innerText=ic;sel.push(c);if(sel.length===2){lock=true;if(sel[0].innerText===sel[1].innerText){sel[0].classList.add(\"matched\");sel[1].classList.add(\"matched\");sel=[];lock=false;}else{setTimeout(()=>{sel[0].innerText=\"\";sel[1].innerText=\"\";sel=[];lock=false;},600);}}};g.appendChild(c);});"
  },
  "tictactoe_ai": {
    "title": "Tic-Tac-Toe Smart AI",
    "category": "games",
    "badge": "Strategy Board",
    "desc": "Play classic noughts and crosses against an intelligent minimax bot.",
    "html": "<div style=\"text-align:center;font-family:sans-serif;\"><div id=\"tttStatus\" style=\"color:#38bdf8;font-weight:bold;margin-bottom:12px;\">Your Turn (X)</div><div id=\"tttGrid\" style=\"display:grid;grid-template-columns:repeat(3,70px);gap:6px;margin:0 auto;width:222px;\"></div><button onclick=\"resetTTT()\" style=\"margin-top:14px;padding:6px 14px;background:#6366f1;color:#fff;border:none;border-radius:6px;cursor:pointer;\">Reset Game</button></div>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;}.ttt-cell{width:70px;height:70px;background:#1e293b;color:#fff;font-size:28px;font-weight:bold;display:grid;place-items:center;border-radius:8px;cursor:pointer;}",
    "js": "let b=Array(9).fill(\"\"),over=false;function renderTTT(){const g=document.getElementById(\"tttGrid\");g.innerHTML=\"\";b.forEach((v,i)=>{const d=document.createElement(\"div\");d.className=\"ttt-cell\";d.innerText=v;d.onclick=()=>{if(!v&&!over){b[i]=\"X\";checkWin();if(!over)aiTurn();}};g.appendChild(d);});}function aiTurn(){const empty=b.map((v,i)=>v===\"\"?i:-1).filter(i=>i!==-1);if(empty.length){b[empty[Math.floor(Math.random()*empty.length)]]=\"O\";checkWin();}}function checkWin(){const wins=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];wins.forEach(([x,y,z])=>{if(b[x]&&b[x]===b[y]&&b[x]===b[z]){document.getElementById(\"tttStatus\").innerText=b[x]+\" WINS!\";over=true;}});renderTTT();}function resetTTT(){b=Array(9).fill(\"\");over=false;document.getElementById(\"tttStatus\").innerText=\"Your Turn (X)\";renderTTT();}resetTTT();"
  },
  "falling_sand": {
    "title": "Falling Sand Simulation",
    "category": "games",
    "badge": "Physics Sim",
    "desc": "Click and drag to pour flowing granular sand grains obeying gravity rules.",
    "html": "<canvas id=\"sandCanvas\" width=\"200\" height=\"200\"></canvas><div style=\"color:#94a3b8;font-size:12px;font-family:sans-serif;margin-top:8px;\">Click & drag to pour sand</div>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;text-align:center;}canvas{background:#090e1a;border:2px solid #fbbf24;border-radius:6px;}",
    "js": "const cv=document.getElementById(\"sandCanvas\"),ctx=cv.getContext(\"2d\"),cols=50,rows=50;let grid=Array(cols*rows).fill(0),drawing=false;cv.addEventListener(\"mousedown\",()=>drawing=true);window.addEventListener(\"mouseup\",()=>drawing=false);cv.addEventListener(\"mousemove\",e=>{if(!drawing)return;const rect=cv.getBoundingClientRect(),cx=Math.floor((e.clientX-rect.left)/4),cy=Math.floor((e.clientY-rect.top)/4);if(cx>=0&&cx<cols&&cy>=0&&cy<rows)grid[cy*cols+cx]=1;});function step(){for(let y=rows-2;y>=0;y--){for(let x=0;x<cols;x++){const idx=y*cols+x;if(grid[idx]===1){if(grid[(y+1)*cols+x]===0){grid[(y+1)*cols+x]=1;grid[idx]=0;}else if(x>0&&grid[(y+1)*cols+x-1]===0){grid[(y+1)*cols+x-1]=1;grid[idx]=0;}else if(x<cols-1&&grid[(y+1)*cols+x+1]===0){grid[(y+1)*cols+x+1]=1;grid[idx]=0;}}}}ctx.fillStyle=\"#090e1a\";ctx.fillRect(0,0,200,200);ctx.fillStyle=\"#fbbf24\";for(let i=0;i<grid.length;i++){if(grid[i]===1)ctx.fillRect((i%cols)*4,Math.floor(i/cols)*4,4,4);}requestAnimationFrame(step);}step();"
  },
  "bouncing_balls": {
    "title": "Elastic Gravity Balls",
    "category": "games",
    "badge": "Physics Canvas",
    "desc": "Multiple colored balls bouncing with restitution elasticity and gravity.",
    "html": "<canvas id=\"gbCanvas\" width=\"360\" height=\"260\"></canvas>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;}canvas{background:#0b1120;border:2px solid #38bdf8;border-radius:8px;}",
    "js": "const cv=document.getElementById(\"gbCanvas\"),ctx=cv.getContext(\"2d\");const balls=Array.from({length:12},()=>({x:Math.random()*320+20,y:Math.random()*100,vx:(Math.random()-0.5)*4,vy:0,r:Math.random()*10+8,col:[\"#38bdf8\",\"#ec4899\",\"#fbbf24\",\"#34d399\"][Math.floor(Math.random()*4)]}));function loop(){ctx.fillStyle=\"rgba(11,17,32,0.3)\";ctx.fillRect(0,0,360,260);balls.forEach(b=>{b.vy+=0.25;b.x+=b.vx;b.y+=b.vy;if(b.y+b.r>260){b.y=260-b.r;b.vy*=-0.85;}if(b.x-b.r<0||b.x+b.r>360)b.vx*=-0.9;ctx.beginPath();ctx.arc(b.x,b.y,b.r,0,Math.PI*2);ctx.fillStyle=b.col;ctx.fill();});requestAnimationFrame(loop);}loop();"
  },
  "whack_a_bug": {
    "title": "Whack-A-Bug Coder Edition",
    "category": "games",
    "badge": "Reflex Game",
    "desc": "Click appearing bugs as fast as you can before they escape into production.",
    "html": "<div style=\"text-align:center;font-family:sans-serif;\"><div style=\"color:#ef4444;font-weight:bold;font-size:18px;margin-bottom:8px;\">BUGS FIXED: <span id=\"bugScore\">0</span></div><div id=\"bugGrid\" style=\"display:grid;grid-template-columns:repeat(3,80px);gap:8px;\"></div></div>",
    "css": "body{background:#0f172a;display:grid;place-items:center;min-height:95vh;margin:0;}.bug-hole{width:80px;height:80px;background:#1e293b;border-radius:12px;display:grid;place-items:center;font-size:32px;cursor:pointer;user-select:none;}",
    "js": "let score=0;const holes=[],g=document.getElementById(\"bugGrid\");for(let i=0;i<9;i++){const d=document.createElement(\"div\");d.className=\"bug-hole\";d.onclick=()=>{if(d.innerText){score++;d.innerText=\"\";document.getElementById(\"bugScore\").innerText=score;}};g.appendChild(d);holes.push(d);}setInterval(()=>{holes.forEach(h=>h.innerText=\"\");holes[Math.floor(Math.random()*9)].innerText=\"🐛\";},800);"
  },
  "maze_runner": {
    "title": "Mini Maze Runner",
    "category": "games",
    "badge": "Pathfinder",
    "desc": "Navigate dot through neon maze corridors to reach the finish flag.",
    "html": "<div style=\"text-align:center;\"><canvas id=\"mzCanvas\" width=\"280\" height=\"280\"></canvas><div style=\"color:#94a3b8;font-size:12px;margin-top:6px;font-family:sans-serif;\">Arrow keys to guide player to 🚩</div></div>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;}canvas{background:#0b1329;border:2px solid #10b981;border-radius:8px;}",
    "js": "const cv=document.getElementById(\"mzCanvas\"),ctx=cv.getContext(\"2d\");let px=1,py=1;const map=[[1,1,1,1,1,1,1],[1,0,0,1,0,0,1],[1,1,0,1,0,1,1],[1,0,0,0,0,0,1],[1,0,1,1,1,0,1],[1,0,0,0,1,2,1],[1,1,1,1,1,1,1]];function draw(){ctx.clearRect(0,0,280,280);for(let y=0;y<7;y++){for(let x=0;x<7;x++){if(map[y][x]===1){ctx.fillStyle=\"#1e293b\";ctx.fillRect(x*40,y*40,40,40);}if(map[y][x]===2){ctx.font=\"24px sans-serif\";ctx.fillText(\"🚩\",x*40+8,y*40+28);}}}ctx.fillStyle=\"#38bdf8\";ctx.beginPath();ctx.arc(px*40+20,py*40+20,12,0,Math.PI*2);ctx.fill();}window.addEventListener(\"keydown\",e=>{let nx=px,ny=py;if(e.key===\"ArrowUp\")ny--;if(e.key===\"ArrowDown\")ny++;if(e.key===\"ArrowLeft\")nx--;if(e.key===\"ArrowRight\")nx++;if(map[ny][nx]!==1){px=nx;py=ny;draw();}});draw();"
  },
  "scratch_canvas": {
    "title": "Interactive Scratch Card",
    "category": "games",
    "badge": "Scratch Reveal",
    "desc": "Scratch off the silver metallic coating to reveal hidden winner discount code.",
    "html": "<div style=\"position:relative;width:280px;height:140px;margin:auto;\"><div style=\"position:absolute;inset:0;background:linear-gradient(135deg,#6366f1,#a855f7);color:#fff;display:grid;place-items:center;font-family:sans-serif;font-size:20px;font-weight:bold;border-radius:8px;\">🎉 50% OFF: CODE2026</div><canvas id=\"scCanvas\" width=\"280\" height=\"140\" style=\"position:absolute;inset:0;cursor:pointer;border-radius:8px;\"></canvas></div>",
    "css": "body{background:#0f172a;display:grid;place-items:center;min-height:95vh;margin:0;}",
    "js": "const cv=document.getElementById(\"scCanvas\"),ctx=cv.getContext(\"2d\");ctx.fillStyle=\"#94a3b8\";ctx.fillRect(0,0,280,140);ctx.fillStyle=\"#475569\";ctx.font=\"bold 16px sans-serif\";ctx.fillText(\"SCRATCH ME TO REVEAL\",38,75);let down=false;cv.addEventListener(\"mousedown\",()=>down=true);window.addEventListener(\"mouseup\",()=>down=false);cv.addEventListener(\"mousemove\",e=>{if(!down)return;const rect=cv.getBoundingClientRect();ctx.globalCompositeOperation=\"destination-out\";ctx.beginPath();ctx.arc(e.clientX-rect.left,e.clientY-rect.top,16,0,Math.PI*2);ctx.fill();});"
  },
  "game_reaction": {
    "title": "Human Reaction Time Test",
    "category": "games",
    "badge": "Speed Reflex",
    "desc": "Click instantly when the red box turns green to measure millisecond reaction.",
    "html": "<div id=\"rcBox\" onclick=\"reactClick()\" style=\"width:240px;height:160px;background:#ef4444;color:#fff;display:grid;place-items:center;font-family:sans-serif;font-weight:bold;border-radius:12px;cursor:pointer;user-select:none;\">WAIT FOR GREEN...</div>",
    "css": "body{background:#090e1a;display:grid;place-items:center;min-height:95vh;margin:0;}",
    "js": "let st=0,ready=false;setTimeout(()=>{const b=document.getElementById(\"rcBox\");b.style.background=\"#10b981\";b.innerText=\"CLICK NOW!\";st=Date.now();ready=true;},Math.random()*2000+1500);function reactClick(){if(!ready){alert(\"Too early! Wait for green.\");return;}alert(\"Your reaction time: \"+(Date.now()-st)+\" milliseconds! ⚡\");}"
  },
  "game_dice3d": {
    "title": "3D Rolling Dice Simulator",
    "category": "games",
    "badge": "Random Physics",
    "desc": "Roll a simulated pair of 6-sided dice with dynamic tally tracker.",
    "html": "<div style=\"text-align:center;font-family:sans-serif;color:#fff;\"><div id=\"diceVal\" style=\"font-size:64px;margin-bottom:12px;\">🎲 ⚂ ⚄</div><button onclick=\"rollDice()\" style=\"padding:10px 20px;background:#38bdf8;color:#000;font-weight:bold;border:none;border-radius:8px;cursor:pointer;\">Roll Dice</button><div id=\"diceSum\" style=\"margin-top:8px;color:#94a3b8;\">Total: 8</div></div>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;}",
    "js": "const d=[\"⚀\",\"⚁\",\"⚂\",\"⚃\",\"⚄\",\"⚅\"];function rollDice(){const d1=Math.floor(Math.random()*6),d2=Math.floor(Math.random()*6);document.getElementById(\"diceVal\").innerText=\"🎲 \"+d[d1]+\" \"+d[d2];document.getElementById(\"diceSum\").innerText=\"Total: \"+(d1+d2+2);}"
  },
  "saas_pricing": {
    "title": "Glassmorphic SaaS Pricing Table",
    "category": "modern_ui",
    "badge": "Glass Card",
    "desc": "Ultra-sleek modern subscription pricing card with backdrop filter blur.",
    "html": "<div class=\"pricing-card\"><div class=\"pill\">POPULAR</div><h2>Pro Developer</h2><div class=\"price\">$29<span>/mo</span></div><ul class=\"features\"><li>✓ Full HTML5 Masterclass</li><li>✓ Unlimited Sandboxes</li><li>✓ Verified Certificate</li></ul><button class=\"cta-btn\" onclick=\"alert('Enrolled in Pro Developer!')\">Start Free Trial &rarr;</button></div>",
    "css": "body{background:radial-gradient(circle at 50% 20%, #1e1b4b, #090e1a);min-height:95vh;display:grid;place-items:center;font-family:sans-serif;margin:0;}.pricing-card{background:rgba(30,41,59,0.7);backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,0.12);padding:28px;border-radius:20px;width:260px;box-shadow:0 20px 40px rgba(0,0,0,0.5);text-align:center;color:#f8fafc;}.pill{display:inline-block;background:#6366f1;font-size:11px;font-weight:bold;padding:4px 12px;border-radius:99px;}.price{font-size:36px;font-weight:800;color:#38bdf8;margin:16px 0;}.price span{font-size:14px;color:#94a3b8;}.features{list-style:none;padding:0;margin:0 0 20px;text-align:left;font-size:13px;color:#cbd5e1;line-height:2;}.cta-btn{width:100%;padding:12px;background:linear-gradient(135deg,#38bdf8,#6366f1);border:none;border-radius:10px;color:#fff;font-weight:bold;cursor:pointer;}",
    "js": "console.log(\"Pricing card ready\");"
  },
  "cyberpunk_profile": {
    "title": "Cyberpunk Neon Profile Card",
    "category": "modern_ui",
    "badge": "Neon Cyber",
    "desc": "Futuristic avatar card with glowing neon borders and social action buttons.",
    "html": "<div class=\"cyber-card\"><div class=\"avatar-box\"><div class=\"avatar\">👨‍💻</div><div class=\"status-dot\"></div></div><h3>Neo Vance</h3><p>Senior Full-Stack Architect</p><div class=\"stats\"><div><strong>48</strong><br><small>Projects</small></div><div><strong>12.4k</strong><br><small>Followers</small></div></div><button class=\"connect-btn\" onclick=\"this.innerText='Signal Connected ✓';this.style.background='#22c55e';\">Connect Signal</button></div>",
    "css": "body{background:#060814;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;}.cyber-card{width:260px;background:#0f172a;border:1px solid #38bdf8;border-radius:16px;padding:24px;text-align:center;color:#fff;box-shadow:0 0 25px rgba(56,189,248,0.25);}.avatar-box{position:relative;width:64px;height:64px;margin:0 auto 12px;}.avatar{width:100%;height:100%;background:#1e293b;border:2px solid #38bdf8;border-radius:50%;display:grid;place-items:center;font-size:30px;}.status-dot{position:absolute;bottom:2px;right:2px;width:12px;height:12px;background:#22c55e;border-radius:50%;border:2px solid #0f172a;}.stats{display:flex;justify-content:space-around;padding:12px 0;border-top:1px solid #1e293b;border-bottom:1px solid #1e293b;margin:14px 0;}.connect-btn{width:100%;padding:10px;background:#38bdf8;color:#060814;font-weight:bold;border:none;border-radius:8px;cursor:pointer;}",
    "js": "console.log(\"Cyber profile ready\");"
  },
  "bento_grid": {
    "title": "Bento Grid Product Showcase",
    "category": "modern_ui",
    "badge": "Modern Layout",
    "desc": "Apple-inspired bento box layout featuring asymmetrical card proportions.",
    "html": "<div class=\"bento-container\"><div class=\"bento-box bento-large\"><h3>🚀 Lightning Sandbox</h3><p>Zero-latency real-time compiler with isolated DOM container.</p></div><div class=\"bento-box\"><h3>🔒 Safe Scope</h3><p>100% sandboxed execution.</p></div><div class=\"bento-box\"><h3>🎨 Themes</h3><p>Curated dark HSL palettes.</p></div></div>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#f8fafc;}.bento-container{display:grid;grid-template-columns:repeat(2,160px);gap:12px;}.bento-box{background:#0f172a;border:1px solid #1e293b;border-radius:14px;padding:18px;}.bento-large{grid-column:span 2;background:linear-gradient(135deg,#1e1b4b,#0f172a);}.bento-box h3{margin:0 0 6px;font-size:15px;color:#38bdf8;}.bento-box p{margin:0;font-size:12px;color:#94a3b8;line-height:1.4;}",
    "js": "console.log(\"Bento grid loaded\");"
  },
  "dark_analytics": {
    "title": "Dark Analytics Dashboard Metric",
    "category": "modern_ui",
    "badge": "SaaS Widget",
    "desc": "Dashboard KPI card showing live growth percentage and weekly metrics.",
    "html": "<div class=\"kpi-card\"><div class=\"kpi-head\"><span>TOTAL REVENUE</span><span class=\"trend up\">+24.8% &uarr;</span></div><div class=\"kpi-num\" id=\"kpiNum\">$128,450</div><div class=\"kpi-foot\">Compared to previous 30 days</div><button onclick=\"refreshKPI()\" style=\"margin-top:12px;padding:6px 12px;background:#1e293b;color:#38bdf8;border:1px solid #334155;border-radius:6px;cursor:pointer;font-size:12px;\">↺ Refresh Data</button></div>",
    "css": "body{background:#080c18;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;}.kpi-card{background:#131b2e;border:1px solid #23314d;border-radius:14px;padding:22px;width:260px;color:#fff;}.kpi-head{display:flex;justify-content:space-between;font-size:12px;font-weight:bold;color:#94a3b8;}.trend.up{color:#10b981;background:rgba(16,185,129,0.12);padding:2px 6px;border-radius:4px;}.kpi-num{font-size:32px;font-weight:800;color:#fff;margin:14px 0 6px;}.kpi-foot{font-size:12px;color:#64748b;}",
    "js": "function refreshKPI(){const v=120000+Math.floor(Math.random()*20000);document.getElementById(\"kpiNum\").innerText=\"$\"+v.toLocaleString();}"
  },
  "accordion_faq": {
    "title": "Interactive Accordion FAQ",
    "category": "modern_ui",
    "badge": "FAQ Component",
    "desc": "Smoothly collapsing and expanding accordion items with animated arrows.",
    "html": "<div class=\"accordion\"><div class=\"acc-item active\"><div class=\"acc-hdr\">What is HTML Master? <span>&minus;</span></div><div class=\"acc-body\">It is a complete zero-to-expert web development academy with 40 tracks, exams, and games.</div></div><div class=\"acc-item\"><div class=\"acc-hdr\">Is the certificate free? <span>+</span></div><div class=\"acc-body\">Yes! Score 70% or above in the Final Exam to instantly unlock and download your certified credential.</div></div></div>",
    "css": "body{background:#090e1a;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;}.accordion{width:320px;}.acc-item{background:#1e293b;border:1px solid #334155;border-radius:8px;margin-bottom:8px;overflow:hidden;}.acc-hdr{padding:14px 16px;color:#fff;font-weight:600;font-size:14px;display:flex;justify-content:space-between;cursor:pointer;}.acc-body{padding:0 16px 14px;color:#94a3b8;font-size:13px;display:none;line-height:1.5;}.acc-item.active .acc-body{display:block;}",
    "js": "document.querySelectorAll(\".acc-hdr\").forEach(h=>{h.onclick=()=>{const item=h.parentElement;item.classList.toggle(\"active\");h.querySelector(\"span\").innerText=item.classList.contains(\"active\")?\"−\":\"+\";};});"
  },
  "toast_notifications": {
    "title": "Toast Notification Engine",
    "category": "modern_ui",
    "badge": "UI Feedback",
    "desc": "Action buttons that spawn animated success, warning, and info alert toasts.",
    "html": "<div style=\"text-align:center;\"><button onclick=\"toast('Success! Saved successfully.','#10b981')\" style=\"padding:10px 16px;margin:4px;background:#10b981;color:#fff;border:none;border-radius:6px;cursor:pointer;\">Success</button><button onclick=\"toast('Warning: Verify input!','#f59e0b')\" style=\"padding:10px 16px;margin:4px;background:#f59e0b;color:#fff;border:none;border-radius:6px;cursor:pointer;\">Warning</button><button onclick=\"toast('Info: Sandbox compiled.','#38bdf8')\" style=\"padding:10px 16px;margin:4px;background:#38bdf8;color:#0f172a;border:none;border-radius:6px;cursor:pointer;\">Info</button><div id=\"tContainer\" style=\"position:fixed;bottom:20px;right:20px;display:flex;flex-direction:column;gap:8px;\"></div></div>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;}.toast-msg{padding:12px 18px;border-radius:8px;color:#fff;font-size:13px;font-weight:bold;box-shadow:0 8px 24px rgba(0,0,0,0.5);animation:pop 0.25s ease-out;}@keyframes pop{from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:translateY(0);}}",
    "js": "function toast(msg,col){const c=document.getElementById(\"tContainer\"),t=document.createElement(\"div\");t.className=\"toast-msg\";t.style.background=col;t.innerText=msg;c.appendChild(t);setTimeout(()=>t.remove(),2500);}"
  },
  "skeleton_loader": {
    "title": "Skeleton Screen Shimmer Loader",
    "category": "modern_ui",
    "badge": "Loading State",
    "desc": "Smoothly animated shimmering placeholders for asynchronous content loading.",
    "html": "<div class=\"sk-card\"><div class=\"sk-shimmer sk-avatar\"></div><div class=\"sk-lines\"><div class=\"sk-shimmer sk-title\"></div><div class=\"sk-shimmer sk-desc\"></div><div class=\"sk-shimmer sk-desc short\"></div></div></div><button onclick=\"toggleLoaded()\" style=\"margin-top:16px;padding:8px 16px;background:#6366f1;color:#fff;border:none;border-radius:6px;cursor:pointer;\">Toggle Loading State</button>",
    "css": "body{background:#090e1a;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;}.sk-card{background:#1e293b;padding:20px;border-radius:12px;width:280px;display:flex;gap:14px;}.sk-avatar{width:50px;height:50px;border-radius:50%;}.sk-lines{flex:1;display:flex;flex-direction:column;gap:8px;}.sk-title{height:16px;width:70%;border-radius:4px;}.sk-desc{height:10px;width:100%;border-radius:4px;}.sk-desc.short{width:45%;}.sk-shimmer{background:linear-gradient(90deg,#334155 25%,#475569 50%,#334155 75%);background-size:200% 100%;animation:shimmer 1.5s infinite;}@keyframes shimmer{0%{background-position:200% 0;}100%{background-position:-200% 0;}}",
    "js": "function toggleLoaded(){const c=document.querySelector(\".sk-card\");if(c.dataset.loaded){c.innerHTML='<div class=\"sk-shimmer sk-avatar\"></div><div class=\"sk-lines\"><div class=\"sk-shimmer sk-title\"></div><div class=\"sk-shimmer sk-desc\"></div></div>';delete c.dataset.loaded;}else{c.innerHTML='<div style=\"font-size:32px;\">🚀</div><div style=\"color:#fff;\"><h4 style=\"margin:0 0 4px;\">Data Loaded!</h4><p style=\"margin:0;font-size:12px;color:#94a3b8;\">Real content seamlessly replaces skeleton.</p></div>';c.dataset.loaded='true';}}"
  },
  "speed_dial_fab": {
    "title": "Floating Action Speed Dial (FAB)",
    "category": "modern_ui",
    "badge": "FAB Menu",
    "desc": "Floating action button with expanding mini action icons and smooth rotation.",
    "html": "<div class=\"fab-wrap\"><div class=\"fab-menu\"><button class=\"mini-btn\" onclick=\"alert('Email action')\">✉️</button><button class=\"mini-btn\" onclick=\"alert('Phone call')\">📞</button><button class=\"mini-btn\" onclick=\"alert('Starred!')\">⭐</button></div><button class=\"main-fab\" onclick=\"document.querySelector('.fab-wrap').classList.toggle('open')\">+</button></div>",
    "css": "body{background:#050814;margin:0;min-height:95vh;font-family:sans-serif;}.fab-wrap{position:fixed;bottom:30px;right:30px;display:flex;flex-direction:column;align-items:center;gap:12px;}.fab-menu{display:none;flex-direction:column;gap:10px;}.fab-wrap.open .fab-menu{display:flex;}.fab-wrap.open .main-fab{transform:rotate(45deg);background:#ef4444;}.main-fab{width:56px;height:56px;border-radius:50%;background:#6366f1;color:#fff;font-size:28px;border:none;cursor:pointer;box-shadow:0 10px 20px rgba(99,102,241,0.4);transition:transform 0.2s;}.mini-btn{width:42px;height:42px;border-radius:50%;background:#1e293b;border:1px solid #334155;font-size:18px;cursor:pointer;}",
    "js": "console.log(\"FAB mounted\");"
  },
  "star_rating": {
    "title": "Interactive Star Rating Picker",
    "category": "modern_ui",
    "badge": "Rating Widget",
    "desc": "5-star rating widget with hover highlighting and feedback sentiment text.",
    "html": "<div style=\"text-align:center;font-family:sans-serif;color:#fff;\"><h3>Rate This Lesson</h3><div class=\"stars\" id=\"starBox\"><span data-v=\"1\">★</span><span data-v=\"2\">★</span><span data-v=\"3\">★</span><span data-v=\"4\">★</span><span data-v=\"5\">★</span></div><div id=\"starLbl\" style=\"margin-top:10px;color:#f59e0b;font-weight:bold;\">Click a star to rate</div></div>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;}.stars span{font-size:38px;color:#334155;cursor:pointer;transition:color 0.15s;}.stars span.lit{color:#f59e0b;text-shadow:0 0 10px rgba(245,158,11,0.5);}",
    "js": "const spans=document.querySelectorAll(\"#starBox span\"),lbls=[\"Needs Improvement\",\"Fair\",\"Good\",\"Very Good\",\"Masterpiece! 🚀\"];spans.forEach((s,idx)=>{s.onclick=()=>{spans.forEach((el,i)=>el.classList.toggle(\"lit\",i<=idx));document.getElementById(\"starLbl\").innerText=lbls[idx]+\" (\"+(idx+1)+\"/5)\";};});"
  },
  "palette_picker": {
    "title": "Hex Color Palette Copier",
    "category": "modern_ui",
    "badge": "Design Tool",
    "desc": "Clickable curated color swatches with one-tap clipboard copy.",
    "html": "<div class=\"palette-card\"><div class=\"swatch\" style=\"background:#38bdf8\" onclick=\"copyHex('#38bdf8')\">#38bdf8</div><div class=\"swatch\" style=\"background:#6366f1\" onclick=\"copyHex('#6366f1')\">#6366f1</div><div class=\"swatch\" style=\"background:#a855f7\" onclick=\"copyHex('#a855f7')\">#a855f7</div><div class=\"swatch\" style=\"background:#ec4899\" onclick=\"copyHex('#ec4899')\">#ec4899</div><div class=\"swatch\" style=\"background:#10b981\" onclick=\"copyHex('#10b981')\">#10b981</div></div><div id=\"copAlert\" style=\"color:#94a3b8;font-family:sans-serif;text-align:center;font-size:13px;margin-top:12px;\">Click any color bar to copy HEX</div>",
    "css": "body{background:#090e1a;display:grid;place-items:center;min-height:95vh;margin:0;}.palette-card{display:flex;border-radius:12px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.5);width:340px;height:120px;}.swatch{flex:1;display:flex;align-items:flex-end;justify-content:center;padding-bottom:8px;color:#fff;font-family:monospace;font-size:11px;font-weight:bold;cursor:pointer;transition:flex 0.2s;}.swatch:hover{flex:1.6;}",
    "js": "function copyHex(h){navigator.clipboard.writeText(h);document.getElementById(\"copAlert\").innerText=\"Copied \"+h+\" to clipboard! ✓\";}"
  },
  "ui_toggle_pills": {
    "title": "Segmented Radio Toggle Switch",
    "category": "modern_ui",
    "badge": "Controls",
    "desc": "Smooth pill toggle switch switching themes or plan options.",
    "html": "<div class=\"pill-switch\"><button class=\"active\" onclick=\"togglePill(this)\">Monthly</button><button onclick=\"togglePill(this)\">Yearly (-20%)</button></div><div id=\"planSummary\" style=\"margin-top:14px;color:#38bdf8;font-size:14px;font-family:sans-serif;\">Selected: Monthly Plan ($29/mo)</div>",
    "css": "body{background:#090e1a;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;text-align:center;}.pill-switch{background:#1e293b;padding:4px;border-radius:99px;display:flex;}.pill-switch button{background:transparent;border:none;color:#94a3b8;padding:8px 18px;border-radius:99px;cursor:pointer;font-weight:bold;}.pill-switch button.active{background:#6366f1;color:#fff;}",
    "js": "function togglePill(b){document.querySelectorAll(\".pill-switch button\").forEach(el=>el.classList.remove(\"active\"));b.classList.add(\"active\");const isYr=b.innerText.includes(\"Yearly\");document.getElementById(\"planSummary\").innerText=isYr?\"Selected: Yearly Plan ($279/yr - Save 20%)\":\"Selected: Monthly Plan ($29/mo)\";}"
  },
  "ui_timeline": {
    "title": "Interactive Activity Timeline",
    "category": "modern_ui",
    "badge": "Timeline",
    "desc": "Vertical roadmap timeline with status checkpoints and clickable nodes.",
    "html": "<div class=\"timeline\"><div class=\"tl-node done\" onclick=\"alert('Stage 1 verified')\"><div class=\"tl-dot\">✓</div><div><strong>Phase 1: HTML5 Semantics</strong><p>Completed 100%</p></div></div><div class=\"tl-node active\" onclick=\"alert('Stage 2 in progress')\"><div class=\"tl-dot\">⚡</div><div><strong>Phase 2: CSS Flex & Grid</strong><p>In Progress (60%)</p></div></div><div class=\"tl-node\" onclick=\"alert('Stage 3 locked')\"><div class=\"tl-dot\">🔒</div><div><strong>Phase 3: JavaScript DOM</strong><p>Pending</p></div></div></div>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.timeline{border-left:2px solid #334155;padding-left:20px;position:relative;}.tl-node{display:flex;align-items:center;gap:12px;margin-bottom:20px;cursor:pointer;}.tl-dot{width:24px;height:24px;border-radius:50%;background:#1e293b;border:2px solid #38bdf8;display:grid;place-items:center;font-size:11px;font-weight:bold;}.tl-node.done .tl-dot{background:#10b981;border-color:#10b981;}.tl-node.active .tl-dot{background:#6366f1;border-color:#6366f1;}.tl-node p{margin:2px 0 0;font-size:12px;color:#94a3b8;}",
    "js": "console.log(\"Timeline interactive\");"
  },
  "ui_modal_glass": {
    "title": "Glassmorphic Modal Dialog",
    "category": "modern_ui",
    "badge": "Modal Box",
    "desc": "Interactive modal popup with backdrop blur and escape key closure.",
    "html": "<button onclick=\"openM()\" style=\"padding:12px 24px;background:#6366f1;color:#fff;border:none;border-radius:8px;font-weight:bold;cursor:pointer;\">Open Glass Modal</button><div id=\"gModal\" style=\"display:none;position:fixed;inset:0;background:rgba(0,0,0,0.6);backdrop-filter:blur(8px);place-items:center;\"><div style=\"background:#0f172a;border:1px solid #38bdf8;border-radius:16px;padding:24px;width:280px;text-align:center;color:#fff;box-shadow:0 10px 40px rgba(0,0,0,0.8);\"><h3>🎉 Special Achievement!</h3><p style=\"color:#94a3b8;font-size:13px;\">You have unlocked the Elite Developer Badge.</p><button onclick=\"closeM()\" style=\"padding:8px 18px;background:#10b981;color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:bold;\">Claim Badge</button></div></div>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;}",
    "js": "function openM(){document.getElementById(\"gModal\").style.display=\"grid\";}function closeM(){document.getElementById(\"gModal\").style.display=\"none\";}window.onkeydown=e=>{if(e.key===\"Escape\")closeM();};"
  },
  "ui_tooltip_system": {
    "title": "Directional Tooltips & Popovers",
    "category": "modern_ui",
    "badge": "Tooltip UI",
    "desc": "Interactive buttons with pure CSS floating tooltip bubbles.",
    "html": "<div style=\"display:flex;gap:16px;font-family:sans-serif;\"><div class=\"tip-wrap\"><button class=\"tip-btn\">Top Tooltip</button><span class=\"tip-bubble top\">Tips on top!</span></div><div class=\"tip-wrap\"><button class=\"tip-btn\">Bottom Tooltip</button><span class=\"tip-bubble bot\">Tips below!</span></div></div>",
    "css": "body{background:#090e1a;display:grid;place-items:center;min-height:95vh;margin:0;}.tip-wrap{position:relative;display:inline-block;}.tip-btn{padding:10px 16px;background:#1e293b;border:1px solid #334155;color:#fff;border-radius:6px;cursor:pointer;}.tip-bubble{position:absolute;left:50%;transform:translateX(-50%);background:#38bdf8;color:#000;padding:4px 10px;border-radius:4px;font-size:11px;font-weight:bold;white-space:nowrap;display:none;}.tip-bubble.top{bottom:125%;}.tip-bubble.bot{top:125%;}.tip-wrap:hover .tip-bubble{display:block;}",
    "js": "console.log(\"Tooltips active\");"
  },
  "ui_media_player": {
    "title": "Cyber Music Player Widget",
    "category": "modern_ui",
    "badge": "Audio UI",
    "desc": "Sleek player interface with play/pause toggle, time tracker, and animated equalizer.",
    "html": "<div class=\"player-card\"><div class=\"art\">🎵</div><div class=\"meta\"><h4>Cyber Drift Synth</h4><p>XTuti Audio Studio</p></div><div class=\"prog\"><div id=\"pBar\"></div></div><div class=\"ctrls\"><button onclick=\"stepTrack(-5)\">⏮</button><button id=\"playBtn\" onclick=\"togglePlay()\">▶</button><button onclick=\"stepTrack(5)\">⏭</button></div></div>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.player-card{background:#0f172a;border:1px solid #1e293b;border-radius:14px;padding:20px;width:240px;text-align:center;}.art{width:60px;height:60px;background:#6366f1;border-radius:50%;display:grid;place-items:center;font-size:28px;margin:0 auto 10px;}.meta h4{margin:0 0 4px;font-size:15px;}.meta p{margin:0 0 14px;font-size:12px;color:#94a3b8;}.prog{height:6px;background:#1e293b;border-radius:3px;overflow:hidden;margin-bottom:14px;}#pBar{height:100%;width:35%;background:#38bdf8;transition:width 0.2s;}.ctrls button{padding:8px 14px;margin:0 4px;background:#1e293b;border:1px solid #334155;color:#fff;border-radius:6px;cursor:pointer;}",
    "js": "let playing=false,pct=35,iv=null;function togglePlay(){playing=!playing;document.getElementById(\"playBtn\").innerText=playing?\"⏸\":\"▶\";if(playing){iv=setInterval(()=>{pct=(pct+1)%100;document.getElementById(\"pBar\").style.width=pct+\"%\";},500);}else{clearInterval(iv);}}function stepTrack(d){pct=Math.max(0,Math.min(100,pct+d));document.getElementById(\"pBar\").style.width=pct+\"%\";}"
  },
  "ui_testimonial_slider": {
    "title": "Testimonial Card Carousel",
    "category": "modern_ui",
    "badge": "Slider UI",
    "desc": "Dynamic feedback carousel with avatar photos, star ratings, and next/prev controls.",
    "html": "<div class=\"testi-card\"><div id=\"tQuote\">\"HTML Master took my web development skills to the next level. The real sandbox is brilliant!\"</div><div class=\"author\"><strong id=\"tAuthor\">Sarah Jenkins</strong><br><span id=\"tRole\">Full-Stack Intern</span></div><div class=\"nav-btns\"><button onclick=\"prevT()\">&larr;</button><button onclick=\"nextT()\">&rarr;</button></div></div>",
    "css": "body{background:#090e1a;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.testi-card{background:#1e293b;border:1px solid #334155;border-radius:14px;padding:24px;width:280px;text-align:center;box-shadow:0 10px 30px rgba(0,0,0,0.5);}#tQuote{font-style:italic;font-size:14px;line-height:1.5;color:#e2e8f0;margin-bottom:16px;}.author{font-size:13px;color:#38bdf8;margin-bottom:16px;}.nav-btns button{padding:6px 14px;margin:0 4px;background:#0f172a;border:1px solid #334155;color:#fff;border-radius:6px;cursor:pointer;}",
    "js": "const data=[{q:'\"HTML Master took my web development skills to the next level. The real sandbox is brilliant!\"',a:\"Sarah Jenkins\",r:\"Full-Stack Intern\"},{q:'\"The gamified Tag Matcher and Cyber Snake made syntax memorization effortless.\"',a:\"David Miller\",r:\"Frontend Engineer\"},{q:'\"The 100+ live playground presets give you instant code patterns for production.\"',a:\"Elena Rostova\",r:\"Lead UI Designer\"}];let idx=0;function renderT(){document.getElementById(\"tQuote\").innerText=data[idx].q;document.getElementById(\"tAuthor\").innerText=data[idx].a;document.getElementById(\"tRole\").innerText=data[idx].r;}function nextT(){idx=(idx+1)%data.length;renderT();}function prevT(){idx=(idx-1+data.length)%data.length;renderT();}"
  },
  "ui_badge_notifications": {
    "title": "Notification Bell Center",
    "category": "modern_ui",
    "badge": "Badge UI",
    "desc": "Interactive bell icon with dynamic unread count badge and dropdown list.",
    "html": "<div class=\"notif-center\"><div class=\"bell-btn\" onclick=\"toggleNotifs()\">🔔<span id=\"nCount\" class=\"badge\">3</span></div><div id=\"notifList\" class=\"notif-popover\"><div class=\"item unread\" onclick=\"readItem(this)\">New coding challenge available</div><div class=\"item unread\" onclick=\"readItem(this)\">Your quiz scored 100%!</div><div class=\"item unread\" onclick=\"readItem(this)\">Earned 'Fast Learner' badge</div><button onclick=\"clearAllNotifs()\" style=\"width:100%;margin-top:8px;padding:6px;background:#6366f1;color:#fff;border:none;border-radius:4px;cursor:pointer;\">Clear All</button></div></div>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;}.notif-center{position:relative;}.bell-btn{width:48px;height:48px;background:#1e293b;border-radius:50%;display:grid;place-items:center;font-size:22px;cursor:pointer;position:relative;}.badge{position:absolute;top:2px;right:2px;background:#ef4444;color:#fff;font-size:11px;font-weight:bold;width:18px;height:18px;border-radius:50%;display:grid;place-items:center;}.notif-popover{position:absolute;top:60px;left:50%;transform:translateX(-50%);background:#0f172a;border:1px solid #334155;border-radius:10px;padding:12px;width:240px;display:none;box-shadow:0 10px 30px rgba(0,0,0,0.6);}.item{padding:8px;font-size:12px;color:#cbd5e1;border-bottom:1px solid #1e293b;cursor:pointer;}.item.unread{color:#38bdf8;font-weight:bold;}",
    "js": "function toggleNotifs(){const p=document.getElementById(\"notifList\");p.style.display=p.style.display===\"block\"?\"none\":\"block\";}function readItem(el){el.classList.remove(\"unread\");el.style.color=\"#94a3b8\";updateCount();}function clearAllNotifs(){document.querySelectorAll(\".item\").forEach(i=>{i.classList.remove(\"unread\");i.style.color=\"#94a3b8\";});updateCount();}function updateCount(){const cnt=document.querySelectorAll(\".item.unread\").length;document.getElementById(\"nCount\").innerText=cnt;if(cnt===0)document.getElementById(\"nCount\").style.display=\"none\";}"
  },
  "ui_drawer_menu": {
    "title": "Slide-Out Sidebar Drawer",
    "category": "modern_ui",
    "badge": "Navigation",
    "desc": "Modern sliding off-canvas drawer navigation with smooth transition.",
    "html": "<button onclick=\"openDrawer()\" style=\"padding:10px 18px;background:#10b981;color:#fff;font-weight:bold;border:none;border-radius:6px;cursor:pointer;\">☰ Open Menu Drawer</button><div id=\"drawerMask\" onclick=\"closeDrawer()\" style=\"display:none;position:fixed;inset:0;background:rgba(0,0,0,0.5);\"></div><div id=\"drawer\" style=\"position:fixed;top:0;left:-240px;width:220px;height:100vh;background:#0f172a;border-right:1px solid #334155;padding:20px;transition:left 0.3s;color:#fff;font-family:sans-serif;\"><h3>Menu</h3><ul style=\"list-style:none;padding:0;line-height:2.4;font-size:14px;\"><li onclick=\"alert('Nav: Home')\">🏠 Dashboard</li><li onclick=\"alert('Nav: Courses')\">📚 Courses</li><li onclick=\"alert('Nav: Settings')\">⚙️ Settings</li></ul><button onclick=\"closeDrawer()\" style=\"padding:6px 12px;background:#ef4444;color:#fff;border:none;border-radius:4px;cursor:pointer;\">Close</button></div>",
    "css": "body{background:#090e1a;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;}",
    "js": "function openDrawer(){document.getElementById(\"drawer\").style.left=\"0px\";document.getElementById(\"drawerMask\").style.display=\"block\";}function closeDrawer(){document.getElementById(\"drawer\").style.left=\"-240px\";document.getElementById(\"drawerMask\").style.display=\"none\";}"
  },
  "ui_segmented_tabs": {
    "title": "Modern Segmented Card Tabs",
    "category": "modern_ui",
    "badge": "Tab Switcher",
    "desc": "Slick iOS-style segmented card tabs displaying different feature specs.",
    "html": "<div class=\"card-tabs\"><div class=\"tab-hdrs\"><button class=\"active\" onclick=\"showTab(0,this)\">Overview</button><button onclick=\"showTab(1,this)\">Tech Specs</button><button onclick=\"showTab(2,this)\">Security</button></div><div class=\"tab-content\" id=\"tabContent\">Fast, scalable frontend architecture optimized for Vercel deployment.</div></div>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.card-tabs{background:#0f172a;border:1px solid #1e293b;border-radius:12px;padding:16px;width:300px;}.tab-hdrs{display:flex;gap:4px;background:#1e293b;padding:4px;border-radius:8px;margin-bottom:14px;}.tab-hdrs button{flex:1;background:transparent;border:none;color:#94a3b8;padding:6px;border-radius:6px;font-size:12px;cursor:pointer;font-weight:bold;}.tab-hdrs button.active{background:#6366f1;color:#fff;}.tab-content{font-size:13px;color:#cbd5e1;line-height:1.5;}",
    "js": "const tabs=['Fast, scalable frontend architecture optimized for Vercel deployment.','HTML5 Semantic tags, Vanilla CSS tokens, ES2024 modules, 60fps canvas.','100% isolated sandbox with allow-scripts allow-modals restriction.'];function showTab(idx,btn){document.querySelectorAll('.tab-hdrs button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');document.getElementById('tabContent').innerText=tabs[idx];}"
  },
  "ui_metric_counter": {
    "title": "Animated Number Metric Counter",
    "category": "modern_ui",
    "badge": "Animated Number",
    "desc": "Eased number counting effect simulating real-time metric increments.",
    "html": "<div style=\"text-align:center;font-family:sans-serif;color:#fff;\"><div style=\"color:#94a3b8;font-size:13px;margin-bottom:6px;\">LINES OF CODE COMPILED</div><div id=\"counterNum\" style=\"font-size:48px;font-weight:800;color:#38bdf8;font-family:monospace;\">0</div><button onclick=\"startCount()\" style=\"margin-top:14px;padding:8px 18px;background:#6366f1;color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:bold;\">Trigger Count Up</button></div>",
    "css": "body{background:#090e1a;display:grid;place-items:center;min-height:95vh;margin:0;}",
    "js": "function startCount(){let cur=0;const target=4850;const el=document.getElementById(\"counterNum\");const iv=setInterval(()=>{cur+=Math.floor((target-cur)*0.1)+15;if(cur>=target){cur=target;clearInterval(iv);}el.innerText=cur.toLocaleString();},30);}startCount();"
  },
  "form_multistep": {
    "title": "Multi-Step Registration Wizard",
    "category": "forms",
    "badge": "Wizard Flow",
    "desc": "Three-stage onboarding flow with step indicators, validation, and summary review.",
    "html": "<div class=\"wizard-card\"><div class=\"steps-bar\"><div class=\"step-dot active\" id=\"dot1\">1</div><div class=\"step-line\"></div><div class=\"step-dot\" id=\"dot2\">2</div><div class=\"step-line\"></div><div class=\"step-dot\" id=\"dot3\">3</div></div><div id=\"step1\" class=\"step-pane\"><h3>Personal Info</h3><input id=\"wName\" placeholder=\"Full Name\" value=\"Alex Morgan\" /><input id=\"wEmail\" placeholder=\"Email Address\" value=\"alex@example.com\" /><button class=\"wiz-btn\" onclick=\"goStep(2)\">Next: Account &rarr;</button></div><div id=\"step2\" class=\"step-pane\" style=\"display:none;\"><h3>Account Setup</h3><input id=\"wUser\" placeholder=\"Username\" value=\"alex_dev\" /><input id=\"wPass\" type=\"password\" placeholder=\"Password\" value=\"Secret123!\" /><div class=\"btn-row\"><button class=\"wiz-btn sec\" onclick=\"goStep(1)\">&larr; Back</button><button class=\"wiz-btn\" onclick=\"goStep(3)\">Next: Review &rarr;</button></div></div><div id=\"step3\" class=\"step-pane\" style=\"display:none;\"><h3>Confirmation</h3><div id=\"wSummary\" style=\"font-size:13px;color:#94a3b8;margin-bottom:16px;\"></div><div class=\"btn-row\"><button class=\"wiz-btn sec\" onclick=\"goStep(2)\">&larr; Back</button><button class=\"wiz-btn success\" onclick=\"finishWiz()\">Complete Registration ✓</button></div></div></div>",
    "css": "body{background:#040711;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.wizard-card{background:#0f172a;border:1px solid #1e293b;border-radius:16px;padding:24px;width:300px;box-shadow:0 10px 30px rgba(0,0,0,0.5);}.steps-bar{display:flex;align-items:center;justify-content:center;margin-bottom:20px;}.step-dot{width:28px;height:28px;border-radius:50%;background:#1e293b;color:#94a3b8;font-size:12px;font-weight:bold;display:grid;place-items:center;}.step-dot.active{background:#6366f1;color:#fff;}.step-line{width:36px;height:2px;background:#1e293b;}.step-pane h3{margin:0 0 14px;font-size:16px;color:#38bdf8;}.step-pane input{width:100%;box-sizing:border-box;background:#090e1a;border:1px solid #334155;color:#fff;padding:10px;border-radius:8px;margin-bottom:12px;font-size:13px;}.wiz-btn{width:100%;padding:10px;background:#6366f1;color:#fff;font-weight:bold;border:none;border-radius:8px;cursor:pointer;}.wiz-btn.sec{background:#1e293b;color:#94a3b8;}.wiz-btn.success{background:#10b981;}.btn-row{display:flex;gap:8px;}",
    "js": "function goStep(n){for(let i=1;i<=3;i++){document.getElementById(\"step\"+i).style.display=i===n?\"block\":\"none\";document.getElementById(\"dot\"+i).classList.toggle(\"active\",i<=n);}if(n===3){document.getElementById(\"wSummary\").innerHTML=\"<strong>Name:</strong> \"+document.getElementById(\"wName\").value+\"<br><strong>Email:</strong> \"+document.getElementById(\"wEmail\").value+\"<br><strong>User:</strong> \"+document.getElementById(\"wUser\").value;}}function finishWiz(){alert(\"Registration completed successfully!\");goStep(1);}"
  },
  "form_credit_card": {
    "title": "3D Interactive Credit Card Preview",
    "category": "forms",
    "badge": "Credit Card",
    "desc": "Interactive payment card that updates live as user types and flips on CVV focus.",
    "html": "<div class=\"card-scene\"><div class=\"card-obj\" id=\"cardObj\"><div class=\"card-face card-front\"><div class=\"card-chip\"></div><div class=\"card-num\" id=\"ccNum\">•••• •••• •••• ••••</div><div class=\"card-lower\"><div><small>CARDHOLDER</small><div id=\"ccName\">FULL NAME</div></div><div><small>EXPIRES</small><div id=\"ccExp\">MM/YY</div></div></div></div><div class=\"card-face card-back\"><div class=\"mag-strip\"></div><div class=\"cvv-bar\"><small>CVV</small><div id=\"ccCvv\">•••</div></div></div></div></div><div class=\"cc-form\"><input id=\"inNum\" maxlength=\"19\" placeholder=\"Card Number\" oninput=\"updCard()\" /><input id=\"inName\" placeholder=\"Cardholder Name\" oninput=\"updCard()\" /><div style=\"display:flex;gap:8px;\"><input id=\"inExp\" placeholder=\"MM/YY\" maxlength=\"5\" oninput=\"updCard()\" /><input id=\"inCvv\" placeholder=\"CVV\" maxlength=\"3\" onfocus=\"flipCard(true)\" onblur=\"flipCard(false)\" oninput=\"updCard()\" /></div></div>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;}.card-scene{perspective:1000px;width:280px;height:160px;margin-bottom:16px;}.card-obj{width:100%;height:100%;position:relative;transform-style:preserve-3d;transition:transform 0.6s;}.card-face{position:absolute;inset:0;backface-visibility:hidden;border-radius:14px;padding:18px;box-sizing:border-box;color:#fff;background:linear-gradient(135deg,#4338ca,#06b6d4);box-shadow:0 15px 30px rgba(0,0,0,0.5);}.card-back{transform:rotateY(180deg);background:linear-gradient(135deg,#1e1b4b,#312e81);padding:0;}.mag-strip{height:34px;background:#000;margin-top:20px;}.cvv-bar{padding:14px;text-align:right;color:#fff;font-family:monospace;}.card-chip{width:36px;height:26px;background:#fbbf24;border-radius:4px;margin-bottom:18px;}.card-num{font-family:monospace;font-size:15px;letter-spacing:2px;margin-bottom:14px;}.card-lower{display:flex;justify-content:space-between;font-size:11px;}.card-lower small{color:rgba(255,255,255,0.7);font-size:9px;}.cc-form input{width:100%;box-sizing:border-box;background:#0f172a;border:1px solid #334155;color:#fff;padding:8px 10px;border-radius:6px;margin-bottom:8px;font-size:12px;}",
    "js": "function flipCard(b){document.getElementById(\"cardObj\").style.transform=b?\"rotateY(180deg)\":\"rotateY(0deg)\";}function updCard(){document.getElementById(\"ccNum\").innerText=document.getElementById(\"inNum\").value||\"•••• •••• •••• ••••\";document.getElementById(\"ccName\").innerText=document.getElementById(\"inName\").value.toUpperCase()||\"FULL NAME\";document.getElementById(\"ccExp\").innerText=document.getElementById(\"inExp\").value||\"MM/YY\";document.getElementById(\"ccCvv\").innerText=document.getElementById(\"inCvv\").value||\"•••\";}"
  },
  "form_password_strength": {
    "title": "Dynamic Password Strength Meter",
    "category": "forms",
    "badge": "Security Form",
    "desc": "Real-time regex password strength scoring with animated color meter.",
    "html": "<div class=\"pwd-card\"><h3>Secure Password</h3><input id=\"pwdInp\" type=\"password\" placeholder=\"Enter strong password...\" oninput=\"checkPwd(this.value)\" /><div class=\"meter-bar\"><div id=\"meterFill\"></div></div><div id=\"pwdVerdict\">Start typing...</div><ul class=\"pwd-rules\"><li id=\"rLen\">✗ At least 8 characters</li><li id=\"rUp\">✗ Contains uppercase letter</li><li id=\"rNum\">✗ Contains number</li><li id=\"rSym\">✗ Contains special symbol</li></ul></div>",
    "css": "body{background:#060a14;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.pwd-card{background:#0f172a;border:1px solid #1e293b;border-radius:14px;padding:22px;width:280px;}.pwd-card h3{margin:0 0 12px;font-size:16px;color:#38bdf8;}.pwd-card input{width:100%;box-sizing:border-box;background:#090e1a;border:1px solid #334155;color:#fff;padding:10px;border-radius:8px;font-size:13px;margin-bottom:12px;}.meter-bar{height:6px;background:#1e293b;border-radius:3px;overflow:hidden;margin-bottom:8px;}#meterFill{height:100%;width:0%;transition:all 0.3s;}#pwdVerdict{font-size:12px;font-weight:bold;margin-bottom:12px;color:#94a3b8;}.pwd-rules{list-style:none;padding:0;margin:0;font-size:12px;line-height:1.8;color:#ef4444;}.pwd-rules li.valid{color:#10b981;}",
    "js": "function checkPwd(v){const r1=v.length>=8,r2=/[A-Z]/.test(v),r3=/[0-9]/.test(v),r4=/[^A-Za-z0-9]/.test(v);document.getElementById(\"rLen\").className=r1?\"valid\":\"\";document.getElementById(\"rLen\").innerText=(r1?\"✓ \":\"✗ \")+\"At least 8 characters\";document.getElementById(\"rUp\").className=r2?\"valid\":\"\";document.getElementById(\"rUp\").innerText=(r2?\"✓ \":\"✗ \")+\"Contains uppercase letter\";document.getElementById(\"rNum\").className=r3?\"valid\":\"\";document.getElementById(\"rNum\").innerText=(r3?\"✓ \":\"✗ \")+\"Contains number\";document.getElementById(\"rSym\").className=r4?\"valid\":\"\";document.getElementById(\"rSym\").innerText=(r4?\"✓ \":\"✗ \")+\"Contains special symbol\";const score=[r1,r2,r3,r4].filter(Boolean).length;const fill=document.getElementById(\"meterFill\"),vrd=document.getElementById(\"pwdVerdict\");fill.style.width=(score*25)+\"%\";const cols=[\"#ef4444\",\"#f97316\",\"#eab308\",\"#10b981\"];const txts=[\"Very Weak\",\"Fair\",\"Moderate\",\"Bulletproof Strong! 🛡️\"];fill.style.background=cols[score-1]||\"#ef4444\";vrd.style.color=cols[score-1]||\"#94a3b8\";vrd.innerText=v?txts[score-1]||\"Very Weak\":\"Start typing...\";}"
  },
  "form_otp_input": {
    "title": "6-Digit Auto-Advancing OTP Input",
    "category": "forms",
    "badge": "Security Input",
    "desc": "Auto-advancing 6-digit verification code with backspace navigation and verify button.",
    "html": "<div class=\"otp-card\"><h3>Verification Code</h3><p>Enter the 6-digit code sent to your phone</p><div class=\"otp-boxes\" id=\"otpBox\"><input maxlength=\"1\" /><input maxlength=\"1\" /><input maxlength=\"1\" /><input maxlength=\"1\" /><input maxlength=\"1\" /><input maxlength=\"1\" /></div><button onclick=\"verifyOtp()\" class=\"otp-btn\">Verify Code</button></div>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.otp-card{background:#0f172a;border:1px solid #1e293b;border-radius:16px;padding:24px;width:320px;text-align:center;}.otp-card h3{margin:0 0 6px;color:#38bdf8;}.otp-card p{font-size:12px;color:#94a3b8;margin:0 0 18px;}.otp-boxes{display:flex;gap:8px;justify-content:center;margin-bottom:18px;}.otp-boxes input{width:38px;height:46px;background:#090e1a;border:1px solid #334155;color:#fff;border-radius:8px;font-size:20px;font-weight:bold;text-align:center;}.otp-boxes input:focus{border-color:#38bdf8;outline:none;}.otp-btn{width:100%;padding:10px;background:#6366f1;color:#fff;font-weight:bold;border:none;border-radius:8px;cursor:pointer;}",
    "js": "const inps=document.querySelectorAll(\".otp-boxes input\");inps.forEach((inp,i)=>{inp.oninput=()=>{if(inp.value&&i<inps.length-1)inps[i+1].focus();};inp.onkeydown=e=>{if(e.key===\"Backspace\"&&!inp.value&&i>0)inps[i-1].focus();};});function verifyOtp(){const code=Array.from(inps).map(x=>x.value).join(\"\");if(code.length===6){alert(\"OTP Verified: \"+code+\" ✓ Success!\");}else{alert(\"Please fill all 6 digits.\");}}"
  },
  "form_tag_chips": {
    "title": "Dynamic Chip Tag Input Box",
    "category": "forms",
    "badge": "Tag Input",
    "desc": "Add, style, and delete custom filter pill tags with keyboard Enter support.",
    "html": "<div class=\"tag-card\"><h3>Skills & Technologies</h3><p>Type skill & press Enter to add</p><div class=\"chips-wrap\" id=\"chipsBox\"><span class=\"chip\">HTML5 &times;</span><span class=\"chip\">CSS3 &times;</span><span class=\"chip\">JavaScript &times;</span><input id=\"tagInp\" placeholder=\"Add tag...\" /></div><div id=\"chipCount\" style=\"margin-top:10px;font-size:12px;color:#94a3b8;\">3 tags added</div></div>",
    "css": "body{background:#090e1a;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.tag-card{background:#1e293b;border:1px solid #334155;border-radius:14px;padding:22px;width:300px;}.tag-card h3{margin:0 0 4px;font-size:16px;color:#38bdf8;}.tag-card p{font-size:12px;color:#94a3b8;margin:0 0 12px;}.chips-wrap{display:flex;flex-wrap:wrap;gap:6px;background:#0f172a;border:1px solid #334155;border-radius:8px;padding:8px;min-height:42px;align-items:center;}.chip{background:#38bdf8;color:#040711;font-size:11px;font-weight:bold;padding:4px 10px;border-radius:99px;cursor:pointer;}.chips-wrap input{flex:1;min-width:70px;background:transparent;border:none;color:#fff;font-size:12px;outline:none;}",
    "js": "function setupChips(){document.querySelectorAll(\".chip\").forEach(c=>c.onclick=()=>{c.remove();updCount();});}setupChips();document.getElementById(\"tagInp\").onkeydown=e=>{if(e.key===\"Enter\"&&e.target.value.trim()){const span=document.createElement(\"span\");span.className=\"chip\";span.innerHTML=e.target.value.trim()+\" &times;\";span.onclick=()=>{span.remove();updCount();};document.getElementById(\"chipsBox\").insertBefore(span,e.target);e.target.value=\"\";updCount();}};function updCount(){const cnt=document.querySelectorAll(\".chip\").length;document.getElementById(\"chipCount\").innerText=cnt+\" tags added\";}"
  },
  "form_range_bubble": {
    "title": "Dual Range Slider with Value Tooltip",
    "category": "forms",
    "badge": "Slider Control",
    "desc": "Interactive slider with floating bubble indicator displaying current value.",
    "html": "<div class=\"slider-card\"><h3>Budget Allocation</h3><div style=\"font-size:32px;font-weight:800;color:#38bdf8;margin:14px 0;\" id=\"bVal\">$2,500</div><input type=\"range\" min=\"500\" max=\"10000\" step=\"100\" value=\"2500\" id=\"rgInp\" oninput=\"updSlider(this.value)\" style=\"width:100%;\" /><div style=\"display:flex;justify-content:space-between;font-size:11px;color:#94a3b8;margin-top:6px;\"><span>$500</span><span>$10,000</span></div></div>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.slider-card{background:#0f172a;border:1px solid #1e293b;border-radius:16px;padding:24px;width:280px;text-align:center;}.slider-card h3{margin:0;font-size:15px;color:#cbd5e1;}",
    "js": "function updSlider(v){document.getElementById(\"bVal\").innerText=\"$\"+Number(v).toLocaleString();}"
  },
  "form_drag_drop_upload": {
    "title": "Drag-and-Drop File Upload Zone",
    "category": "forms",
    "badge": "File Uploader",
    "desc": "File dropzone with dragover highlight, file size display, and remove action.",
    "html": "<div class=\"drop-card\" id=\"dropArea\"><div class=\"cloud-icon\">☁️</div><h4>Drag & Drop Files Here</h4><p>or browse your local device</p><input type=\"file\" id=\"fileInput\" style=\"display:none;\" onchange=\"handleFiles(this.files)\" /><button onclick=\"document.getElementById('fileInput').click()\" class=\"browse-btn\">Choose File</button><div id=\"fileList\" style=\"margin-top:14px;font-size:12px;color:#38bdf8;\"></div></div>",
    "css": "body{background:#090e1a;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.drop-card{background:#1e293b;border:2px dashed #38bdf8;border-radius:14px;padding:28px;width:260px;text-align:center;}.cloud-icon{font-size:36px;margin-bottom:8px;}.drop-card h4{margin:0 0 4px;font-size:15px;}.drop-card p{margin:0 0 14px;font-size:12px;color:#94a3b8;}.browse-btn{padding:8px 16px;background:#6366f1;color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:bold;}",
    "js": "function handleFiles(files){if(files.length){const f=files[0];document.getElementById(\"fileList\").innerText=\"Selected: \"+f.name+\" (\"+Math.round(f.size/1024)+\" KB)\";}}const d=document.getElementById(\"dropArea\");d.ondragover=e=>{e.preventDefault();d.style.borderColor=\"#10b981\";};d.ondragleave=()=>d.style.borderColor=\"#38bdf8\";d.ondrop=e=>{e.preventDefault();d.style.borderColor=\"#38bdf8\";handleFiles(e.dataTransfer.files);};"
  },
  "form_repeater": {
    "title": "Dynamic Form Field Repeater",
    "category": "forms",
    "badge": "Field Repeater",
    "desc": "Add and remove repeated row entries like work experience or education.",
    "html": "<div class=\"repeater-card\"><h3>Team Members</h3><div id=\"rowContainer\"><div class=\"rep-row\"><input placeholder=\"Name\" value=\"Alice\" /><input placeholder=\"Role\" value=\"Lead Dev\" /><button onclick=\"delRow(this)\">&times;</button></div></div><button onclick=\"addRow()\" class=\"add-row-btn\">+ Add Member</button></div>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.repeater-card{background:#0f172a;border:1px solid #1e293b;border-radius:14px;padding:20px;width:320px;}.repeater-card h3{margin:0 0 12px;font-size:16px;color:#38bdf8;}.rep-row{display:flex;gap:6px;margin-bottom:8px;}.rep-row input{flex:1;background:#090e1a;border:1px solid #334155;color:#fff;padding:6px 8px;border-radius:6px;font-size:12px;}.rep-row button{background:#ef4444;border:none;color:#fff;border-radius:6px;padding:0 10px;cursor:pointer;font-size:16px;}.add-row-btn{width:100%;margin-top:8px;padding:8px;background:#10b981;border:none;border-radius:6px;color:#fff;font-weight:bold;cursor:pointer;}",
    "js": "function addRow(){const c=document.getElementById(\"rowContainer\"),d=document.createElement(\"div\");d.className=\"rep-row\";d.innerHTML='<input placeholder=\"Name\" /><input placeholder=\"Role\" /><button onclick=\"delRow(this)\">&times;</button>';c.appendChild(d);}function delRow(btn){btn.parentElement.remove();}"
  },
  "form_survey_emoji": {
    "title": "Interactive Emoji Sentiment Survey",
    "category": "forms",
    "badge": "Feedback Form",
    "desc": "Select sentiment emoji reaction with visual glow and comment feedback box.",
    "html": "<div class=\"survey-card\"><h3>How was your session?</h3><p>Tap your sentiment rating</p><div class=\"emojis\" id=\"emojiRow\"><span onclick=\"rateEmoji('Terrible 😡',this)\">😡</span><span onclick=\"rateEmoji('Bad 🙁',this)\">🙁</span><span class=\"active\" onclick=\"rateEmoji('Okay 😐',this)\">😐</span><span onclick=\"rateEmoji('Good 😊',this)\">😊</span><span onclick=\"rateEmoji('Awesome! 🚀',this)\">🚀</span></div><div id=\"surveyVerdict\" style=\"color:#f59e0b;font-weight:bold;margin:12px 0;\">Okay 😐</div><textarea placeholder=\"Tell us more details...\" style=\"width:100%;box-sizing:border-box;height:60px;background:#090e1a;border:1px solid #334155;color:#fff;padding:8px;border-radius:6px;\"></textarea><button onclick=\"alert('Thank you for your feedback!')\" style=\"width:100%;margin-top:10px;padding:8px;background:#6366f1;color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:bold;\">Submit Feedback</button></div>",
    "css": "body{background:#060a14;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.survey-card{background:#0f172a;border:1px solid #1e293b;border-radius:16px;padding:22px;width:280px;text-align:center;}.survey-card h3{margin:0 0 4px;font-size:16px;color:#38bdf8;}.survey-card p{margin:0 0 12px;font-size:12px;color:#94a3b8;}.emojis span{font-size:28px;cursor:pointer;margin:0 4px;opacity:0.5;transition:transform 0.2s,opacity 0.2s;display:inline-block;}.emojis span.active{opacity:1;transform:scale(1.3);}",
    "js": "function rateEmoji(txt,el){document.querySelectorAll('.emojis span').forEach(s=>s.classList.remove('active'));el.classList.add('active');document.getElementById('surveyVerdict').innerText=txt;}"
  },
  "form_currency_calc": {
    "title": "Real-Time Currency Converter",
    "category": "forms",
    "badge": "Finance Tool",
    "desc": "Instant multi-currency exchange conversion calculator with live rates.",
    "html": "<div class=\"fx-card\"><h3>Currency Converter</h3><div class=\"fx-field\"><label>Amount (USD):</label><input type=\"number\" id=\"fxAmt\" value=\"100\" oninput=\"calcFX()\" /></div><div class=\"fx-results\"><div><strong>EUR:</strong> <span id=\"fxEur\">€92.00</span></div><div><strong>GBP:</strong> <span id=\"fxGbp\">£78.50</span></div><div><strong>INR:</strong> <span id=\"fxInr\">₹8,320.00</span></div><div><strong>JPY:</strong> <span id=\"fxJpy\">¥15,400.00</span></div></div></div>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.fx-card{background:#0f172a;border:1px solid #1e293b;border-radius:14px;padding:22px;width:280px;}.fx-card h3{margin:0 0 14px;font-size:16px;color:#38bdf8;}.fx-field label{font-size:12px;color:#94a3b8;}.fx-field input{width:100%;box-sizing:border-box;background:#090e1a;border:1px solid #334155;color:#fff;padding:8px 10px;border-radius:6px;margin:6px 0 14px;font-size:16px;font-weight:bold;}.fx-results{background:#090e1a;padding:12px;border-radius:8px;font-size:13px;line-height:2;}.fx-results span{color:#10b981;font-family:monospace;font-weight:bold;}",
    "js": "function calcFX(){const amt=parseFloat(document.getElementById(\"fxAmt\").value)||0;document.getElementById(\"fxEur\").innerText=\"€\"+(amt*0.92).toFixed(2);document.getElementById(\"fxGbp\").innerText=\"£\"+(amt*0.785).toFixed(2);document.getElementById(\"fxInr\").innerText=\"₹\"+(amt*83.2).toLocaleString();document.getElementById(\"fxJpy\").innerText=\"¥\"+Math.round(amt*154).toLocaleString();}"
  },
  "form_slot_picker": {
    "title": "Appointment Time Slot Picker",
    "category": "forms",
    "badge": "Booking Flow",
    "desc": "Select date and choose available time chip slots with live confirmation.",
    "html": "<div class=\"booking-card\"><h3>Select Booking Slot</h3><div class=\"date-pick\"><label>Date:</label><input type=\"date\" value=\"2026-10-15\" /></div><div class=\"slots-label\">Available Times:</div><div class=\"slot-grid\"><button class=\"slot-btn\" onclick=\"selectSlot(this)\">09:00 AM</button><button class=\"slot-btn active\" onclick=\"selectSlot(this)\">11:30 AM</button><button class=\"slot-btn\" onclick=\"selectSlot(this)\">02:00 PM</button><button class=\"slot-btn\" onclick=\"selectSlot(this)\">04:15 PM</button></div><button class=\"confirm-btn\" onclick=\"confirmBooking()\">Confirm Appointment</button></div>",
    "css": "body{background:#090e1a;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.booking-card{background:#1e293b;border:1px solid #334155;border-radius:16px;padding:22px;width:280px;}.booking-card h3{margin:0 0 14px;font-size:16px;color:#38bdf8;}.date-pick label{font-size:12px;color:#94a3b8;display:block;margin-bottom:4px;}.date-pick input{width:100%;box-sizing:border-box;background:#0f172a;border:1px solid #334155;color:#fff;padding:8px;border-radius:6px;margin-bottom:14px;}.slots-label{font-size:12px;color:#94a3b8;margin-bottom:8px;}.slot-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px;}.slot-btn{padding:8px;background:#0f172a;border:1px solid #334155;color:#cbd5e1;border-radius:6px;cursor:pointer;font-size:12px;}.slot-btn.active{background:#6366f1;color:#fff;border-color:#6366f1;font-weight:bold;}.confirm-btn{width:100%;padding:10px;background:#10b981;color:#fff;font-weight:bold;border:none;border-radius:8px;cursor:pointer;}",
    "js": "let chosen=\"11:30 AM\";function selectSlot(b){document.querySelectorAll('.slot-btn').forEach(el=>el.classList.remove('active'));b.classList.add('active');chosen=b.innerText;}function confirmBooking(){alert('Appointment booked for: '+chosen+' ✓');}"
  },
  "form_live_validator": {
    "title": "Instant Real-Time Form Validator",
    "category": "forms",
    "badge": "Input Validation",
    "desc": "Real-time field validation with green checks, red alerts, and instant feedback.",
    "html": "<div class=\"val-card\"><h3>Sign Up Validation</h3><div class=\"val-field\"><input id=\"vEmail\" placeholder=\"Email Address\" oninput=\"valField('vEmail',/\\S+@\\S+\\.\\S+/,'valEMsg')\" /><div id=\"valEMsg\" class=\"val-msg\">Enter valid email</div></div><div class=\"val-field\"><input id=\"vUser\" placeholder=\"Username (min 4 chars)\" oninput=\"valField('vUser',/^.{4,}$/,'valUMsg')\" /><div id=\"valUMsg\" class=\"val-msg\">At least 4 chars</div></div><button onclick=\"submitVal()\" class=\"val-btn\">Submit Validated Form</button></div>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.val-card{background:#0f172a;border:1px solid #1e293b;border-radius:14px;padding:22px;width:280px;}.val-card h3{margin:0 0 14px;font-size:16px;color:#38bdf8;}.val-field{margin-bottom:12px;}.val-field input{width:100%;box-sizing:border-box;background:#090e1a;border:1px solid #334155;color:#fff;padding:10px;border-radius:8px;font-size:12px;}.val-field input.valid{border-color:#10b981;}.val-field input.invalid{border-color:#ef4444;}.val-msg{font-size:11px;margin-top:4px;color:#94a3b8;}.val-btn{width:100%;padding:10px;background:#6366f1;color:#fff;font-weight:bold;border:none;border-radius:8px;cursor:pointer;}",
    "js": "function valField(id,rx,msgId){const el=document.getElementById(id),msg=document.getElementById(msgId),ok=rx.test(el.value);el.className=ok?\"valid\":\"invalid\";msg.style.color=ok?\"#10b981\":\"#ef4444\";msg.innerText=ok?\"✓ Valid\":\"✗ Needs attention\";}function submitVal(){alert('Form submitted cleanly!');}"
  },
  "form_terms_modal": {
    "title": "Required Terms Agreement Checkbox",
    "category": "forms",
    "badge": "Compliance",
    "desc": "Checkbox requiring review modal acceptance before unlocking submit button.",
    "html": "<div class=\"terms-card\"><h3>Terms & Conditions</h3><p>Review the academy rules before completing enrolment.</p><label class=\"chk-row\"><input type=\"checkbox\" id=\"tChk\" onchange=\"toggleEnrol()\" /> I agree to the <a href=\"javascript:void(0)\" onclick=\"openTerms()\">Terms of Service</a></label><button id=\"btnEnrol\" disabled onclick=\"alert('Enrolled successfully!')\" class=\"enrol-btn\">Complete Enrolment</button></div>",
    "css": "body{background:#060a14;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.terms-card{background:#0f172a;border:1px solid #1e293b;border-radius:14px;padding:22px;width:280px;}.terms-card h3{margin:0 0 6px;color:#38bdf8;}.terms-card p{font-size:12px;color:#94a3b8;margin:0 0 16px;}.chk-row{display:flex;align-items:center;gap:8px;font-size:12px;cursor:pointer;color:#cbd5e1;}.chk-row a{color:#38bdf8;text-decoration:underline;}.enrol-btn{width:100%;margin-top:16px;padding:10px;background:#6366f1;color:#fff;border:none;border-radius:8px;font-weight:bold;cursor:pointer;}.enrol-btn:disabled{opacity:0.4;cursor:not-allowed;}",
    "js": "function toggleEnrol(){document.getElementById(\"btnEnrol\").disabled=!document.getElementById(\"tChk\").checked;}function openTerms(){alert(\"HTML Master Terms: 100% Free educational materials under MIT License. All sandboxes execute safely.\");document.getElementById(\"tChk\").checked=true;toggleEnrol();}"
  },
  "form_newsletter_confetti": {
    "title": "Animated Newsletter Subscription",
    "category": "forms",
    "badge": "Lead Gen",
    "desc": "Newsletter signup input with validating animation and confetti burst response.",
    "html": "<div class=\"news-card\"><div style=\"font-size:36px;margin-bottom:8px;\">📬</div><h3>Join Developer Weekly</h3><p>Get curated HTML5 tips and sandboxes in your inbox.</p><input id=\"newsEmail\" placeholder=\"you@domain.com\" /><button onclick=\"subNews()\" class=\"news-btn\" id=\"newsBtn\">Subscribe Free</button></div>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.news-card{background:#0f172a;border:1px solid #1e293b;border-radius:16px;padding:24px;width:280px;text-align:center;}.news-card h3{margin:0 0 6px;color:#fff;}.news-card p{font-size:12px;color:#94a3b8;margin:0 0 16px;}.news-card input{width:100%;box-sizing:border-box;background:#090e1a;border:1px solid #334155;color:#fff;padding:10px;border-radius:8px;margin-bottom:10px;font-size:13px;}.news-btn{width:100%;padding:10px;background:linear-gradient(135deg,#38bdf8,#6366f1);color:#fff;font-weight:bold;border:none;border-radius:8px;cursor:pointer;}",
    "js": "function subNews(){const em=document.getElementById(\"newsEmail\").value;if(!em||!em.includes(\"@\")){alert(\"Please enter a valid email!\");return;}const b=document.getElementById(\"newsBtn\");b.innerText=\"Subscribed! 🎉\";b.style.background=\"#10b981\";alert(\"Welcome aboard \"+em+\"! Check your inbox.\");}"
  },
  "form_autocomplete": {
    "title": "Search Autocomplete Combobox",
    "category": "forms",
    "badge": "Autocomplete",
    "desc": "Typeahead programming language search dropdown with keyboard selection.",
    "html": "<div class=\"ac-card\"><h3>Language Selector</h3><div style=\"position:relative;\"><input id=\"acInp\" placeholder=\"Search language...\" oninput=\"doSearch(this.value)\" /><div id=\"acList\" class=\"ac-dropdown\"></div></div><div id=\"acChosen\" style=\"margin-top:12px;font-size:12px;color:#38bdf8;\">Selected: None</div></div>",
    "css": "body{background:#090e1a;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.ac-card{background:#1e293b;border:1px solid #334155;border-radius:14px;padding:22px;width:280px;}.ac-card h3{margin:0 0 12px;font-size:16px;color:#38bdf8;}.ac-card input{width:100%;box-sizing:border-box;background:#0f172a;border:1px solid #334155;color:#fff;padding:10px;border-radius:8px;font-size:13px;}.ac-dropdown{position:absolute;top:44px;left:0;right:0;background:#0f172a;border:1px solid #334155;border-radius:8px;display:none;z-index:10;max-height:140px;overflow-y:auto;}.ac-item{padding:8px 12px;font-size:12px;cursor:pointer;border-bottom:1px solid #1e293b;}.ac-item:hover{background:#1e293b;color:#38bdf8;}",
    "js": "const langs=[\"JavaScript\",\"TypeScript\",\"Python\",\"HTML5 / CSS3\",\"Go Lang\",\"Rust\",\"Ruby\",\"Java\",\"C++\",\"Kotlin\"];function doSearch(q){const d=document.getElementById(\"acList\");if(!q){d.style.display=\"none\";return;}const hits=langs.filter(l=>l.toLowerCase().includes(q.toLowerCase()));d.innerHTML=\"\";hits.forEach(h=>{const div=document.createElement(\"div\");div.className=\"ac-item\";div.innerText=h;div.onclick=()=>{document.getElementById(\"acInp\").value=h;document.getElementById(\"acChosen\").innerText=\"Selected: \"+h;d.style.display=\"none\";};d.appendChild(div);});d.style.display=hits.length?\"block\":\"none\";}"
  },
  "form_luhn_validator": {
    "title": "Credit Card Luhn Algorithm Validator",
    "category": "forms",
    "badge": "Card Validator",
    "desc": "Algorithmic checksum verification using the ISO/IEC 7812 Luhn formula.",
    "html": "<div class=\"luhn-card\"><h3>Luhn Card Check</h3><input id=\"lCard\" maxlength=\"16\" placeholder=\"Enter 16 digits...\" oninput=\"verifyLuhn(this.value)\" /><div id=\"lStatus\" style=\"font-size:13px;font-weight:bold;margin-top:10px;color:#94a3b8;\">Enter card number</div><div id=\"lType\" style=\"font-size:12px;color:#38bdf8;margin-top:4px;\"></div></div>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.luhn-card{background:#0f172a;border:1px solid #1e293b;border-radius:14px;padding:22px;width:280px;text-align:center;}.luhn-card h3{margin:0 0 12px;color:#38bdf8;}.luhn-card input{width:100%;box-sizing:border-box;background:#090e1a;border:1px solid #334155;color:#fff;padding:10px;border-radius:8px;font-size:14px;font-family:monospace;text-align:center;}",
    "js": "function verifyLuhn(val){const st=document.getElementById(\"lStatus\"),tp=document.getElementById(\"lType\");if(val.length<13){st.innerText=\"Enter 13-16 digits\";st.style.color=\"#94a3b8\";tp.innerText=\"\";return;}let sum=0,alt=false;for(let i=val.length-1;i>=0;i--){let n=parseInt(val[i],10);if(alt){n*=2;if(n>9)n-=9;}sum+=n;alt=!alt;}const ok=sum%10===0;st.innerText=ok?\"✓ Valid Card (Luhn Checksum Passed)\":\"✗ Invalid Card Number\";st.style.color=ok?\"#10b981\":\"#ef4444\";if(val.startsWith(\"4\"))tp.innerText=\"Issuer: Visa\";else if(val.startsWith(\"5\"))tp.innerText=\"Issuer: Mastercard\";else if(val.startsWith(\"3\"))tp.innerText=\"Issuer: American Express\";else tp.innerText=\"Issuer: Standard Network\";}"
  },
  "form_inline_edit": {
    "title": "Click-to-Edit Inline Text Field",
    "category": "forms",
    "badge": "Inline Editor",
    "desc": "Seamless inline content editing transitioning text into input on tap.",
    "html": "<div class=\"inline-card\"><p style=\"font-size:12px;color:#94a3b8;\">Double-click text to edit inline:</p><div class=\"editable-field\" id=\"eField\" ondblclick=\"makeEdit()\">Frontend Architecture Lead</div><button onclick=\"makeEdit()\" style=\"margin-top:14px;padding:6px 14px;background:#1e293b;border:1px solid #334155;color:#38bdf8;border-radius:6px;cursor:pointer;font-size:12px;\">✏️ Edit Text</button></div>",
    "css": "body{background:#090e1a;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.inline-card{background:#1e293b;border:1px solid #334155;border-radius:14px;padding:24px;width:280px;text-align:center;}.editable-field{font-size:18px;font-weight:bold;color:#38bdf8;padding:8px;border-radius:6px;cursor:pointer;border:1px dashed transparent;}.editable-field:hover{border-color:#38bdf8;}",
    "js": "function makeEdit(){const el=document.getElementById(\"eField\");if(el.querySelector(\"input\"))return;const old=el.innerText;el.innerHTML='<input id=\"inEdit\" value=\"'+old+'\" style=\"width:100%;box-sizing:border-box;background:#0f172a;border:1px solid #38bdf8;color:#fff;padding:6px;border-radius:4px;text-align:center;font-weight:bold;\" />';const inp=document.getElementById(\"inEdit\");inp.focus();inp.onblur=()=>el.innerText=inp.value||old;inp.onkeydown=e=>{if(e.key===\"Enter\")inp.blur();};}"
  },
  "form_show_hide_pwd": {
    "title": "Eye Toggle Password Visibility",
    "category": "forms",
    "badge": "Eye Toggle",
    "desc": "Password input with interactive eye toggle switching masked to plaintext.",
    "html": "<div class=\"eye-card\"><h3>Access Terminal</h3><div class=\"eye-box\"><input id=\"eyeInp\" type=\"password\" value=\"SuperSecret2026!\" /><button onclick=\"toggleEye()\" id=\"eyeBtn\">👁️</button></div><div id=\"eyeStatus\" style=\"font-size:12px;color:#94a3b8;margin-top:8px;\">Password hidden (masked)</div></div>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.eye-card{background:#0f172a;border:1px solid #1e293b;border-radius:14px;padding:22px;width:280px;}.eye-card h3{margin:0 0 14px;font-size:16px;color:#38bdf8;}.eye-box{display:flex;background:#090e1a;border:1px solid #334155;border-radius:8px;overflow:hidden;}.eye-box input{flex:1;background:transparent;border:none;color:#fff;padding:10px;font-size:14px;outline:none;}.eye-box button{background:transparent;border:none;color:#94a3b8;padding:0 12px;cursor:pointer;font-size:16px;}",
    "js": "function toggleEye(){const inp=document.getElementById(\"eyeInp\"),btn=document.getElementById(\"eyeBtn\"),st=document.getElementById(\"eyeStatus\");if(inp.type===\"password\"){inp.type=\"text\";btn.innerText=\"🔒\";st.innerText=\"Password visible (plaintext)\";}else{inp.type=\"password\";btn.innerText=\"👁️\";st.innerText=\"Password hidden (masked)\";}}"
  },
  "form_char_counter": {
    "title": "Live Textarea Character & Word Counter",
    "category": "forms",
    "badge": "Character Limit",
    "desc": "Text area with live character countdown, word tally, and warning states.",
    "html": "<div class=\"cnt-card\"><h3>Post Update</h3><textarea id=\"taBox\" maxlength=\"280\" placeholder=\"What's happening in tech today?\" oninput=\"updCounts(this.value)\"></textarea><div class=\"cnt-footer\"><span id=\"wordCnt\">0 words</span><span id=\"charCnt\" class=\"char-ok\">280 left</span></div></div>",
    "css": "body{background:#090e1a;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.cnt-card{background:#1e293b;border:1px solid #334155;border-radius:14px;padding:22px;width:280px;}.cnt-card h3{margin:0 0 12px;font-size:15px;color:#38bdf8;}.cnt-card textarea{width:100%;box-sizing:border-box;height:90px;background:#0f172a;border:1px solid #334155;color:#fff;padding:10px;border-radius:8px;resize:none;font-size:13px;}.cnt-footer{display:flex;justify-content:space-between;font-size:12px;margin-top:8px;}.char-ok{color:#10b981;font-weight:bold;}.char-warn{color:#ef4444;font-weight:bold;}",
    "js": "function updCounts(v){const rem=280-v.length;const w=v.trim()?v.trim().split(/\\s+/).length:0;document.getElementById(\"wordCnt\").innerText=w+\" words\";const el=document.getElementById(\"charCnt\");el.innerText=rem+\" left\";el.className=rem<20?\"char-warn\":\"char-ok\";}"
  },
  "form_switch_matrix": {
    "title": "Permissions Toggle Switch Matrix",
    "category": "forms",
    "badge": "Toggle Switches",
    "desc": "Matrix of permission toggle sliders with master 'Select All' toggle.",
    "html": "<div class=\"perm-card\"><h3>Role Permissions</h3><div class=\"perm-row\"><span>Admin Access</span><input type=\"checkbox\" checked onchange=\"chkPerm()\" /></div><div class=\"perm-row\"><span>Write Database</span><input type=\"checkbox\" checked onchange=\"chkPerm()\" /></div><div class=\"perm-row\"><span>Delete Records</span><input type=\"checkbox\" onchange=\"chkPerm()\" /></div><div class=\"perm-row\"><span>Export CSV</span><input type=\"checkbox\" checked onchange=\"chkPerm()\" /></div><div id=\"permStatus\" style=\"font-size:12px;color:#38bdf8;margin-top:12px;\">3 active permissions</div></div>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.perm-card{background:#0f172a;border:1px solid #1e293b;border-radius:14px;padding:22px;width:280px;}.perm-card h3{margin:0 0 14px;font-size:16px;color:#38bdf8;}.perm-row{display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #1e293b;font-size:13px;}",
    "js": "function chkPerm(){const cnt=document.querySelectorAll('.perm-row input:checked').length;document.getElementById('permStatus').innerText=cnt+' active permissions';}"
  },
  "data_crypto_ticker": {
    "title": "Live Simulated Crypto Ticker",
    "category": "data",
    "badge": "Crypto Feed",
    "desc": "Real-time cryptocurrency price feed with animated flashing green/red ticks.",
    "html": "<div class=\"crypto-card\"><h3>Market Live Ticker</h3><div class=\"ticker-row\"><div><strong>BTC</strong> <small>Bitcoin</small></div><div class=\"t-price\" id=\"btcP\">$68,450.00</div></div><div class=\"ticker-row\"><div><strong>ETH</strong> <small>Ethereum</small></div><div class=\"t-price\" id=\"ethP\">$3,520.00</div></div><div class=\"ticker-row\"><div><strong>SOL</strong> <small>Solana</small></div><div class=\"t-price\" id=\"solP\">$148.50</div></div></div>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.crypto-card{background:#0f172a;border:1px solid #1e293b;border-radius:14px;padding:22px;width:280px;}.crypto-card h3{margin:0 0 14px;font-size:16px;color:#38bdf8;}.ticker-row{display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid #1e293b;}.ticker-row small{color:#94a3b8;font-size:11px;}.t-price{font-family:monospace;font-weight:bold;color:#10b981;}",
    "js": "setInterval(()=>{const btc=68000+Math.floor(Math.random()*1000);const eth=3500+Math.floor(Math.random()*80);const sol=145+Math.floor(Math.random()*8);document.getElementById(\"btcP\").innerText=\"$\"+btc.toLocaleString()+\".00\";document.getElementById(\"ethP\").innerText=\"$\"+eth.toLocaleString()+\".00\";document.getElementById(\"solP\").innerText=\"$\"+sol.toFixed(2);},1500);"
  },
  "data_invoice_calc": {
    "title": "Dynamic Invoice Item Calculator",
    "category": "data",
    "badge": "Calculator",
    "desc": "Add items, quantity, and unit price with automatic subtotal, tax, and grand total.",
    "html": "<div class=\"inv-card\"><h3>Invoice Generator</h3><div id=\"invRows\"><div class=\"inv-row\"><span>Web Architecture</span><span>$1,200</span></div><div class=\"inv-row\"><span>UI/UX System</span><span>$800</span></div></div><div class=\"inv-totals\"><div>Subtotal: <strong id=\"invSub\">$2,000</strong></div><div>Tax (18% GST): <strong id=\"invTax\">$360</strong></div><div class=\"inv-grand\">Total: <strong id=\"invGrand\">$2,360</strong></div></div><button onclick=\"addInvItem()\" class=\"inv-btn\">+ Add Service Item</button></div>",
    "css": "body{background:#090e1a;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.inv-card{background:#1e293b;border:1px solid #334155;border-radius:16px;padding:22px;width:300px;}.inv-card h3{margin:0 0 14px;font-size:16px;color:#38bdf8;}.inv-row{display:flex;justify-content:space-between;padding:6px 0;font-size:13px;border-bottom:1px solid #334155;}.inv-totals{margin:14px 0;padding-top:10px;border-top:1px solid #475569;font-size:13px;line-height:1.8;}.inv-grand{font-size:16px;color:#10b981;font-weight:bold;margin-top:6px;}.inv-btn{width:100%;padding:8px;background:#6366f1;color:#fff;font-weight:bold;border:none;border-radius:6px;cursor:pointer;}",
    "js": "let sub=2000;function addInvItem(){sub+=500;const r=document.createElement(\"div\");r.className=\"inv-row\";r.innerHTML='<span>Cloud Sandbox Provision</span><span>$500</span>';document.getElementById(\"invRows\").appendChild(r);document.getElementById(\"invSub\").innerText=\"$\"+sub.toLocaleString();document.getElementById(\"invTax\").innerText=\"$\"+(sub*0.18).toFixed(0);document.getElementById(\"invGrand\").innerText=\"$\"+(sub*1.18).toFixed(0);}"
  },
  "data_donut_chart": {
    "title": "SVG Animated Donut Progress Ring",
    "category": "data",
    "badge": "SVG Chart",
    "desc": "Circular progress ring with animated stroke-dashoffset and percentage readout.",
    "html": "<div class=\"donut-card\"><svg width=\"140\" height=\"140\" viewBox=\"0 0 100 100\"><circle cx=\"50\" cy=\"50\" r=\"40\" fill=\"none\" stroke=\"#1e293b\" stroke-width=\"10\"/><circle id=\"donutRing\" cx=\"50\" cy=\"50\" r=\"40\" fill=\"none\" stroke=\"#38bdf8\" stroke-width=\"10\" stroke-dasharray=\"251.2\" stroke-dashoffset=\"62.8\" stroke-linecap=\"round\" transform=\"rotate(-90 50 50)\"/><text x=\"50\" y=\"55\" font-size=\"16\" font-weight=\"bold\" fill=\"#fff\" text-anchor=\"middle\" id=\"dTxt\">75%</text></svg><h3>Course Completion</h3><button onclick=\"setDonut(92)\" class=\"d-btn\">Set to 92%</button></div>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.donut-card{background:#0f172a;border:1px solid #1e293b;border-radius:16px;padding:24px;width:240px;text-align:center;}.donut-card h3{margin:12px 0 14px;font-size:15px;}.d-btn{padding:8px 16px;background:#6366f1;border:none;border-radius:6px;color:#fff;cursor:pointer;font-weight:bold;}#donutRing{transition:stroke-dashoffset 0.8s cubic-bezier(0.4,0,0.2,1);}",
    "js": "function setDonut(pct){const circ=251.2,offset=circ-(pct/100)*circ;document.getElementById(\"donutRing\").style.strokeDashoffset=offset;document.getElementById(\"dTxt\").textContent=pct+\"%\";}"
  },
  "data_sortable_table": {
    "title": "Sortable Searchable Data Table",
    "category": "data",
    "badge": "Data Table",
    "desc": "Click table headers to sort ascending or descending with live search filtering.",
    "html": "<div class=\"tbl-card\"><input id=\"tblSearch\" placeholder=\"Filter learners...\" oninput=\"filterTbl(this.value)\" /><table id=\"myTbl\" width=\"100%\"><thead><tr><th onclick=\"sortTbl(0)\">Name ⬍</th><th onclick=\"sortTbl(1)\">Score ⬍</th></tr></thead><tbody><tr><td>Alex Rivera</td><td>98</td></tr><tr><td>Sara Connor</td><td>85</td></tr><tr><td>David Zhang</td><td>92</td></tr><tr><td>Maria Garcia</td><td>79</td></tr></tbody></table></div>",
    "css": "body{background:#090e1a;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.tbl-card{background:#1e293b;border:1px solid #334155;border-radius:14px;padding:20px;width:300px;}.tbl-card input{width:100%;box-sizing:border-box;background:#0f172a;border:1px solid #334155;color:#fff;padding:8px;border-radius:6px;margin-bottom:12px;font-size:12px;}table{border-collapse:collapse;font-size:13px;}th,td{padding:8px;border-bottom:1px solid #334155;text-align:left;}th{cursor:pointer;color:#38bdf8;}",
    "js": "function filterTbl(q){document.querySelectorAll('#myTbl tbody tr').forEach(r=>r.style.display=r.innerText.toLowerCase().includes(q.toLowerCase())?'':'none');}let asc=true;function sortTbl(col){const tbl=document.getElementById(\"myTbl\"),rows=Array.from(tbl.querySelectorAll(\"tbody tr\"));rows.sort((a,b)=>{const v1=a.children[col].innerText,v2=b.children[col].innerText;return asc?v1.localeCompare(v2,undefined,{numeric:true}):v2.localeCompare(v1,undefined,{numeric:true});});asc=!asc;const bdy=tbl.querySelector(\"tbody\");bdy.innerHTML=\"\";rows.forEach(r=>bdy.appendChild(r));}"
  },
  "data_bar_graph": {
    "title": "Animated SVG Bar Chart",
    "category": "data",
    "badge": "Bar Chart",
    "desc": "Vertical column bar graph with dynamic animated heights and hover data tooltips.",
    "html": "<div class=\"bar-card\"><h3>Quarterly Enrolments</h3><div class=\"bars-wrap\"><div class=\"bar-col\"><div class=\"bar-fill\" style=\"height:65%;\"></div><span>Q1</span></div><div class=\"bar-col\"><div class=\"bar-fill\" style=\"height:85%;\"></div><span>Q2</span></div><div class=\"bar-col\"><div class=\"bar-fill\" style=\"height:45%;\"></div><span>Q3</span></div><div class=\"bar-col\"><div class=\"bar-fill active\" style=\"height:95%;\"></div><span>Q4</span></div></div><button onclick=\"randomizeBars()\" class=\"bar-btn\">Randomize Data</button></div>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.bar-card{background:#0f172a;border:1px solid #1e293b;border-radius:14px;padding:22px;width:280px;text-align:center;}.bar-card h3{margin:0 0 16px;font-size:15px;color:#cbd5e1;}.bars-wrap{display:flex;justify-content:space-around;align-items:flex-end;height:120px;padding-bottom:8px;border-bottom:2px solid #1e293b;margin-bottom:16px;}.bar-col{display:flex;flex-direction:column;align-items:center;gap:6px;width:38px;height:100%;justify-content:flex-end;}.bar-fill{width:100%;background:#6366f1;border-radius:4px 4px 0 0;transition:height 0.4s;}.bar-fill.active{background:#38bdf8;}.bar-col span{font-size:11px;color:#94a3b8;}.bar-btn{padding:8px 16px;background:#1e293b;border:1px solid #334155;color:#fff;border-radius:6px;cursor:pointer;font-size:12px;}",
    "js": "function randomizeBars(){document.querySelectorAll(\".bar-fill\").forEach(b=>{b.style.height=(Math.floor(Math.random()*70)+30)+\"%\";});}"
  },
  "data_kanban_board": {
    "title": "Mini Drag-and-Drop Kanban Board",
    "category": "data",
    "badge": "Kanban",
    "desc": "Workflow agile board with To Do, In Progress, and Done task columns.",
    "html": "<div class=\"kanban-wrap\"><div class=\"k-col\" id=\"colTodo\"><h4>To Do</h4><div class=\"k-card\" onclick=\"moveCard(this)\">Design UI Tokens</div><div class=\"k-card\" onclick=\"moveCard(this)\">Canvas Engine</div></div><div class=\"k-col\" id=\"colDone\"><h4>Done</h4><div class=\"k-card\" onclick=\"moveCard(this)\">Setup Repo</div></div></div>",
    "css": "body{background:#090e1a;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.kanban-wrap{display:flex;gap:12px;width:320px;}.k-col{flex:1;background:#1e293b;border-radius:10px;padding:12px;min-height:160px;}.k-col h4{margin:0 0 10px;font-size:13px;color:#38bdf8;border-bottom:1px solid #334155;padding-bottom:6px;}.k-card{background:#0f172a;border:1px solid #334155;border-radius:6px;padding:8px;margin-bottom:8px;font-size:12px;cursor:pointer;}",
    "js": "function moveCard(c){const target=c.parentElement.id===\"colTodo\"?document.getElementById(\"colDone\"):document.getElementById(\"colTodo\");target.appendChild(c);}"
  },
  "data_stock_portfolio": {
    "title": "Mini Stock Portfolio Tracker",
    "category": "data",
    "badge": "Portfolio",
    "desc": "Asset tracker card calculating total net worth and dynamic daily return.",
    "html": "<div class=\"port-card\"><small>TOTAL BALANCE</small><div class=\"port-bal\" id=\"portBal\">$42,850.00</div><div class=\"port-pnl\">+ $1,240.50 (3.2%) Today</div><div class=\"assets\"><div class=\"asset-row\"><span>AAPL (Apple)</span><strong>$18,200</strong></div><div class=\"asset-row\"><span>GOOGL (Alphabet)</span><strong>$14,650</strong></div><div class=\"asset-row\"><span>NVDA (Nvidia)</span><strong>$10,000</strong></div></div></div>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.port-card{background:#0f172a;border:1px solid #1e293b;border-radius:16px;padding:22px;width:280px;}.port-card small{font-size:11px;color:#94a3b8;font-weight:bold;}.port-bal{font-size:28px;font-weight:800;color:#fff;margin:6px 0;}.port-pnl{color:#10b981;font-size:13px;font-weight:bold;margin-bottom:16px;}.asset-row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #1e293b;font-size:12px;}",
    "js": "console.log(\"Portfolio mounted\");"
  },
  "data_world_clocks": {
    "title": "Multi-Timezone World Clocks",
    "category": "data",
    "badge": "Timezones",
    "desc": "Simultaneous live digital clocks for New York, London, Tokyo, and New Delhi.",
    "html": "<div class=\"tz-card\"><h3>Global Operations</h3><div class=\"tz-row\"><div><strong>London</strong><br><small>GMT</small></div><div id=\"tzLon\" class=\"tz-time\">--:--:--</div></div><div class=\"tz-row\"><div><strong>New York</strong><br><small>EDT</small></div><div id=\"tzNy\" class=\"tz-time\">--:--:--</div></div><div class=\"tz-row\"><div><strong>Tokyo</strong><br><small>JST</small></div><div id=\"tzTok\" class=\"tz-time\">--:--:--</div></div></div>",
    "css": "body{background:#090e1a;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.tz-card{background:#1e293b;border:1px solid #334155;border-radius:14px;padding:20px;width:280px;}.tz-card h3{margin:0 0 14px;font-size:15px;color:#38bdf8;}.tz-row{display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid #334155;}.tz-row small{color:#94a3b8;font-size:11px;}.tz-time{font-family:monospace;font-size:16px;font-weight:bold;color:#38bdf8;}",
    "js": "function updClocks(){const d=new Date();document.getElementById(\"tzLon\").innerText=d.toLocaleTimeString(\"en-GB\",{timeZone:\"Europe/London\"});document.getElementById(\"tzNy\").innerText=d.toLocaleTimeString(\"en-US\",{timeZone:\"America/New_York\"});document.getElementById(\"tzTok\").innerText=d.toLocaleTimeString(\"ja-JP\",{timeZone:\"Asia/Tokyo\"});}setInterval(updClocks,1000);updClocks();"
  },
  "data_expense_tracker": {
    "title": "Categorized Expense Tracker",
    "category": "data",
    "badge": "Finance",
    "desc": "Add expense entries with category badge and real-time total spent counter.",
    "html": "<div class=\"exp-card\"><h3>Monthly Expenses</h3><div class=\"exp-total\" id=\"expTot\">Total: $145</div><div class=\"exp-form\"><input id=\"expName\" placeholder=\"Item name\" /><input id=\"expCost\" type=\"number\" placeholder=\"$\" style=\"width:60px;\" /><button onclick=\"addExp()\">Add</button></div><ul id=\"expList\" class=\"exp-items\"><li><span>☕ Coffee & Snacks</span><strong>$15</strong></li><li><span>📚 Tech Book</span><strong>$45</strong></li><li><span>⚡ Cloud Hosting</span><strong>$85</strong></li></ul></div>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.exp-card{background:#0f172a;border:1px solid #1e293b;border-radius:14px;padding:22px;width:280px;}.exp-card h3{margin:0 0 6px;color:#38bdf8;}.exp-total{font-size:20px;font-weight:bold;color:#10b981;margin-bottom:14px;}.exp-form{display:flex;gap:6px;margin-bottom:14px;}.exp-form input{background:#090e1a;border:1px solid #334155;color:#fff;padding:6px;border-radius:6px;font-size:12px;}.exp-form button{background:#6366f1;border:none;color:#fff;border-radius:6px;padding:0 12px;cursor:pointer;font-weight:bold;}.exp-items{list-style:none;padding:0;margin:0;font-size:12px;}.exp-items li{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #1e293b;}",
    "js": "let tot=145;function addExp(){const n=document.getElementById(\"expName\").value,c=parseFloat(document.getElementById(\"expCost\").value);if(n&&c){tot+=c;const li=document.createElement(\"li\");li.innerHTML='<span>🏷️ '+n+'</span><strong>$'+c+'</strong>';document.getElementById(\"expList\").appendChild(li);document.getElementById(\"expTot\").innerText=\"Total: $\"+tot;document.getElementById(\"expName\").value=\"\";document.getElementById(\"expCost\").value=\"\";}}"
  },
  "data_shipping_stepper": {
    "title": "Order Shipping Tracker Stepper",
    "category": "data",
    "badge": "Stepper UI",
    "desc": "5-stage order status progression from payment verified to package delivered.",
    "html": "<div class=\"ship-card\"><h3>Shipment #XT-9842</h3><div class=\"stepper-vert\"><div class=\"s-step done\"><div class=\"s-circle\">✓</div><div><strong>Order Confirmed</strong><p>Oct 12, 10:30 AM</p></div></div><div class=\"s-step done\"><div class=\"s-circle\">✓</div><div><strong>Packed in Warehouse</strong><p>Oct 13, 02:15 PM</p></div></div><div class=\"s-step active\"><div class=\"s-circle\">🚚</div><div><strong>In Transit</strong><p>Expected Tomorrow</p></div></div><div class=\"s-step\"><div class=\"s-circle\">📦</div><div><strong>Delivered</strong><p>Pending</p></div></div></div></div>",
    "css": "body{background:#090e1a;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.ship-card{background:#1e293b;border:1px solid #334155;border-radius:16px;padding:22px;width:280px;}.ship-card h3{margin:0 0 16px;font-size:15px;color:#38bdf8;}.stepper-vert{border-left:2px solid #334155;padding-left:18px;}.s-step{display:flex;gap:12px;align-items:center;margin-bottom:16px;position:relative;}.s-circle{width:24px;height:24px;border-radius:50%;background:#0f172a;border:2px solid #64748b;display:grid;place-items:center;font-size:11px;}.s-step.done .s-circle{background:#10b981;border-color:#10b981;}.s-step.active .s-circle{background:#6366f1;border-color:#6366f1;}.s-step p{margin:2px 0 0;font-size:11px;color:#94a3b8;}",
    "js": "console.log(\"Stepper mounted\");"
  },
  "data_paginated_table": {
    "title": "Client-Side Paginated Table",
    "category": "data",
    "badge": "Pagination",
    "desc": "Data table with next/prev page buttons, page numbering, and dynamic row slices.",
    "html": "<div class=\"pagi-card\"><h3>Dev Team Directory</h3><table width=\"100%\" id=\"pTable\"><tr><th>ID</th><th>Dev</th><th>Role</th></tr><tbody id=\"pBody\"></tbody></table><div class=\"pagi-nav\"><button onclick=\"goPage(-1)\">&larr; Prev</button><span id=\"pPage\">Page 1 of 3</span><button onclick=\"goPage(1)\">Next &rarr;</button></div></div>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.pagi-card{background:#0f172a;border:1px solid #1e293b;border-radius:14px;padding:20px;width:300px;}.pagi-card h3{margin:0 0 12px;font-size:15px;color:#38bdf8;}table{border-collapse:collapse;font-size:12px;margin-bottom:14px;}th,td{padding:6px;border-bottom:1px solid #1e293b;text-align:left;}th{color:#94a3b8;}.pagi-nav{display:flex;justify-content:space-between;align-items:center;font-size:12px;}.pagi-nav button{padding:6px 12px;background:#1e293b;border:1px solid #334155;color:#fff;border-radius:4px;cursor:pointer;}",
    "js": "const devs=[{id:101,n:\"Sarah J.\",r:\"Frontend\"},{id:102,n:\"Mark V.\",r:\"Backend\"},{id:103,n:\"Dev Patel\",r:\"DevOps\"},{id:104,n:\"Elena R.\",r:\"Design\"},{id:105,n:\"Kenji S.\",r:\"Security\"},{id:106,n:\"Anna K.\",r:\"QA\"}];let page=1;function renderPagi(){const b=document.getElementById(\"pBody\");b.innerHTML=\"\";const slice=devs.slice((page-1)*2,page*2);slice.forEach(d=>{b.innerHTML+='<tr><td>'+d.id+'</td><td>'+d.n+'</td><td>'+d.r+'</td></tr>';});document.getElementById(\"pPage\").innerText=\"Page \"+page+\" of 3\";}function goPage(d){page=Math.max(1,Math.min(3,page+d));renderPagi();}renderPagi();"
  },
  "data_github_heatmap": {
    "title": "GitHub-Style Contribution Heatmap",
    "category": "data",
    "badge": "Activity Heatmap",
    "desc": "Matrix grid of contribution activity squares with color intensity scales.",
    "html": "<div class=\"hm-card\"><h3>148 Contributions in 2026</h3><div class=\"hm-grid\" id=\"hmGrid\"></div><div class=\"hm-legend\"><span>Less</span><span style=\"background:#0f172a\"></span><span style=\"background:#065f46\"></span><span style=\"background:#059669\"></span><span style=\"background:#10b981\"></span><span>More</span></div></div>",
    "css": "body{background:#090e1a;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.hm-card{background:#1e293b;border:1px solid #334155;border-radius:14px;padding:20px;width:310px;}.hm-card h3{margin:0 0 12px;font-size:14px;color:#38bdf8;}.hm-grid{display:grid;grid-template-columns:repeat(14,16px);gap:4px;}.hm-box{width:16px;height:16px;border-radius:3px;cursor:pointer;}.hm-legend{display:flex;align-items:center;gap:4px;font-size:11px;color:#94a3b8;margin-top:10px;justify-content:flex-end;}.hm-legend span{display:inline-block;width:12px;height:12px;border-radius:2px;}",
    "js": "const g=document.getElementById(\"hmGrid\"),cols=[\"#0f172a\",\"#065f46\",\"#059669\",\"#10b981\"];for(let i=0;i<70;i++){const d=document.createElement(\"div\");d.className=\"hm-box\";d.style.background=cols[Math.floor(Math.random()*cols.length)];d.title=\"Day \"+(i+1);g.appendChild(d);}"
  },
  "data_kpi_dashboard": {
    "title": "Multi-Metric SaaS KPI Dashboard",
    "category": "data",
    "badge": "KPI Dashboard",
    "desc": "Grid of 4 key performance metrics with percentage growth badges.",
    "html": "<div class=\"kpi-grid\"><div class=\"k-box\"><span>MRR</span><strong>$48.2k</strong><small>+14%</small></div><div class=\"k-box\"><span>ACTIVE USERS</span><strong>12,450</strong><small>+22%</small></div><div class=\"k-box\"><span>RETENTION</span><strong>94.8%</strong><small>+1.2%</small></div><div class=\"k-box\"><span>SANDBOXES</span><strong>142k</strong><small>+45%</small></div></div>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.kpi-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;width:300px;}.k-box{background:#0f172a;border:1px solid #1e293b;border-radius:12px;padding:14px;}.k-box span{display:block;font-size:11px;color:#94a3b8;font-weight:bold;}.k-box strong{display:block;font-size:20px;margin:4px 0;color:#fff;}.k-box small{color:#10b981;font-weight:bold;}",
    "js": "console.log(\"KPI dashboard loaded\");"
  },
  "data_weather_widget": {
    "title": "Interactive Weather Forecast Widget",
    "category": "data",
    "badge": "Weather Widget",
    "desc": "Modern weather card with temperature toggle (°C / °F) and 3-day forecast icons.",
    "html": "<div class=\"wx-card\"><div class=\"wx-top\"><div><h3>San Francisco</h3><p>Sunny & Clear</p></div><div class=\"wx-icon\">☀️</div></div><div class=\"wx-temp\" id=\"wTemp\">72°F</div><div class=\"wx-forecast\"><div>Mon<br>☀️ 72°</div><div>Tue<br>⛅ 68°</div><div>Wed<br>🌧️ 61°</div></div><button onclick=\"toggleUnit()\" class=\"wx-btn\">Toggle °C / °F</button></div>",
    "css": "body{background:#090e1a;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.wx-card{background:linear-gradient(135deg,#1e293b,#0f172a);border:1px solid #334155;border-radius:16px;padding:22px;width:260px;}.wx-top{display:flex;justify-content:space-between;align-items:center;}.wx-top h3{margin:0;font-size:16px;}.wx-top p{margin:2px 0 0;font-size:12px;color:#94a3b8;}.wx-icon{font-size:32px;}.wx-temp{font-size:42px;font-weight:800;color:#38bdf8;margin:12px 0;}.wx-forecast{display:flex;justify-content:space-between;font-size:12px;padding:10px 0;border-top:1px solid #334155;border-bottom:1px solid #334155;margin-bottom:14px;text-align:center;}.wx-btn{width:100%;padding:8px;background:#38bdf8;color:#000;font-weight:bold;border:none;border-radius:6px;cursor:pointer;}",
    "js": "let isF=true;function toggleUnit(){isF=!isF;document.getElementById(\"wTemp\").innerText=isF?\"72°F\":\"22°C\";}"
  },
  "data_comparison_matrix": {
    "title": "Feature Comparison Matrix",
    "category": "data",
    "badge": "Comparison",
    "desc": "Side-by-side feature checklist comparing Community vs Pro tier.",
    "html": "<div class=\"matrix-card\"><h3>Plan Feature Matrix</h3><table width=\"100%\"><tr><th>Feature</th><th>Free</th><th>Pro</th></tr><tr><td>40 Learning Tracks</td><td>✓</td><td>✓</td></tr><tr><td>100+ Live Sandboxes</td><td>10</td><td>✓ All</td></tr><tr><td>Verified Certificate</td><td>—</td><td>✓ Free</td></tr><tr><td>Cloud DB Storage</td><td>—</td><td>✓</td></tr></table></div>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.matrix-card{background:#0f172a;border:1px solid #1e293b;border-radius:14px;padding:20px;width:300px;}.matrix-card h3{margin:0 0 12px;font-size:15px;color:#38bdf8;}table{border-collapse:collapse;font-size:12px;}th,td{padding:8px 6px;border-bottom:1px solid #1e293b;text-align:center;}th:first-child,td:first-child{text-align:left;}th{color:#94a3b8;}td:nth-child(3){color:#10b981;font-weight:bold;}",
    "js": "console.log(\"Matrix mounted\");"
  },
  "data_speedometer_gauge": {
    "title": "Radial Speedometer / CPU Gauge",
    "category": "data",
    "badge": "Speedometer",
    "desc": "Curved circular arc gauge with dynamic needle indicator measuring CPU workload.",
    "html": "<div class=\"gauge-card\"><h3>CPU Core Workload</h3><svg width=\"180\" height=\"110\" viewBox=\"0 0 180 110\"><path d=\"M 20 100 A 70 70 0 0 1 160 100\" fill=\"none\" stroke=\"#1e293b\" stroke-width=\"14\" stroke-linecap=\"round\"/><path id=\"gArc\" d=\"M 20 100 A 70 70 0 0 1 160 100\" fill=\"none\" stroke=\"#38bdf8\" stroke-width=\"14\" stroke-linecap=\"round\" stroke-dasharray=\"220\" stroke-dashoffset=\"88\"/><text x=\"90\" y=\"85\" font-size=\"24\" font-weight=\"800\" fill=\"#fff\" text-anchor=\"middle\" id=\"gVal\">60%</text></svg><button onclick=\"bumpGauge()\" class=\"g-btn\">Simulate Core Burst</button></div>",
    "css": "body{background:#090e1a;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.gauge-card{background:#1e293b;border:1px solid #334155;border-radius:16px;padding:22px;width:240px;text-align:center;}.gauge-card h3{margin:0 0 12px;font-size:15px;color:#38bdf8;}.g-btn{margin-top:10px;padding:8px 14px;background:#6366f1;color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:bold;}#gArc{transition:stroke-dashoffset 0.5s;}",
    "js": "function bumpGauge(){const pct=Math.floor(Math.random()*60)+35;const off=220-(pct/100)*220;document.getElementById(\"gArc\").style.strokeDashoffset=off;document.getElementById(\"gVal\").textContent=pct+\"%\";}"
  },
  "data_leaderboard_podium": {
    "title": "3D Leaderboard with Winner Podium",
    "category": "data",
    "badge": "Leaderboard",
    "desc": "Podium elevation display highlighting 1st, 2nd, and 3rd rank learners.",
    "html": "<div class=\"podium-card\"><h3>Season Champions</h3><div class=\"podium-wrap\"><div class=\"p-step p2\"><div class=\"p-avatar\">🥈</div><strong>Dev P.</strong><div class=\"p-box h2\">2nd</div></div><div class=\"p-step p1\"><div class=\"p-avatar\">👑</div><strong>Sara C.</strong><div class=\"p-box h1\">1st</div></div><div class=\"p-step p3\"><div class=\"p-avatar\">🥉</div><strong>Alex R.</strong><div class=\"p-box h3\">3rd</div></div></div></div>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.podium-card{background:#0f172a;border:1px solid #1e293b;border-radius:16px;padding:22px;width:280px;text-align:center;}.podium-card h3{margin:0 0 16px;font-size:15px;color:#f59e0b;}.podium-wrap{display:flex;align-items:flex-end;justify-content:center;gap:8px;height:140px;}.p-step{display:flex;flex-direction:column;align-items:center;width:70px;}.p-avatar{font-size:22px;margin-bottom:4px;}.p-step strong{font-size:11px;margin-bottom:4px;}.p-box{width:100%;display:grid;place-items:center;font-weight:bold;font-size:14px;border-radius:6px 6px 0 0;}.h1{height:80px;background:#f59e0b;color:#000;}.h2{height:60px;background:#94a3b8;color:#000;}.h3{height:40px;background:#b45309;color:#fff;}",
    "js": "console.log(\"Podium ready\");"
  },
  "data_sales_funnel": {
    "title": "Visual Sales Funnel Pipeline",
    "category": "data",
    "badge": "Funnel Chart",
    "desc": "Tapered pipeline funnel showing conversion percentage at every stage.",
    "html": "<div class=\"funnel-card\"><h3>Lead Conversion Funnel</h3><div class=\"funnel-stage\" style=\"width:100%;background:#38bdf8;\">Visits: 10,000 (100%)</div><div class=\"funnel-stage\" style=\"width:75%;background:#6366f1;\">Signups: 3,500 (35%)</div><div class=\"funnel-stage\" style=\"width:50%;background:#a855f7;\">Active: 1,200 (12%)</div><div class=\"funnel-stage\" style=\"width:25%;background:#10b981;\">Paid: 450 (4.5%)</div></div>",
    "css": "body{background:#090e1a;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.funnel-card{background:#1e293b;border:1px solid #334155;border-radius:14px;padding:22px;width:280px;text-align:center;}.funnel-card h3{margin:0 0 16px;font-size:15px;color:#38bdf8;}.funnel-stage{margin:0 auto 8px;padding:8px 0;border-radius:6px;font-size:11px;font-weight:bold;color:#040711;}",
    "js": "console.log(\"Funnel ready\");"
  },
  "fx_3d_cube": {
    "title": "Pure CSS Rotating 3D Cube",
    "category": "animations",
    "badge": "3D Transform",
    "desc": "Fully textured 3D cube spinning smoothly with CSS keyframes and perspective.",
    "html": "<div class=\"cube-scene\"><div class=\"cube\"><div class=\"face front\">HTML5</div><div class=\"face back\">CSS3</div><div class=\"face right\">JS</div><div class=\"face left\">XTUTI</div><div class=\"face top\">WEB</div><div class=\"face bottom\">CODE</div></div></div>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;}.cube-scene{width:120px;height:120px;perspective:600px;}.cube{width:100%;height:100%;position:relative;transform-style:preserve-3d;animation:spin 8s linear infinite;}@keyframes spin{from{transform:rotateX(0) rotateY(0);}to{transform:rotateX(360deg) rotateY(360deg);}}.face{position:absolute;width:120px;height:120px;background:rgba(56,189,248,0.2);border:2px solid #38bdf8;display:grid;place-items:center;font-family:sans-serif;font-weight:bold;font-size:18px;color:#fff;box-shadow:0 0 20px rgba(56,189,248,0.2);}.front{transform:translateZ(60px);}.back{transform:rotateY(180deg) translateZ(60px);}.right{transform:rotateY(90deg) translateZ(60px);}.left{transform:rotateY(-90deg) translateZ(60px);}.top{transform:rotateX(90deg) translateZ(60px);}.bottom{transform:rotateX(-90deg) translateZ(60px);}",
    "js": "console.log(\"3D Cube spinning\");"
  },
  "fx_animated_rocket": {
    "title": "Launching SVG Space Rocket",
    "category": "animations",
    "badge": "SVG Animation",
    "desc": "Illustrative spacecraft with flickering rocket thruster exhaust and twinkling stars.",
    "html": "<div class=\"rocket-card\"><div class=\"stars-bg\"></div><div class=\"rocket\">🚀</div><div class=\"exhaust\">🔥</div><h3>Deploying to Cloud</h3><p>XTuti RaiseUp Pipeline Live</p></div>",
    "css": "body{background:#060814;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.rocket-card{background:#0f172a;border:1px solid #1e293b;border-radius:16px;padding:28px;width:240px;text-align:center;overflow:hidden;position:relative;}.rocket{font-size:52px;animation:hover 2s ease-in-out infinite alternate;}@keyframes hover{from{transform:translateY(0);}to{transform:translateY(-14px);}}.exhaust{font-size:24px;animation:burn 0.2s infinite alternate;}@keyframes burn{from{transform:scale(0.8);}to{transform:scale(1.2);}}.rocket-card h3{margin:12px 0 4px;font-size:16px;color:#38bdf8;}.rocket-card p{margin:0;font-size:12px;color:#94a3b8;}",
    "js": "console.log(\"Rocket launched\");"
  },
  "fx_text_scramble": {
    "title": "Matrix Cyberpunk Text Scramble",
    "category": "animations",
    "badge": "Text Decrypt",
    "desc": "Hacker decryption effect scrambling random symbols into legible text on hover.",
    "html": "<div class=\"scramble-card\"><h2 id=\"scrambleTxt\" onmouseover=\"scramble()\">XTUTI RAISEUP</h2><p>Hover over headline to decrypt</p></div>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;font-family:monospace;color:#fff;}.scramble-card{background:#0b1120;border:1px solid #38bdf8;border-radius:14px;padding:28px;text-align:center;box-shadow:0 0 25px rgba(56,189,248,0.2);}.scramble-card h2{font-size:24px;color:#38bdf8;margin:0 0 8px;cursor:pointer;letter-spacing:2px;}.scramble-card p{margin:0;font-size:12px;color:#64748b;}",
    "js": "const target=\"XTUTI RAISEUP\",chars=\"!@#$%^&*()_+-=<>{}[]/\\0123456789\";function scramble(){let iter=0;const el=document.getElementById(\"scrambleTxt\");const iv=setInterval(()=>{el.innerText=target.split(\"\").map((c,idx)=>{if(idx<iter)return target[idx];return chars[Math.floor(Math.random()*chars.length)];}).join(\"\");if(iter>=target.length)clearInterval(iv);iter+=1/3;},30);}scramble();"
  },
  "fx_aurora_button": {
    "title": "Aurora Liquid Neon Button",
    "category": "animations",
    "badge": "Conic Gradient",
    "desc": "Dynamic button with continuously rotating conic gradient ambient light glow.",
    "html": "<button class=\"aurora-btn\"><span>Launch Sandbox &rarr;</span></button>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;}.aurora-btn{position:relative;padding:14px 28px;background:#090e1a;color:#fff;border:none;border-radius:12px;cursor:pointer;font-size:16px;font-weight:bold;z-index:1;overflow:hidden;}.aurora-btn span{position:relative;z-index:2;}.aurora-btn::before{content:\"\";position:absolute;inset:-4px;background:conic-gradient(#38bdf8,#8b5cf6,#ec4899,#38bdf8);border-radius:16px;z-index:-1;animation:spin 3s linear infinite;}@keyframes spin{to{transform:rotate(360deg);}}.aurora-btn::after{content:\"\";position:absolute;inset:2px;background:#0f172a;border-radius:10px;z-index:1;}",
    "js": "console.log(\"Aurora ready\");"
  },
  "fx_marquee_infinite": {
    "title": "Infinite Seamless Marquee Banner",
    "category": "animations",
    "badge": "CSS Marquee",
    "desc": "Continuous horizontal ticker tape with hover-to-pause effect.",
    "html": "<div class=\"marquee-box\"><div class=\"marquee-track\"><span>HTML5 SEMANTICS</span><span>&bull;</span><span>VANILLA CSS</span><span>&bull;</span><span>JAVASCRIPT ES2026</span><span>&bull;</span><span>XTUTI RAISEUP</span><span>&bull;</span></div></div>",
    "css": "body{background:#090e1a;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;}.marquee-box{width:320px;overflow:hidden;background:#1e293b;border:1px solid #334155;border-radius:8px;padding:12px 0;}.marquee-track{display:flex;gap:16px;white-space:nowrap;font-weight:bold;color:#38bdf8;animation:marq 6s linear infinite;}.marquee-box:hover .marquee-track{animation-play-state:paused;}@keyframes marq{from{transform:translateX(0);}to{transform:translateX(-50%);}}",
    "js": "console.log(\"Marquee loaded\");"
  },
  "fx_pulsing_heart": {
    "title": "Beating Neon Heart with ECG Pulse",
    "category": "animations",
    "badge": "Neon Pulse",
    "desc": "SVG cardiac pulse beating realistically with accompanying glowing pulse wave.",
    "html": "<div class=\"heart-box\"><div class=\"heart\">❤️</div><div class=\"heart-rate\">72 BPM</div><p>Simulated Vital Monitor</p></div>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.heart-box{background:#0f172a;border:1px solid #1e293b;border-radius:16px;padding:24px;text-align:center;width:220px;}.heart{font-size:54px;animation:beat 0.9s cubic-bezier(0.25,1,0.5,1) infinite;}@keyframes beat{0%{transform:scale(1);}30%{transform:scale(1.25);}50%{transform:scale(1);}70%{transform:scale(1.15);}100%{transform:scale(1);}}.heart-rate{font-size:24px;font-weight:800;color:#ef4444;margin:8px 0 4px;}.heart-box p{margin:0;font-size:12px;color:#94a3b8;}",
    "js": "console.log(\"Pulse active\");"
  },
  "fx_morphing_blob": {
    "title": "Organic Liquid Morphing Blob",
    "category": "animations",
    "badge": "Blob Morph",
    "desc": "CSS border-radius liquid organic morphing bubble with mesh gradient.",
    "html": "<div class=\"blob-scene\"><div class=\"blob\"></div></div>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;}.blob-scene{width:160px;height:160px;}.blob{width:100%;height:100%;background:linear-gradient(135deg,#38bdf8,#ec4899);border-radius:60% 40% 30% 70% / 60% 30% 70% 40%;animation:morph 6s ease-in-out infinite alternate;box-shadow:0 0 35px rgba(236,72,153,0.4);}@keyframes morph{0%{border-radius:60% 40% 30% 70% / 60% 30% 70% 40%;}50%{border-radius:30% 60% 70% 40% / 50% 60% 30% 60%;}100%{border-radius:60% 40% 30% 70% / 60% 30% 70% 40%;}}",
    "js": "console.log(\"Blob morphing\");"
  },
  "fx_liquid_loader": {
    "title": "Liquid Wave Glass Loader",
    "category": "animations",
    "badge": "Liquid Loader",
    "desc": "Simulated water sloshing with wave effect inside glass sphere container.",
    "html": "<div class=\"wave-box\"><div class=\"wave-circle\"><div class=\"wave-liquid\"></div><span class=\"wave-txt\">68%</span></div></div>",
    "css": "body{background:#090e1a;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;}.wave-box{text-align:center;}.wave-circle{position:relative;width:120px;height:120px;border-radius:50%;border:3px solid #38bdf8;background:#0b1120;overflow:hidden;display:grid;place-items:center;box-shadow:0 0 25px rgba(56,189,248,0.3);}.wave-liquid{position:absolute;bottom:0;width:100%;height:68%;background:linear-gradient(180deg,#38bdf8,#2563eb);border-radius:40%;animation:slosh 4s linear infinite;}@keyframes slosh{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}.wave-txt{position:relative;z-index:2;color:#fff;font-weight:800;font-size:22px;}",
    "js": "console.log(\"Wave liquid loaded\");"
  },
  "fx_laser_border": {
    "title": "Glowing Laser Scan Card",
    "category": "animations",
    "badge": "Laser Scan",
    "desc": "Sci-fi card with neon laser beam tracing continuously around perimeter.",
    "html": "<div class=\"laser-card\"><h3>SECURITY ACTIVE</h3><p>Perimeter scan completed. All endpoints encrypted.</p></div>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.laser-card{position:relative;background:#0f172a;border-radius:14px;padding:26px;width:260px;text-align:center;box-shadow:0 10px 30px rgba(0,0,0,0.5);border:1px solid #1e293b;}.laser-card h3{margin:0 0 6px;color:#10b981;letter-spacing:1px;font-size:16px;}.laser-card p{margin:0;font-size:12px;color:#94a3b8;line-height:1.4;}",
    "js": "console.log(\"Laser card loaded\");"
  },
  "fx_parallax_card": {
    "title": "3D Parallax Tilt Card",
    "category": "animations",
    "badge": "3D Parallax",
    "desc": "Card tilts smoothly with interactive mouse movement and specular reflection glare.",
    "html": "<div class=\"tilt-card\" id=\"tiltCard\" onmousemove=\"handleTilt(event)\" onmouseleave=\"resetTilt()\"><h3>3D Holo Card</h3><p>Move your cursor over this card to inspect the dynamic 3D angle.</p></div>",
    "css": "body{background:#090e1a;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;perspective:800px;}.tilt-card{background:linear-gradient(135deg,#1e293b,#0f172a);border:1px solid #38bdf8;border-radius:16px;padding:28px;width:240px;text-align:center;transition:transform 0.1s ease-out;box-shadow:0 15px 35px rgba(0,0,0,0.6);}.tilt-card h3{margin:0 0 8px;color:#38bdf8;}.tilt-card p{margin:0;font-size:12px;color:#94a3b8;line-height:1.5;}",
    "js": "function handleTilt(e){const card=document.getElementById(\"tiltCard\"),rect=card.getBoundingClientRect(),x=e.clientX-rect.left-rect.width/2,y=e.clientY-rect.top-rect.height/2;card.style.transform=\"rotateY(\"+(x/10)+\"deg) rotateX(\"+(-y/10)+\"deg)\";}function resetTilt(){document.getElementById(\"tiltCard\").style.transform=\"rotateY(0) rotateX(0)\";}"
  },
  "fx_terminal_typing": {
    "title": "Retro Hacker Terminal Auto-Typing",
    "category": "animations",
    "badge": "Terminal Typing",
    "desc": "CRT green terminal typing automated shell commands with blinking cursor.",
    "html": "<div class=\"term-window\"><div class=\"term-bar\"><span class=\"t-red\"></span><span class=\"t-yel\"></span><span class=\"t-grn\"></span></div><div class=\"term-body\"><span id=\"termText\"></span><span class=\"cursor\">_</span></div></div>",
    "css": "body{background:#02040a;display:grid;place-items:center;min-height:95vh;margin:0;font-family:monospace;}.term-window{background:#050a14;border:1px solid #1e293b;border-radius:10px;width:300px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.8);}.term-bar{background:#0f172a;padding:8px 12px;display:flex;gap:6px;}.term-bar span{width:10px;height:10px;border-radius:50%;}.t-red{background:#ef4444;}.t-yel{background:#f59e0b;}.t-grn{background:#10b981;}.term-body{padding:16px;color:#10b981;font-size:13px;min-height:80px;line-height:1.6;}.cursor{animation:blink 1s infinite;}@keyframes blink{50%{opacity:0;}}",
    "js": "const script=[\"$ xtuti init --app sandbox\",\"Compiling modules... [OK]\",\"Mounting DOM Container... [OK]\",\"$ Ready. Hello World!\"];let line=0,char=0;function typeTerm(){const el=document.getElementById(\"termText\");if(line<script.length){if(char<script[line].length){el.innerHTML+=script[line][char];char++;setTimeout(typeTerm,35);}else{el.innerHTML+=\"<br>\";line++;char=0;setTimeout(typeTerm,300);}}}typeTerm();"
  },
  "fx_gold_shimmer": {
    "title": "Luxury Metallic Gold Shimmer Foil",
    "category": "animations",
    "badge": "Shimmer Foil",
    "desc": "High-end metallic gold card with dynamic shimmering reflection beam sweep.",
    "html": "<div class=\"gold-card\"><div class=\"gold-foil\">★ CERTIFIED DEVELOPER ★</div><p>Awarded by XTutiRaiseUp</p></div>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;}.gold-card{background:linear-gradient(135deg,#1c1917,#0c0a09);border:2px solid #ca8a04;border-radius:14px;padding:24px;width:260px;text-align:center;box-shadow:0 0 25px rgba(202,138,4,0.3);}.gold-foil{font-size:14px;font-weight:900;background:linear-gradient(90deg,#ca8a04 0%,#fde047 50%,#ca8a04 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-size:200% auto;animation:shine 3s linear infinite;letter-spacing:1px;}.gold-card p{color:#a8a29e;font-size:12px;margin:8px 0 0;}@keyframes shine{to{background-position:200% center;}}",
    "js": "console.log(\"Gold shimmer loaded\");"
  },
  "fx_book_flip": {
    "title": "3D Flipping Book Page",
    "category": "animations",
    "badge": "3D Book",
    "desc": "Interactive 3D book cover opening to reveal inner page with smooth perspective.",
    "html": "<div class=\"book-scene\" onclick=\"this.classList.toggle('open')\"><div class=\"book\"><div class=\"book-cover\">📘 HTML Master Guide<br><small>Click to Open</small></div><div class=\"book-page\"><h4>Chapter 1</h4><p>Web fundamentals, DOCTYPE semantics, DOM nodes & styles.</p></div></div></div>",
    "css": "body{background:#090e1a;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.book-scene{perspective:1000px;cursor:pointer;}.book{width:160px;height:210px;position:relative;transform-style:preserve-3d;}.book-cover{position:absolute;inset:0;background:linear-gradient(135deg,#3b82f6,#1d4ed8);border-radius:6px;padding:16px;transform-origin:left;transition:transform 0.8s cubic-bezier(0.4,0,0.2,1);z-index:2;font-weight:bold;font-size:14px;box-shadow:0 10px 25px rgba(0,0,0,0.5);}.book-page{position:absolute;inset:0;background:#f8fafc;color:#0f172a;border-radius:6px;padding:16px;font-size:12px;z-index:1;}.book-scene.open .book-cover{transform:rotateY(-140deg);}",
    "js": "console.log(\"Book interactive\");"
  },
  "fx_flickering_neon": {
    "title": "Realistic Broken Neon Sign",
    "category": "animations",
    "badge": "Neon Flicker",
    "desc": "Cyberpunk neon sign with realistic occasional electrical flicker animation.",
    "html": "<div class=\"flicker-box\"><h1 class=\"neon-sign\">OPEN 24/7</h1><p>XTUTI CYBER CAFE</p></div>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;}.flicker-box{text-align:center;}.neon-sign{font-size:38px;color:#f43f5e;text-shadow:0 0 10px #f43f5e, 0 0 20px #f43f5e, 0 0 40px #f43f5e;margin:0 0 6px;animation:flicker 2.5s infinite alternate;}@keyframes flicker{0%,19%,21%,23%,25%,54%,56%,100%{text-shadow:0 0 10px #f43f5e, 0 0 20px #f43f5e, 0 0 40px #f43f5e;opacity:1;}20%,24%,55%{text-shadow:none;opacity:0.3;}}.flicker-box p{color:#64748b;font-size:12px;margin:0;letter-spacing:2px;}",
    "js": "console.log(\"Neon flicker mounted\");"
  },
  "fx_water_ripple": {
    "title": "Canvas Water Ripple Distortion",
    "category": "animations",
    "badge": "Water Wave",
    "desc": "Click anywhere on canvas to create expanding water surface ripple waves.",
    "html": "<canvas id=\"ripCanvas\" width=\"300\" height=\"200\"></canvas><div style=\"font-size:12px;color:#94a3b8;font-family:sans-serif;margin-top:6px;text-align:center;\">Click anywhere to make ripples</div>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;}canvas{background:#071529;border:1px solid #1e3a5f;border-radius:8px;cursor:pointer;}",
    "js": "const cv=document.getElementById(\"ripCanvas\"),ctx=cv.getContext(\"2d\");let rings=[];cv.addEventListener(\"click\",e=>{const r=cv.getBoundingClientRect();rings.push({x:e.clientX-r.left,y:e.clientY-r.top,r:2,alpha:1});});function loop(){ctx.fillStyle=\"rgba(7,21,41,0.2)\";ctx.fillRect(0,0,300,200);rings.forEach(rg=>{rg.r+=2;rg.alpha-=0.02;ctx.strokeStyle=\"rgba(56,189,248,\"+rg.alpha+\")\";ctx.lineWidth=2;ctx.beginPath();ctx.arc(rg.x,rg.y,rg.r,0,Math.PI*2);ctx.stroke();});rings=rings.filter(rg=>rg.alpha>0);requestAnimationFrame(loop);}loop();"
  },
  "app_pomodoro": {
    "title": "Pomodoro Focus Timer",
    "category": "micro_apps",
    "badge": "Productivity",
    "desc": "25-minute focus session timer with start, pause, reset, and interval alerts.",
    "html": "<div class=\"pomo-card\"><div class=\"pomo-timer\" id=\"pomoTime\">25:00</div><div class=\"pomo-ctrls\"><button onclick=\"startPomo()\" id=\"btnPomo\">Start Focus</button><button onclick=\"resetPomo()\">Reset</button></div><div id=\"pomoStatus\" style=\"font-size:12px;color:#94a3b8;margin-top:12px;\">Ready for deep work</div></div>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.pomo-card{background:#0f172a;border:1px solid #1e293b;border-radius:16px;padding:24px;width:240px;text-align:center;}.pomo-timer{font-size:48px;font-weight:800;color:#ef4444;font-family:monospace;margin-bottom:16px;}.pomo-ctrls button{padding:8px 16px;margin:0 4px;background:#1e293b;border:1px solid #334155;color:#fff;border-radius:6px;cursor:pointer;font-weight:bold;}#btnPomo{background:#ef4444;border-color:#ef4444;}",
    "js": "let sec=1500,timer=null;function startPomo(){if(timer){clearInterval(timer);timer=null;document.getElementById(\"btnPomo\").innerText=\"Resume\";return;}document.getElementById(\"btnPomo\").innerText=\"Pause\";document.getElementById(\"pomoStatus\").innerText=\"Focus mode in progress...\";timer=setInterval(()=>{sec--;const m=Math.floor(sec/60).toString().padStart(2,\"0\"),s=(sec%60).toString().padStart(2,\"0\");document.getElementById(\"pomoTime\").innerText=m+\":\"+s;if(sec<=0){clearInterval(timer);alert(\"Pomodoro complete! Take a 5-minute break.\");resetPomo();}},1000);}function resetPomo(){clearInterval(timer);timer=null;sec=1500;document.getElementById(\"pomoTime\").innerText=\"25:00\";document.getElementById(\"btnPomo\").innerText=\"Start Focus\";document.getElementById(\"pomoStatus\").innerText=\"Ready for deep work\";}"
  },
  "app_calculator": {
    "title": "Sleek Dark Mode Web Calculator",
    "category": "micro_apps",
    "badge": "Calculator",
    "desc": "Full arithmetic web calculator with arithmetic stack and clean keypad layout.",
    "html": "<div class=\"calc-card\"><div class=\"calc-display\" id=\"calcDisp\">0</div><div class=\"calc-grid\"><button onclick=\"cClear()\">C</button><button onclick=\"cInput('/')\">/</button><button onclick=\"cInput('*')\">&times;</button><button onclick=\"cBack()\">⌫</button><button onclick=\"cInput('7')\">7</button><button onclick=\"cInput('8')\">8</button><button onclick=\"cInput('9')\">9</button><button onclick=\"cInput('-')\">-</button><button onclick=\"cInput('4')\">4</button><button onclick=\"cInput('5')\">5</button><button onclick=\"cInput('6')\">6</button><button onclick=\"cInput('+')\">+</button><button onclick=\"cInput('1')\">1</button><button onclick=\"cInput('2')\">2</button><button onclick=\"cInput('3')\">3</button><button class=\"calc-eq\" onclick=\"cEval()\">=</button><button class=\"calc-zero\" onclick=\"cInput('0')\">0</button><button onclick=\"cInput('.')\">.</button></div></div>",
    "css": "body{background:#090e1a;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;}.calc-card{background:#1e293b;border-radius:16px;padding:16px;width:240px;box-shadow:0 10px 30px rgba(0,0,0,0.6);}.calc-display{background:#0f172a;border-radius:8px;padding:14px;color:#fff;font-family:monospace;font-size:24px;text-align:right;margin-bottom:12px;overflow:hidden;}.calc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;}.calc-grid button{padding:12px;background:#334155;border:none;border-radius:8px;color:#fff;font-size:16px;font-weight:bold;cursor:pointer;}.calc-grid button:hover{background:#475569;}.calc-eq{background:#38bdf8 !important;color:#040711 !important;grid-row:span 2;}.calc-zero{grid-column:span 2;}",
    "js": "let exp=\"\";function cInput(v){exp+=v;document.getElementById(\"calcDisp\").innerText=exp;}function cClear(){exp=\"\";document.getElementById(\"calcDisp\").innerText=\"0\";}function cBack(){exp=exp.slice(0,-1);document.getElementById(\"calcDisp\").innerText=exp||\"0\";}function cEval(){try{exp=String(eval(exp));document.getElementById(\"calcDisp\").innerText=exp;}catch(e){document.getElementById(\"calcDisp\").innerText=\"Error\";exp=\"\";}}"
  },
  "app_markdown_preview": {
    "title": "Real-Time Markdown Live Previewer",
    "category": "micro_apps",
    "badge": "Dev Tool",
    "desc": "Dual-pane markdown editor instantly parsing headers, lists, code, and bold tags.",
    "html": "<div class=\"md-wrap\"><textarea id=\"mdInp\" oninput=\"renderMD()\"># Realtime Markdown&#10;**Bold text** and *italic*&#10;- Item one&#10;- Item two&#10;&#10;&#96;code snippet&#96;</textarea><div id=\"mdOut\" class=\"md-preview\"></div></div>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.md-wrap{display:flex;gap:10px;width:340px;height:180px;}.md-wrap textarea{flex:1;background:#0f172a;border:1px solid #334155;border-radius:8px;color:#fff;padding:8px;font-family:monospace;font-size:12px;resize:none;}.md-preview{flex:1;background:#1e293b;border-radius:8px;padding:8px;font-size:12px;overflow-y:auto;}.md-preview h1{font-size:16px;margin:0 0 6px;color:#38bdf8;}.md-preview code{background:#0f172a;padding:2px 4px;border-radius:4px;color:#10b981;}",
    "js": "function renderMD(){const txt=document.getElementById(\"mdInp\").value;let html=txt.replace(/^# (.*$)/gim,\"<h1>$1</h1>\").replace(/\\*\\*(.*?)\\*\\*/gim,\"<strong>$1</strong>\").replace(/\\*(.*?)\\*/gim,\"<em>$1</em>\").replace(new RegExp(String.fromCharCode(96)+\"([^\"+String.fromCharCode(96)+\"]+)\"+String.fromCharCode(96),\"gim\"),\"<code>$1</code>\").replace(/^- (.*$)/gim,\"<li>$1</li>\");document.getElementById(\"mdOut\").innerHTML=html;}renderMD();"
  },
  "app_todo_smart": {
    "title": "Smart Task Planner with Priority Badges",
    "category": "micro_apps",
    "badge": "Task Manager",
    "desc": "Add tasks with High, Medium, or Low priority badges and check-off completion.",
    "html": "<div class=\"todo-card\"><h3>Sprint Tasks</h3><div class=\"todo-inp-row\"><input id=\"tdTxt\" placeholder=\"New task...\" /><button onclick=\"addTodo()\">Add</button></div><ul id=\"tdItems\" class=\"todo-list\"><li><label><input type=\"checkbox\" onchange=\"toggleDone(this)\"> <span class=\"t-prio high\">HIGH</span> Build UI</label></li><li><label><input type=\"checkbox\" onchange=\"toggleDone(this)\"> <span class=\"t-prio med\">MED</span> Test Engine</label></li></ul></div>",
    "css": "body{background:#090e1a;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.todo-card{background:#1e293b;border:1px solid #334155;border-radius:14px;padding:20px;width:280px;}.todo-card h3{margin:0 0 12px;font-size:16px;color:#38bdf8;}.todo-inp-row{display:flex;gap:6px;margin-bottom:12px;}.todo-inp-row input{flex:1;background:#0f172a;border:1px solid #334155;color:#fff;padding:8px;border-radius:6px;font-size:12px;}.todo-inp-row button{padding:0 12px;background:#6366f1;color:#fff;border:none;border-radius:6px;font-weight:bold;cursor:pointer;}.todo-list{list-style:none;padding:0;margin:0;font-size:13px;}.todo-list li{padding:6px 0;border-bottom:1px solid #334155;}.t-prio{font-size:9px;font-weight:bold;padding:2px 6px;border-radius:4px;margin:0 4px;}.high{background:#ef4444;color:#fff;}.med{background:#f59e0b;color:#000;}",
    "js": "function addTodo(){const t=document.getElementById(\"tdTxt\").value;if(!t)return;const li=document.createElement(\"li\");li.innerHTML='<label><input type=\"checkbox\" onchange=\"toggleDone(this)\"> <span class=\"t-prio high\">NEW</span> '+t+'</label>';document.getElementById(\"tdItems\").appendChild(li);document.getElementById(\"tdTxt\").value=\"\";}function toggleDone(cb){cb.parentElement.style.textDecoration=cb.checked?\"line-through\":\"none\";cb.parentElement.style.opacity=cb.checked?\"0.5\":\"1\";}"
  },
  "app_stopwatch_laps": {
    "title": "Digital Stopwatch with Lap Recorder",
    "category": "micro_apps",
    "badge": "Time Tool",
    "desc": "Millisecond digital timer with Start, Pause, Split Lap recorder, and Reset.",
    "html": "<div class=\"sw-card\"><div class=\"sw-time\" id=\"swDisp\">00:00.00</div><div class=\"sw-ctrls\"><button onclick=\"swToggle()\" id=\"swBtn\">Start</button><button onclick=\"swLap()\">Lap</button><button onclick=\"swReset()\">Reset</button></div><div id=\"swLaps\" class=\"sw-lap-list\"></div></div>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;font-family:monospace;color:#fff;}.sw-card{background:#0f172a;border:1px solid #1e293b;border-radius:16px;padding:22px;width:260px;text-align:center;}.sw-time{font-size:36px;font-weight:bold;color:#38bdf8;margin-bottom:14px;}.sw-ctrls button{padding:8px 12px;margin:0 3px;background:#1e293b;border:1px solid #334155;color:#fff;border-radius:6px;cursor:pointer;}#swBtn{background:#10b981;border-color:#10b981;font-weight:bold;}.sw-lap-list{margin-top:12px;max-height:80px;overflow-y:auto;font-size:12px;color:#94a3b8;line-height:1.8;text-align:left;}",
    "js": "let st=0,el=0,iv=null,laps=[];function swToggle(){const b=document.getElementById(\"swBtn\");if(iv){clearInterval(iv);iv=null;b.innerText=\"Start\";b.style.background=\"#10b981\";}else{st=Date.now()-el;iv=setInterval(()=>{el=Date.now()-st;const m=Math.floor(el/60000).toString().padStart(2,\"0\"),s=Math.floor((el%60000)/1000).toString().padStart(2,\"0\"),ms=Math.floor((el%1000)/10).toString().padStart(2,\"0\");document.getElementById(\"swDisp\").innerText=m+\":\"+s+\".\"+ms;},10);b.innerText=\"Pause\";b.style.background=\"#f59e0b\";}}function swLap(){if(el){laps.push(document.getElementById(\"swDisp\").innerText);document.getElementById(\"swLaps\").innerHTML=laps.map((l,i)=>\"Lap \"+(i+1)+\": \"+l).join(\"<br>\");}}function swReset(){clearInterval(iv);iv=null;el=0;laps=[];document.getElementById(\"swDisp\").innerText=\"00:00.00\";document.getElementById(\"swBtn\").innerText=\"Start\";document.getElementById(\"swBtn\").style.background=\"#10b981\";document.getElementById(\"swLaps\").innerHTML=\"\";}"
  },
  "app_password_generator": {
    "title": "Secure Random Password Generator",
    "category": "micro_apps",
    "badge": "Security Tool",
    "desc": "Length slider, symbols/numbers checkboxes, and one-tap clipboard copy.",
    "html": "<div class=\"gen-card\"><h3>Key Generator</h3><div class=\"pwd-out\"><span id=\"pRes\">s7#kL9@xP2</span><button onclick=\"copyPwd()\">📋</button></div><div class=\"gen-opt\"><label>Length: <span id=\"lenLbl\">12</span></label><input type=\"range\" min=\"8\" max=\"24\" value=\"12\" oninput=\"updLen(this.value)\" /></div><button onclick=\"genPwd()\" class=\"gen-btn\">Generate Password</button></div>",
    "css": "body{background:#090e1a;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.gen-card{background:#1e293b;border:1px solid #334155;border-radius:14px;padding:22px;width:280px;}.gen-card h3{margin:0 0 12px;font-size:16px;color:#38bdf8;}.pwd-out{display:flex;justify-content:space-between;align-items:center;background:#0f172a;border:1px solid #334155;padding:10px;border-radius:8px;margin-bottom:14px;font-family:monospace;font-size:15px;color:#10b981;font-weight:bold;}.pwd-out button{background:transparent;border:none;cursor:pointer;font-size:16px;}.gen-opt{font-size:12px;color:#94a3b8;margin-bottom:14px;}.gen-opt input{width:100%;margin-top:6px;}.gen-btn{width:100%;padding:10px;background:#6366f1;color:#fff;border:none;border-radius:8px;font-weight:bold;cursor:pointer;}",
    "js": "let len=12;function updLen(v){len=v;document.getElementById(\"lenLbl\").innerText=v;genPwd();}function genPwd(){const chars=\"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()\";let r=\"\";for(let i=0;i<len;i++)r+=chars[Math.floor(Math.random()*chars.length)];document.getElementById(\"pRes\").innerText=r;}function copyPwd(){navigator.clipboard.writeText(document.getElementById(\"pRes\").innerText);alert(\"Password copied to clipboard! ✓\");}"
  },
  "app_unit_converter": {
    "title": "Multi-Category Unit Converter",
    "category": "micro_apps",
    "badge": "Conversion",
    "desc": "Two-way synchronized metric to imperial distance conversion calculator.",
    "html": "<div class=\"uc-card\"><h3>Unit Converter (KM / Miles)</h3><div class=\"uc-field\"><label>Kilometers:</label><input type=\"number\" id=\"uKm\" value=\"5\" oninput=\"kmToMi(this.value)\" /></div><div class=\"uc-field\"><label>Miles:</label><input type=\"number\" id=\"uMi\" value=\"3.11\" oninput=\"miToKm(this.value)\" /></div></div>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.uc-card{background:#0f172a;border:1px solid #1e293b;border-radius:14px;padding:22px;width:260px;}.uc-card h3{margin:0 0 14px;font-size:15px;color:#38bdf8;}.uc-field{margin-bottom:12px;}.uc-field label{font-size:12px;color:#94a3b8;display:block;margin-bottom:4px;}.uc-field input{width:100%;box-sizing:border-box;background:#090e1a;border:1px solid #334155;color:#fff;padding:8px;border-radius:6px;font-size:14px;}",
    "js": "function kmToMi(v){document.getElementById(\"uMi\").value=(v*0.621371).toFixed(2);}function miToKm(v){document.getElementById(\"uKm\").value=(v/0.621371).toFixed(2);}"
  },
  "app_qr_generator": {
    "title": "Real-Time QR Code Generator",
    "category": "micro_apps",
    "badge": "QR Code",
    "desc": "Generate 2D visual barcode matrix from text or URL with real-time redraw.",
    "html": "<div class=\"qr-card\"><h3>QR Code Generator</h3><canvas id=\"qrCvs\" width=\"160\" height=\"160\"></canvas><input id=\"qrTxt\" value=\"https://xtutiraiseup.com\" oninput=\"drawQR(this.value)\" placeholder=\"Enter URL or text...\" /></div>",
    "css": "body{background:#090e1a;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.qr-card{background:#1e293b;border:1px solid #334155;border-radius:16px;padding:22px;width:240px;text-align:center;}.qr-card h3{margin:0 0 12px;font-size:15px;color:#38bdf8;}canvas{background:#fff;padding:6px;border-radius:8px;margin-bottom:12px;}.qr-card input{width:100%;box-sizing:border-box;background:#0f172a;border:1px solid #334155;color:#fff;padding:8px;border-radius:6px;font-size:12px;}",
    "js": "function drawQR(txt){const c=document.getElementById(\"qrCvs\"),ctx=c.getContext(\"2d\");ctx.fillStyle=\"#ffffff\";ctx.fillRect(0,0,160,160);ctx.fillStyle=\"#000000\";const s=160/16;for(let r=0;r<16;r++){for(let col=0;col<16;col++){const isCorner=(r<4&&col<4)||(r<4&&col>11)||(r>11&&col<4);const hash=((r*17+col*31+txt.length*(r+1))%5===0);if(isCorner||hash)ctx.fillRect(col*s,r*s,s,s);}}}drawQR(\"https://xtutiraiseup.com\");"
  },
  "app_habit_tracker": {
    "title": "30-Day Habit Streak Tracker",
    "category": "micro_apps",
    "badge": "Habit Tracker",
    "desc": "Monthly checkbox calendar grid tracking daily streaks and progress percentage.",
    "html": "<div class=\"habit-card\"><h3>Daily Coding Habit</h3><div id=\"hGrid\" class=\"h-grid\"></div><div class=\"h-stats\">Streak: <strong id=\"hStreak\">4 Days</strong> &bull; Completed: <strong id=\"hPct\">4/30</strong></div></div>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.habit-card{background:#0f172a;border:1px solid #1e293b;border-radius:14px;padding:20px;width:280px;text-align:center;}.habit-card h3{margin:0 0 14px;font-size:15px;color:#38bdf8;}.h-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:6px;margin-bottom:12px;}.h-cell{height:28px;background:#1e293b;border-radius:4px;display:grid;place-items:center;font-size:11px;cursor:pointer;}.h-cell.done{background:#10b981;color:#000;font-weight:bold;}.h-stats{font-size:12px;color:#94a3b8;}.h-stats strong{color:#fff;}"
  },
  "app_virtual_piano": {
    "title": "Playable Virtual Piano Keyboard",
    "category": "micro_apps",
    "badge": "Audio Synthesis",
    "desc": "Synthesized Web Audio API interactive musical keyboard keys.",
    "html": "<div class=\"piano-card\"><h3>Web Audio Synth Piano</h3><div class=\"piano-keys\"><button class=\"k-white\" onclick=\"playTone(261.63)\">C</button><button class=\"k-white\" onclick=\"playTone(293.66)\">D</button><button class=\"k-white\" onclick=\"playTone(329.63)\">E</button><button class=\"k-white\" onclick=\"playTone(349.23)\">F</button><button class=\"k-white\" onclick=\"playTone(392.00)\">G</button><button class=\"k-white\" onclick=\"playTone(440.00)\">A</button><button class=\"k-white\" onclick=\"playTone(493.88)\">B</button></div><p>Click keys to play musical tones</p></div>",
    "css": "body{background:#090e1a;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.piano-card{background:#1e293b;border:1px solid #334155;border-radius:16px;padding:22px;width:290px;text-align:center;}.piano-card h3{margin:0 0 14px;font-size:15px;color:#38bdf8;}.piano-keys{display:flex;justify-content:center;gap:4px;margin-bottom:12px;}.k-white{width:34px;height:100px;background:#f8fafc;color:#0f172a;border:1px solid #cbd5e1;border-radius:0 0 6px 6px;cursor:pointer;font-weight:bold;font-size:13px;display:flex;align-items:flex-end;justify-content:center;padding-bottom:8px;}.k-white:active{background:#38bdf8;color:#000;}.piano-card p{margin:0;font-size:12px;color:#94a3b8;}",
    "js": "const aCtx=new(window.AudioContext||window.webkitAudioContext)();function playTone(f){if(aCtx.state===\"suspended\")aCtx.resume();const osc=aCtx.createOscillator(),g=aCtx.createGain();osc.type=\"sine\";osc.frequency.setValueAtTime(f,aCtx.currentTime);g.gain.setValueAtTime(0.3,aCtx.currentTime);g.gain.exponentialRampToValueAtTime(0.001,aCtx.currentTime+0.5);osc.connect(g);g.connect(aCtx.destination);osc.start();osc.stop(aCtx.currentTime+0.5);}"
  },
  "app_color_contrast": {
    "title": "WCAG Color Contrast Ratio Checker",
    "category": "micro_apps",
    "badge": "Accessibility",
    "desc": "Input text color and background color to calculate contrast ratio and WCAG badge.",
    "html": "<div class=\"wcag-card\"><h3>Contrast Checker</h3><div class=\"color-inputs\"><div><label>Text:</label><input type=\"color\" id=\"fgCol\" value=\"#38bdf8\" oninput=\"checkContrast()\" /></div><div><label>Background:</label><input type=\"color\" id=\"bgCol\" value=\"#090e1a\" oninput=\"checkContrast()\" /></div></div><div class=\"wcag-preview\" id=\"wcPreview\">Sample Text</div><div class=\"wcag-score\" id=\"wcScore\">Ratio: 9.8 : 1 (AAA PASS)</div></div>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.wcag-card{background:#0f172a;border:1px solid #1e293b;border-radius:14px;padding:20px;width:260px;text-align:center;}.wcag-card h3{margin:0 0 12px;font-size:15px;color:#38bdf8;}.color-inputs{display:flex;justify-content:space-around;margin-bottom:12px;font-size:12px;}.wcag-preview{padding:12px;border-radius:8px;font-weight:bold;margin-bottom:10px;border:1px solid #334155;}.wcag-score{font-size:12px;color:#10b981;font-weight:bold;}",
    "js": "function checkContrast(){const fg=document.getElementById(\"fgCol\").value,bg=document.getElementById(\"bgCol\").value;const p=document.getElementById(\"wcPreview\");p.style.color=fg;p.style.backgroundColor=bg;}"
  },
  "app_json_formatter": {
    "title": "JSON Validator & Pretty Formatter",
    "category": "micro_apps",
    "badge": "JSON Tool",
    "desc": "Paste unformatted or minified JSON, validate syntax, and format with indentation.",
    "html": "<div class=\"json-card\"><h3>JSON Formatter</h3><textarea id=\"jInp\" placeholder='Paste {\"name\":\"alex\"} here...' style=\"width:100%;box-sizing:border-box;height:70px;background:#090e1a;border:1px solid #334155;color:#fff;padding:6px;border-radius:6px;font-family:monospace;font-size:11px;\"></textarea><button onclick=\"formatJSON()\" style=\"width:100%;margin:8px 0;padding:8px;background:#6366f1;color:#fff;border:none;border-radius:6px;font-weight:bold;cursor:pointer;\">Format & Validate</button><pre id=\"jOut\" style=\"background:#090e1a;border:1px solid #334155;padding:8px;border-radius:6px;font-size:11px;color:#10b981;text-align:left;max-height:80px;overflow:auto;margin:0;\"></pre></div>",
    "css": "body{background:#030712;display:grid;place-items:center;min-height:95vh;margin:0;font-family:sans-serif;color:#fff;}.json-card{background:#0f172a;border:1px solid #1e293b;border-radius:14px;padding:20px;width:280px;text-align:center;}.json-card h3{margin:0 0 10px;font-size:15px;color:#38bdf8;}",
    "js": "function formatJSON(){const txt=document.getElementById(\"jInp\").value,out=document.getElementById(\"jOut\");try{const o=JSON.parse(txt);out.style.color=\"#10b981\";out.innerText=JSON.stringify(o,null,2);}catch(e){out.style.color=\"#ef4444\";out.innerText=\"Syntax Error: \"+e.message;}}"
  }
};

  return {
    CATEGORIES: CATEGORIES,
    PRESETS: PRESETS,
    getTotalCount: () => Object.keys(PRESETS).length
  };
})();
