const API_URL = 'https://mcapi.us/server/status?ip=%a&port=%p';
const ADDRESS = '94.130.49.245';
const PORT = '25102';

window.onload = async function () {
  const request = new XMLHttpRequest();
  request.open('GET', API_URL.replace('%a', ADDRESS).replace('%p', PORT));
  request.send();

  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      console.log('Received response from ' + ADDRESS + ':' + PORT + '! (' + request.response + ')');

      const element = document.getElementById('insert-player-list');
      const response = JSON.parse(request.response);
      $(element).hide();

      if (!response.online || response.status !== 'success') {
        console.warn('Setting server status to offline! (Response: ' + response + ')');
        element.innerHTML = '<h2 style="color: red;">Der Server ist offline!</h2>';
      } else {
        if (response.favicon) element.innerHTML += '<img style="float: left;" src="' + response.favicon + '" alt="favicon" />';
        element.innerHTML += '<p style="float: right;" class="py-mb">Aktuell sind ' + response.players.now + ' von ' + response.players.max + ' Spielern online!</p>';

        if (response.players.sample.length > 0) {
          element.innerHTML += '<h2 style="float: left;">Es sind folgende Spieler online:</h2><br/><br/>';
          for (let i = 0; i < response.players.sample.length; i++) {
            const player = response.players.sample[i];
            element.innerHTML += '<div class="row"><div class="col"><p>' + player.name + '</p></div><div class="col"><img src="https://cravatar.eu/helmhead/' + player.id + '/32" alt="' + player.name + '" /></div></div><br/>';
          }
        } else {
          element.innerHTML += '<h2 style="color: red; float: left;">Es sind keine Spieler online!</h2>';
        }
      }

      $(element).fadeIn(250);
    }
  };
};
