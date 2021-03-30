module.exports = {
  format_date: date => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
      date
    ).getFullYear()}`;
  },

  // format_plural: (word, amount) => {
  //   if (amount !== 1) {
  //     return `${word}s`;
  //   }

  //   return word;
  // },

  shift_change: () => {
    // let currentHour = moment().hour();
    let today = new Date();
    let currentHour = today.getHours();

    console.log(currentHour);
    if (currentHour >= 0 && currentHour <= 11) {
      console.log('inside here')
        return true;
    }
    console.log('hello')
    return false;
    
  },

  // check_box: () => {
    // if dog has_walked or has_pottied then load that status into checkboxes on single-dog page using "checked" attribute
   
  // },
  
  happy_tail_am: () => {
    // if dog has_walked AND has_pottied then change status-emoji from sad face to happy face 
    if (has_walked_am && has_potty_am && shift_change) {
      
      return true;
    }
    return false;
  },

  happy_tail_pm: (has_walked_pm) => {
    // if dog has_walked AND has_pottied then change status-emoji from sad face to happy face 
    if (has_walked_pm) {
      console.log('say something')
      return true;
      
    }
    console.log('whatever')
    return false;
  }
};