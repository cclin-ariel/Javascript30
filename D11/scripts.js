const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const toggle = document.querySelector('.toggle');
const ranges = document.querySelectorAll('.player__slider');
const skipButtons = document.querySelectorAll('[data-skip]');


//play/pause video
function togglePlay(){
    //same as: if(video.paused){video.play()}else{video.pause()}
    const method = video.paused ? 'play' : 'pause';
    video[method]();      
}
// toggle Play-icon
function toggleIcon(){
    // const icon = this.play ? '❚ ❚' : '►' ;
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip(){
    //customized property 'data-skip' value
    console.log(this.dataset.skip); 
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
    // console.log(this.value);
    // console.log(this.name);volume or playbackRate
    video[this.name] = this.value;
}

function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    console.log(scrubTime);
   
    video.currentTime = scrubTime;
}


//event listeners
toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('play', toggleIcon);
video.addEventListener('pause', toggleIcon);
video.addEventListener('timeupdate', handleProgress);

skipButtons.forEach(skipButton => skipButton.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let scrubbing = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e)=> scrubbing && scrub(e));
//same as 'if(scrubbing)scrub()'
progress.addEventListener('mousedown', ()=> scrubbing = true);
progress.addEventListener('mouseup', ()=> scrubbing = false);


