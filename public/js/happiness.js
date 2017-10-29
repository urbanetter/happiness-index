$(document).ready(function () {
  var video = $('video').get(0);
  var canvas = $('canvas').get(0);
  var stream;
  navigator
    .mediaDevices
    .getUserMedia({audio: false, video: true})
    .then(function (videoStream) {
      video.srcObject = videoStream;
      stream = videoStream;
    })
    .catch(function(error) {
      console.error(error);
    });
  $(video).on('click', function () {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').
      drawImage(video, 0, 0, canvas.width, canvas.height);
    $(this).hide();
    stream.getTracks()[0].stop();
    $.ajax({
      type: 'POST',
      url: '/happiness',
      data: {
        base64data: canvas.toDataURL()
      },
      success: function(data) {
        var index = (parseFloat(data[0].faceAttributes.emotion.happiness) * 4) + 1;
        $('h2').text('Happiness Index: ' + index.toFixed(2))
      }
    });
  })
});