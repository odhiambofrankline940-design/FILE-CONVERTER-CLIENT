async function convertFile() {
  const fileInput = document.getElementById("fileInput");
  const format = document.getElementById("formatSelect").value;
  const downloadLink = document.getElementById("downloadLink");

  if (!fileInput.files.length) {
    alert("Please select a file first.");
    return;
  }

  const file = fileInput.files[0];

  if (["png", "jpg", "webp"].includes(format)) {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(blob => {
        const url = URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = `converted.${format}`;
        downloadLink.style.display = "block";
        downloadLink.textContent = "Download";
      }, `image/${format}`);
    };
  } else if (format === "pdf") {
    const reader = new FileReader();
    reader.onload = () => {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      doc.text(reader.result, 10, 10);
      downloadLink.href = doc.output("bloburl");
      downloadLink.download = "converted.pdf";
      downloadLink.style.display = "block";
      downloadLink.textContent = "Download PDF";
    };
    reader.readAsText(file);
  } else {
    alert("Unsupported format.");
  }
}
