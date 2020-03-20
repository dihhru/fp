const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let prepare = async function() {
  let images, audio;
  let imagesP = new Promise((resolve, reject) => loadImages(resolve, reject));
  let audioP = new Promise((resolve, reject) => loadAudio(resolve, reject));
  audio = await audioP;
  images = await imagesP;

  return images + audio;
};
prepare()
  .then(x => alert("ok"))
  .catch(e => alert(e));
