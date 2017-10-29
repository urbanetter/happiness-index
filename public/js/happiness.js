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
  $('button').on('click', function () {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').
      drawImage(video, 0, 0, canvas.width, canvas.height);
    stream.getTracks()[0].stop();
    $(video).hide();
    $(this).hide();
    $.ajax({
      type: 'POST',
      url: '/happiness',
      data: {
        base64data: canvas.toDataURL()
      },
      success: function(data) {
        $('h2').text('Happiness Index: ' + data[0].faceAttributes.emotion.happiness)
      }
    });
  })
});