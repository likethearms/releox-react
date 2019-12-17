'use strict';

module.exports = (app) => {
  var Role = app.models.Role;

  Role.registerResolver('teamMember', (role, context, cb) => {
    function reject() {
      process.nextTick(() => {
        cb(null, false);
      });
    }

    var userId = context.accessToken.userId;
    if (!userId) return reject();

    if (context.modelId) {
      context.model.findById(context.modelId, (err, contextModel) => {
        if (err || !contextModel) return reject();
        var Member = app.models.Member;
        Member.findById(userId, (err, member) => {
          if (err) return reject();
          cb(null, member.companyId.equals(contextModel.companyId));
        });
      });
    } else {
      cb(null, true);
    }
  });
};
