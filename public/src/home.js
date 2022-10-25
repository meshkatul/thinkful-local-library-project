function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let borrowed = books
    .map(item => item.borrows)
    .flat() //flattens the arrays to get a single array
    .filter(borrow => borrow.returned === false);
    return borrowed.length;
}

function getMostCommonGenres(books) {
  const genreList = books.map((book) => book.genre);
  let commonGenreList = [];
  genreList.map((genre) => {
    //check the name present in commonGenreList and get the index if it is present
    const genreIndex = commonGenreList.findIndex((element) => element.name === genre);
    //if the index exist then add +1 to the count otherwise create the object with genre name and count
    if(genreIndex >= 0){
      commonGenreList[genreIndex].count = commonGenreList[genreIndex].count + 1;
    } else {
      commonGenreList.push({name: genre, count:1});
    }
  });
  //calling helper function to sort and get top five from the list
  return getTopFive(commonGenreList);
}

function getMostPopularBooks(books) {
  let popularBooks = [];
// looping through 'books'; creates new objects with 'name' and 'count' keys, and pushes them onto 'popularBooks' array.
  books.reduce((acc, book) => {
    popularBooks.push({ name: book.title, count: book.borrows.length });
  }, []);
//calling helper function
return getTopFive(popularBooks);
}


function getMostPopularAuthors(books, authors) {
  let popularAuthors = [];
  for(let author of authors){
    const fullName = `${author.name.first} ${author.name.last}`;
      let borrowCount = 0;
      for(let book of books){
        if(author.id === book.authorId){
          borrowCount = borrowCount + book.borrows.length; 
        }
      }
        const authorObj = {name: fullName, count: borrowCount};
        popularAuthors.push(authorObj);
      }
      //calling the helper function
      return getTopFive(popularAuthors);
}

//helper function: get top 5 from the list
function getTopFive(array){
  let finalList = array.sort((arr1, arr2) => (arr1.count > arr2.count ? -1:1)).slice(0, 5);
  return finalList;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};


//get most popular books without using reduce
// function getMostPopularBooks(books) {
//   let bookList = [];
// books.map((book) => {
//   const num = book.borrows.length;
//   bookList.push({name:book.title, count:num });
// });
// return getTopFive(bookList);
// }