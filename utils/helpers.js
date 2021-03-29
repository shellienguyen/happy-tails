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
  },

  check_box: () => {
    // if dog has_walked or has_pottied then load that status into checkboxes on single-dog page using "checked" attribute
   
  },
  
  // happy_tail: () => {
  //   // if dog has_walked AND has_pottied then change status-emoji from sad face to happy face 
  //   if (has_walk_am && has_potty_am  ||  has_walk_pm && has_potty_pm) {
  //     let statusEmoji = document.querySelector('.status-emoji');

  //     statusEmoji.innerHTML = "&#128513";
  //   }
  // }
};