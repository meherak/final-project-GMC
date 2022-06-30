const __resolveType = (parent, args, context, info) => {
  if (parent.role) return "User";
  if (parent.agency_name) return "Agency";
  return null;
};

module.exports = { __resolveType };
