const onCodeClick = function(event) {
  // This callback based on a snippet from https://css-tricks.com/force-selection-text-block/

  const instructions = document.getElementById('instructions');
  const codeWrapper = document.getElementById('oauthCode');
  // Select the email link anchor text
  const range = document.createRange();
  range.selectNode(codeWrapper);
  window.getSelection().addRange(range);

  try {
    // Now that we've selected the anchor text, execute the copy command
    const successful = document.execCommand('copy');
    const msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copy command was ' + msg);
    if (successful) {
      instructions.innerText = 'Code copied succesfully!';
    } else {
      instructions.innerText += ' Code did not copy, please do it manually.';
    }
  } catch (err) {
    console.log('Oops, unable to copy');
  }
};

window.onload = function() {
  const codeWrapper = document.getElementById('oauthCode');
  const pairs = window.location.search.slice(1).split('&');
  let vars = {};

  // Grab all the GET variables
  pairs.map(currentPair => {
    let [key, value] = currentPair.split('=');
    vars[key] = value;
  });

  // Assuming we the code exists, change the text.
  codeWrapper.innerText = vars['code'];

  // Add event listener
  codeWrapper.addEventListener('click', onCodeClick);
};
