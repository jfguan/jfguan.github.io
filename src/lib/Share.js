export const shareStatus = (puzzle, completionTimeMs) => {
    const completionTimeSeconds = (completionTimeMs / 1000).toFixed(2)

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;

    navigator.clipboard.writeText(
        '24('+today+'): ' + puzzle + '\n' +
        completionTimeSeconds + ' seconds 😤'
    )
  }
  
  
export const shareWebsite = () => {
    navigator.clipboard.writeText(
        'www.google.com'
    )
  }
  