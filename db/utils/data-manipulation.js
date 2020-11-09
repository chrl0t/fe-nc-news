// extract any functions you are using to manipulate your data, into this file
exports.formatArticles = (articleData) => {
  // take created_at key and change it to correct format yyyy-mm-dd hh:mm:ss
  return articleData.map(({ created_at, ...article }) => {
    const date = new Date(created_at).toLocaleString();
    const year = date.substr(6, 4);
    const month = date.substr(3, 2);
    const day = date.substr(0, 2);
    const time = date.substr(12);

    const formattedDate = `${year}-${month}-${day} ${time}`;

    return {
      ...article,
      created_at: formattedDate,
    };
  });
};

exports.changeKey = (commentData) => {
  return commentData.map(({ created_by, ...restOfData }) => {
    return {
      ...restOfData,
      author: created_by,
    };
  });
};

exports.createArticleRef = (articleRows) => {
  const articleRef = {};
  articleRows.map(({ article_id, title }) => {
    articleRef[title] = article_id;
  });
  return articleRef;
};

exports.formatComments = (articleRef, commentData) => {
  return commentData.map(({ belongs_to, ...restOfData }) => {
    return { ...restOfData, article_id: articleRef[belongs_to] };
  });
};
