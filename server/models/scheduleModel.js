// Define the fields for the MongoDB schedule
const scheduleSchema = new mongoose.Schema(
    {
        title: String,
        origin: String,
        destination: String,
        hour: Number,
        minute: Number,
        days: [String],
        hidden: Boolean,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true }
);

mongoose.model('Schedule', scheduleSchema);
