const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

// get the permission of using user's camera

function getVideoPermission() {
    navigator.mediaDevices
    .getUserMedia({video: true, audio: false})
    .then(mediaStream =>{
      // console.log(localMediaStream);
      // TypeError: Failed to execute 'createObjectURL' on 'URL': No function
      // https://stackoverflow.com/questions/27120757/failed-to-execute-createobjecturl-on-url
      // video.src = window.URL.createObjectURL(localMediaStream);

        video.srcObject = mediaStream;
        video.play();
    })
    .catch(err=>  console.error('OH NO!', err));
}
function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;
  
  setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height)

    // filter
    // take the pixels out
    let pixels = ctx.getImageData(0, 0, width, height); // pixels.data is an Array
    
    // mess it out 
    // pixels = redEffect(pixels);
    // pixels = RGBSplit (pixels);
    // pixels = greenScreen (pixels);
    
    // put them back
    ctx.putImageData(pixels, 0, 0);

  }, 16);
}

function takePhoto() {
  // play the sound
  snap.currentTime = 0;
  snap.play();

  // take the data out of the canvas
  const photoData = canvas.toDataURL('image/jpeg');// download file type
  const link = document.createElement('a'); //the taken photos is stored in a <a>
  link.href = photoData; 
  link.setAttribute('download', 'New Pose!!');
  link.textContent = 'Download Image'; 
  link.innerHTML = `<img src="${photoData}" alt="It's All YOU!!"/>`;
  strip.insertBefore(link, strip.firstChild);
};

function redEffect (pixels) {
  for(let i = 0; i < pixels.data.length; i += 4){
    pixels.data[i + 0] = pixels.data[i + 0] - 100;//R
    pixels.data[i + 1] = pixels.data[i + 1] + 10;//G
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5;//B
  }
  return pixels;
};
function RGBSplit (pixels) {
  for(let i = 0; i < pixels.data.length; i += 4){
    pixels.data[i + 0 - 100] = pixels.data[i + 0];//R
    pixels.data[i + 1 - 200] = pixels.data[i + 1];//G
    pixels.data[i + 2 - 300] = pixels.data[i + 2];//B
  }
  return pixels;
};
function greenScreen (pixels) {
  const levels = {};
  
  document.querySelectorAll('.rgb input').forEach(input =>{
      levels[input.name] = input.value;
    });

    for(i = 0; i < pixels.data.length; i += 4){
      red = pixels.data[i + 0];
      green = pixels.data[i + 1];
      blue = pixels.data[i + 2];
      alpha = pixels.data[i + 3];

      if(red >= levels.rmin
        && green >= levels.gmin
        && blue >= levels.bmin
        && red <= levels.rmax
        && green <= levels.gmax
        && blue <= levels.bmax){
        // take it out
        pixels.data[i + 3] = 0;
      }
    }
    return pixels;
};




getVideoPermission();
video.addEventListener('canplay', paintToCanvas);
