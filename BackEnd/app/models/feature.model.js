  module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      //id:_id,
      transit_id: String,
      device_name: String,
      plate_number: String,
      country: String,
      date_time: String,
      speed: String,
      confidence_number: String,
      brand: String,
      model: String,
      color: String,
      car_class: String,
      
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