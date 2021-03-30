$('.doggie').on('click', async function (evt) {
  evt.preventDefault();

  let dogbtn = $(this).attr('id');
  
  const c_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];
  
  let shift = moment().hour();
  console.log('*********************************');
  console.log(dogbtn);
  console.log(shift);
  console.log('*********************************');
  let dogObj;
  let volunteer;
  let potty;

  if ($('#walk-check').val()) {
    volunteer = $(this).data('v_id')
  } 
  else {
    volunteer = null;
  };

  if ($('#potty-check').val()) {
    potty = $(this).data('v_id')
  }
  else {
    potty = null;
  };

  if (shift >= 0 && shift <= 11) {
    dogObj = {
      has_walked_am: volunteer,
      has_potty_am: potty
    };
  } 
  else {
    dogObj = {
      has_walked_pm: volunteer,
      has_potty_pm: potty
    };
  }

  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@');
  console.log(dogObj);
  console.log(c_id);
  console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@');

  // api call c_id update pass dogObj
  const response = await fetch(`/api/canine/${c_id}`, {
    method: 'PUT',
    body: JSON.stringify(
      dogObj
    ),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard/');
  }
  else {
    alert(response.statusText);
  };
})
//  document.querySelector(`${canine.c_id}`).addEventListener('submit', editFormHandler);


