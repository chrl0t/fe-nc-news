// extract any functions you are using to manipulate your data, into this file
exports.formatArticles = (articleData) => {
  // take created_at key and change it to correct format yyyy-mm-dd hh:mm:ss
  return articleData.map(({ created_at, ...article }) => {
    return {
      ...article,
      created_at: new Date(created_at).toLocaleString().replace(/\//g, "-"),
    };
  });
};
