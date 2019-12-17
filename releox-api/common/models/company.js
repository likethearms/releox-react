module.exports = (Company) => {
  /**
   * Count all documents
   * @param {string} id Company id
   * @param {Function(Error, number)} callback
   */

  Company.documentCount = (id, callback) => {
    const { QNC, Document, Risk } = Company.app.models;
    let count = 0;

    const query = { where: { companyId: id }, deleted: true };

    Risk.find(query)
      .then((c) => {
        count += c.length;
        return Document.find(query);
      })
      .then((c) => {
        count += c.length;
        return QNC.find(query);
      })
      .then((c) => {
        count += c.length;
        callback(null, count);
      })
      .catch(callback);
  };
};
