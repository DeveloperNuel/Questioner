
document.getElementById('login').addEventListener('click', () => {
  document.querySelector('.bg-modal').style.display = 'flex';
});

document.querySelector('.close').addEventListener('click', () => {
  document.querySelector('.bg-modal').style.display = 'none';
});
