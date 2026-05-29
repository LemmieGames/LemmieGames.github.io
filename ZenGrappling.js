const videoFiles = [
  ["ZG/ZGPort0.mp4", "ZG/ZGPort1.mp4", "ZG/ZGPort2.mp4", "ZG/ZGPort3.mp4"],  
  ["Drone/DroneVid0.mp4", "Drone/DroneVid1.mp4", "Drone/DroneVid2.mp4", "Drone/DroneVid3.mp4"],       
  ["Tank/TankVid0.mp4", "Tank/TankVid1.mp4", "Tank/TankVid2.mp4", "Tank/TankVid3.mp4"],        
  ["CA/CAVid0.mp4", "CA/CAVid1.mp4", "CA/CAVid2.mp4", "CA/CAVid3.mp4"],    
  ["Sand/SandVid0.mp4", "Sand/SandVid1.mp4", "Sand/SandVid2.mp4"],   
  ["PV/PVVid0.mp4", "PV/PVVid1.mp4", "PV/PVVid2.mp4", "PV/PVVid3.mp4"],   
  ["Saute/SauteVid0.mp4", "Saute/SauteVid1.mp4", "Saute/SauteVid2.mp4"], 
  ["PK/PKVid0.mp4", "PK/PKVid1.mp4", "PK/PKVid2.mp4", "PK/PKVid3.mp4"],    
];

const volumes = [
  1,
  0.4,
  1,
  1,
  1,
  1,
  1,
  0.2,
];

const games = document.querySelectorAll(".game-inner");
games.forEach((section, sectionIndex) => {
  const videoPlayer = section.querySelector("video");
  const buttons = section.querySelectorAll(".gif-button");
  const muteBtn = section.querySelector(".mute-button");
  const muteIcon = muteBtn.querySelector(".mute-icon");
  const iconMuted = "mute.png";
  const iconUnmuted = "unmute.png";
  const files = videoFiles[sectionIndex];
  let currentIndex = 0;

  function LoadVideo(i) {
    const isMuted = videoPlayer.muted;

    videoPlayer.src = files[i];
    videoPlayer.load();               

    videoPlayer.muted = isMuted;

    buttons.forEach(b => b.classList.remove("pressed"));
    buttons[i].classList.add("pressed");

    currentIndex = i;
	
	videoPlayer.play().catch(err => console.log("Autoplay blocked:", err));
  }
  
 if (videoPlayer) {
	videoPlayer.volume = volumes[sectionIndex];
    videoPlayer.addEventListener("click", () => {
      if (videoPlayer.paused) {
        videoPlayer.play().catch(err => console.log("Playback failed:", err));
      } else {
        videoPlayer.pause();
      }
    });
  }

  if (muteBtn) 
  {
	  muteBtn.addEventListener("click", () => {
	  if (videoPlayer.muted) 
	  {
		videoPlayer.muted = false;
		muteIcon.src = iconUnmuted;
	  } 
	  else 
	  {
		videoPlayer.muted = true;
		muteIcon.src = iconMuted;
	  }
	});
  }

  buttons.forEach((btn, i) => btn.addEventListener("click", () => LoadVideo(i)));

  videoPlayer.addEventListener("ended", () => {
    currentIndex = (currentIndex + 1) % files.length;
    LoadVideo(currentIndex);
    videoPlayer.play().catch(err => console.log("Autoplay blocked:", err));
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



// Position background below hero `
const hero = document.querySelector(".hero");
const body = document.body;

function UpdateBackground() {
  const heroHeight = hero.offsetHeight; 
  body.style.backgroundPosition = `center ${heroHeight}px`;
}

// Check height on load and resize
UpdateBackground();
window.addEventListener("resize", UpdateBackground);


// OVERLAY BUTTONS
document.querySelectorAll(".overlay-button").forEach(button => {
	button.addEventListener('click', () => {
		const target = document.querySelector(button.dataset.target);
		if (target) {
			target.style.display = 'flex';
			document.body.overflow = 'hidden';
			document.querySelectorAll(".game-inner video").forEach(videoPlayer => {
				videoPlayer.pause();       
			});
		}
	});
});

document.querySelectorAll('.overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target == overlay) { 
      overlay.style.display = 'none';
      document.body.style.overflow = '';
	  checkVideosVisibility();
    }
  });
});

function checkVideosVisibility() {
  document.querySelectorAll(".game-inner video").forEach(video => {
    const rect = video.getBoundingClientRect();
    const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
    const ratio = visibleHeight / rect.height;

    if (ratio >= 0.5) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  });
}


function updateParallax() {
  let speedMultiplier = -0.3;
  let scrolled = window.pageYOffset;
  let bg = document.querySelector('.parallax-bg');
  let hero = document.querySelector('.hero');
  
  if (bg && hero) 
  {
    let heroHeight = hero.offsetHeight; 
   
    let newYPosition = heroHeight + (scrolled * speedMultiplier);
    
    bg.style.backgroundPosition = `center ${newYPosition}px`;
  }
}

window.addEventListener('scroll', updateParallax);
window.addEventListener('DOMContentLoaded', updateParallax);
window.addEventListener('resize', updateParallax);