function edit(el) {
  el.childNodes[0].removeAttribute('disabled');
  el.childNodes[0].focus();
  window.getSelection().removeAllRanges();
}
function disable(el) {
  el.setAttribute('disabled', '');
}
 
