function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;

  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  document.execCommand('copy');
  document.body.removeChild(textArea);
}

function copyText(text) {
  if (!navigator.clipboard) fallbackCopyTextToClipboard(text);
  else navigator.clipboard.writeText(text);

  document.getElementById('info-container').innerHTML = '<div id="copy-info-container" style="z-index: 999; width: 250px; min-height: 20px; box-sizing: border-box; padding: 20px 10px 10px 20px; overflow: hidden; position: fixed; bottom: 30px; right: 30px; background-color: var(--light); border-radius: 5px;"><p>Der Text ' + text + ' wurde kopiert!</p></div>';
  const element = document.getElementById('copy-info-container');

  $(element).hide();
  $(element).fadeIn(250);

  setTimeout(() => $(element).fadeOut(500), 2000);
}
