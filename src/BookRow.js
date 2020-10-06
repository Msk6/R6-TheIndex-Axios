import React from "react";

const BookRow = props => {
  const book = props.book;
  const authorNames = book.authors.map(author => <p>{author.name},</p>);
  return (
    <tr>
      <td>{book.title}</td>
      <td>{authorNames}</td>
      <td>
        <button className="btn" style={{ backgroundColor: book.color }} />
      </td>
    </tr>
  );
};

export default BookRow;
