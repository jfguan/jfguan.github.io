export const getDate = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  const date = mm + '/' + dd + '/' + yyyy;
  return date;
};

export const getMonthAndDay = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!

  const date = mm + '/' + dd;
  return date;
};

export const shareStatus = (
  puzzle,
  score,
  completedPuzzles,
  completionTimes
) => {
  let shareText =
    '24 game - ' +
    getMonthAndDay() +
    '\n' +
    'Puzzles solved: ' +
    score +
    '😤\n\n';

  for (let i = 0; i < score && i < 4; i++) {
    shareText +=
      completedPuzzles[i].join(' ') +
      ' in ' +
      (completionTimes[i] / 1000).toFixed(2) +
      's\n';
  }

  if (score > 4) {
    shareText += '...\n';
    shareText +=
      completedPuzzles[score - 1].join(' ') +
      ' in ' +
      (completionTimes[score - 1] / 1000).toFixed(2) +
      's\n';
  }

  navigator.clipboard.writeText(shareText);
};

export const shareWebsite = () => {
  navigator.clipboard.writeText('https://jfguan.github.io/');
};
