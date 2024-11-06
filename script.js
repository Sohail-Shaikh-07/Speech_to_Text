document.addEventListener("DOMContentLoaded", () => {
    const click_to_record = document.getElementById("click_to_record");
    const convert_text = document.getElementById("convert_text");
    const is_recording = document.getElementById("is_recording");
    const confidence_id = document.getElementById("confidence_id");
    const language_select = document.getElementById("language_select");
  
    let isRecording = false;
    let recognition;
  
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support Speech Recognition. Please try Chrome.");
    } else {
      recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
  
      recognition.onstart = () => {
        is_recording.textContent = "Recording: True";
        isRecording = true;
        click_to_record.textContent = "Stop Recording";
      };
  
      recognition.onend = () => {
        is_recording.textContent = "Recording: False";
        isRecording = false;
        click_to_record.textContent = "Start Recording";
      };
  
      recognition.onresult = (event) => {
        let interimTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            convert_text.value += transcript + " ";
            confidence_id.textContent = `Confidence: ${(event.results[i][0].confidence * 100).toFixed(2)}%`;
          } else {
            interimTranscript += transcript;
          }
        }
      };
    }
  
    click_to_record.addEventListener("click", () => {
      if (isRecording) {
        recognition.stop();
      } else {
        recognition.lang = language_select.value;
        convert_text.value = "";
        confidence_id.textContent = "Confidence: 0";
        recognition.start();
      }
    });
  });
  