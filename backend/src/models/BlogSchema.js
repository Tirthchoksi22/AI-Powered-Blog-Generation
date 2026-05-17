import user from './UsersSchema.js';

import mongoose from 'mongoose';

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 150,
    },
    content: {
        type: String,
        required: true,
    },
    tone: {
        type: String,
        default: 'informative',
    },
    length: {
        type: Number,
        default: 500,
    },
    keywords: {
        type: String,
        default: '',
    },
    author: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }
}, { timestamps: true })

const blog  = mongoose.model("Blog", blogSchema)

export default blog