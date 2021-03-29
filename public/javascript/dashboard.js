// jquery dropdown functionality
$('.dropdown-trigger').dropdown();

function happy_tail() {
    // if dog has_walked AND has_pottied then change status-emoji from sad face to happy face 
    if (has_walk_am && has_potty_am || has_walk_pm && has_potty_pm) {
        let statusEmoji = document.querySelector('.status-emoji');

        statusEmoji.innerHTML = "&#128513";
    }
};

happy_tail();