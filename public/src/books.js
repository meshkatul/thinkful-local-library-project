function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  //get the returned books list
  const returned = books.filter((book) => book.borrows[0].returned);
  //get the un-returned books list
  const borrowed = books.filter ((book) => !book.borrows[0].returned);
  //add both returned and un-returned books to new array 
  return [borrowed, returned];
}

function getBorrowersForBook(book, accounts) {
  let borrowerList = [];
  book.borrows.map((borrow) => {
    //loop thorugh the account and get the account with matching id with book borrow id
    accounts.filter((account) => {
      if(account.id === borrow.id){
        //set the "returned" key-value to account object
        account["returned"] = borrow.returned;
        //push the new account object to the array of objects
        borrowerList.push(account);
      }
    })
  });
  //sorting by company
  let finalList = borrowerList.sort((list1, list2) => {
    const companyA = list1.company;
    const companyB = list2.comapny;
    companyA.localeCompare(companyB);
  });
  //returning top 10
  return finalList.slice(0, 10);
}


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
