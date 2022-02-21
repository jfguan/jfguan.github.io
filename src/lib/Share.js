export const getDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    const date = mm + '/' + dd + '/' + yyyy;
    return date 
}
export const shareStatus = (puzzle, score, completedPuzzles, completionTimes) => {
    // const completionTimeSeconds = (completionTimeMs / 1000).toFixed(2)
    const date = getDate()

    let shareText = (
        '24 game - '+ date +'\n' +
        'Puzzles solved: ' + score + '😤\n\n'
    )

    for (let i = 0; i < completedPuzzles.length; i++) {
        shareText += completedPuzzles[i] + " : " + (completionTimes[i] / 1000).toFixed(2) + " seconds\n";
    }

    navigator.clipboard.writeText(shareText)
  }
  
  
export const shareWebsite = () => {
    navigator.clipboard.writeText(
        'https://jfguan.github.io/'
    )
  }
  