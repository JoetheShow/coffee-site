var userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String
});

var user = mongoose.model("user", userSchema);