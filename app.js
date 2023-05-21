let input = $('input');
const deleteBtn = $('<button>Delete</button>');
let sortMovie = [];
let movieIdx = 0;

//submitting movies & ratings to form

$('#form').on('click', '#btnForm', function(e){
    e.preventDefault();
    let movieInput = $('#movieInput').val();
    let ratingInput = $('#ratingInput').val();
    let inputInfo = {movieInput, ratingInput, movieIdx};
    let appendedInfo = createMovieDataHTML(inputInfo);

    if(ratingInput <= 10 && movieInput.length >= 2) {
        movieIdx++;
        sortMovie.push(inputInfo);
        $('#tbodyResults').append(appendedInfo);
    }else{
        alert('Please enter a full movie title and a number from 0 - 10.');
        console.log('toomuch');
    }  
    $('input').val('')
});


//deleting row on click
$('#tbodyResults').on('click','#deleteBtn', function(e) {
    let idx = sortMovie.findIndex(movie => movie.movieIdk === +$(e.target.deleteBtn))
    sortMovie.splice(idx, 1);
    $(e.target).closest('tr').remove();
    console.log("delete", this)
})


//sorting movie titles
$('.fas').on("click", function(e) {
    console.log('you clicked')
    let direction = $(e.target).hasClass("fa-sort-down") ? "down" : "up";
    console.log(direction)
    let keyToSortBy = $(e.target).attr("id");
    console.log(keyToSortBy)

    let sortedMovie = sortedBy(sortMovie, keyToSortBy, direction);
    console.log(sortedMovie)
    $('#tbodyResults').empty();

    for(let movie of sortedMovie) {
        console.log(movie)
        $('#tbodyResults').append(movie)
         let appendedInfo = createMovieDataHTML(movie);
        $('#tbodyResults').append(appendedInfo)
        console.log(appendedInfo) 
    }

  $(e.target).toggleClass("fa-sort-down");
  $(e.target).toggleClass("fa-sort-up");

});


function sortedBy(array, keyToSortBy, direction) {
    return array.sort(function(a, b) {
        if(keyToSortBy === 'ratingInput') {
            a[keyToSortBy] = +a[keyToSortBy];
            b[keyToSortBy] = +b[keyToSortBy];
            console.log('okay its working', keyToSortBy)
        }
        if (a[keyToSortBy] > b[keyToSortBy]) {
            return direction === "up" ? 1 : -1;
        } else if (b[keyToSortBy] > a[keyToSortBy]){
            return direction === "up" ? -1 : 1;
        } 
        return 0;
    });
}


function createMovieDataHTML(data) {
    return   `<tr>
    <td> ${data.movieInput} </td> 
    <td> ${data.ratingInput} </td> 
    <td> <button id="deleteBtn">  Delete </button> </td>
    <tr>`
}

