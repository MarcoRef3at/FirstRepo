  module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      //id:_id,
      name: String,
      description: String,
      done: Boolean
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Feature = mongoose.model("feature", schema);
  return Feature;
};