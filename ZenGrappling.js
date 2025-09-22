
const videoFiles = [
  ["ZG/PortfolioZG0.mp4", "ZG/PortfolioZG1.mp4", "ZG/PortfolioZG2.mp4", "ZG/PortfolioZG3.mp4"],  
  ["Tank/TankVid0.mp4", "Tank/TankVid1.mp4", "Tank/TankVid2.mp4", "Tank/TankVid3.mp4"],          
  ["Sand/SandVid0.mp4", "Sand/SandVid1.mp4", "Sand/SandVid2.mp4", "Sand/SandVid3.mp4"],   
  ["PV/PVVid0.mp4", "PV/PVVid1.mp4", "PV/PVVid2.mp4", "PV/PVVid3.mp4"],   
  ["Saute/SauteVid0.mp4", "Saute/SauteVid1.mp4", "Saute/SauteVid2.mp4"],   
];

// For each game
  const games = document.querySelectorAll(".game-inner");
  games.forEach((section, sectionIndex) => {
	// Get video players buttons and files
    const videoPlayer = section.querySelector("video");
    const buttons = section.querySelectorAll("button");
    const files = videoFiles[sectionIndex];
    let currentIndex = 0;


	function LoadVideo(i) 
	{
	  // Load new video
	  videoPlayer.src = files[i];
	  videoPlayer.load();               

	  // Update selected button
	  buttons.forEach(b => b.classList.remove("pressed"));
	  buttons[i].classList.add("pressed");

	  currentIndex = i;
	}

    // Make button load video
    buttons.forEach((btn, i) => btn.addEventListener("click", () => LoadVideo(i)));

    // Make video autoplay
    videoPlayer.addEventListener("ended", () => {
      currentIndex = (currentIndex + 1) % files.length;
      LoadVideo(currentIndex);
    });
	
  });

// PAUSE WHEN OFF SCREEN
// https://stackoverflow.com/questions/63911723/using-intersection-observer-to-play-pause-video-in-reactjs
 const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const videoPlayer = entry.target;
	// If video is half on screen play
    if (entry.intersectionRatio >= 0.5)
	{
      videoPlayer.play();
    } 
	else 
	{
      videoPlayer.pause();
    }
  });
}, { threshold: 0.5 });

// Pause all videos on start and check if in view
document.querySelectorAll(".game-inner video").forEach(videoPlayer => {
  videoPlayer.pause();       
  observer.observe(videoPlayer);
});



// Position background below hero
const hero = document.querySelector(".hero");
const body = document.body;

function UpdateBackground() {
  const heroHeight = hero.offsetHeight; 
  body.style.backgroundPosition = `center ${heroHeight}px`;
}

// Check height on load and resize
UpdateBackground();
window.addEventListener("resize", UpdateBackground);