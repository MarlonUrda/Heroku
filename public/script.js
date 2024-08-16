window.onload = () => {
  let converter = new showdown.Converter();
  let pad = document.getElementById("pad");
  let markdownArea = document.getElementById("markdown");

  pad.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      let start = this.selectionStart;
      let end = this.selectionEnd;

      let target = e.target;
      let value = target.value;

      target.value = value.substring(0, start) + "\t" + value.substring(end);

      this.selectionStart = this.selectionEnd = start + 1;

      e.preventDefault();
    }
  });

  let previousMardownValue;

  let convertTextAreaToMarkdown = () => {
    let markdownText = pad.value;
    previousMardownValue = markdownText;
    let html = converter.makeHtml(markdownText);
    markdownArea.innerHTML = html;
  };

  let didChangeOccur = () => {
    if (previousMardownValue != pad.value) {
      return true;
    }

    return false;
  };

  setInterval(() => {
    if (didChangeOccur) {
      convertTextAreaToMarkdown();
    }
  }, 1000);

  if (document.location.pathname.length > 1) {
    let documentName = document.location.pathname.substring(1);

    sharejs.open(documentName, "text", (error, doc) => {
      doc.attach_textarea(pad);
      convertTextAreaToMarkdown();
    });
  }

  convertTextAreaToMarkdown();
};
