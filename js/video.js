function minMax(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getForwardVideo() {
  const video = document.getElementById("backgroundVideo");
  if (!video) {
    throw new Error("Video element not found");
  }

  return video;
}

function getReverseVideo() {
  const video = document.getElementById("reverseBackgroundVideo");
  if (!video) {
    throw new Error("Reverse Video element not found");
  }

  return video;
}

function updateVideoStyle(videoToShow, videoToHide) {
  videoToShow.style.display = "block";
  videoToHide.style.display = "none";
}

async function seekVideoToPercentage(percentage) {
  if (percentage < 0 || percentage > 1) {
    throw new Error("Percentage must be between 0 and 1");
  }

  const video = getForwardVideo();
  const reverseVideo = getReverseVideo();

  const isGoingForward = video.style.display === "block";
  const videoProgress = video.currentTime / video.duration;
  const reverseVidProgress = reverseVideo.currentTime / reverseVideo.duration;
  const trueProgress = isGoingForward ? videoProgress : 1 - reverseVidProgress;

  if (percentage > trueProgress) {
    updateVideoStyle(video, reverseVideo);

    await animateSeekToPercentage(video, percentage);
    await setVideoCurrentTimePercentage(reverseVideo, 1 - percentage);
  } else if (percentage < trueProgress) {
    updateVideoStyle(reverseVideo, video);

    await animateSeekToPercentage(reverseVideo, 1 - percentage);
    await setVideoCurrentTimePercentage(video, percentage);
  }
}

async function animateSeekToPercentage(video, percentage) {
  const targetTime = percentage * video.duration;
  if (video.currentTime >= targetTime) return;

  video.play();

  return new Promise((resolve) => {
    clearTimeout(video.setTimeout);
    video.setTimeout = setTimeout(() => {
      video.pause();
      video.currentTime = targetTime;

      resolve();
    }, (targetTime - video.currentTime) * 1000);
  });
}

async function setVideoCurrentTimePercentage(video, percentage) {
  if (percentage < 0 || percentage > 1) {
    console.error("Percentage must be between 0 and 1");
    return;
  }

  video.currentTime = percentage * video.duration;

  return new Promise((resolve) => {
    video.addEventListener("timeupdate", resolve);
  });
}

const OFFSET = -2;
function syncVideoWithScroll() {
  const html = document.documentElement;
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;

  seekVideoToPercentage(minMax((scrollTop + OFFSET) / maxScrollTop, 0, 1));
}

async function waitForVideoMetadata(video) {
  if (video.readyState < 1) {
    await new Promise((resolve) => {
      video.addEventListener("loadedmetadata", resolve, { once: true });
    });
  }
}

async function waitForMetadata() {
  const video = getForwardVideo();
  const reverseVideo = getReverseVideo();

  await waitForVideoMetadata(video);
  await waitForVideoMetadata(reverseVideo);
}

waitForMetadata().then(syncVideoWithScroll);

window.addEventListener("scroll", syncVideoWithScroll);
