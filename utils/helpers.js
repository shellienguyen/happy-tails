module.exports = {
  format_date: date => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
      date
    ).getFullYear()}`;
  },

  format_plural: (word, amount) => {
    if (amount !== 1) {
      return `${word}s`;
    }

    return word;
  },

  shift_change: () => {
    let currentHour = moment().hour();

    if (currentHour >= 0 && currentHour <= 11) {
        return true;
    }
    return false;
  }
  // colorCode(demeanor) {
  //   // check the value for the Doggy Demeanor and compare in if statement
  //   // if DD = Easy then add class .easy, if DD = Moderate add class .moderate.. etc.
  //   let demeanor = document.getElementById("")
  // }
};