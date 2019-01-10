const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://lauracoombs:B1383l71883@cluster1-hk1wl.mongodb.net/test?retryWrites=true')
    .then(() => console.log('Connected to MongoDB...'))//use debug module
    .catch(err => console.error('Could not connect to MongoDB...', err));


const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
})

const Course = mongoose.model('Course', courseSchema);//get a 'Course' class 

async function createCourse() {
const course = new Course({
    name:'Angular Course',
    author: 'Mosh',
    tags: ['angular', 'frontend'],
    isPublished: true
});

const result = await course.save();
console.log(result);
}

async function getCourses() {

    const courses = await Course
        .find({ author: 'Mosh', isPublished: true })
    console.log(courses);
}

getCourses();