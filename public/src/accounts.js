function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((a, b) => a["name"].last < b["name"].last ? -1: 1);
}

function getTotalNumberOfBorrows(account, books) {
  //create a variable to access the id from account object
  const {id: accountId} = account;
  let borrows = books
    .map(item => item.borrows)
    .flat() //flattens the array of objects to create a single array
    .filter(borrow => borrow.id === accountId);
  return borrows.length;
}

function getBooksPossessedByAccount(account, books, authors) {
  const inPossesion = [];
  books.map((book) => {
    book.borrows.map((borrow) => {
      authors.map((author) => {
        // if authorId matches the book author id add author to book
        if (author.id === book.authorId) book["author"] = author;
      });
      // if book is NOT returned && account.id matches with borrow id, then add 'book' to 'inPossession' 
      if (borrow.returned === false && borrow.id === account.id) {
        inPossesion.push(book);
      }
    });
  });
  return inPossesion;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
