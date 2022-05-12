const mongoose = require('mongoose')


const planeSchema = mongoose.Schema(
	{ 
		planeId: 
			{ 
				required: true, 
				type: String,
			},
		Capacity: {
			economy: { required: true, type: String},
			business: { required: true, type: String },
			first_class: { required: true, type: String}
		}

	 }, { timestap: true})


module.exports = mongoose.model('planes', planeSchema)

